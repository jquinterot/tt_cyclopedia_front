import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000';

const teardownClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

interface TestData {
  users: string[];
  posts: string[];
  forums: string[];
  comments: string[];
}

const testDataTracker: TestData = {
  users: [],
  posts: [],
  forums: [],
  comments: [],
};

/**
 * Track created test data for cleanup
 */
export function trackTestData(type: keyof TestData, id: string) {
  testDataTracker[type].push(id);
  console.log(`📝 Tracked ${type}: ${id}`);
}

/**
 * Clean up all tracked test data
 */
export async function cleanupAllTestData() {
  console.log('🧹 Starting cleanup of all test data...');
  
  try {
    // Clean up in reverse order to handle dependencies
    await cleanupComments();
    await cleanupForums();
    await cleanupPosts();
    await cleanupUsers();
    
    console.log('✅ All test data cleaned up successfully');
  } catch (error) {
    console.error('❌ Error during test data cleanup:', error);
    throw error;
  }
}

/**
 * Clean up specific user and all their data
 */
export async function cleanupUserData(username: string) {
  console.log(`🧹 Cleaning up data for user: ${username}`);
  
  try {
    // First, get user ID by username
    const userResponse = await teardownClient.get(`/users?username=${username}`);
    const users = userResponse.data;
    
    if (users && users.length > 0) {
      const userId = users[0].id;
      
      // Clean up user's posts
      await cleanupUserPosts(userId);
      
      // Clean up user's forums
      await cleanupUserForums(userId);
      
      // Finally delete the user
      await teardownClient.delete(`/users/${userId}`);
      console.log(`✅ Deleted user: ${username}`);
    }
  } catch (error) {
    console.error(`❌ Error cleaning up user ${username}:`, error);
  }
}

/**
 * Clean up all comments
 */
async function cleanupComments() {
  console.log('🧹 Cleaning up comments...');
  
  for (const commentId of testDataTracker.comments) {
    try {
      await teardownClient.delete(`/comments/${commentId}`);
      console.log(`✅ Deleted comment: ${commentId}`);
    } catch (error) {
      console.warn(`⚠️ Could not delete comment ${commentId}:`, error);
    }
  }
  
  testDataTracker.comments = [];
}

/**
 * Clean up all forums and their comments
 */
async function cleanupForums() {
  console.log('🧹 Cleaning up forums...');
  
  for (const forumId of testDataTracker.forums) {
    try {
      // First clean up forum comments
      await cleanupForumComments(forumId);
      
      // Then delete the forum
      await teardownClient.delete(`/forums/${forumId}`);
      console.log(`✅ Deleted forum: ${forumId}`);
    } catch (error) {
      console.warn(`⚠️ Could not delete forum ${forumId}:`, error);
    }
  }
  
  testDataTracker.forums = [];
}

/**
 * Clean up comments for a specific forum
 */
async function cleanupForumComments(forumId: string) {
  try {
    const commentsResponse = await teardownClient.get(`/forums/${forumId}/comments`);
    const comments = commentsResponse.data;
    
    for (const comment of comments) {
      try {
        await teardownClient.delete(`/forums/${forumId}/comments/${comment.id}`);
        console.log(`✅ Deleted forum comment: ${comment.id}`);
      } catch (error) {
        console.warn(`⚠️ Could not delete forum comment ${comment.id}:`, error);
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not fetch comments for forum ${forumId}:`, error);
  }
}

/**
 * Clean up all posts
 */
async function cleanupPosts() {
  console.log('🧹 Cleaning up posts...');
  
  for (const postId of testDataTracker.posts) {
    try {
      await teardownClient.delete(`/posts/${postId}`);
      console.log(`✅ Deleted post: ${postId}`);
    } catch (error) {
      console.warn(`⚠️ Could not delete post ${postId}:`, error);
    }
  }
  
  testDataTracker.posts = [];
}

/**
 * Clean up posts for a specific user
 */
async function cleanupUserPosts(userId: string) {
  try {
    const postsResponse = await teardownClient.get(`/posts?user_id=${userId}`);
    const posts = postsResponse.data;
    
    for (const post of posts) {
      try {
        await teardownClient.delete(`/posts/${post.id}`);
        console.log(`✅ Deleted user post: ${post.id}`);
      } catch (error) {
        console.warn(`⚠️ Could not delete user post ${post.id}:`, error);
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not fetch posts for user ${userId}:`, error);
  }
}

/**
 * Clean up forums for a specific user
 */
async function cleanupUserForums(userId: string) {
  try {
    const forumsResponse = await teardownClient.get(`/forums?user_id=${userId}`);
    const forums = forumsResponse.data;
    
    for (const forum of forums) {
      try {
        // Clean up forum comments first
        await cleanupForumComments(forum.id);
        
        // Then delete the forum
        await teardownClient.delete(`/forums/${forum.id}`);
        console.log(`✅ Deleted user forum: ${forum.id}`);
      } catch (error) {
        console.warn(`⚠️ Could not delete user forum ${forum.id}:`, error);
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not fetch forums for user ${userId}:`, error);
  }
}

/**
 * Clean up all users
 */
async function cleanupUsers() {
  console.log('🧹 Cleaning up users...');
  
  for (const userId of testDataTracker.users) {
    try {
      await teardownClient.delete(`/users/${userId}`);
      console.log(`✅ Deleted user: ${userId}`);
    } catch (error) {
      console.warn(`⚠️ Could not delete user ${userId}:`, error);
    }
  }
  
  testDataTracker.users = [];
}

/**
 * Nuclear option: Delete all data (use with caution!)
 */
export async function deleteAllData() {
  console.log('☢️ Nuclear cleanup: Deleting ALL data...');
  
  try {
    // Try to delete all posts (may require auth)
    try {
      await teardownClient.delete('/posts/all');
      console.log('✅ Deleted all posts');
    } catch (error) {
      const axiosError = error as { response?: { status: number }; message?: string };
      if (axiosError.response?.status === 403) {
        console.log('ℹ️ Posts deletion requires authentication - skipping');
      } else {
        console.warn('⚠️ Could not delete all posts:', axiosError.message || 'Unknown error');
      }
    }
    
    // Try to get and delete forums (may require auth)
    try {
      const forumsResponse = await teardownClient.get('/forums');
      const forums = forumsResponse.data;
      
      for (const forum of forums) {
        try {
          await teardownClient.delete(`/forums/${forum.id}`);
        } catch (error) {
          console.warn(`⚠️ Could not delete forum ${forum.id}:`, error);
        }
      }
      console.log('✅ Deleted all forums');
    } catch (error) {
      const axiosError = error as { response?: { status: number }; message?: string };
      if (axiosError.response?.status === 403) {
        console.log('ℹ️ Forums deletion requires authentication - skipping');
      } else {
        console.warn('⚠️ Could not access forums:', axiosError.message || 'Unknown error');
      }
    }
    
    // Try to get and delete comments (may require auth)
    try {
      const commentsResponse = await teardownClient.get('/comments');
      const comments = commentsResponse.data;
      
      for (const comment of comments) {
        try {
          await teardownClient.delete(`/comments/${comment.id}`);
        } catch (error) {
          console.warn(`⚠️ Could not delete comment ${comment.id}:`, error);
        }
      }
      console.log('✅ Deleted all comments');
    } catch (error) {
      const axiosError = error as { response?: { status: number }; message?: string };
      if (axiosError.response?.status === 403) {
        console.log('ℹ️ Comments deletion requires authentication - skipping');
      } else {
        console.warn('⚠️ Could not access comments:', axiosError.message || 'Unknown error');
      }
    }
    
    // Try to get and delete users (may require auth)
    try {
      const usersResponse = await teardownClient.get('/users');
      const users = usersResponse.data;
      
      for (const user of users) {
        // Skip admin/system users
        if (user.username === 'admin' || user.username === 'system') {
          continue;
        }
        
        try {
          await teardownClient.delete(`/users/${user.id}`);
        } catch (error) {
          console.warn(`⚠️ Could not delete user ${user.username}:`, error);
        }
      }
      console.log('✅ Deleted all test users');
    } catch (error) {
      const axiosError = error as { response?: { status: number }; message?: string };
      if (axiosError.response?.status === 403) {
        console.log('ℹ️ Users deletion requires authentication - skipping');
      } else {
        console.warn('⚠️ Could not access users:', axiosError.message || 'Unknown error');
      }
    }
    
  } catch (error) {
    console.error('❌ Error during nuclear cleanup:', error);
    // Don't throw error to avoid failing the build
    console.log('ℹ️ Nuclear cleanup completed with warnings');
  }
}

export async function deleteTestUser(username: string) {
  await cleanupUserData(username);
}

export async function deleteTestPosts(username: string) {
  await cleanupUserData(username);
}

export async function deleteTestForums(username: string) {
  await cleanupUserData(username);
}

export { testDataTracker }; 
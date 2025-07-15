import { trackTestData, cleanupAllTestData } from './teardown';

/**
 * Test data tracker for individual test files
 * This helps track what data was created during a specific test
 */
export class TestDataTracker {
  private trackedData: {
    users: string[];
    posts: string[];
    forums: string[];
    comments: string[];
  } = {
    users: [],
    posts: [],
    forums: [],
    comments: [],
  };

  /**
   * Track a user creation
   */
  trackUser(userId: string) {
    this.trackedData.users.push(userId);
    trackTestData('users', userId);
  }

  /**
   * Track a post creation
   */
  trackPost(postId: string) {
    this.trackedData.posts.push(postId);
    trackTestData('posts', postId);
  }

  /**
   * Track a forum creation
   */
  trackForum(forumId: string) {
    this.trackedData.forums.push(forumId);
    trackTestData('forums', forumId);
  }

  /**
   * Track a comment creation
   */
  trackComment(commentId: string) {
    this.trackedData.comments.push(commentId);
    trackTestData('comments', commentId);
  }

  /**
   * Clean up all tracked data for this test
   */
  async cleanup() {
    console.log('🧹 Cleaning up test data...');
    
    // Clean up in reverse order to handle dependencies
    for (const commentId of this.trackedData.comments) {
      try {
        await this.deleteComment(commentId);
      } catch (error) {
        console.warn(`⚠️ Could not delete comment ${commentId}:`, error);
      }
    }

    for (const forumId of this.trackedData.forums) {
      try {
        await this.deleteForum(forumId);
      } catch (error) {
        console.warn(`⚠️ Could not delete forum ${forumId}:`, error);
      }
    }

    for (const postId of this.trackedData.posts) {
      try {
        await this.deletePost(postId);
      } catch (error) {
        console.warn(`⚠️ Could not delete post ${postId}:`, error);
      }
    }

    for (const userId of this.trackedData.users) {
      try {
        await this.deleteUser(userId);
      } catch (error) {
        console.warn(`⚠️ Could not delete user ${userId}:`, error);
      }
    }

    // Clear tracked data
    this.trackedData = {
      users: [],
      posts: [],
      forums: [],
      comments: [],
    };
  }

  /**
   * Delete a comment
   */
  private async deleteComment(commentId: string) {
    const response = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:8000'}/comments/${commentId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log(`✅ Deleted comment: ${commentId}`);
    } else {
      throw new Error(`Failed to delete comment ${commentId}: ${response.status}`);
    }
  }

  /**
   * Delete a forum
   */
  private async deleteForum(forumId: string) {
    const response = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:8000'}/forums/${forumId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log(`✅ Deleted forum: ${forumId}`);
    } else {
      throw new Error(`Failed to delete forum ${forumId}: ${response.status}`);
    }
  }

  /**
   * Delete a post
   */
  private async deletePost(postId: string) {
    const response = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:8000'}/posts/${postId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log(`✅ Deleted post: ${postId}`);
    } else {
      throw new Error(`Failed to delete post ${postId}: ${response.status}`);
    }
  }

  /**
   * Delete a user
   */
  private async deleteUser(userId: string) {
    const response = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:8000'}/users/${userId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log(`✅ Deleted user: ${userId}`);
    } else {
      throw new Error(`Failed to delete user ${userId}: ${response.status}`);
    }
  }
}

/**
 * Create a test data tracker instance
 */
export function createTestDataTracker() {
  return new TestDataTracker();
}

/**
 * Global cleanup function for use in test afterEach hooks
 */
export async function globalCleanup() {
  await cleanupAllTestData();
} 
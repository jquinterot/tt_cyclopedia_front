import { create } from 'zustand';
import { Post } from '../types/Post';
import axios from 'axios';

interface PostState {
  post: Post | null;
  error: string | null;
  getPostById: (postId: string) => Promise<void>;
}

export const usePostState = create<PostState>((set) => ({
  post: null, // Explicit initial value
  error: null, // Explicit initial value
  getPostById: async (postId: string) => {
    try {
      const response = await axios.get<Post>(`http://localhost:8000/posts/${postId}`);
      set({
        post: response.data,
        error: null,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching post:', error.response?.data || error.message);
        set({
          error: error.response?.data?.message || error.message,
          post: null,
        });
      } else {
        console.error('Unknown error:', error);
        set({
          error: 'Unknown error fetching post',
          post: null,
        });
      }
    }
  },
}));

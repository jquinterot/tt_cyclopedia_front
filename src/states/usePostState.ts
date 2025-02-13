import { create } from 'zustand';
import { Post } from '../types/Post';
import { PostState } from '../types/PostState';
import axios from 'axios';

export const usePostState = create<PostState>((set) => ({
  post: null,
  error: null, 
  getPostById: async (postId: string) => {
    try {
      const response = await axios.get<Post>(`https://ttcyclopediaback-production.up.railway.app/posts/${postId}`);
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

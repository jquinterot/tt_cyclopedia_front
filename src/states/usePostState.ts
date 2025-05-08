import { create } from 'zustand';
import { Post } from '../types/Post';
import { PostState } from '../types/PostState';
import axios from 'axios';
import { apiClient } from "../config/apiClient";

export const usePostStat= create<PostState>((set) => ({
  post: null,
  error: null, 
  getPostById: async (postId: string) => {
    try {
      const response = await apiClient.get<Post>(`/posts/${postId}`);
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

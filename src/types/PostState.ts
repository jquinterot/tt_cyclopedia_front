import { Post } from '../types/Post';
export type PostState = {
  post: Post | null;
  error: string | null;
  getPostById: (postId: string) => Promise<void>;
}
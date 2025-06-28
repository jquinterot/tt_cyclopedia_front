// Forum model (matches backend Forums SQLAlchemy model)
export interface Forum {
  id: string;
  title: string;
  content: string;
  likes: number;
  author: string;
  timestamp: string; // ISO string (datetime)
  updated_timestamp: string; // ISO string (datetime)
  liked_by_current_user?: boolean; // Whether the current user has liked this forum
}

// For creating a new forum (request body)
export interface ForumCreate {
  title: string;
  content: string;
}

// For updating a forum (request body)
export interface ForumUpdate {
  title?: string;
  content?: string;
}

// Forum response (matches Forum, but can be extended if needed)
export type ForumResponse = Forum; 
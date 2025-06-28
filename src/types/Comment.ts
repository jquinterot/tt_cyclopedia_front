export type Comment = {
    id: string;
    comment: string;
    user_id: string;
    username: string;
    parent_id: string | null;
    liked_by_current_user: boolean;
    likes: number;
    timestamp: string;
    post_id?: string;
    forum_id?: string;
    replies?: Comment[];
    created_at?: string;
};
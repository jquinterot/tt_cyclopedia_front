export type Comment = {
    id: string;
    comment: string;
    user_id: string;
    post_id: string;
    parent_id?: string | null;
    replies?: Comment[];
    created_at?: string;
    likes?: number;
    username: string;
    timestamp: string;
    liked_by_current_user?: boolean;
}
export type Post = {
    id: string;
    title: string;
    content: string;
    image_url: string;
    likes: number;
    likedByCurrentUser: boolean;
    timestamp?: string;
    author?: string;
    stats?: Record<string, number>;
}

// For form state (string values)
export type StatsState = Record<string, string>;
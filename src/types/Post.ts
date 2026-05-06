export type Location = {
    address: string;
    city: string;
    country: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
};

export type EquipmentSummary = {
    id: string;
    name: string;
    brand: string;
    category: string;
};

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
    location?: Location;
    activityDate?: string;
    activityType?: 'tournament' | 'training' | 'match' | 'social';
    equipment_id?: string;
    equipment?: EquipmentSummary;
};

// For form state (string values)
export type StatsState = Record<string, string>;
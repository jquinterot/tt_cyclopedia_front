import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import { apiClient } from "../config/apiClient";
import axios from 'axios';

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<Post[]>('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []);

    const postPosts = async (title: string, content: string, img: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.post<Post>('/posts', { title, content, img });
            const newPost = response.data;
            setPosts(prevPosts => [...prevPosts, newPost]);
        } catch (error) {
            setError('Error creating post');
            console.error('Error creating post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPostById = async (postId: string) => {
        try {
            const response = await apiClient.get<Post>(`/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching post:', error.response?.data || error.message);
            } else {
                console.error('Unknown error:', error);
            }
        }
    };

    return { posts, postPosts, isLoading, error, post, getPostById };
};
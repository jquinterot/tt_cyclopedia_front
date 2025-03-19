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
        const abortController = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get<Post[]>('/posts', {
                    signal: abortController.signal
                });
                setPosts(response.data);
                setError(null);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    const message = axios.isAxiosError(error)
                        ? error.response?.data?.message || error.message
                        : 'Failed to fetch posts';
                    setError(message);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
        return () => abortController.abort();
    }, []);

    const postPosts = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.post<Post>('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPosts(prev => [response.data, ...prev]);
            return response.data;
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : 'Failed to create post';
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const getPostById = async (postId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.get<Post>(`/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : 'Failed to fetch post';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { posts, postPosts, isLoading, error, post, getPostById };
};
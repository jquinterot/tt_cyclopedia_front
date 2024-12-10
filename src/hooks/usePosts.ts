import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import axios from 'axios';

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const[post,setPost] = useState<Post  | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
   
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<Post[]>('http://localhost:8000/posts');
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchData();
    }, []);
  

    const postPosts = async (title: string, content:string, img:string) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.post<Post>('http://localhost:8000/posts', { title: title, content: content, img: img });
        const newPost = response.data;
        setPosts(prevPosts => [...prevPosts, newPost]);
      } catch (error) {
        setError('Error posting comment');
        console.error('Error posting comment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const getPostById = async (postId: string) => {
      try {
        const response = await axios.get<Post>(`http://localhost:8000/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching post:', error.response?.data || error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    };
    
 

  return { posts, postPosts,  isLoading, error, post, getPostById };
};
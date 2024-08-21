import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import axios from 'axios';

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
   
  
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
  

   

 

  return { posts };
};
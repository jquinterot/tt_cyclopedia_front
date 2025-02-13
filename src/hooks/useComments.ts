import { useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import axios from 'axios';

export const useComments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<Comment[]>('https://ttcyclopediaback-production.up.railway.app/comments');
          setComments(response.data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchData();
    }, []);
  

    const postComments = async (comment: string) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.post<Comment>('https://ttcyclopediaback-production.up.railway.app/comments', { comment: comment });
        const newComment = response.data;
        setComments(prevComments => [...prevComments, newComment]);
      } catch (error) {
        setError('Error posting comment');
        console.error('Error posting comment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const deleteComment = async (commentId:string) => {
      try {
        await axios.delete(`https://ttcyclopediaback-production.up.railway.app/comments/${commentId}`);
        const updatedComments = comments.filter((commentToRemove) => commentToRemove.id !== commentId);
        setComments(updatedComments);
   
      } catch (error) {
        setError('Error deleting comment');
        console.error('Error deleting comment:', error);
      }

    }

  return { isLoading, error, postComments, deleteComment, comments };
};
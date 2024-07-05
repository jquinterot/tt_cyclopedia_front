import { useEffect, useState } from "react";
import { Comment } from "../types/Comment";

export const useComments = () => {
    const [comments, setComments] = useState<Comment[]>([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/comments");
                const jsonData = await response.json();
                console.log(jsonData);
                setComments(jsonData);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        
        fetchData();
    }, []);
    
    // This log will show the updated comment state after it's fetched
    console.log(comments + 'finished');
    
    return { comments };
};
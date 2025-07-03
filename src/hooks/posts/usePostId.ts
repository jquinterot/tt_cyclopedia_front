import { useState } from 'react';

export const usePostId = () => {
    const [postId, setPostId] = useState('');
    
    const updatePostId = (paramId:string) => {
        setPostId(paramId)
    }

  return { postId, updatePostId };
}; 
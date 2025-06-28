import { useState } from 'react';

export const useForumId = () => {
    const [forumId, setForumId] = useState('');
    
    const updateForumId = (paramId:string) => {
        setForumId(paramId)
    }

  return { forumId, updateForumId };
}; 
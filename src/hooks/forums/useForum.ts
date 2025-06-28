import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import type { ForumResponse } from '@/types/Forum';

export function useForum(forumId: string) {
  return useQuery<ForumResponse>({
    queryKey: ['forums', forumId],
    queryFn: async () => {
      const res = await apiClient.get<ForumResponse>(`/forums/${forumId}`);
      return res.data;
    },
    enabled: !!forumId,
  });
} 
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import type { ForumResponse } from '@/types/Forum';

export function useForums() {
  return useQuery<ForumResponse[]>({
    queryKey: ['forums'],
    queryFn: async () => {
      const res = await apiClient.get<ForumResponse[]>('/forums');
      return res.data;
    },
  });
} 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import type { ForumCreate, ForumResponse } from '@/types/Forum';

export function useCreateForum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ForumCreate) => {
      const res = await apiClient.post<ForumResponse>('/forums', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] });
    },
  });
} 
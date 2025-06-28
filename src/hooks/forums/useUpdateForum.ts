import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import type { ForumUpdate, ForumResponse } from '@/types/Forum';

export function useUpdateForum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ forumId, data }: { forumId: string; data: ForumUpdate }) => {
      const res = await apiClient.put<ForumResponse>(`/forums/${forumId}`, data);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['forums'] });
      queryClient.invalidateQueries({ queryKey: ['forums', variables.forumId] });
    },
  });
} 
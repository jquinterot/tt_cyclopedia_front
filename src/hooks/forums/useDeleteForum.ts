import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';

export function useDeleteForum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (forumId: string) => {
      await apiClient.delete(`/forums/${forumId}`);
      return forumId;
    },
    onSuccess: (forumId) => {
      queryClient.invalidateQueries({ queryKey: ['forums'] });
      queryClient.removeQueries({ queryKey: ['forums', forumId] });
    },
  });
} 
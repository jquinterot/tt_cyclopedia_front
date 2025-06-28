import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';

export function useLikeForum(forumId: string) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post(`/forums/${forumId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] });
      queryClient.invalidateQueries({ queryKey: ['forums', forumId] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/forums/${forumId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] });
      queryClient.invalidateQueries({ queryKey: ['forums', forumId] });
    },
  });

  return { likeMutation, unlikeMutation };
} 
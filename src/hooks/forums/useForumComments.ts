import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/config/apiClient";
import type { Comment } from "@/types/Comment";
import type { AxiosError } from "axios";

export function useForumCommentCount(forumId: string) {
  return useQuery<Comment[]>({
    queryKey: ["forumComments", forumId],
    queryFn: async () => {
      const res = await apiClient.get<Comment[]>(
        `/comments/forum/${forumId}/main`,
      );
      return res.data.filter((comment) => !comment.parent_id);
    },
    enabled: !!forumId,
  });
}

export const useForumComments = (forumId: string) => {
  const fetchMainComments = async () => {
    try {
      const response = await apiClient.get<Comment[]>(
        `/comments/forum/${forumId}/main`,
      );
      const transformedData = response.data.map((comment) => ({
        ...comment,
        liked_by_current_user: Boolean(comment.liked_by_current_user),
      }));
      return transformedData.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        return [];
      }
      throw error;
    }
  };

  const {
    data: mainComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forumComments", forumId],
    queryFn: fetchMainComments,
    enabled: !!forumId,
    refetchOnMount: false,
  });

  return { mainComments: mainComments ?? [], isLoading, error };
};

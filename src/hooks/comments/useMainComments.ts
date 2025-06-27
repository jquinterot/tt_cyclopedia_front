import { Comment } from "@/types/Comment";
import { apiClient } from "@/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useMainComments = (postId: string) => {
  const fetchComments = async (postId: string) => {
    const response = await apiClient.get<Comment[]>(`/comments/post/${postId}/main`);
    // Sort by timestamp descending
    return response.data.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const {
    data: mainComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mainComments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
    refetchOnMount: false,
  });

  return { mainComments, isLoading, error };
};
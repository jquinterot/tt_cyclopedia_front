import { Comment } from "@/types/Comment";
import { apiClient } from "@/config/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export const useMainComments = (postId: string) => {
  const { isAuthenticated } = useAuth();

  const fetchComments = async (postId: string) => {
    const response = await apiClient.get<Comment[]>(
      `/comments/post/${postId}/main`,
    );
    // Transform the data to ensure liked_by_current_user is always a boolean
    const transformedData = response.data.map((comment) => ({
      ...comment,
      liked_by_current_user: Boolean(comment.liked_by_current_user),
    }));
    // Sort by timestamp descending
    return transformedData.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  };

  const {
    data: mainComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mainComments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId && isAuthenticated !== undefined, // Wait for auth context to be ready
    refetchOnMount: false,
  });

  return { mainComments: mainComments ?? [], isLoading, error };
};

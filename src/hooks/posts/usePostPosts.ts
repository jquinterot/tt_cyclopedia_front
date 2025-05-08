
import { Post } from "../../types/Post";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { apiClient } from "../../config/apiClient";

    export const usePostPost = () => {
        const queryClient = useQueryClient();
      
        return useMutation({
          mutationFn: ({ formData }: { formData:FormData }) =>
            apiClient.post<Post>('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
          onSettled: () => {
            queryClient.invalidateQueries({ 
              queryKey: ['posts']
            });
          },
        });
      };
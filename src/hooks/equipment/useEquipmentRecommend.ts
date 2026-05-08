import { apiClient } from "@/config/apiClient";
import { SetupRecommendation } from "@/types/Equipment";
import { useMutation } from "@tanstack/react-query";

export type RecommendRequest = {
  playing_style:
    | "beginner"
    | "intermediate"
    | "advanced"
    | "attacker"
    | "defender"
    | "all_rounder";
  budget_usd?: number;
  preferred_brands?: string[];
  hand?: "right" | "left";
  grip?: "shakehand" | "penhold";
};

export const useEquipmentRecommend = () => {
  return useMutation<SetupRecommendation, Error, RecommendRequest>({
    mutationFn: async (request) => {
      const response = await apiClient.post<SetupRecommendation>(
        "/equipment/recommend-setup",
        request,
      );
      return response.data;
    },
  });
};

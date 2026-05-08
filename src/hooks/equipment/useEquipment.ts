import { apiClient } from "@/config/apiClient";
import { Equipment } from "@/types/Equipment";
import { useQuery } from "@tanstack/react-query";

export const useEquipment = (
  category?: string,
  brand?: string,
  search?: string,
) => {
  const fetchEquipment = async () => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (brand) params.append("brand", brand);
    if (search) params.append("search", search);

    const queryString = params.toString();
    const url = queryString ? `/equipment?${queryString}` : "/equipment";

    const response = await apiClient.get<Equipment[]>(url);
    return response.data;
  };

  const {
    data: equipment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["equipment", category, brand, search],
    queryFn: fetchEquipment,
    staleTime: 1000 * 60 * 5,
  });

  return { equipment, isLoading, error };
};

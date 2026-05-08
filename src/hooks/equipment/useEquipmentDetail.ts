import { apiClient } from "@/config/apiClient";
import { EquipmentDetail } from "@/types/Equipment";
import { useQuery } from "@tanstack/react-query";

export const useEquipmentDetail = (equipmentId: string) => {
  const fetchEquipment = async () => {
    const response = await apiClient.get<EquipmentDetail>(
      `/equipment/${equipmentId}`,
    );
    return response.data;
  };

  const {
    data: equipment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["equipment", equipmentId],
    queryFn: fetchEquipment,
    enabled: !!equipmentId,
    staleTime: 1000 * 60 * 5,
  });

  return { equipment, isLoading, error };
};

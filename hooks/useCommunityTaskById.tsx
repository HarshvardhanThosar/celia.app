import { useQuery } from "@tanstack/react-query";
import apis from "@/apis";
import Toast, { ToastType } from "@/utils/toasts";

const useCommunityTaskById = (id?: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      try {
        const response = await apis.fetch_task_by_id({ id: id! });
        Toast.show("Task fetched successfully", ToastType.SUCCESS);
        return response.data;
      } catch (error: any) {
        Toast.show(
          error?.response?.data?.message || "Failed to fetch task",
          ToastType.ERROR
        );
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};

export default useCommunityTaskById;

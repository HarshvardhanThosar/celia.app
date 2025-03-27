import { useQuery } from "@tanstack/react-query";
import apis from "@/apis";
import { PaginationQueryParamsType } from "@/types/apis";
import Toast, { ToastType } from "@/utils/toasts";

const useCommunityTask = ({ limit, skip }: PaginationQueryParamsType) => {
  return useQuery({
    queryKey: ["tasks", limit, skip],
    queryFn: async () => {
      try {
        const response = await apis.fetch_community_tasks({ limit, skip });
        // Toast.show("Tasks loaded", ToastType.SUCCESS);
        return response.data;
      } catch (error: any) {
        Toast.show(
          error?.response?.data?.message || "Failed to fetch tasks",
          ToastType.ERROR
        );
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};

export default useCommunityTask;

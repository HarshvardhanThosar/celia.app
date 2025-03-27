import { useQuery } from "@tanstack/react-query";
import apis from "@/apis";
import Toast, { ToastType } from "@/utils/toasts";

export const useHoursOptions = () => {
  return useQuery({
    queryKey: ["hours-options"],
    queryFn: async () => {
      try {
        const res = await apis.fetch_hour_options();
        Toast.show("Fetched hours options", ToastType.SUCCESS);
        return res.data.data;
      } catch (err: any) {
        Toast.show(
          err?.response?.data?.message || "Failed to fetch hours options",
          ToastType.ERROR
        );
        throw err;
      }
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useVolunteersCountOptions = () => {
  return useQuery({
    queryKey: ["volunteers-count-options"],
    queryFn: async () => {
      try {
        const res = await apis.fetch_volunteers_count();
        Toast.show("Fetched volunteer options", ToastType.SUCCESS);
        return res.data.data;
      } catch (err: any) {
        Toast.show(
          err?.response?.data?.message || "Failed to fetch volunteer options",
          ToastType.ERROR
        );
        throw err;
      }
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useTaskTypesOptions = () => {
  return useQuery({
    queryKey: ["task-types-options"],
    queryFn: async () => {
      try {
        const res = await apis.fetch_task_types();
        Toast.show("Fetched task categories", ToastType.SUCCESS);
        return res.data.data;
      } catch (err: any) {
        Toast.show(
          err?.response?.data?.message || "Failed to fetch task types",
          ToastType.ERROR
        );
        throw err;
      }
    },
    staleTime: 1000 * 60 * 10,
  });
};

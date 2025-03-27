import { useQuery } from "@tanstack/react-query";
import apis from "@/apis";
import Toast, { ToastType } from "@/utils/toasts";

export const useFetchCoupons = ({ skip = 0, limit = 10 }) => {
  return useQuery({
    queryKey: ["coupons", skip, limit],
    queryFn: async () => {
      try {
        const res = await apis.fetch_coupons({ skip, limit });
        // Toast.show(
        //   res.data.message || "Coupons fetched successfully!",
        //   ToastType.SUCCESS
        // );
        return res.data.data;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch coupons";
        Toast.show(message, ToastType.ERROR);
        throw new Error(message);
      }
    },
  });
};

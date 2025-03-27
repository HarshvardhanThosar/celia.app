import { useQuery } from "@tanstack/react-query";
import apis from "@/apis";
import Toast, { ToastType } from "@/utils/toasts";

export const useFetchCouponById = (id: string) => {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: async () => {
      try {
        const res = await apis.fetch_coupon_by_id({ id });
        Toast.show(
          res.data.message || "Coupon fetched successfully!",
          ToastType.SUCCESS
        );
        return res.data.data;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch coupon";
        Toast.show(message, ToastType.ERROR);
        throw new Error(message);
      }
    },
    enabled: !!id,
  });
};

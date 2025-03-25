// hooks/useCommunityTaskById.tsx

import { useQuery } from "@tanstack/react-query";
import apis from "@/apis";

export const useCommunityTaskById = (id?: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => apis.fetch_task_by_id({ id: id! }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

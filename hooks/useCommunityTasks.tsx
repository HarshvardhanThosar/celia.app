// hooks/useCommunityTaskById.tsx

import { useQuery } from "@tanstack/react-query";
import apis from "@/apis";
import { PaginationQueryParamsType } from "@/types/apis";

const useCommunityTask = ({ limit, skip }: PaginationQueryParamsType) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => apis.fetch_community_tasks({ limit, skip }),
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

export default useCommunityTask;

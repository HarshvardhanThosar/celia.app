import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import apis from "@/apis";
import { AuthProfileType } from "@/types/apis";

type QueryKeyType = ["profile"];

const useProfile = (
  options?: Omit<
    UseQueryOptions<AuthProfileType, Error, AuthProfileType, QueryKeyType>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<AuthProfileType, Error> => {
  return useQuery<AuthProfileType, Error, AuthProfileType, QueryKeyType>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await apis.fetch_logged_in_user_profile();
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    ...options, // Allows onSuccess, onError, enabled, retry, etc.
  });
};

export default useProfile;

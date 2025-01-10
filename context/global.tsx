import {
  QueryFunction,
  QueryKey,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

declare const skipToken: unique symbol;
type SkipToken = typeof skipToken;

function createGlobalState<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  initialData: TData | null = null,
  queryFn?: QueryFunction<TQueryFnData, TQueryKey> | SkipToken
) {
  return function () {
    const client = useQueryClient();

    const query = useQuery<TQueryFnData, TError, TData, TQueryKey>({
      queryKey,
      queryFn:
        queryFn && queryFn !== skipToken
          ? queryFn
          : () => Promise.resolve(initialData as TQueryFnData),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    });

    function set(data: Partial<TData>) {
      client.setQueryData<TData>(queryKey as TQueryKey, (oldData) => {
        return {
          ...oldData,
          ...data,
        } as TData;
      });
    }

    function reset() {
      client.invalidateQueries({ queryKey });
      client.refetchQueries({ queryKey });
    }

    return { ...query, set, reset, client };
  };
}

export default createGlobalState;

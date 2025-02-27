import { PaginationQueryParamsType } from "@/types/apis";
import {
  instance,
  authenticate_instance,
  unauthenticate_instance,
} from "./instance";

const apis = {
  /**
   * Fetch community tasks
   * @param query_params
   * @param query_params.skip number - default 0
   * @param query_params.limit number - default 10
   */
  fetch_community_tasks: async ({
    skip = 0,
    limit = 10,
  }: PaginationQueryParamsType) => {},

  /**
   * Fetch coupons
   * @param query_params
   * @param query_params.skip number - default 0
   * @param query_params.limit number - default 10
   */
  fetch_coupons: async ({
    skip = 0,
    limit = 10,
  }: PaginationQueryParamsType) => {},

  /**
   * Fetch coupons
   * @param query_params
   * @param query_params.skip number - default 0
   * @param query_params.limit number - default 10
   */
  redeem_coupon: async ({ id: string }: { id: string }) => {},
};

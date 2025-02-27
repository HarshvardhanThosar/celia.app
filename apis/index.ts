import { PaginationQueryParamsType } from "@/types/apis";
import {
  instance,
  authenticate_instance,
  unauthenticate_instance,
} from "./instance";
import axios from "axios";

const apis = {
  login_using_username_and_password: async ({
    password,
    username,
  }: {
    username: string;
    password: string;
  }) => {
    const _form = new FormData();
    _form.append("username", username);
    _form.append("password", password);

    return instance.post(
      "/community/auth/login",
      // {
      //   username,
      //   password,
      //   grant_type: "password",
      //   client_id: "",
      //   client_secret: "",
      // },
      _form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },

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

export default apis;

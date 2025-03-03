import type {
  FetchLoggedInUserProfileResponseType,
  LoginWithUsernameAndPasswordResponseType,
  PaginationQueryParamsType,
  RefreshTokenResponseType,
} from "@/types/apis";
import { instance } from "./instance";

const apis = {
  /**
   * Login using username and password
   * @param data.username string
   * @param data.password string
   * @returns
   */
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

    return instance.post<LoginWithUsernameAndPasswordResponseType>(
      "/community/auth/login",
      _form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },

  /**
   * Refresh active session
   * @returns
   */
  refresh_token: async () => {
    return instance.post<RefreshTokenResponseType>("/community/auth/refresh");
  },

  /**
   * Logout active session
   * @returns
   */
  logout: async () => {
    return instance.post("/community/auth/logout");
  },

  fetch_logged_in_user_profile: async () => {
    return instance.get<FetchLoggedInUserProfileResponseType>(
      "/community/profile/"
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

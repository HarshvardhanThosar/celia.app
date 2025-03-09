import type {
  CreateTaskFormType,
  FetchLoggedInUserProfileResponseType,
  LoginWithUsernameAndPasswordResponseType,
  OptionsResponseBody,
  PaginationQueryParamsType,
  RefreshTokenResponseType,
} from "@/types/apis";
import { instance } from "./instance";
import storage, { STORAGE_KEYS } from "@/utils/storage";

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
    return instance.post<LoginWithUsernameAndPasswordResponseType>(
      "/auth/login",
      {
        username,
        password,
      }
    );
  },

  /**
   * Refresh active session
   * @returns
   */
  refresh_token: async (refresh_token: string) => {
    return instance.post<RefreshTokenResponseType>("/auth/refresh", {
      refresh_token,
    });
  },

  /**
   * Logout active session
   * @returns
   */
  logout: async () => {
    const refresh_token = await storage.get(STORAGE_KEYS.refresh);
    return instance.post("/auth/logout", { refresh_token });
  },

  fetch_logged_in_user_profile: async () => {
    return instance.get<FetchLoggedInUserProfileResponseType>(
      "/community/profile/"
    );
  },

  /**
   * Creates task
   * @param body
   * @returns
   */
  create_task: async (body: CreateTaskFormType) => {
    return instance.post("/community/tasks/", body);
  },

  fetch_task_types: async () => {
    return instance.get<OptionsResponseBody>("/community/tasks/task-types");
  },

  fetch_volunteers_count: async () => {
    return instance.get<OptionsResponseBody>(
      "/community/tasks/volunteer-count-options"
    );
  },

  fetch_hour_options: async () => {
    return instance.get<OptionsResponseBody>("/community/tasks/hours-options");
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

import type {
  CreateTaskFormType,
  CreateTaskResponseBodyType,
  FetchLoggedInUserProfileResponseBodyType,
  LoginWithUsernameAndPasswordRequestBodyType,
  LoginWithUsernameAndPasswordResponseBodyType,
  OptionsResponseBody,
  PaginationQueryParamsType,
  RefreshTokenResponseBodyType,
  RegisterNewUserRequestBodyType,
  RegisterNewUserResponseBodyType,
  RegisterPushTokenRequestBodyType,
} from "@/types/apis";
import { instance } from "./instance";
import storage, { STORAGE_KEYS } from "@/utils/storage";

const apis = {
  /**
   * Register a new user
   * @param param.email string
   * @param param.firstName string
   * @param param.lastName string
   * @param param.username string
   * @param param.password string
   * @param param.cpassword string
   * @returns
   */
  register_a_new_user: async ({
    email,
    firstName,
    lastName,
    password,
  }: RegisterNewUserRequestBodyType) => {
    return instance.post<RegisterNewUserResponseBodyType>(
      "/community/auth/register",
      {
        email,
        firstName,
        lastName,
        password,
        username: email,
      }
    );
  },

  /**
   * Login using username and password
   * @param data.username string
   * @param data.password string
   * @returns
   */
  login_using_username_and_password: async ({
    password,
    username,
  }: LoginWithUsernameAndPasswordRequestBodyType) => {
    return instance.post<LoginWithUsernameAndPasswordResponseBodyType>(
      "/community/auth/login",
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
    return instance.post<RefreshTokenResponseBodyType>(
      "/community/auth/refresh",
      {
        refresh_token,
      }
    );
  },

  /**
   * Logout active session
   * @returns
   */
  logout: async () => {
    const refresh_token = await storage.get(STORAGE_KEYS.refresh);
    return instance.post("/community/auth/logout", { refresh_token });
  },

  /**
   * Fetch logged in user's profile
   * @returns
   */
  fetch_logged_in_user_profile: async () => {
    return instance.get<FetchLoggedInUserProfileResponseBodyType>(
      "/community/profile/"
    );
  },

  /**
   * Register push token
   * @param param.push_token string
   * @returns
   */
  register_push_token: async ({
    push_token,
  }: RegisterPushTokenRequestBodyType) => {
    return await instance.post("/push-token/register", {
      push_token,
    });
  },

  /**
   * Creates task
   * @param body
   * @returns
   */
  create_task: async (body: CreateTaskFormType) => {
    return instance.post<CreateTaskResponseBodyType>("/community/tasks/", body);
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

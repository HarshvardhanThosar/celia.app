import type {
  CreateTaskFormType,
  CreateTaskResponseBodyType,
  FetchLoggedInUserProfileResponseBodyType,
  FetchTaskById,
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
    tnc_accepted,
  }: RegisterNewUserRequestBodyType) => {
    return instance.post<RegisterNewUserResponseBodyType>(
      "/community/auth/register",
      {
        email,
        firstName,
        lastName,
        password,
        username: email,
        tnc_accepted,
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

  /**
   * Request participation in a task
   * @param param.task_id string
   * @returns
   */
  request_participation: async ({ task_id }: { task_id: string }) => {
    return instance.post(`/community/tasks/${task_id}/request-participation`);
  },

  /**
   * Accept participation of another user for a task
   * @param param.participant_id string
   * @param param.task_id string
   * @returns
   */
  accept_participation: async ({
    participant_id,
    task_id,
  }: {
    task_id: string;
    participant_id: string;
  }) => {
    return instance.post(
      `/community/tasks/${task_id}/accept-participation/${participant_id}`
    );
  },

  /**
   * Mark a task as complete and rate the task
   * @param param.feedback_note string
   * @param param.rating number
   * @param param.task_id string
   * @returns
   */
  mark_task_as_complete_and_rate: async ({
    feedback_note,
    rating,
    task_id,
  }: {
    feedback_note?: string;
    rating?: number;
    task_id: string;
  }) => {
    return instance.patch(`/community/tasks/${task_id}/complete-and-rate`, {
      feedback_note,
      rating,
    });
  },

  /**
   * Mark attendance for a task
   * @param param.code string 4 digit code from the creator
   * @param param.task_id string
   * @returns
   */
  mark_attendance: async ({
    code,
    task_id,
  }: {
    task_id: string;
    code: string;
  }) => {
    return instance.post(`/community/tasks/${task_id}/mark-attendance`, {
      task_id,
      code,
    });
  },

  /**
   * Fetches a recommended list of tasks
   * @param param.limit optional number
   * @param param.skip optional number
   * @returns
   */
  fetch_recommended_tasks: async ({
    limit,
    skip,
  }: PaginationQueryParamsType) => {
    const params = new URLSearchParams();
    if (limit) {
      params.set("limit", limit.toString());
    }
    if (skip) {
      params.set("skip", skip.toString());
    }
    return instance.get(`/community/tasks/?${params.toString()}`);
  },

  /**
   * Fetch a particular task
   * @param param0
   * @returns
   */
  fetch_task_by_id: async ({ id }: { id: string }) => {
    return instance.get<FetchTaskById>(`/community/tasks/${id}`);
  },

  /**
   *
   * @returns
   */
  fetch_task_types: async () => {
    return instance.get<OptionsResponseBody>("/community/tasks/task-types");
  },

  /**
   *
   * @returns
   */
  fetch_volunteers_count: async () => {
    return instance.get<OptionsResponseBody>(
      "/community/tasks/volunteer-count-options"
    );
  },

  /**
   *
   * @returns
   */
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

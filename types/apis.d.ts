export type UserIdType = string;

export type PaginationQueryParamsType = { skip?: number; limit?: number };

export type LocationType = {
  latitude: number;
  longitude: number;
};

export type MediaType = string[];

export type CommunityTaskType = {
  _id: string;
  completes_at: string;
  created_at: string;
  description: string;
  feedback_note?: unknown;
  hours_required_per_day: number;
  is_remote: boolean;
  location: LocationType;
  media: string[];
  owner_details: { name: string; profile_image?: string };
  owner_id: string;
  participants: { name: string; profile_image?: string }[];
  priority: string;
  rating?: number;
  score_assignment_status: string;
  starts_at: string;
  status: string;
  updated_at: string;
  volunteers_required: number;
};

export type RegisterNewUserRequestBodyType = {
  // username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  tnc_accepted: boolean;
};

export type RegisterNewUserResponseBodyType = ResponseType<{
  id: UserIdType;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  enabled: true;
}>;

export type LoginWithUsernameAndPasswordRequestBodyType = {
  username: string;
  password: string;
};

export type LoginWithUsernameAndPasswordResponseBodyType = ResponseType<{
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  user: {
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    firstName: string;
    id: string;
    lastName: string;
    username: string;
  };
}>;

export type RegisterPushTokenRequestBodyType = { push_token: string };

export type RegisterPushTokenRequestBodyTypeResponseBodyType = ResponseType<{
  _id: string;
  created_at: string;
  push_token: string;
  user_id: UserIdType;
}>;

export type RefreshTokenRequestBodyType = {
  refresh_token: string;
};

export type LogoutRequestBodyType = {
  refresh_token: string;
};

export type ResponseType<D, M = undefined> = {
  data: D;
  message: string;
  status: number;
  metadata?: M;
};

export type FetchLoggedInUserProfileResponseBodyType =
  ResponseType<AuthProfileType>;

export type RefreshTokenResponseBodyType = ResponseType<{
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
}>;

export type AuthProfileType = {
  _id: string;
  coupons: [];
  created_at: string;
  email: string;
  email_verified: true;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  profile_image: null;
  score: int;
  tasks_created: [];
  tasks_participated: [];
  updated_at: string;
  wallet_id: null;
};

export type FormDataType<T> = {
  [K in keyof T]: T[K] extends File[]
    ? FileList | File[]
    : T[K] extends Date
    ? string
    : T[K];
};

export type OptionBody = {
  name: string;
  value: stirng;
};

export type OptionsResponseBody = {
  status: number;
  message: string;
  data: OptionBody[];
  metadata?: null;
};

export type CreateTaskFormType = {
  description: string;
  volunteers_required: number;
  hours_required_per_day: number;
  starts_at: Date | string | number;
  completes_at: Date | string | number;
  task_type: string;
  is_remote?: boolean;
};

export type CreateTaskRequestBodyType = FormDataType<CreateTaskFormType>;

export type CreateTaskResponseBodyType = ResponseType<{
  _id: string;
}>;

export type FetchTaskById = ResponseType<CommunityTaskType>;

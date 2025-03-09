type PaginationQueryParamsType = { skip: number; limit: number };

type LoginWithUsernameAndPasswordResponseType = {
  data: {
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
  };
  message: string;
  statusCode: number;
};

type RefreshTokenResponseType = LoginWithUsernameAndPasswordResponseType;

type AuthProfileType = {
  _id: string;
  coupons: string[];
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  profile_image: null;
  score: int;
  sub: string;
  tasks_created: string[];
  tasks_participated: string[];
};

type FormDataType<T> = {
  [K in keyof T]: T[K] extends File[]
    ? FileList | File[]
    : T[K] extends Date
    ? string
    : T[K];
};

type OptionBody = {
  name: string;
  value: stirng;
};

type OptionsResponseBody = {
  status: number;
  message: string;
  data: OptionBody[];
  metadata?: null;
};

type CreateTaskFormType = {
  description: string;
  volunteers_required: number;
  hours_required_per_day: number;
  starts_at: Date | string | number;
  completes_at: Date | string | number;
  task_type: string;
  is_remote?: boolean;
};

type CreateTaskRequestBodyType = FormDataType<CreateTaskFormType>;

type FetchLoggedInUserProfileResponseType = {
  data: AuthProfileType;
  message: string;
  metadata?: any;
  status: int;
};

export {
  AuthProfileType,
  PaginationQueryParamsType,
  LoginWithUsernameAndPasswordResponseType,
  CreateTaskFormType,
  CreateTaskRequestBodyType,
  OptionBody,
  OptionsResponseBody,
  RefreshTokenResponseType,
  FetchLoggedInUserProfileResponseType,
};

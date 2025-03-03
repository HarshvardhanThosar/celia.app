type PaginationQueryParamsType = { skip: number; limit: number };

type LoginWithUsernameAndPasswordResponseType = {
  data: {
    access_token: string;
    token_type: "bearer";
  };
  message: string;
  metadata?: any;
  status: int;
};

type RefreshTokenResponseType = LoginWithUsernameAndPasswordResponseType;

type AuthProfileType = {
  _id: string;
  coupons: string[];
  email: string;
  email_verified: true;
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
  RefreshTokenResponseType,
  FetchLoggedInUserProfileResponseType,
};

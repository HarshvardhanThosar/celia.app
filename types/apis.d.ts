export type UserIdType = string;

export type PaginationQueryParamsType = { skip?: number; limit?: number };

export type LocationType = {
  latitude: number;
  longitude: number;
};

export type MediaType = string[];

export type TaskStatus = "completed" | "invalid" | "active";

export type CommunityTaskType = {
  _id: string;
  owner_id: string;
  description: string;
  volunteers_required: number;
  hours_required_per_day: number;
  starts_at: string;
  completes_at: string;
  is_remote: boolean;
  location?: LocationType;
  score_breakdown: ScoreBreakdown[];
  daily_attendance_codes: DailyAttendanceCodes;
  attendance_log: AttendanceLog;
  score_assignment_status: string;
  status: TaskStatus;
  priority: string;
  participants: ParticipantType[];
  media?: string[];
  rating: any;
  feedback_note: any;
  created_at: string;
  updated_at: string;
  owner_details: OwnerDetails;
};

export interface ScoreBreakdown {
  label: string;
  key: string;
  score: number;
}

interface DailyAttendanceCodes {
  [x: string]: string;
}

interface AttendanceLog {}

export type ParticipantType = {
  _id: string;
  name: string;
  profile_image?: string | null;
  requested_at: number;
  status: "rejected" | "accepted" | "requested";
  updated_at: number;
  user_id: string;
};

export interface OwnerDetails {
  name: string;
  profile_image: any;
  _id: string;
}

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

export type ProfileSkill = {
  skill_id: string;
  skill_name: string;
  hours: number;
};

export type AuthProfileType = {
  _id: string;
  coupons: [];
  created_at: string;
  email: string;
  email_verified: true;
  streak?: number;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  profile_image: null;
  score: int;
  coins: int;
  tasks_created: [];
  tasks_participated: [];
  updated_at: string;
  wallet_id: null;
  skills: ProfileSkill[];
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
  location?: LocationType;
  priority: string;
};

export type CreateTaskRequestBodyType = FormDataType<CreateTaskFormType>;

export type CreateTaskResponseBodyType = ResponseType<{
  _id: string;
}>;

export type FetchTaskById = ResponseType<CommunityTaskType>;

export type FetchTasks = ResponseType<CommunityTaskType[]>;

export type RetailItem = {
  _id: string;
  name: string;
  points: number;
  category: string;
  thumbnail: string;
  quantity: number;
  expiry_date: string;
  sku_id: null;
  weight: number;
  retailer: {
    id: string;
    name: string;
    store: string;
  };
};

export type FetchRetailItemById = ResponseType<RetailItem>;

export type FetchRetailItems = ResponseType<RetailItem[]>;

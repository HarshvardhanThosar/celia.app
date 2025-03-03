import { AuthProfileType } from "./apis";

export type User = AuthProfileType;

export type AuthContextType = {
  user?: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export type InitialAuthContextType = undefined;

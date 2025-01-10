export type User = {
  role: string;
  name: string;
  email: string;
};

export type AuthContextType = {
  user?: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export type InitialAuthContextType = undefined;

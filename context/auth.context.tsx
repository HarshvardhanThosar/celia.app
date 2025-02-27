import React from "react";
import { User } from "@/types/auth";
import { useRouter, useSegments } from "expo-router";
import createGlobalState from "@/context/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client";

const useAuth = createGlobalState<User | undefined>(["auth"], undefined);

const Provider = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <AuthWrapper>{children}</AuthWrapper>
  </QueryClientProvider>
);

const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  const { data: user, set, reset } = useAuth();
  const route_segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    // set({});
    const is_accessing_authenticated_routes =
      route_segments[0] === "(authenticated-stack)";

    const is_accessing_unauthenticated_routes =
      route_segments[0] === "(unauthenticated-stack)";

    if (user == undefined && is_accessing_authenticated_routes) {
      router.replace("/");
    } else if (user && is_accessing_unauthenticated_routes) {
      router.replace("/(authenticated-stack)/(tabs)/home");
    }
  }, [user]);

  return <React.Fragment>{children}</React.Fragment>;
};

const Auth = { Provider, useAuth };

export default Auth;

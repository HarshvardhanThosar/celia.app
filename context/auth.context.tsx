import React from "react";
import { User } from "@/types/auth";
import { useRouter, useSegments } from "expo-router";
import createGlobalState from "@/context/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client";
import apis from "@/apis";
import {
  authenticate_instance,
  unauthenticate_instance,
} from "@/apis/instance";
import storage, { STORAGE_KEYS } from "@/utils/storage";

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

  React.useLayoutEffect(() => {
    (async () => {
      try {
        const _stored_access_token = await storage.get(STORAGE_KEYS.access);

        if (!_stored_access_token) {
          reset();
          unauthenticate_instance();
          return;
        }

        authenticate_instance(_stored_access_token);

        const _refresh_token_response = await apis.refresh_token();
        const _new_access_token =
          _refresh_token_response.data.data.access_token;

        await storage.set(STORAGE_KEYS.access, _new_access_token);

        authenticate_instance(_new_access_token);

        const _profile_response = await apis.fetch_logged_in_user_profile();
        set(_profile_response.data.data);
      } catch (error) {
        console.error(
          "Error fetching profile on load:",
          JSON.stringify(error, null, 2)
        );
        reset();
        unauthenticate_instance();
      }
    })();
  }, []);

  React.useEffect(() => {
    set({});
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

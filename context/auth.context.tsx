import React from "react";
import { AppState, AppStateStatus, StyleSheet } from "react-native";
import { User } from "@/types/auth";
import { useRouter, useSegments } from "expo-router";
import createGlobalState from "@/context/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client";
import apis from "@/apis";
import {
  authenticate_instance,
  instance,
  unauthenticate_instance,
} from "@/apis/instance";
import storage, { STORAGE_KEYS } from "@/utils/storage";

import loading_animation_source from "@/assets/animations/lottie.json";
import LottieView from "lottie-react-native";
import { YStack } from "tamagui";
import { GAP } from "@/constants/Dimensions";
import Toast, { ToastType } from "@/utils/toasts";
import mixpanel from "@/services/mixpanel";
import MixpanelEvents from "@/services/mixpanel-events";

const useAuth = createGlobalState<User | undefined>(["auth"], undefined);

const Provider = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <AuthWrapper>{children}</AuthWrapper>
  </QueryClientProvider>
);

const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  const { data: user, set, reset } = useAuth();
  const animation = React.useRef<LottieView>(null);
  const [show_loader, set_show_loader] = React.useState(true);
  const [is_ready, set_is_ready] = React.useState(false);
  const route_segments = useSegments();
  const router = useRouter();

  const logout = React.useCallback(async () => {
    console.log("Logging out user");
    await storage.reset(STORAGE_KEYS.access);
    await storage.reset(STORAGE_KEYS.refresh);
    reset();
    unauthenticate_instance();
  }, []);

  React.useLayoutEffect(() => {
    console.log(process.env?.EXPO_PUBLIC_API_URL);
    (async () => {
      const _stored_access_token = await storage
        .get<string>(STORAGE_KEYS.access)
        .catch(console.log);
      const _stored_refresh_token = await storage
        .get<string>(STORAGE_KEYS.refresh)
        .catch(console.log);

      if (!_stored_access_token || !_stored_refresh_token) {
        await logout();
      } else {
        try {
          authenticate_instance(_stored_access_token);
          const _refresh_token_response = await apis.refresh_token(
            _stored_refresh_token
          );
          const _refresh_token_response_data = _refresh_token_response.data;
          const _new_access_token =
            _refresh_token_response_data.data.access_token;
          const _new_refresh_token =
            _refresh_token_response_data.data.refresh_token;

          await storage.set(STORAGE_KEYS.access, _new_access_token);
          await storage.set(STORAGE_KEYS.refresh, _new_refresh_token);
          authenticate_instance(_new_access_token);

          try {
            const _profile_response = await apis.fetch_logged_in_user_profile();
            set(_profile_response.data.data);

            mixpanel.identify(_profile_response.data.data._id);
            mixpanel.getPeople().set("$name", _profile_response.data.data.name);
            mixpanel
              .getPeople()
              .set("$email", _profile_response.data.data.email);
            mixpanel.track(MixpanelEvents.user_session_start, {
              id: _profile_response.data.data._id,
            });
          } catch (error) {
            Toast.show("Error fetching your profile!", ToastType.ERROR);
            console.log(
              "Error fetching profile",
              JSON.stringify(error, null, 2)
            );
          }
        } catch (error) {
          await logout();
          Toast.show("Your previous session has ended!", ToastType.INFO);
          console.log(
            "Error refreshing tokens",
            JSON.stringify(error, null, 2)
          );
        }
      }
      set_show_loader(false);
      set_is_ready(true);

      instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            await logout(); // You can later inject pathname if needed
          }
          return Promise.reject(error);
        }
      );
    })();
  }, []);

  React.useEffect(() => {
    if (!is_ready) return;
    const handle_app_state_change = (nextAppState: AppStateStatus) => {
      switch (nextAppState) {
        case "active":
          mixpanel.track(MixpanelEvents.app_active, {
            id: user?._id,
          });
          break;
        case "background":
          mixpanel.track(MixpanelEvents.app_background, {
            id: user?._id,
          });
          break;
        case "inactive":
          mixpanel.track(MixpanelEvents.app_inactive, {
            id: user?._id,
          });
          break;
        case "extension":
          mixpanel.track(MixpanelEvents.app_extension, {
            id: user?._id,
          });
          break;
        case "unknown":
          mixpanel.track(MixpanelEvents.app_unknown, {
            id: user?._id,
          });
          break;
        default:
          break;
      }
    };
    const app_intercation_subscription = AppState.addEventListener(
      "change",
      handle_app_state_change
    );
    const is_accessing_authenticated_routes =
      route_segments[0] === "(authenticated-stack)";
    const is_accessing_unauthenticated_routes =
      route_segments[0] === "(unauthenticated-stack)";
    if (is_ready) {
      if (!user && is_accessing_authenticated_routes) {
        router.replace("/"); // Redirect to login
      } else if (user && is_accessing_unauthenticated_routes) {
        router.replace("/(authenticated-stack)/(tabs)/home"); // Redirect to home
      }
    }
    return () => {
      app_intercation_subscription.remove();
    };
  }, [user, is_ready, route_segments]);

  return (
    <React.Fragment>
      {show_loader ? (
        <YStack style={styles.screen} gap={GAP} px={GAP}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 150,
              height: 150,
            }}
            source={loading_animation_source}
          />
        </YStack>
      ) : (
        children
      )}
    </React.Fragment>
  );
};
const Auth = { Provider, useAuth };

export default Auth;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

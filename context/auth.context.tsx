import React from "react";
import { Platform, StyleSheet } from "react-native";
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
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import loading_animation_source from "@/assets/animations/lottie.json";
import LottieView from "lottie-react-native";
import { YStack } from "tamagui";
import { GAP } from "@/constants/Dimensions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

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
    await storage.reset(STORAGE_KEYS.access);
    await storage.reset(STORAGE_KEYS.refresh);
    reset();
    unauthenticate_instance();
  }, []);

  React.useLayoutEffect(() => {
    (async () => {
      try {
        const _stored_access_token = await storage.get(STORAGE_KEYS.access);
        const _stored_refresh_token = await storage.get(STORAGE_KEYS.refresh);

        if (!_stored_access_token || !_stored_refresh_token) {
          await logout();
          return;
        }

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
        } catch (error) {
          console.error(
            "Error fetching profile",
            JSON.stringify(error, null, 2)
          );
        }
      } catch (error) {
        await logout();
        console.log(
          "Error refreshing tokens fetching",
          JSON.stringify(error, null, 2)
        );
      }
      set_show_loader(false);
      set_is_ready(true);
    })();
  }, []);

  React.useEffect(() => {
    if (!is_ready) return;
    registerForPushNotificationsAsync()
      .then(async (push_token) => {
        if (!user) return;
        if (!push_token) return;
        await apis
          .register_push_token({ push_token })
          .catch((error) =>
            console.error(
              "Error registering push token",
              JSON.stringify(error, null, 2)
            )
          );
      })
      .catch(async (error) => {
        await logout();
        console.error(
          "Error requesting push token",
          JSON.stringify(error, null, 2)
        );
      });

    const is_accessing_authenticated_routes =
      route_segments[0] === "(authenticated-stack)";
    const is_accessing_unauthenticated_routes =
      route_segments[0] === "(unauthenticated-stack)";

    if (!user && is_accessing_authenticated_routes) {
      router.replace("/");
    } else if (user && is_accessing_unauthenticated_routes) {
      router.replace("/(authenticated-stack)/(tabs)/home");
    }
  }, [user, is_ready]);

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

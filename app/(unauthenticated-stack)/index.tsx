import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Link } from "expo-router";
import ScreenWrapper from "@/components/screen-wrapper";
import {
  Button,
  Form,
  H1,
  H5,
  Input,
  Label,
  Spinner,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Eye, EyeOff } from "@tamagui/lucide-icons"; // Lucide icons for eye toggle
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GAP } from "@/constants/Dimensions";
import apis from "@/apis";
import { authenticate_instance } from "@/apis/instance";
import Auth from "@/context/auth.context";
import storage, { STORAGE_KEYS } from "@/utils/storage";
import Toast, { ToastType } from "@/utils/toasts";
import mixpanel from "@/services/mixpanel";
import MixpanelEvents from "@/services/mixpanel-events";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handle_registration_error(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function triggerTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test Deep Link",
      body: "Tap to open screen!",
      data: {
        url: "celia://profile",
      },
    },
    trigger: null,
  });
}

async function register_for_push_notifications_async() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#A5B68D",
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
      handle_registration_error(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handle_registration_error("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handle_registration_error(`${e}`);
    }
  } else {
    handle_registration_error(
      "Must use physical device for push notifications"
    );
  }
}

const schema = yup
  .object({
    username: yup
      .string()
      .email("Invalid email format!")
      .required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter!")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter!")
      .matches(/[0-9]/, "Password must contain at least one number!")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character!"
      ),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const login = () => {
  const { set } = Auth.useAuth();
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const form = useForm({
    defaultValues: {
      username: "harshvardhanthosar@gmail.com",
      password: "P@ssw0rd",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const _toggle_password_visibility = () => {
    setSecureTextEntry((_current) => !_current);
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isLoading, isValidating, isDirty, isValid },
  } = form;

  const _is_disable_submit_button =
    isDirty || isSubmitting || isLoading || isValidating || !isValid;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { username, password } = data;
    try {
      const _response = await apis.login_using_username_and_password({
        username,
        password,
      });
      const _data = _response.data;
      const _access_token = _data.data.access_token;
      const _refresh_token = _data.data.refresh_token;
      await storage.set(STORAGE_KEYS.access, _access_token);
      await storage.set(STORAGE_KEYS.refresh, _refresh_token);
      authenticate_instance(_access_token);
      try {
        const _profile_response = await apis.fetch_logged_in_user_profile();
        const _profile_data = _profile_response.data.data;
        Toast.show(_data.message, ToastType.SUCCESS);
        set(_profile_data);

        mixpanel.identify(_profile_data._id);
        mixpanel.getPeople().set("$name", _profile_data.name);
        mixpanel.getPeople().set("$email", _profile_data.email);
        mixpanel.track(MixpanelEvents.user_login, {
          id: _profile_data._id,
        });

        register_for_push_notifications_async()
          .then(async (push_token) => {
            if (!push_token) return;
            await apis
              .register_push_token({ push_token })
              .catch((error) =>
                console.log(
                  "Error registering push token",
                  JSON.stringify(error, null, 2)
                )
              );
          })
          .catch(async (error) => {
            console.log(
              "Error requesting push token",
              JSON.stringify(error, null, 2)
            );
          });
      } catch (error: any) {
        const error_message =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!";
        Toast.show(error_message, ToastType.ERROR);
        console.log(JSON.stringify(error, null, 2));
      }
    } catch (error: any) {
      const error_message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred!";
      Toast.show(error_message, ToastType.ERROR);
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <ScreenWrapper>
      <YStack style={styles.screen} gap={GAP} px={GAP}>
        <YStack flex={1}>
          <H1>Login.</H1>
          <Form onSubmit={handleSubmit(onSubmit)} gap={GAP}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>Email</Label>
                  <Input
                    autoComplete="username"
                    autoCapitalize="none"
                    placeholder="Enter your email"
                    textTransform="lowercase"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
              name="username"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>Password</Label>
                  <YStack position="relative">
                    <Input
                      autoComplete="password"
                      placeholder="Enter your password"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry={secureTextEntry}
                    />
                    {value ? (
                      <View position="absolute" r={0} t={0} b={0}>
                        <Button
                          chromeless
                          onPress={_toggle_password_visibility}
                          size="$4"
                          p="$3"
                        >
                          {!secureTextEntry ? (
                            <EyeOff size={GAP} />
                          ) : (
                            <Eye size={GAP} />
                          )}
                        </Button>
                      </View>
                    ) : null}
                  </YStack>
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
              name="password"
            />
            <Form.Trigger asChild disabled={_is_disable_submit_button}>
              <Button
                disabled={_is_disable_submit_button}
                icon={isSubmitting ? () => <Spinner /> : undefined}
                mt={GAP * 1.5}
              >
                <Button.Text>Login</Button.Text>
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>
        <XStack justifyContent="space-between" alignItems="center">
          <H5>Don't have an account?</H5>
          <Link href="/register">
            <H5 textDecorationLine="underline">Register</H5>
          </Link>
        </XStack>
      </YStack>
    </ScreenWrapper>
  );
};

export default login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

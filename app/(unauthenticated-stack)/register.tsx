import React from "react";
import { StyleSheet } from "react-native";
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
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GAP } from "@/constants/Dimensions";
import apis from "@/apis";
import { Link, router } from "expo-router";
import Toast, { ToastType } from "@/utils/toasts";
import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import mixpanel from "@/services/mixpanel";
import MixpanelEvents from "@/services/mixpanel-events";

const schema = yup.object({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup
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
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match!")
    .required("Confirm password is required!"),
  tnc_accepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions to proceed!"),
});

type FormData = yup.InferType<typeof schema>;

const Register = () => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

  const form = useForm({
    defaultValues: {
      firstName: "Harshvardhan",
      lastName: "Thosar",
      email: "harshvardhanthosar@gmail.com",
      password: "P@ssw0rd",
      cpassword: "P@ssw0rd",
      tnc_accepted: false,
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
    formState: { isSubmitting, isValid, isDirty, isLoading, isValidating },
  } = form;

  const _is_disable_submit_button =
    isSubmitting || isLoading || isValidating || !isValid;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, firstName, lastName, password, tnc_accepted } = data;
    try {
      const response = await apis.register_a_new_user({
        email,
        firstName,
        lastName,
        password,
        tnc_accepted: tnc_accepted ?? false,
      });
      Toast.show(response.data.message, ToastType.SUCCESS);
      mixpanel.track(MixpanelEvents.user_register, {
        id: response.data.data.id,
      });
      const timeout = setTimeout(() => {
        router.push("/");
      }, 500);
      return () => clearTimeout(timeout);
    } catch (error: any) {
      const error_message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred!";
      Toast.show(error_message, ToastType.ERROR);
    }
  };

  return (
    <ScreenWrapper>
      <YStack style={styles.screen} gap={GAP} px={GAP} pb={GAP * 2}>
        <YStack flex={1}>
          <H1>Register.</H1>
          <Form onSubmit={handleSubmit(onSubmit)} gap={GAP}>
            {/* First Name */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>First name</Label>
                  <Input
                    autoCapitalize="words"
                    autoComplete="name-given"
                    placeholder="Enter your first name"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
              name="firstName"
            />

            {/* Last Name */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>Last name</Label>
                  <Input
                    autoCapitalize="words"
                    autoComplete="name-family"
                    placeholder="Enter your last name"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
              name="lastName"
            />

            {/* Email */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>Email</Label>
                  <Input
                    autoComplete="email"
                    textTransform="lowercase"
                    placeholder="Enter your email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
              name="email"
            />

            {/* Password */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>Password</Label>
                  <Input
                    autoComplete="password-new"
                    placeholder="Enter your password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry
                  />
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
              name="password"
            />

            {/* Confirm Password */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>Confirm password</Label>
                  <YStack position="relative">
                    <Input
                      autoComplete="password-new"
                      placeholder="Confirm password"
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
              name="cpassword"
            />

            <Controller
              control={control}
              name="tnc_accepted"
              render={({ field: { value, onChange }, fieldState }) => (
                <YStack>
                  <XStack gap={GAP} alignItems="center">
                    <CheckboxWithLabel
                      size="$4"
                      defaultChecked={value}
                      onCheckedChange={(checked) => onChange(checked)}
                      label={
                        <Label>
                          I accept the{" "}
                          <Link
                            href={{
                              pathname: "/terms",
                            }}
                          >
                            <Label textDecorationLine="underline">
                              Terms & Conditions
                            </Label>
                          </Link>
                        </Label>
                      }
                    />
                  </XStack>
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
            />
            {/* <YStack gap={GAP}>
              <Link href="/terms" style={{ flex: 1 }}>
                <H5 textDecorationLine="underline">Terms & Conditions</H5>
              </Link>
              <H5>
                Read through the{" "}
                <Link href="/disclaimer" style={{ flex: 1 }}>
                  <H5 textDecorationLine="underline">Disclaimer</H5>
                </Link>
              </H5>
            </YStack> */}
            <Form.Trigger asChild>
              <Button
                theme="accent"
                disabled={_is_disable_submit_button}
                icon={isSubmitting ? () => <Spinner /> : undefined}
                mt={GAP * 1.5}
              >
                <Button.Text>Register</Button.Text>
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>
      </YStack>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  screen: { flex: 1 },
});

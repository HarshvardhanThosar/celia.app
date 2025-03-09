import React from "react";
import { Dimensions, StyleSheet } from "react-native";
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
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { GAP } from "@/constants/Dimensions";
import { Link } from "expo-router";

const schema = yup.object({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  username: yup
    .string()
    .required("Username is required!")
    .min(4, "Username must be at least 4 characters!")
    .matches(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, _ and - are allowed!"),
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
});

type FormData = yup.InferType<typeof schema>;
const height = Dimensions.get("screen").height;

const register = () => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      cpassword: "",
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
    isDirty || isSubmitting || isLoading || isValidating || !isValid;

  const onSubmit: SubmitHandler<FormData> = async (data) => {};

  return (
    <ScreenWrapper>
      <YStack style={styles.screen} gap={GAP} px={GAP} pb={GAP * 2}>
        <YStack flex={1}>
          <H1>Register.</H1>
          <Form onSubmit={handleSubmit(onSubmit)} gap={GAP}>
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
            {/* <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label>Username</Label>
                  <Input
                    autoComplete="username-new"
                    placeholder="Enter your username"
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
            /> */}
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
            <Form.Trigger asChild disabled={_is_disable_submit_button}>
              <Button
                disabled={_is_disable_submit_button}
                icon={isSubmitting ? () => <Spinner /> : undefined}
                mt={GAP * 1.5}
              >
                <Button.Text>Register</Button.Text>
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>
        <XStack justifyContent="space-between" alignItems="center">
          <H5>Already have an account?</H5>
          <Link href="/">
            <H5 textDecorationLine="underline">Login</H5>
          </Link>
        </XStack>
      </YStack>
    </ScreenWrapper>
  );
};

export default register;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

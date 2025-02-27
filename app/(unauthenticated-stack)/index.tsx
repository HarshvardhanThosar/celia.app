import React from "react";
import { Dimensions, StyleSheet } from "react-native";
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

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GAP } from "@/constants/Dimensions";

// 📌 **Updated Validation Schema**
const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(4, "Username must be at least 4 characters!")
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, _ and - are allowed!"
      ),
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
const height = Dimensions.get("screen").height;

const login = () => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
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
    isSubmitting || isLoading || isValidating || !isValid || !isDirty;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(JSON.stringify(data, null, 2));
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
                  <Label>Username or email</Label>
                  <Input
                    autoComplete="username"
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
        <XStack alignItems="center">
          <H5>
            Read the{" "}
            <Link href="/disclaimer">
              <H5 textDecorationLine="underline">disclaimer</H5>
            </Link>
          </H5>
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

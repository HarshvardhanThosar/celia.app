import React from "react";
import { Slot, Stack } from "expo-router";

const UnauthenticatedLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          presentation: "modal",
          title: "Terms & Conditions",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="disclaimer"
        options={{
          presentation: "modal",
          title: "Disclaimer",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default UnauthenticatedLayout;

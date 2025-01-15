import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import AppHeaderBackground from "@/components/app-header-background";

const AuthenticatedLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerBackground: () => <AppHeaderBackground intensity={25} />,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Home",
          headerShown: false,
          headerTransparent: true,
          headerBackground: () => null,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="community-task/[id]"
        options={{
          title: "Community Task",
        }}
      />
      <Stack.Screen
        name="coupon/[id]"
        options={{
          title: "Coupon",
        }}
      />
    </Stack>
  );
};

export default AuthenticatedLayout;

const styles = StyleSheet.create({});

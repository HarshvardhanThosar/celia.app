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
        name="community-tasks/[id]"
        options={{
          title: "Community Task",
        }}
      />
      <Stack.Screen
        name="coupons/[id]"
        options={{
          title: "Coupon",
        }}
      />
      <Stack.Screen
        name="community-tasks/listing"
        options={{
          title: "Community Tasks",
        }}
      />
      <Stack.Screen
        name="coupons/listing"
        options={{
          title: "Coupons",
        }}
      />
      <Stack.Screen
        name="coupons/redeemed-listing"
        options={{
          title: "Redeemed Coupons",
        }}
      />
      <Stack.Screen
        name="community-tasks/created-listing"
        options={{
          title: "Your Created Tasks",
        }}
      />
      <Stack.Screen
        name="community-tasks/participated-listing"
        options={{
          title: "Tasks Participated",
        }}
      />
      {/* <Slot /> */}
    </Stack>
  );
};

export default AuthenticatedLayout;

const styles = StyleSheet.create({});

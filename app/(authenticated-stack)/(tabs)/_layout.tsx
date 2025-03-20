import React from "react";
import { Tabs } from "expo-router";
import AppHeaderBackground from "@/components/app-header-background";

// I C O N S
import Octicons from "@expo/vector-icons/Octicons";
import { Avatar, H5, Paragraph } from "tamagui";
import { useThemeColor } from "@/hooks/useThemeColor";
import Auth from "@/context/auth.context";

const TabsLayout = () => {
  const { data: user } = Auth.useAuth();
  const background_colors = {
    light: "#F4F7F5",
    dark: "#26261A",
  };
  const background_color = useThemeColor(
    { ...background_colors },
    "background"
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerBackground: () => <AppHeaderBackground intensity={25} />,
        headerShadowVisible: false,
        tabBarActiveBackgroundColor: background_color,
        tabBarInactiveBackgroundColor: background_color,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-community-task"
        options={{
          title: "Create Task",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size }) => (
            <Avatar size={size} circular backgroundColor="$background">
              {user?.profile_image && (
                <Avatar.Image
                  accessibilityLabel="Profile"
                  src={user?.profile_image}
                />
              )}
              <Avatar.Fallback>
                <Paragraph
                  fontSize="$3"
                  textAlign="center"
                >{`${user?.given_name.charAt(0)}${user?.family_name.charAt(
                  0
                )}`}</Paragraph>
              </Avatar.Fallback>
            </Avatar>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

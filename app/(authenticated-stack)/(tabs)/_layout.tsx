import React from "react";
import { Tabs } from "expo-router";
import AppHeaderBackground from "@/components/app-header-background";

// I C O N S
import Octicons from "@expo/vector-icons/Octicons";
import { Avatar } from "tamagui";
import { useThemeColor } from "@/hooks/useThemeColor";

const TabsLayout = () => {
  const background_colors = {
    light: "#ecedec",
    dark: "#22231f",
  };
  const background_color = useThemeColor(
    { ...background_colors },
    "background"
  );

  return (
    <Tabs
      initialRouteName="create-community-task"
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
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-community-task"
        options={{
          title: "Create Task",
          tabBarIcon: ({ color, focused, size }) => (
            <Octicons name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size }) => (
            <Avatar size={size} circular>
              <Avatar.Image
                accessibilityLabel="Cam"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

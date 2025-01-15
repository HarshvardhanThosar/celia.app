import React from "react";
import { Tabs } from "expo-router";
import AppHeaderBackground from "@/components/app-header-background";

// I C O N S
import Octicons from "@expo/vector-icons/Octicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerBackground: () => <AppHeaderBackground intensity={25} />,
        headerShadowVisible: false,
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
    </Tabs>
  );
};

export default TabsLayout;

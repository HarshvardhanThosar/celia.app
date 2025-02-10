import React from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import Auth from "@/context/auth.context";
import Theme from "@/context/theme.context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import LogRocket from "@logrocket/react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  React.useEffect(() => {
    LogRocket.init("rtyd56/celia-community-applcation");
    LogRocket.identify("123", {
      name: "Harshvardhan Thosar",
      email: "harshvardhanthosar@gmail.com",
      subscriptionType: "pro",
    });
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Theme.Provider>
      <Auth.Provider>
        <StatusBar style="auto" />
        <Slot />
      </Auth.Provider>
    </Theme.Provider>
  );
}

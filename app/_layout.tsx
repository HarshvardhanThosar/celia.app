import React from "react";
// import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import Auth from "@/context/auth.context";
import Theme from "@/context/theme.context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// try {
//   Sentry.init({
//     dsn: "https://d00c06a14e0e6e589d1746cab0e13029@o4508796282929152.ingest.de.sentry.io/4508796285288528",
//     _experiments: {
//       replaysSessionSampleRate: 0.1,
//       replaysOnErrorSampleRate: 1.0,
//     },
//     integrations: [
//       Sentry.mobileReplayIntegration({
//         maskAllText: true,
//         maskAllImages: true,
//         maskAllVectors: true,
//       }),
//     ],
//   });
// } catch (error) {
//   console.error(error);
// }

function RootLayout() {
  const [loaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  React.useEffect(() => {
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

export default RootLayout;
// export default Sentry.wrap(RootLayout);

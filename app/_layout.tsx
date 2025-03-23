import "react-native-reanimated";
import React from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import Auth from "@/context/auth.context";
import Theme from "@/context/theme.context";
import { Appearance, ColorSchemeName } from "react-native";
import mixpanel from "@/services/mixpanel";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// async function _trigger_test_notification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Test Deep Link",
//       body: "Tap to open screen!",
//       data: {
//         url: "celia://profile",
//       },
//     },
//     trigger: null,
//   });
// }

function RootLayout() {
  mixpanel.init();
  const systemTheme = Appearance.getColorScheme() ?? "light";
  const [_, setTheme] = React.useState<ColorSchemeName>(systemTheme);
  const [loaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // _trigger_test_notification();

    const notification_subscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const url = response.notification.request.content.data?.url;
        if (url) {
          Linking.openURL(url);
        }
      });

    const appearance_subscription = Appearance.addChangeListener(
      ({ colorScheme }) => {
        setTheme(colorScheme ?? "light");
      }
    );

    return () => {
      appearance_subscription.remove();
      notification_subscription.remove();
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <Theme.Provider>
        <Auth.Provider>
          <StatusBar style="auto" />
          <Slot />
        </Auth.Provider>
      </Theme.Provider>
    </RootSiblingParent>
  );
}

export default RootLayout;

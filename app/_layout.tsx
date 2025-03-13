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

// TODO:
// 1. Most frequently chosen food items
// 2. Type of tasks like by users
// 3. Remote / physical, which is preferred
// 4. Connection with peer and follow
// 5. Referrals and task sharing, item ownership sharing
// 6. Users can add food items
// 7. Personalize feed based on user's behaviour

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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

    const appearance_subscription = Appearance.addChangeListener(
      ({ colorScheme }) => {
        setTheme(colorScheme ?? "light");
      }
    );

    return () => {
      appearance_subscription.remove();
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
// export default Sentry.wrap(RootLayout);

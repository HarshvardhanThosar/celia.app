import "react-native-reanimated";
import React from "react";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Mixpanel } from "mixpanel-react-native";

import Auth from "@/context/auth.context";
import Theme from "@/context/theme.context";
import { Appearance, ColorSchemeName } from "react-native";
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

const trackAutomaticEvents = true;
const mixpanel = new Mixpanel(
  "a778e08ce13698c58cac71b5394498bb",
  trackAutomaticEvents
);
mixpanel.init();

mixpanel.identify("123");

// Identify must be called before properties are set
mixpanel.getPeople().set("$name", "Jane Doe");
mixpanel.getPeople().set("$email", "jane.doe@example.com");
mixpanel.getPeople().set("plan", "Premium");

mixpanel.track("Sign Up", {
  "Signup Type": "Referral",
});

try {
  Sentry.init({
    dsn: "https://d00c06a14e0e6e589d1746cab0e13029@o4508796282929152.ingest.de.sentry.io/4508796285288528",
    _experiments: {
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    },
    integrations: [
      Sentry.mobileReplayIntegration({
        maskAllText: true,
        maskAllImages: true,
        maskAllVectors: true,
      }),
    ],
  });
} catch (error) {
  console.error("Error initializing Sentry", JSON.stringify(error, null, 2));
}

function RootLayout() {
  const systemTheme = Appearance.getColorScheme() ?? "light";
  const [_, setTheme] = React.useState<ColorSchemeName>(systemTheme);
  const [loaded] = useFonts({
    AbrilFatface: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme ?? "light");
    });
    if (loaded) {
      SplashScreen.hideAsync();
    }
    return () => subscription.remove();
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

import Theme from "@/context/theme.context";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type AppHeaderBackgroundProps = {
  intensity?: number;
  tint?: "light" | "dark";
  style?: ViewStyle;
};

const AppHeaderBackground = ({
  intensity = 40,
  tint = "light",
  style,
}: AppHeaderBackgroundProps) => {
  const insets = useSafeAreaInsets();
  const { data: theme } = Theme.useTheme() ?? "light";

  return (
    <BlurView
      intensity={intensity}
      tint={tint ?? theme}
      style={[styles.appbar_background, { height: insets.top + 56 }, style]}
      // experimentalBlurMethod="dimezisBlurView"
    />
  );
};

export default AppHeaderBackground;

const styles = StyleSheet.create({
  appbar_background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "auto",
    // backgroundColor: "#ecedec80",
    backgroundColor: "#ecedec",
  },
});

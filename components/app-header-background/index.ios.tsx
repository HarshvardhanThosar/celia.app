import Theme from "@/context/theme.context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type AppHeaderBackgroundProps = {
  intensity?: number;
  tint?: "light" | "dark";
  style?: ViewStyle;
};

const AppHeaderBackground = ({
  intensity = 10,
  tint = "light",
  style,
}: AppHeaderBackgroundProps) => {
  const insets = useSafeAreaInsets();
  const { data: theme } = Theme.useTheme() ?? "light";
  const background_colors = {
    light: "#ecedec80",
    dark: "#22231f00",
  };
  const background_color = useThemeColor(
    { ...background_colors },
    "background"
  );

  return (
    <BlurView
      intensity={intensity}
      tint={tint ?? theme}
      style={[
        styles.appbar_background,
        { height: insets.top + 44, backgroundColor: background_color },
        style,
      ]}
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
  },
});

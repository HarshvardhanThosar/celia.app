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
  intensity = 40,
  tint = "light",
  style,
}: AppHeaderBackgroundProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      style={[styles.appbar_background, { height: insets.top + 44 }, style]}
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
    backgroundColor: "rgba(242,242, 242, 0.7)",
  },
});

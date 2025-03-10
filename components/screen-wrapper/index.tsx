import { GAP } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  Platform,
  RefreshControlProps,
  ScrollView,
  StatusBar,
  StyleSheet,
  ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";

type ScreenWrapperProps = {
  children: React.JSX.Element;
  scrollable?: boolean;
  refreshControl?: React.ReactElement<RefreshControlProps>;
} & ViewProps;

const ScreenWrapper = ({ scrollable = true, ...props }: ScreenWrapperProps) => {
  const background_colors = {
    light: "#F4F7F5",
    dark: "#26261A",
  };
  const background_color = useThemeColor(
    { ...background_colors },
    "background"
  );

  const insets = useSafeAreaInsets();
  const headerHeight = Platform.select({
    android: 56,
    ios: 44,
    macos: 44,
    native: 44,
    web: 44,
    windows: 44,
  });

  const transparentHeaderHeight = Platform.select({
    android: (StatusBar.currentHeight ?? 0) + headerHeight,
    ios: insets.top + headerHeight,
    macos: insets.top + headerHeight,
    web: insets.top + headerHeight,
    windows: insets.top + headerHeight,
  });

  return (
    <ScrollView
      refreshControl={props?.refreshControl}
      style={[
        { backgroundColor: background_color },
        styles.screen,
        props.style,
      ]}
      scrollEnabled={!!scrollable}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      automaticallyAdjustContentInsets
      automaticallyAdjustKeyboardInsets
    >
      <XStack h={transparentHeaderHeight} />
      {props.children}
      <XStack h={GAP} />
    </ScrollView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

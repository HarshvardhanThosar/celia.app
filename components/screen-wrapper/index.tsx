import { GAP } from "@/constants/Dimensions";
import React from "react";
import { Platform, ScrollView, StatusBar, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

type ScreenWrapperProps = {
  children: React.JSX.Element;
  scrollable?: boolean;
};

const ScreenWrapper = ({ scrollable = true, ...props }: ScreenWrapperProps) => {
  const _children = props.children;

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

  const _child = scrollable ? (
    <ScrollView>
      <XStack h={transparentHeaderHeight} />
      {_children}
      <XStack h={GAP} />
    </ScrollView>
  ) : (
    <React.Fragment>
      <XStack h={transparentHeaderHeight} />
      {_children}
      <XStack h={GAP} />
    </React.Fragment>
  );

  return <YStack style={styles.screen}>{_child}</YStack>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

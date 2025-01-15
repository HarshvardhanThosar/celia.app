import React from "react";
import { StyleSheet } from "react-native";
import { GAP } from "@/constants/Dimensions";
import { YStack } from "tamagui";

// C O M P O N E N T S
import ScreenWrapper from "@/components/screen-wrapper";

const index = () => {
  return (
    <React.Fragment>
      <ScreenWrapper>
        <YStack style={styles.screen} gap={GAP * 1.5}></YStack>
      </ScreenWrapper>
    </React.Fragment>
  );
};

export default index;

const styles = StyleSheet.create({
  screen: {
    // dimensions
    flex: 1,
    gap: GAP * 0.5,
  },
  heading1_container: {
    // design
    paddingHorizontal: GAP,
  },
});

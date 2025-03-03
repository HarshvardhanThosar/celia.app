import React from "react";
import { StyleSheet } from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import Auth from "@/context/auth.context";
import {
  YStack,
  Text,
  H2,
  XStack,
  H3,
  H4,
  H6,
  H5,
  Button,
  Spinner,
} from "tamagui";
import { GAP } from "@/constants/Dimensions";
import { PowerOff } from "@tamagui/lucide-icons";
import apis from "@/apis";
import { unauthenticate_instance } from "@/apis/instance";

const index = () => {
  const { data: user, reset, isLoading } = Auth.useAuth();

  const _logout = async () => {
    try {
      await apis.logout();
      unauthenticate_instance();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenWrapper>
      <YStack style={styles.screen} px={GAP} gap={GAP * 1.5}>
        <XStack alignItems="flex-end">
          <YStack flex={1}>
            <H5 textTransform="uppercase">Hi, </H5>
            <H3>{user?.name}</H3>
          </YStack>
          <Button size="$3" p="$2" onPress={_logout}>
            {isLoading ? () => <Spinner /> : <PowerOff size="$1" />}
          </Button>
        </XStack>
        <XStack>
          <YStack gap={GAP} flex={1}>
            <H5 textTransform="uppercase">Score</H5>
            <XStack alignItems="flex-end">
              <H2>{user?.score} </H2>
              <H5>points</H5>
            </XStack>
          </YStack>
          <YStack gap={GAP} flex={1}>
            <H5 textTransform="uppercase">Tasks participated</H5>
            <XStack alignItems="flex-end">
              <H2>{user?.tasks_participated?.length} </H2>
              <H5>tasks</H5>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </ScreenWrapper>
  );
};

export default index;
const styles = StyleSheet.create({
  screen: {
    // dimensions
    flex: 1,
    // gap: GAP * 0.5,
  },
  heading1_container: {
    // design
    paddingHorizontal: GAP,
  },
});

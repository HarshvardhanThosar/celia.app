import React from "react";
import { RefreshControl, StyleSheet } from "react-native";
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
import { format_number } from "@/utils/numbers";

const index = () => {
  const [is_refreshing, set_is_refresh] = React.useState(false);
  const { data: user, set, reset, isLoading, refetch } = Auth.useAuth();

  const _score = React.useMemo(() => format_number(user?.score ?? 0), [user]);
  const _tasks_participated_count = React.useMemo(
    () => format_number(user?.tasks_participated?.length ?? 0),
    [user]
  );

  const _logout = React.useCallback(async () => {
    try {
      await apis.logout();
      unauthenticate_instance();
      reset();
    } catch (error) {
      console.error("Error logging out", JSON.stringify(error, null, 2));
    }
  }, []);

  const _fetch_user_profile = React.useCallback(async () => {
    apis
      .fetch_logged_in_user_profile()
      .then((response) => {
        const _profile = response.data.data;
        set(_profile);
      })
      .finally(() => set_is_refresh(false));
  }, []);

  const _refreshControl = React.useMemo(
    () => (
      <RefreshControl
        refreshing={is_refreshing}
        onRefresh={_fetch_user_profile}
      />
    ),
    []
  );

  return (
    <ScreenWrapper refreshControl={_refreshControl}>
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
              <H2>{_score} </H2>
              <H5>points</H5>
            </XStack>
          </YStack>
          <YStack gap={GAP} flex={1}>
            <H5 textTransform="uppercase">Tasks participated</H5>
            <XStack alignItems="flex-end">
              <H2>{_tasks_participated_count} </H2>
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

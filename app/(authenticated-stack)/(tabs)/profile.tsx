import React from "react";
import { Pressable, RefreshControl, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import Auth from "@/context/auth.context";
import {
  YStack,
  XStack,
  H3,
  Button,
  Spinner,
  Paragraph,
  View,
  ViewProps,
  H6,
} from "tamagui";
import { GAP } from "@/constants/Dimensions";
import {
  Copy,
  Info,
  PowerOff,
  SquareArrowOutUpRight,
  X,
} from "@tamagui/lucide-icons";
import apis from "@/apis";
import { unauthenticate_instance } from "@/apis/instance";
import { format_number } from "@/utils/numbers";
import { Link } from "expo-router";
import * as Clipboard from "expo-clipboard";
import Toast from "@/utils/toasts";
import useProfile from "@/hooks/useProfile";

const StatTile = ({
  icon,
  label,
  onPress = () => undefined,
  stat,
  title,
  ...props
}: {
  stat: string | number;
  label: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
} & ViewProps) => {
  return (
    <XStack flex={1} {...props}>
      <Pressable onPress={onPress} style={{ width: "100%" }}>
        <YStack
          py={GAP}
          borderColor="$color"
          borderWidth="$0.25"
          borderRadius="$6"
          p={GAP}
        >
          <XStack gap={GAP} alignItems="flex-start">
            <YStack flex={1}>
              {/* {title.split(" ")[0] ?? ( */}
              <H6 textTransform="uppercase" flex={1} fontSize={GAP * 0.75}>
                {title.split(" ")[0]}
              </H6>
              {/* )} */}
              {/* {title.split(" ")[1] ?? ( */}
              <H6 textTransform="uppercase" flex={1} fontSize={GAP * 0.75}>
                {title.split(" ")[1]}
              </H6>
              {/* )} */}
            </YStack>
            {icon}
          </XStack>
          <H3 pt={GAP}>
            {stat}
            <H6> {label}</H6>
          </H3>
        </YStack>
      </Pressable>
    </XStack>
  );
};

const index = () => {
  const { reset, isLoading, isFetching } = Auth.useAuth();
  const { data: user, refetch } = useProfile();
  const _id = React.useMemo(() => user?._id, [user]);
  const _score = React.useMemo(() => format_number(user?.score ?? 0), [user]);
  const _tasks_participated_count = React.useMemo(
    () => format_number(user?.tasks_participated?.length ?? 0),
    [user]
  );
  const _tasks_created_count = React.useMemo(
    () => format_number(user?.tasks_created?.length ?? 0),
    [user]
  );
  const _coupons_redeemed = React.useMemo(
    () => format_number(user?.coupons?.length ?? 0),
    [user]
  );

  const _logout = React.useCallback(async () => {
    try {
      await apis.logout();
    } catch (error) {
      console.log("Error logging out", JSON.stringify(error, null, 2));
    }
    unauthenticate_instance();
    reset();
  }, []);

  const _copy_id = React.useCallback(async () => {
    if (!_id) return;
    await Clipboard.setStringAsync(_id);
  }, [_id]);
  const _onRefresh = () => {
    refetch();
  };

  const _refreshControl = (
    <RefreshControl
      refreshing={isFetching || isLoading}
      onRefresh={_onRefresh}
    />
  );

  return (
    <ScreenWrapper refreshControl={_refreshControl} scrollable>
      <YStack style={styles.screen} px={GAP} gap={GAP}>
        <XStack alignItems="center">
          <YStack flex={1}>
            <H6>Hi, </H6>
            <H3>{user?.name}</H3>
          </YStack>
          <Button size="$3" p="$2" onPress={_logout} disabled={isLoading}>
            {isLoading ? () => <Spinner /> : <PowerOff size="$1" />}
          </Button>
        </XStack>
        <YStack
          backgroundColor="$accent11"
          borderColor="$color"
          borderWidth="$0.25"
          borderRadius="$6"
          p={GAP}
          gap={GAP}
        >
          <Paragraph>
            Join an optional survey to share your experience and improve this
            research. Stay anonymous with the provided ID. Click below to
            participate.
          </Paragraph>
          <XStack gap={GAP} alignItems="center">
            <Paragraph
              flex={1}
              width="100%"
              numberOfLines={1}
              textOverflow="ellipsis"
            >
              {_id}
            </Paragraph>
            <Button chromeless onPress={_copy_id} size="$3" p="$2">
              <Copy />
            </Button>
          </XStack>
          <View p={GAP / 2} borderRadius={GAP * 2} backgroundColor="$accent3">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScduQykhbiLSfk3CJJK6cAIUtIpe3wI9sjTxiKCYGaqZiVXig/viewform?usp=header">
              <Paragraph textAlign="center" color="$accent12">
                Survey link{" "}
                <SquareArrowOutUpRight size={15} color="$accent12" />
              </Paragraph>
            </Link>
          </View>
        </YStack>
        <XStack gap={GAP}>
          <StatTile
            stat={_score}
            label="points"
            title="Points earned"
            onPress={() => undefined}
            icon={<Info size={15} />}
          />
          <StatTile
            stat={_tasks_participated_count}
            label="tasks"
            title="Tasks participated"
            onPress={() => undefined}
            icon={<SquareArrowOutUpRight size={15} />}
          />
        </XStack>
        <XStack gap={GAP}>
          <StatTile
            stat={_tasks_created_count}
            label="tasks"
            title="Tasks created"
            onPress={() => undefined}
            icon={<SquareArrowOutUpRight size={15} />}
          />
          <StatTile
            stat={_coupons_redeemed}
            label="coupons"
            title="Coupons redeemed"
            onPress={() => undefined}
            icon={<SquareArrowOutUpRight size={15} />}
          />
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

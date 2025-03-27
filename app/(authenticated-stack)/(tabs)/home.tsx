import React from "react";
import { StyleSheet, FlatList, Pressable } from "react-native";
import {
  Button,
  H1,
  H2,
  H3,
  H5,
  H6,
  Image,
  Paragraph,
  XStack,
  YStack,
} from "tamagui";
import { Coins, Flame, Plus } from "@tamagui/lucide-icons";

// C O M P O N E N T S
import ScreenWrapper from "@/components/screen-wrapper";
import Task from "@/components/task";
import Coupon from "@/components/coupon";

// C O N S T A N T S
import { GAP } from "@/constants/Dimensions";
import { format_number } from "@/utils/numbers";
import { router } from "expo-router";
import Avatar from "@/components/ui/Avatar";
import Auth from "@/context/auth.context";
import useCommunityTask from "@/hooks/useCommunityTasks";

const index = () => {
  const skip = 0,
    limit = 10;
  // const _navigate_to_view_all_community_tasks = () =>
  //   router.push("/(authenticated-stack)/community-tasks/listing");
  // const _navigate_to_view_all_coupons = () =>
  //   router.push("/(authenticated-stack)/coupons/listing");
  const { data: community_tasks_response } = useCommunityTask({ skip, limit });
  const tasks = community_tasks_response?.data.data;
  const { data: user } = Auth.useAuth();

  return (
    <React.Fragment>
      <ScreenWrapper>
        <YStack style={styles.screen} gap={GAP * 1.5} pb={GAP * 4}>
          <XStack
            style={styles.heading1_container}
            alignItems="center"
            justifyContent="space-between"
          >
            <YStack>
              <H5 fontWeight="bold" style={{ letterSpacing: 0.25 }}>
                Welcome to
              </H5>
              <H1
                fontWeight="500"
                style={{
                  fontFamily: "AbrilFatface",
                  letterSpacing: 1,
                }}
              >
                celia.
              </H1>
            </YStack>
            <Pressable onPress={() => router.navigate("/profile")}>
              <XStack
                alignItems="center"
                justifyContent="center"
                gap={GAP / 2}
                backgroundColor="$color9"
                padding={GAP / 4}
                borderRadius={GAP * 3}
              >
                {user?.score ? (
                  <React.Fragment>
                    <XStack pl={GAP / 2} alignItems="center" gap={GAP / 3}>
                      <Coins color="$color1" size={14} />
                      <Paragraph color="$color1">
                        {format_number(user?.score)}
                      </Paragraph>
                    </XStack>
                    <Paragraph color="$color1"> • </Paragraph>
                  </React.Fragment>
                ) : null}
                {user?.streak ? (
                  <React.Fragment>
                    <XStack alignItems="center" gap={GAP / 3}>
                      <Flame color="$color1" size={14} />
                      <Paragraph color="$color1">
                        {format_number(user?.streak)}
                      </Paragraph>
                    </XStack>
                    <Paragraph color="$color1"> • </Paragraph>
                  </React.Fragment>
                ) : null}
                <Avatar
                  profile_image={user?.profile_image}
                  name={user?.name}
                  size={GAP * 2.5}
                />
              </XStack>
            </Pressable>
          </XStack>
          <YStack px={GAP} py={GAP * 2} gap={GAP} backgroundColor="#44463e">
            <YStack gap={GAP / 2}>
              <H2
                fontSize={16}
                lineHeight={16}
                color="#fff"
                style={{
                  fontFamily: "AbrilFatface",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Total Donations Made
              </H2>
              <H3
                fontSize={32}
                lineHeight={32}
                color="#fff"
                style={{
                  fontFamily: "AbrilFatface",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {format_number(4500)} meals
              </H3>
            </YStack>
            <YStack gap={GAP / 2}>
              <H2
                fontSize={16}
                color="#fff"
                lineHeight={16}
                style={{
                  fontFamily: "AbrilFatface",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Total Social Contributions
              </H2>
              <H3
                fontSize={32}
                lineHeight={32}
                color="#fff"
                style={{
                  fontFamily: "AbrilFatface",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {format_number(1303)} tasks
              </H3>
            </YStack>
            <Image
              alt=""
              source={require("../../../assets/images/reusable-paper-bag-hero.png")}
              h={200}
              w={200}
              position="absolute"
              r={-25}
              b={0}
              zIndex={0}
              objectFit="contain"
            />
          </YStack>
          {user?.tasks_participated?.length ? (
            <YStack
              px={GAP}
              py={GAP * 2}
              mt={-2 * GAP}
              gap={GAP}
              backgroundColor="#c5a57d"
              overflow="hidden"
            >
              <YStack gap={GAP / 2}>
                <H2
                  fontSize={20}
                  lineHeight={20}
                  color="#44463e"
                  style={{
                    fontFamily: "AbrilFatface",
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Your Social Contributions
                </H2>
                <H3
                  fontSize={32}
                  lineHeight={32}
                  color="#44463e"
                  style={{
                    fontFamily: "AbrilFatface",
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  {format_number(user?.tasks_participated?.length ?? 0)} tasks
                </H3>
              </YStack>
              <Image
                alt=""
                source={require("../../../assets/images/thank-you.png")}
                h={200}
                w={200}
                position="absolute"
                r={-25}
                b={-75}
                zIndex={-1}
                objectFit="contain"
              />
            </YStack>
          ) : null}
          <YStack gap={GAP * 0.5}>
            <XStack px={GAP} justifyContent="space-between" alignItems="center">
              <H5 textTransform="uppercase">Coupons</H5>
              {/* <Pressable onPress={_navigate_to_view_all_coupons}>
                <H6 textTransform="uppercase" textDecorationLine="underline">
                  View all
                </H6>
              </Pressable> */}
            </XStack>
            <FlatList
              horizontal
              persistentScrollbar
              showsHorizontalScrollIndicator={false}
              data={[1, 1, 1, 1, 1, 1]}
              renderItem={Coupon}
              ListHeaderComponent={<XStack width={GAP} />}
              ListFooterComponent={<XStack width={GAP} />}
              ItemSeparatorComponent={() => <XStack width={GAP} />}
            />
          </YStack>
          {tasks?.length ? (
            <YStack gap={GAP * 0.5}>
              <XStack
                px={GAP}
                justifyContent="space-between"
                alignItems="center"
              >
                <H5 textTransform="uppercase">Community Tasks</H5>
                {/* <Pressable onPress={_navigate_to_view_all_community_tasks}>
                  <H6 textTransform="uppercase" textDecorationLine="underline">
                    View all
                  </H6>
                </Pressable> */}
              </XStack>
              <FlatList
                horizontal
                persistentScrollbar
                showsHorizontalScrollIndicator={false}
                data={tasks}
                renderItem={({ index, item, separators }) => (
                  <Task {...item} key={index + item._id} />
                )}
                ListHeaderComponent={<XStack width={GAP} />}
                ListFooterComponent={<XStack width={GAP} />}
                ItemSeparatorComponent={() => <XStack width={GAP} />}
              />
            </YStack>
          ) : null}
        </YStack>
      </ScreenWrapper>
      <Button
        theme="accent"
        icon={<Plus color="#c5a57d" size="$2" />}
        size="$5"
        position="absolute"
        r={GAP * 1.5}
        b={GAP * 1.5}
        aspectRatio={1}
      />
    </React.Fragment>
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

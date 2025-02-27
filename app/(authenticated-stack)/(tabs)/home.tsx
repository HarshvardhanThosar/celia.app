import React from "react";
import { StyleSheet, FlatList, Pressable } from "react-native";
import {
  Avatar,
  Button,
  H1,
  H2,
  H3,
  H5,
  H6,
  Image,
  XStack,
  YStack,
} from "tamagui";
import { Plus } from "@tamagui/lucide-icons";

// C O M P O N E N T S
import ScreenWrapper from "@/components/screen-wrapper";
import Task from "@/components/task";
import Coupon from "@/components/coupon";

// C O N S T A N T S
import { GAP } from "@/constants/Dimensions";
import { formatNumber } from "@/utils/numbers";
import { router } from "expo-router";

const index = () => {
  const _navigate_to_view_all_community_tasks = () =>
    router.push("/(authenticated-stack)/community-tasks/listing");
  const _navigate_to_view_all_coupons = () =>
    router.push("/(authenticated-stack)/coupons/listing");

  return (
    <React.Fragment>
      <ScreenWrapper>
        <YStack style={styles.screen} gap={GAP * 1.5}>
          <YStack gap={GAP * 0.5}>
            <XStack px={GAP} justifyContent="space-between" alignItems="center">
              <H5 textTransform="uppercase">Coupons</H5>
              <Pressable onPress={_navigate_to_view_all_coupons}>
                <H6 textTransform="uppercase" textDecorationLine="underline">
                  View all
                </H6>
              </Pressable>
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
          <YStack gap={GAP * 0.5}>
            <XStack px={GAP} justifyContent="space-between" alignItems="center">
              <H5 textTransform="uppercase">Community Tasks</H5>
              <Pressable onPress={_navigate_to_view_all_community_tasks}>
                <H6 textTransform="uppercase" textDecorationLine="underline">
                  View all
                </H6>
              </Pressable>
            </XStack>
            <FlatList
              horizontal
              persistentScrollbar
              showsHorizontalScrollIndicator={false}
              data={[1, 1, 1, 1, 1, 1]}
              renderItem={Task}
              ListHeaderComponent={<XStack width={GAP} />}
              ListFooterComponent={<XStack width={GAP} />}
              ItemSeparatorComponent={() => <XStack width={GAP} />}
            />
          </YStack>
        </YStack>
      </ScreenWrapper>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ScreenWrapper>
        <YStack style={styles.screen} gap={GAP * 1.5}>
          <XStack
            style={styles.heading1_container}
            alignItems="center"
            justifyContent="space-between"
          >
            <YStack>
              <H5
                color="#44463e"
                fontWeight="bold"
                style={{ letterSpacing: 0.25 }}
              >
                Welcome to
              </H5>
              <H1
                color="#  "
                fontWeight="500"
                style={{
                  fontFamily: "AbrilFatface",
                  letterSpacing: 1,
                }}
              >
                celia.
              </H1>
            </YStack>
            <Avatar circular size="$4">
              <Avatar.Image
                accessibilityLabel="Cam"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
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
                {formatNumber(4500)} meals
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
                {formatNumber(1303)} tasks
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
                {formatNumber(45)} tasks
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
          <YStack gap={GAP * 0.5}>
            <YStack px={GAP}>
              <H6>Coupons</H6>
            </YStack>
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
          <YStack gap={GAP * 0.5}>
            <YStack px={GAP}>
              <H6>Community Tasks</H6>
            </YStack>
            <FlatList
              horizontal
              persistentScrollbar
              showsHorizontalScrollIndicator={false}
              data={[1, 1, 1, 1, 1, 1]}
              renderItem={Task}
              ListHeaderComponent={<XStack width={GAP} />}
              ListFooterComponent={<XStack width={GAP} />}
              ItemSeparatorComponent={() => <XStack width={GAP} />}
            />
          </YStack>
        </YStack>
      </ScreenWrapper>
      <Button
        backgroundColor="#44463e"
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

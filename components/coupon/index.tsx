import { Dimensions, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image, Paragraph, XStack, YStack } from "tamagui";
import { COUPON_CROP_IMAGE_ASPECT_RATIO, GAP } from "@/constants/Dimensions";
import { CalendarDays, Coins } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { RetailItem } from "@/types/apis";
import { formatDistance } from "date-fns";
import { format_number } from "@/utils/numbers";

const { width } = Dimensions.get("screen");

const Coupon = ({ ...props }: RetailItem) => {
  const _navigate_to_dedicated_route = () =>
    router.push({
      pathname: "/coupons/[id]",
      params: {
        id: props._id,
      },
    });
  const _now = React.useMemo(() => new Date(), []);

  const _days_from_label = formatDistance(props?.expiry_date ?? _now, _now, {
    addSuffix: true,
  });

  return (
    <Pressable onPress={_navigate_to_dedicated_route}>
      <YStack
        style={styles.coupon_container}
        backgroundColor="$background"
        borderWidth="$0.25"
        borderRadius="$6"
        borderColor="$color"
        p={GAP}
        gap={GAP}
      >
        <Image
          w="100%"
          aspectRatio={COUPON_CROP_IMAGE_ASPECT_RATIO}
          borderRadius={GAP / 2}
          alt=""
          objectFit="contain"
          background="$background"
          source={{
            uri: props.thumbnail,
          }}
        />
        <YStack gap={5}>
          <Paragraph numberOfLines={1}>{props.name}</Paragraph>
          <Paragraph fontSize={12}>
            {props.retailer.name} • {props.retailer.store}
          </Paragraph>
        </YStack>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          gap={GAP * 2}
        >
          <XStack alignItems="center" gap={GAP / 4} flex={1}>
            <Coins size={14} />
            <Paragraph numberOfLines={1} fontSize={14}>
              {format_number(props.points)}
            </Paragraph>
          </XStack>
          <XStack alignItems="center" gap={GAP / 4}>
            <CalendarDays size={16} />
            <Paragraph>{_days_from_label}</Paragraph>
          </XStack>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  coupon_container: {
    // dimensions
    width: "100%",
    maxWidth: (width * 3) / 5,
  },
});

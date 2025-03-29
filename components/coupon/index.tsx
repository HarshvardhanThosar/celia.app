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
        // backgroundColor="$background"
        borderWidth="$0.25"
        borderColor="$color"
        borderRadius="$6"
        gap={GAP}
        pb={GAP}
        overflow="hidden"
      >
        <Image
          w="100%"
          aspectRatio={COUPON_CROP_IMAGE_ASPECT_RATIO}
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
          borderBottomWidth="$0.25"
          borderColor="$color"
          alt=""
          objectFit="contain"
          background="$background"
          source={{
            uri: props.thumbnail,
          }}
        />
        <YStack gap={5} px={GAP}>
          <Paragraph numberOfLines={1}>{props.name}</Paragraph>
          <XStack alignItems="center" gap={GAP / 4}>
            <CalendarDays size={16} />
            <Paragraph>{_days_from_label}</Paragraph>
          </XStack>
        </YStack>
        <XStack justifyContent="space-between" gap={GAP} px={GAP}>
          <XStack alignItems="center" gap={GAP / 4} flex={1}>
            <Coins size={14} />
            <Paragraph numberOfLines={1} fontSize={14}>
              {format_number(props.points)}
            </Paragraph>
          </XStack>
          <Paragraph fontSize={12}>
            {props.retailer.name} • {props.retailer.store}
          </Paragraph>
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

import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Image, Paragraph, XStack, YStack } from "tamagui";
import { COUPON_CROP_IMAGE_ASPECT_RATIO, GAP } from "@/constants/Dimensions";
import { Coins } from "@tamagui/lucide-icons";

const { width } = Dimensions.get("screen");

const Coupon = () => {
  return (
    <YStack style={styles.coupon_container}>
      <Image
        aspectRatio={COUPON_CROP_IMAGE_ASPECT_RATIO}
        alt=""
        source={{
          uri: "https://harvestgold.in/image/ProductImage/818a8a255136cbe36165ad397ee9a2b4.png",
        }}
      />
      <YStack gap={5}>
        <Paragraph>Harvest Gold Bread</Paragraph>
        <Paragraph fontSize={12}>Tesco • Athlone</Paragraph>
      </YStack>
      <XStack alignItems="center" justifyContent="space-between" gap={GAP * 2}>
        <XStack alignItems="center" gap={4}>
          <Coins size={14} />
          <Paragraph fontSize={14}>2000</Paragraph>
        </XStack>
        <Paragraph>Valid till • 2d</Paragraph>
      </XStack>
    </YStack>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  coupon_container: {
    // dimensions
    maxWidth: (width * 3) / 4,
    // design
    padding: GAP,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#dae2df",
    backgroundColor: "white",
    // display
    gap: GAP,
  },
});

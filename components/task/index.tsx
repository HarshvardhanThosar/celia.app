import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Avatar, Image, Paragraph, XStack, YStack } from "tamagui";
import { Timer, Users, CalendarDays } from "@tamagui/lucide-icons";
import { GAP, TASK_CROP_MAIN_IMAGE_ASPECT_RATIO } from "@/constants/Dimensions";

const { width } = Dimensions.get("screen");

const Task = () => {
  // return null;
  return (
    <YStack style={styles.task_container}>
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap={10}>
          <Avatar circular size="$4">
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack>
            <Paragraph fontSize={16} fontWeight="500" numberOfLines={1}>
              Harshvardhan Thosar
            </Paragraph>
            <Paragraph fontSize={12}>Athlone • 5m ago</Paragraph>
          </YStack>
        </XStack>
      </XStack>
      <XStack borderRadius={10} gap={2} overflow="hidden">
        <YStack flex={2}>
          <Image
            aspectRatio={TASK_CROP_MAIN_IMAGE_ASPECT_RATIO}
            alt=""
            source={{
              uri: "https://images.squarespace-cdn.com/content/v1/5f96d1beca9a597f9ca38bbe/1608720053171-GJJI8LHSPFF92OJCNY7H/How+to+Create+a+Lawn+Mowing+Business+Name",
            }}
          />
        </YStack>
        <YStack flex={1} flexDirection="column" gap={2}>
          <Image
            flex={1}
            alt=""
            source={{
              uri: "https://images.squarespace-cdn.com/content/v1/5f96d1beca9a597f9ca38bbe/1608720053171-GJJI8LHSPFF92OJCNY7H/How+to+Create+a+Lawn+Mowing+Business+Name",
            }}
          />
          <Image
            flex={1}
            alt=""
            source={{
              uri: "https://images.squarespace-cdn.com/content/v1/5f96d1beca9a597f9ca38bbe/1608720053171-GJJI8LHSPFF92OJCNY7H/How+to+Create+a+Lawn+Mowing+Business+Name",
            }}
          />
        </YStack>
      </XStack>
      <XStack>
        <Paragraph numberOfLines={2}>
          My garden is completely overgrown and needs a major overhaul. We need
          2-3 people to help with heavy-duty weeding, pruning, and planting. The
          work should be completed by the end of the week. It's estimated to
          take 4-6 hours.
        </Paragraph>
      </XStack>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={4}>
          <Timer size={16} />
          <Paragraph fontSize={14}>4h</Paragraph>
        </XStack>
        <XStack alignItems="center" gap={4}>
          <Users size={16} />
          <Paragraph fontSize={14}>4</Paragraph>
        </XStack>
        <XStack alignItems="center" gap={4}>
          <CalendarDays size={16} />
          <Paragraph fontSize={14}>4d</Paragraph>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default Task;

const styles = StyleSheet.create({
  task_container: {
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

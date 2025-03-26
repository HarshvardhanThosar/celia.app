import React from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { Paragraph, XStack, YStack } from "tamagui";
import { Timer, Users, CalendarDays } from "@tamagui/lucide-icons";
import { GAP } from "@/constants/Dimensions";
import { router } from "expo-router";
import { CommunityTaskType } from "@/types/apis";
import Avatar from "../ui/Avatar";
import { formatDistance } from "date-fns";
import MediaGallery from "../ui/MediaGallery";

const { width } = Dimensions.get("screen");

const Task = ({ ...props }: CommunityTaskType) => {
  const _now = React.useMemo(() => new Date(), []);
  const _task_location_label = props?.is_remote ? "Remote" : "Athlone";

  const _navigate_to_dedicated_route = () =>
    router.push({
      pathname: "/community-tasks/[id]",
      params: {
        id: "67e26c9b4cd35e0fdae50a7c",
      },
    });

  return (
    <Pressable onPress={_navigate_to_dedicated_route}>
      <YStack
        style={styles.task_container}
        borderWidth="$0.25"
        borderRadius="$6"
        borderColor="$color"
        p={GAP}
        gap={GAP}
      >
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" gap={GAP}>
            <Avatar
              name={props.owner_details.name}
              profile_image={props.owner_details.profile_image}
              size={GAP * 2.5}
            />
            <YStack>
              <Paragraph fontSize={16} fontWeight="500" numberOfLines={1}>
                {props.owner_details.name}
              </Paragraph>
              <Paragraph
                fontSize={12}
              >{`${_task_location_label} • ${formatDistance(
                props?.created_at ?? _now,
                _now,
                {
                  addSuffix: true,
                }
              )}`}</Paragraph>
            </YStack>
          </XStack>
        </XStack>
        <MediaGallery media={props.media} />
        <XStack>
          <Paragraph numberOfLines={2}>{props.description}</Paragraph>
        </XStack>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap={4}>
            <Timer size={16} />
            <Paragraph fontSize={14}>{props.hours_required_per_day}h</Paragraph>
          </XStack>
          <XStack alignItems="center" gap={4}>
            <Users size={16} />
            <Paragraph fontSize={14}>{props.volunteers_required}</Paragraph>
          </XStack>
          <XStack alignItems="center" gap={4}>
            <CalendarDays size={16} />
            <Paragraph fontSize={14}>
              {formatDistance(props.starts_at, _now, { addSuffix: true })}
            </Paragraph>
          </XStack>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default Task;

const styles = StyleSheet.create({
  task_container: {
    // dimensions
    minWidth: (width * 3) / 4,
    maxWidth: (width * 3) / 4,
    // overflow: "hidden",
  },
});

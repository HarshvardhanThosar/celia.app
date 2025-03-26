import { Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import { CommunityTaskType } from "@/types/apis";
import { Image, ViewProps, XStack, YStack, View, Paragraph } from "tamagui";
import { GAP, TASK_CROP_MAIN_IMAGE_ASPECT_RATIO } from "@/constants/Dimensions";

const { width } = Dimensions.get("window");

const MediaGallery = ({
  media,
  variant = "grid",
  ...props
}: {
  media: CommunityTaskType["media"];
  variant?: "list" | "grid";
} & ViewProps) => {
  if (!media?.length) return;

  if (variant == "grid") {
    return (
      <XStack borderRadius={10} gap={2} overflow="hidden" {...props}>
        {media.length == 1 ? (
          <View w="100%">
            <Image
              aspectRatio={TASK_CROP_MAIN_IMAGE_ASPECT_RATIO}
              alt=""
              source={{
                uri: media[0],
              }}
            />
          </View>
        ) : media.length == 2 ? (
          <React.Fragment>
            <XStack w="100%" gap={GAP / 5}>
              <View flex={1} w="100%" h="100%">
                <Image
                  aspectRatio={TASK_CROP_MAIN_IMAGE_ASPECT_RATIO / 2}
                  alt=""
                  source={{
                    uri: media[0],
                  }}
                />
              </View>
              <View flex={1} w="100%" h="100%">
                <Image
                  aspectRatio={TASK_CROP_MAIN_IMAGE_ASPECT_RATIO / 2}
                  alt=""
                  source={{
                    uri: media[1],
                  }}
                />
              </View>
            </XStack>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <YStack flex={2}>
              <Image
                aspectRatio={TASK_CROP_MAIN_IMAGE_ASPECT_RATIO}
                alt=""
                source={{
                  uri: media[0],
                }}
              />
            </YStack>
            <YStack flex={1} flexDirection="column" gap={2}>
              <View flex={1}>
                <Image
                  flex={1}
                  alt=""
                  source={{
                    uri: media[1],
                  }}
                />
              </View>
              {media?.length > 3 ? (
                <View flex={1} position="relative">
                  <Image
                    flex={1}
                    alt=""
                    source={{
                      uri: media[2],
                    }}
                  />
                  <XStack
                    backgroundColor="#000a"
                    position="absolute"
                    l={0}
                    t={0}
                    r={0}
                    b={0}
                    zIndex={10}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Paragraph>+{media.length - 2} more</Paragraph>
                  </XStack>
                </View>
              ) : null}
            </YStack>
          </React.Fragment>
        )}
      </XStack>
    );
  }

  return (
    <YStack overflow="hidden">
      <FlatList
        horizontal
        data={media}
        ListHeaderComponent={<YStack w={GAP / 2} />}
        ListFooterComponent={<YStack w={GAP / 2} />}
        renderItem={({ index, item }) => (
          <React.Fragment>
            <YStack w={GAP / 2} />
            <View
              width={width * 0.9 - 2 * GAP}
              aspectRatio={TASK_CROP_MAIN_IMAGE_ASPECT_RATIO}
            >
              <Image
                key={index + item}
                alt=""
                objectFit="cover"
                width="100%"
                height="100%"
                borderRadius={GAP / 2}
                source={{
                  uri: item,
                }}
              />
            </View>
            <YStack w={GAP / 2} />
          </React.Fragment>
        )}
      />
    </YStack>
  );
};

export default MediaGallery;

const styles = StyleSheet.create({});

import React from "react";
import { StyleSheet } from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import { GAP } from "@/constants/Dimensions";
import { YStack, Paragraph, H3, XStack } from "tamagui";

const disclaimer = () => {
  return (
    <ScreenWrapper>
      <YStack style={styles.screen} gap={GAP} px={GAP}>
        <H3>Disclaimer.</H3>
        <Paragraph>
          This application is part of a research study aimed at evaluating and
          improving its features to enhance{" "}
          <Paragraph fontWeight="$7">
            volunteer engagement, social impact, and sustainability efforts
          </Paragraph>
          . Your interactions with the application are monitored solely for
          research and development purposes to refine future versions of the
          platform.
        </Paragraph>
        <Paragraph>
          The application does <Paragraph fontWeight="$7">not</Paragraph> track
          or collect any{" "}
          <Paragraph fontWeight="$7">personal information</Paragraph>. The
          application only records{" "}
          <Paragraph fontWeight="$7">feature interactions</Paragraph>, such as:
        </Paragraph>
        <YStack px={GAP}>
          <XStack>
            <Paragraph w="$1">1.</Paragraph>
            <Paragraph>Visiting in-app products or tasks</Paragraph>
          </XStack>
          <XStack>
            <Paragraph w="$1">2.</Paragraph>
            <Paragraph>Creating tasks or participation in tasks</Paragraph>
          </XStack>
          <XStack>
            <Paragraph w="$1">3.</Paragraph>
            <Paragraph>
              Engagement patterns with the social credit system
            </Paragraph>
          </XStack>
        </YStack>
        <Paragraph>
          This data is used to analyze user behavior, improve the effectiveness
          of the platform, and optimize the{" "}
          <Paragraph fontWeight="$7">
            volunteering and reward experience
          </Paragraph>
          . All collected information remains anonymous and is used strictly for
          research and development purposes.
        </Paragraph>
        <Paragraph>
          By using this application, you acknowledge and consent to this data
          collection process for the sole purpose of enhancing the platform’s
          functionality and impact. If you have any concerns or questions,
          please contact us for further details.
        </Paragraph>
      </YStack>
    </ScreenWrapper>
  );
};

export default disclaimer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

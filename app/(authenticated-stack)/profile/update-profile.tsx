import React from "react";
import { StyleSheet } from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import { GAP } from "@/constants/Dimensions";
import { YStack, H1, H5, H2 } from "tamagui";

const disclaimer = () => {
  return (
    <ScreenWrapper>
      <YStack style={styles.screen} gap={GAP} px={GAP}>
        <H2>Disclaimer.</H2>
        <H5 textAlign="justify">
          This application is part of a research study aimed at evaluating and
          improving its features to enhance{" "}
          <H5 textAlign="justify" fontWeight="$7">
            volunteer engagement, social impact, and sustainability efforts
          </H5>
          . Your interactions with the application are monitored solely for
          research and development purposes to refine future versions of the
          platform.
        </H5>
        <H5 textAlign="justify">
          The application does{" "}
          <H5 textAlign="justify" fontWeight="$7">
            not
          </H5>{" "}
          track or collect any{" "}
          <H5 textAlign="justify" fontWeight="$7">
            personal information
          </H5>
          . The application only records{" "}
          <H5 textAlign="justify" fontWeight="$7">
            feature interactions
          </H5>
          , such as:
        </H5>
        <H5 textAlign="justify" pl={GAP * 1.5}>
          1. Visiting in-app products or tasks
        </H5>
        <H5 textAlign="justify" pl={GAP * 1.5}>
          2. Creating tasks or participation in tasks
        </H5>
        <H5 textAlign="justify" pl={GAP * 1.5}>
          3. Engagement patterns with the social credit system
        </H5>
        <H5 textAlign="justify">
          This data is used to analyze user behavior, improve the effectiveness
          of the platform, and optimize the{" "}
          <H5 textAlign="justify" fontWeight="$7">
            volunteering and reward experience
          </H5>
          . All collected information remains anonymous and is used strictly for
          research and development purposes.
        </H5>
        <H5 textAlign="justify">
          By using this application, you acknowledge and consent to this data
          collection process for the sole purpose of enhancing the platform’s
          functionality and impact. If you have any concerns or questions,
          please contact us for further details.
        </H5>
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

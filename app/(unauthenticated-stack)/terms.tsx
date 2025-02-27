import React from "react";
import { StyleSheet } from "react-native";
import ScreenWrapper from "@/components/screen-wrapper";
import { GAP } from "@/constants/Dimensions";
import { YStack, Paragraph, H3, H4, H5, H6, XStack } from "tamagui";
import { Link } from "expo-router";

const disclaimer = () => {
  return (
    <ScreenWrapper>
      <YStack style={styles.screen} gap={GAP} px={GAP}>
        <H3>Terms & Conditions.</H3>
        <H6>Last updated. 27th Feb, 2025</H6>
        <Paragraph>
          Welcome to celia! These Terms and Conditions govern your use of our
          platform, which is designed to encourage volunteerism and
          sustainability through a social credit system. By accessing or using
          the application, you agree to comply with these terms. If you do not
          agree, please refrain from using the application.
        </Paragraph>
        <H5>1. Purpose of the Application</H5>
        <Paragraph>
          This application is part of an ongoing research study to evaluate how
          volunteering activities can help mitigate social isolation and food
          wastage. Users can participate in community tasks, earn social
          credits, and explore potential incentives. The current version is a
          pilot, and features may change as the research progresses.
        </Paragraph>
        <H5>2. Data Collection and Privacy</H5>
        <YStack px="$2">
          <XStack>
            <Paragraph w="$1">1.</Paragraph>
            <Paragraph>
              We do not collect personal or sensitive information.
            </Paragraph>
          </XStack>
          <YStack>
            <XStack>
              <Paragraph w="$1">2.</Paragraph>
              <Paragraph>
                The application only records feature interactions, including:
              </Paragraph>
            </XStack>
            <YStack px="$4">
              <XStack>
                <Paragraph w="$1">a.</Paragraph>
                <Paragraph>Visiting in-app products or tasks</Paragraph>
              </XStack>
              <XStack>
                <Paragraph w="$1">b.</Paragraph>
                <Paragraph>Creating tasks or participating in them</Paragraph>
              </XStack>
              <XStack>
                <Paragraph w="$1">c.</Paragraph>
                <Paragraph>Engagement with the social credit system</Paragraph>
              </XStack>
            </YStack>
          </YStack>
          <XStack>
            <Paragraph w="$1">3.</Paragraph>
            <Paragraph>
              All collected data is used solely for research and development
              purposes to refine the application.
            </Paragraph>
          </XStack>
        </YStack>
        <H5>3. User Responsibilities</H5>
        <YStack px="$2">
          <XStack>
            <Paragraph w="$1">1.</Paragraph>
            <Paragraph>
              Users must provide accurate information when engaging with the
              platform.
            </Paragraph>
          </XStack>
          <XStack>
            <Paragraph w="$1">2.</Paragraph>
            <Paragraph>
              Users should conduct themselves respectfully when creating or
              participating in tasks.
            </Paragraph>
          </XStack>
          <XStack>
            <Paragraph w="$1">3.</Paragraph>
            <Paragraph>
              Misuse of the platform, including spamming, fraudulent activities,
              or inappropriate content, is strictly prohibited.
            </Paragraph>
          </XStack>
        </YStack>
        <H5>4. Limitations of Liability</H5>
        <YStack px="$2">
          <XStack>
            <Paragraph w="$1">1.</Paragraph>
            <Paragraph>
              The application is provided “as is” without warranties of any
              kind.
            </Paragraph>
          </XStack>
          <XStack>
            <Paragraph w="$1">2.</Paragraph>
            <Paragraph>
              The platform does not guarantee the availability of tasks,
              rewards, or partnerships with retailers.
            </Paragraph>
          </XStack>
          <XStack>
            <Paragraph w="$1">3.</Paragraph>
            <Paragraph>
              The research team is not responsible for any technical issues,
              data loss, or unintended system behavior that may occur.
            </Paragraph>
          </XStack>
        </YStack>
        <H5>5. Changes to Terms</H5>
        <Paragraph>
          These terms may be updated periodically to reflect changes in the
          research or application development. Users will be notified of
          significant changes before they take effect.
        </Paragraph>
        <H5>6. Acceptance of Terms</H5>
        <Paragraph>
          By using this application, you acknowledge that you have read,
          understood, and agree to these Terms and Conditions. If you do not
          agree with any part of these terms, please discontinue use of the
          application.
        </Paragraph>
        <Paragraph>
          For any questions or concerns, contact us at{" "}
          <Link href="tel:+353892002400">
            <Paragraph textDecorationLine="underline">(89) 200 2400</Paragraph>
          </Link>
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

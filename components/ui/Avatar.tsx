import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar as TamaguiAvatar, Paragraph } from "tamagui";
import { GAP } from "@/constants/Dimensions";

const Avatar = ({
  profile_image,
  name,
  size = GAP * 2,
}: {
  profile_image?: string | null;
  name?: string;
  size?: number;
}) => {
  const _avatar_initials = `${name?.split(" ")[0].charAt(0)}${name
    ?.split(" ")[1]
    .charAt(0)}`;
  return (
    <TamaguiAvatar
      size={size}
      circular
      backgroundColor="$background"
      alignItems="center"
      justifyContent="center"
    >
      {profile_image && (
        <TamaguiAvatar.Image accessibilityLabel="Profile" src={profile_image} />
      )}
      <TamaguiAvatar.Fallback alignItems="center" justifyContent="center">
        <Paragraph
          fontSize={size < GAP * 2 ? size / 2 : size / 3}
          textAlign="center"
        >
          {_avatar_initials}
        </Paragraph>
      </TamaguiAvatar.Fallback>
    </TamaguiAvatar>
  );
};

export default Avatar;

const styles = StyleSheet.create({});

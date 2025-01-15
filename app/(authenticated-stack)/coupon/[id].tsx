import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>index {id}</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

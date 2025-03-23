import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const index = () => {
  const { id } = useLocalSearchParams();

  React.useLayoutEffect(() => {
    (async () => {
      console.log({ id });
    })();
  }, [id]);

  if (!id) {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.reload();
    }
  }

  return (
    <View>
      <Text>index {id}</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

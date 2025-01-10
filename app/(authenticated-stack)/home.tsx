import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Auth from "@/context/auth.context";

const home = () => {
  const { data } = Auth.useAuth();

  return (
    <View>
      <Text>home</Text>
      <Text>{data?.email}</Text>
      <Text>{data?.name}</Text>
      <Text>{data?.role}</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});

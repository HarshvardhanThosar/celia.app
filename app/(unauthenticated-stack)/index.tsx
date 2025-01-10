import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const login = () => {
  return (
    <View>
      <Text>login</Text>
      <Link href="/register">Register</Link>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({});

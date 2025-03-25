import { Platform, Linking, Alert } from "react-native";

export const STATIC_PARTICIPANT_LOCATION = {
  latitude: 53.4179,
  longitude: -7.9052,
} as const;
export const STATIC_TASK_CREATOR_LOCATION = {
  latitude: 53.425046,
  longitude: -7.944624,
} as const;

export const open_maps_app = (latitude: number, longitude: number) => {
  const lat_lang = `${latitude},${longitude}`;
  let url = "";

  if (Platform.OS === "ios") {
    // Apple Maps
    url = `http://maps.apple.com/?ll=${lat_lang}`;
  } else {
    // Google Maps
    url = `geo:${lat_lang}?q=${lat_lang}`;
  }

  Linking.openURL(url).catch((err) => {
    console.error("An error occurred", err);
    Alert.alert("Error", "Unable to open maps app.");
  });
};

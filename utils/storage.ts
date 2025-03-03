import AsyncStorage from "@react-native-async-storage/async-storage";

export enum STORAGE_KEYS {
  access = "access_token",
  refresh = "refresh_token",
}

const storage = {
  set: async (key: STORAGE_KEYS, value: any) => {
    const string = JSON.stringify(value);
    await AsyncStorage.setItem(key, string);
  },

  get: async (key: STORAGE_KEYS) => {
    return await AsyncStorage.getItem(key);
  },
};

export default storage;

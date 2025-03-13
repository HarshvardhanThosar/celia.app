import storage, { STORAGE_KEYS } from "@/utils/storage";
import axios from "axios";
import { router } from "expo-router";

const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const authenticate_instance = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ` + token;
};

const unauthenticate_instance = () => {
  instance.defaults.headers.delete.Authorization;
};

const logout = async () => {
  await storage.reset(STORAGE_KEYS.access);
  await storage.reset(STORAGE_KEYS.refresh);
  unauthenticate_instance();
  router.replace("/");
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Token expired or invalid.");
      await logout();
    }
    return Promise.reject(error);
  }
);

export { instance, authenticate_instance, unauthenticate_instance };

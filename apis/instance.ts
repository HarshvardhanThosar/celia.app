import axios from "axios";
import { router } from "expo-router";
import storage, { STORAGE_KEYS } from "@/utils/storage";

const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const authenticate_instance = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const unauthenticate_instance = () => {
  delete instance.defaults.headers.common.Authorization;
};

// // Interceptor
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error?.response?.status === 401 || error?.response?.status === 403) {
//       await logout(); // You can later inject pathname if needed
//     }
//     return Promise.reject(error);
//   }
// );

// const logout = async (currentPath?: string) => {
//   await storage.reset(STORAGE_KEYS.access);
//   await storage.reset(STORAGE_KEYS.refresh);
//   unauthenticate_instance();

//   const _is_already_logged_out = currentPath?.startsWith(
//     "/(unauthenticated-stack)"
//   );

//   if (!_is_already_logged_out) {
//     router.replace("/(unauthenticated-stack)"); // send to login
//   }
// };

export { instance, authenticate_instance, unauthenticate_instance };

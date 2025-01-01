import axios from "axios";

const axios_instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export { axios_instance };

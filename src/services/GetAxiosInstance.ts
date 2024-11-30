import axios from "axios";
import { Local } from "./Local";
import host from "@/utils/host";

export const getAxiosInstance = async () => {
  const jwt = await Local.get('JWT');
  const instance = axios.create({
    baseURL: host(),
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  return instance

};
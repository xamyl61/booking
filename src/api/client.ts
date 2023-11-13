import axios from 'axios';
import {getAccessToken} from "@/utils/token";

const BASE_URL = 'https://backmb.aleancollection.ru/api';

const client = axios.create({
  baseURL: BASE_URL
});

client.interceptors.request.use(
    config => {
      const token = getAccessToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
);


client.defaults.headers.common['Content-Type'] = 'application/json';

export default client;
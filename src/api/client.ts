import axios from 'axios';

const BASE_URL = 'https://backmb.aleancollection.ru/api/v1';

const client = axios.create({
  baseURL: BASE_URL
});

client.defaults.headers.common['Content-Type'] = 'application/json';

export default client;
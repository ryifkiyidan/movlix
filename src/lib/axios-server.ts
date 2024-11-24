'use server';

import axios, { AxiosError } from 'axios';

import { UninterceptedApiError } from '@/types/api';

const apiServer = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiServer.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${process.env.TMDB_ACCESS_TOKEN}`;
  }
  return config;
});

apiServer.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  },
);

export default apiServer;

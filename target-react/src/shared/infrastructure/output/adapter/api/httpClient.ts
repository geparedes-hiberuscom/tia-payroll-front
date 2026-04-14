import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    // TODO: Agregar token de autenticación si es necesario
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error.response?.data;
    const backendMessage =
      (typeof responseData === 'string' && responseData)
      || responseData?.message
      || responseData?.error
      || responseData?.detail
      || error.message;

    const message = typeof backendMessage === 'string'
      ? backendMessage
      : JSON.stringify(backendMessage);

    console.error('[HTTP Error]', error.response?.status, message);
    return Promise.reject(new Error(message));
  },
);

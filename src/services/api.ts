// services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.11.40:3001/api', // Remplace avec ton IP backend
  }),
  endpoints: () => ({}),
});

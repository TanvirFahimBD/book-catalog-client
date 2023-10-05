import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-server-hazel.vercel.app',
  }),
  tagTypes: ['books', 'reviews'],
  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const configurationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/config/",
  }),
  endpoints: (builder) => ({
    getWorldConfig: builder.query({
      query: (id) => `world/${id}`,
    }),
    getUnitsConfig: builder.query({
      query: (id) => `units/${id}`,
    }),
    getBuildingsConfig: builder.query({
      query: (id) => `buildings/${id}`,
    }),
  }),
});

export const { useGetWorldConfigQuery, useGetBuildingsConfigQuery, useGetUnitsConfigQuery } = configurationApi;

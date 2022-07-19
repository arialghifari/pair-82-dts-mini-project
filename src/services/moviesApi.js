import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_KEY } from "../apis/tmdb";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    trendingMovieWeek: builder.query({
      query: () => `/trending/movie/week?api_key=${API_KEY}`,
    }),
    trendingMovieIndonesia: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&with_original_language=id&primary_release_date.gte=2021`,
    }),
  }),
});

export const { useTrendingMovieWeekQuery, useTrendingMovieIndonesiaQuery } =
  moviesApi;

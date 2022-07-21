import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_KEY } from "../apis/tmdb";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    popularMovie: builder.query({
      query: () => `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
    }),
    trendingMoviesWeekly: builder.query({
      query: () => `/trending/movie/week?api_key=${API_KEY}`,
    }),
    trendingSeriesWeekly: builder.query({
      query: () => `/trending/tv/week?api_key=${API_KEY}`,
    }),
    trendingMoviesIndonesia: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=id&primary_release_date.gte=2022`,
    }),
    detailMovie: builder.query({
      query: (id) => `/movie/${id}?api_key=${API_KEY}`,
    }),
    movieRecomendations: builder.query({
      query: (id) => `/movie/${id}/recommendations?api_key=${API_KEY}`,
    }),
    movieVideos: builder.query({
      query: (id) => `/movie/${id}/videos?api_key=${API_KEY}`,
    }),
    searchMovies: builder.query({
      query: (query) => `/search/movie?api_key=${API_KEY}&query=${query}`,
    }),
    detailSeries: builder.query({
      query: (id) => `/tv/${id}?api_key=${API_KEY}`,
    }),
    seriesRecomendations: builder.query({
      query: (id) => `/tv/${id}/recommendations?api_key=${API_KEY}`,
    }),
    seriesVideos: builder.query({
      query: (id) => `/tv/${id}/videos?api_key=${API_KEY}`,
    }),
  }),
});

export const {
  usePopularMovieQuery,
  useTrendingMoviesWeeklyQuery,
  useTrendingSeriesWeeklyQuery,
  useTrendingMoviesIndonesiaQuery,
  useDetailMovieQuery,
  useMovieRecomendationsQuery,
  useMovieVideosQuery,
  useDetailSeriesQuery,
  useSeriesRecomendationsQuery,
  useSeriesVideosQuery,
  useSearchMoviesQuery,
} = moviesApi;

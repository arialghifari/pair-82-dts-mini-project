import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_KEY } from "../apis/tmdb";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    popularMovie: build.query({
      query: () => `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
    }),
    trendingMoviesWeekly: build.query({
      query: () => `/trending/movie/week?api_key=${API_KEY}`,
    }),
    trendingSeriesWeekly: build.query({
      query: () => `/trending/tv/week?api_key=${API_KEY}`,
    }),
    trendingMoviesIndonesia: build.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=id&primary_release_date.gte=2022`,
    }),
    detailMovie: build.query({
      query: (id) => `/movie/${id}?api_key=${API_KEY}`,
    }),
    movieVideos: build.query({
      query: (id) => `/movie/${id}/videos?api_key=${API_KEY}`,
    }),
    movieRecommendations: build.query({
      query: (id) => `/movie/${id}/recommendations?api_key=${API_KEY}`,
    }),
    searchMovies: build.query({
      query: (query) => `/search/movie?api_key=${API_KEY}&query=${query}`,
    }),
    detailSeries: build.query({
      query: (id) => `/tv/${id}?api_key=${API_KEY}`,
    }),
    seriesRecommendations: build.query({
      query: (id) => `/tv/${id}/recommendations?api_key=${API_KEY}`,
    }),
    seriesVideos: build.query({
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
  useMovieRecommendationsQuery,
  useMovieVideosQuery,
  useDetailSeriesQuery,
  useSeriesRecommendationsQuery,
  useSeriesVideosQuery,
  useSearchMoviesQuery,
} = moviesApi;

import React, { useState } from "react";
import MovieBanner from "../components/MovieBanner";
import MovieCard from "../components/MovieCard";
import MovieCardTop from "../components/MovieCardTop";
import {
  usePopularMovieQuery,
  useTrendingMoviesWeeklyQuery,
  useTrendingSeriesWeeklyQuery,
  useTrendingMoviesIndonesiaQuery,
} from "../services/moviesApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function HomePage() {
  const {
    data: dataPopular,
    error: errorPopular,
    isLoading: isLoadingPopular,
  } = usePopularMovieQuery();

  const {
    data: dataTrending,
    error: errorTrending,
    isLoading: isLoadingTrending,
  } = useTrendingMoviesWeeklyQuery();

  const {
    data: dataTrendingSeries,
    error: errorTrendingSeries,
    isLoading: isLoadingTrendingSeries,
  } = useTrendingSeriesWeeklyQuery();

  const {
    data: dataInd,
    error: errorInd,
    isLoading: isLoadingInd,
  } = useTrendingMoviesIndonesiaQuery();

  return (
    <div className="mb-20">
      {errorPopular ? (
        <>Oh no, there was an error</>
      ) : isLoadingPopular ? (
        <p className="text-center">Loading..</p>
      ) : dataPopular ? (
        <>
          <Swiper
            navigation={true}
            slidesPerView={1}
            effect="fade"
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay, EffectFade]}
            className="mySwiper"
          >
            {dataPopular.results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieBanner item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : null}

      {errorTrending ? (
        <>Oh no, there was an error</>
      ) : isLoadingTrending ? (
        <p className="text-center"></p>
      ) : dataTrending ? (
        <>
          <p className="text-xl font-bold mt-10 my-4">🔥 Trending This Week</p>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
          >
            {dataTrending.results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard key={item.id} item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : null}

      {errorInd ? (
        <>Oh no, there was an error</>
      ) : isLoadingInd ? (
        <p className="text-center"></p>
      ) : dataInd ? (
        <>
          <p className="text-xl font-bold mt-10 mb-4">
            🥇 Top 10 Indonesian Movies
          </p>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {dataInd.results.slice(0, 10).map((item, index) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCardTop key={item.id} item={item} top={index + 1} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : null}

      {errorTrendingSeries ? (
        <>Oh no, there was an error</>
      ) : isLoadingTrendingSeries ? (
        <p className="text-center"></p>
      ) : dataTrendingSeries ? (
        <>
          <p className="text-xl font-bold mt-10 my-4">⭐Best Series</p>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
          >
            {dataTrendingSeries.results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard key={item.id} item={item} movie={false} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : null}
    </div>
  );
}

export default HomePage;

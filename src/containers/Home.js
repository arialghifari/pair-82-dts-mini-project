import React, { useState } from "react";
import MovieBanner from "../components/MovieBanner";
import MovieCard from "../components/MovieCard";
import {
  usePopularMovieQuery,
  useTrendingMovieWeekQuery,
  useTrendingMovieIndonesiaQuery,
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
  } = useTrendingMovieWeekQuery();

  const {
    data: dataInd,
    error: errorInd,
    isLoading: isLoadingInd,
  } = useTrendingMovieIndonesiaQuery();

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
          <p className="text-xl font-bold mt-10 mb-4">Indonesian Pride</p>
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
            {dataInd.results.slice(0, 10).map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard key={item.id} item={item} />
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

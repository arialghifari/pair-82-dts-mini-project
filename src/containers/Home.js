import React from "react";
import MovieCard from "../components/MovieCard";
import {
  useTrendingMovieWeekQuery,
  useTrendingMovieIndonesiaQuery,
} from "../services/moviesApi";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function HomePage() {
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
      {errorTrending ? (
        <>Oh no, there was an error</>
      ) : isLoadingTrending ? (
        <p className="text-center">Loading...</p>
      ) : dataTrending ? (
        <>
          <p className="text-xl font-bold my-4">🔥 Trending This Week</p>
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
                  <MovieCard item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : null}

      {errorInd ? (
        <>Oh no, there was an error</>
      ) : isLoadingInd ? (
        <p className="text-center">Loading...</p>
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
            {dataInd.results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
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

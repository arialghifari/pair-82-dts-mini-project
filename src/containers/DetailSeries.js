import React, { useEffect, useState } from "react";
import {
  useDetailSeriesQuery,
  useSeriesSimilarQuery,
  useSeriesRecommendationsQuery,
  useSeriesVideosQuery,
} from "../services/moviesApi";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL } from "../apis/tmdb";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import Modal from "../components/Modal";

function HomePage() {
  window.scrollTo(0, 0);

  const [modal, setModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const formatDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const formatDate = date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formatDate;
  };

  const { id } = useParams();
  const { data, error, isLoading } = useDetailSeriesQuery(`${id}`);
  const {
    data: dataSeriesSim,
    error: errorSeriesSim,
    isLoading: isLoadingSeriesSim,
  } = useSeriesSimilarQuery(`${id}`);
  const {
    data: dataSeriesRec,
    error: errorSeriesRec,
    isLoading: isLoadingSeriesRec,
  } = useSeriesRecommendationsQuery(`${id}`);
  const {
    data: dataSeriesVid,
    error: errorSeriesVid,
    isLoading: isLoadingSeriesVid,
  } = useSeriesVideosQuery(`${id}`);

  useEffect(() => {
    setTrailerKey("");

    const getTrailerKey = async () => {
      const trailerKeyIn = (await dataSeriesVid)
        ? dataSeriesVid.results.filter((vid) => vid.type === "Trailer")[0]?.key
        : undefined;

      setTrailerKey(trailerKeyIn);
    };

    getTrailerKey();
  }, [dataSeriesVid]);

  return (
    <div className="mb-20">
      {error || errorSeriesRec || errorSeriesVid || errorSeriesSim ? (
        <p className="text-center">Oh no, there was an error</p>
      ) : isLoading ||
        isLoadingSeriesRec ||
        isLoadingSeriesVid ||
        isLoadingSeriesSim ? (
        <p className="text-center">Loading...</p>
      ) : data && dataSeriesRec && dataSeriesVid && dataSeriesSim ? (
        <>
          {/* Detail Series */}
          <div className="relative">
            <div className="container">
              <div className="absolute z-20 container pl-0 pr-8 h-full flex justify-center gap-10 items-center">
                <img
                  src={`${BASE_IMAGE_URL}${data.poster_path}`}
                  alt={data.name}
                  className="h-[28rem] w-[18rem] object-cover object-center rounded-md shadow-lg shadow-neutral-900"
                />
                <div className="flex max-w-3xl gap-4 flex-col justify-center">
                  {trailerKey ? (
                    <button
                      onClick={() => setModal(true)}
                      className="flex items-center gap-1 bg-red-700 hover:bg-red-800 w-fit text-zinc-200 cursor-pointer py-2 px-3 rounded-sm"
                    >
                      <img src="/ic_play.svg" alt="" />
                      Watch Trailer
                    </button>
                  ) : (
                    <p className="flex items-center gap-1 bg-zinc-400 w-fit text-black py-2 px-3 rounded-sm">
                      <img src="/ic_info.svg" alt="" /> Trailer not available
                    </p>
                  )}
                  <div className="my-5">
                    <p className="font-bold text-4xl text-shadow-title leading-[3.35rem]">
                      {`${data.name}`}{" "}
                      {data.first_air_date &&
                        `(${data.first_air_date.split("-")[0]})`}
                    </p>
                    {data.tagline && (
                      <p className="text-lg italic text-shadow-desc text-zinc-200">
                        "{data.tagline}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <p className="flex gap-1 w-fit font-semibold text-shadow-white text-zinc-900 text-sm px-2 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-500">
                        <img src="/ic_calendar.svg" alt="" />
                        {formatDate(data.first_air_date)}
                      </p>
                      <p className="flex gap-1 w-fit font-semibold text-shadow-white text-zinc-900 text-sm px-2 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-500">
                        <img src="/ic_clock.svg" alt="" />
                        {data.last_episode_to_air.runtime}min
                      </p>
                      <p className="flex gap-1 w-fit font-medium text-shadow-white text-zinc-300 text-sm px-2 rounded-sm bg-gradient-to-br from-gray-900 to-gray-700">
                        {`${data.number_of_seasons} seasons`}
                      </p>
                      <p className="flex gap-1 w-fit font-medium text-shadow-white text-zinc-300 text-sm px-2 rounded-sm bg-gradient-to-br from-gray-900 to-gray-700">
                        {`${data.number_of_episodes} episodes`}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.genres.map((genre, index) => (
                        <p
                          key={index}
                          className="text-shadow-white text-zinc-200 text-sm px-2 rounded-sm bg-gradient-to-br from-red-700"
                        >
                          {genre.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="text-shadow-desc text-lg text-zinc-200">
                    {data.overview}
                  </p>
                </div>
              </div>
            </div>
            {data.backdrop_path ? (
              <img
                src={`${BASE_IMAGE_URL}${data.backdrop_path}`}
                alt={data.title}
                className="h-[46rem] w-[200rem] object-cover object-center"
              />
            ) : (
              <div className="h-[46rem]" />
            )}
            <div className="absolute top-0 bg-zinc-900 h-full w-full z-10 opacity-90"></div>
          </div>

          {/* Series Trailer */}
          <Modal modal={modal} setModal={setModal} trailerKey={trailerKey} />

          {/* Similar Series */}
          <div className="container">
            <p className="text-xl font-bold mt-16 my-4">Similar Series</p>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              className="mySwiper"
              breakpoints={{
                440: {
                  slidesPerView: 2,
                },
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
              {dataSeriesSim.total_results > 0 ? (
                dataSeriesSim.results.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <MovieCard key={item.id} item={item} movie={false} />
                    </SwiperSlide>
                  );
                })
              ) : (
                <p>Not available</p>
              )}
            </Swiper>
          </div>

          {/* Recommended Series */}
          <div className="container">
            <p className="text-xl font-bold mt-10 my-4">Recommended Series</p>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              className="mySwiper"
              breakpoints={{
                440: {
                  slidesPerView: 2,
                },
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
              {dataSeriesRec.total_results > 0 ? (
                dataSeriesRec.results.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <MovieCard key={item.id} item={item} movie={false} />
                    </SwiperSlide>
                  );
                })
              ) : (
                <p>Not available</p>
              )}
            </Swiper>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default HomePage;

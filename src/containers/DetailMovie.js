import React, { useEffect, useState } from "react";
import {
  useDetailMovieQuery,
  useMovieRecomendationsQuery,
  useMovieVideosQuery,
} from "../services/moviesApi";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL } from "../apis/tmdb";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";

function HomePage() {
  window.scrollTo(0, 0);

  const [modal, setModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleModalClose = () => {
    setModal(false);
    const iframe = document.querySelector("iframe");
    const tempSrc = iframe.src;
    iframe.src = "";
    iframe.src = tempSrc;
  };

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
  const { data, error, isLoading } = useDetailMovieQuery(`${id}`);
  const {
    data: dataMovieRec,
    error: errorMovieRec,
    isLoading: isLoadingMovieRec,
  } = useMovieRecomendationsQuery(`${id}`);
  const {
    data: dataMovieVid,
    error: errorMovieVid,
    isLoading: isLoadingMovieVid,
  } = useMovieVideosQuery(`${id}`);

  useEffect(() => {
    setTrailerKey("");

    const getTrailerKey = async () => {
      const trailerKeyIn = (await dataMovieVid)
        ? dataMovieVid.results.filter((vid) => vid.type === "Trailer")[0]?.key
        : undefined;

      setTrailerKey(trailerKeyIn);
    };

    getTrailerKey();
  }, [dataMovieVid]);

  return (
    <div className="mb-20">
      {error ? (
        <p className="text-center">Oh no, there was an error</p>
      ) : isLoading ? (
        <p className="text-center">Loading...</p>
      ) : data ? (
        <div className="relative">
          <div className="container">
            <div className="absolute z-20 container pl-0 pr-8 h-full flex gap-10 items-center">
              <img
                src={
                  data.poster_path
                    ? `${BASE_IMAGE_URL}${data.poster_path}`
                    : "/image_not_found.png"
                }
                alt={data.title}
                className="h-[28rem] w-[18rem] object-cover object-center rounded-md shadow-lg shadow-neutral-900"
              />
              <div className="flex gap-4 flex-col justify-center">
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
                    <img src="/ic_info.svg" alt="" /> Trailer Unavailable
                  </p>
                )}
                <p className="font-bold text-4xl text-shadow-title leading-[3.35rem]">
                  {`${data.title}`}{" "}
                  {data.release_date && `(${data.release_date.split("-")[0]})`}
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p className="flex gap-1 w-fit font-semibold text-shadow-white text-black text-sm px-2 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-500">
                      <img src="/ic_calendar.svg" alt="" />
                      {formatDate(data.release_date)}
                    </p>
                    <p className="flex gap-1 w-fit font-semibold text-shadow-white text-black text-sm px-2 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-500">
                      <img src="/ic_clock.svg" alt="" />
                      {data.runtime}min
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
              className="h-[42rem] w-[200rem] object-cover object-center"
            />
          ) : (
            <div className="h-[42rem]" />
          )}
          <div className="absolute top-0 bg-zinc-900 h-full w-full z-10 opacity-90"></div>
        </div>
      ) : null}

      {errorMovieRec ? (
        <></>
      ) : isLoadingMovieRec ? (
        <></>
      ) : dataMovieRec ? (
        <div className="container">
          <p className="text-xl font-bold mt-16 my-4">Recomendations</p>
          <Swiper
            slidesPerView={2}
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
            {dataMovieRec.total_results > 0 ? (
              dataMovieRec.results.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <MovieCard key={item.id} item={item} />
                  </SwiperSlide>
                );
              })
            ) : (
              <p>Not available</p>
            )}
          </Swiper>
        </div>
      ) : null}

      {/* Modals */}
      {errorMovieVid ? (
        <p className="text-center"></p>
      ) : isLoadingMovieVid ? (
        <p className="text-center"></p>
      ) : dataMovieVid ? (
        <>
          <div
            className={`${
              modal ? "fixed" : "hidden"
            } bg-zinc-900 opacity-80 z-50 top-0 left-0 right-0 h-screen`}
          />
          <div
            onClick={handleModalClose}
            className={`${
              modal ? "fixed" : "hidden"
            } z-50 top-0 left-0 right-0 h-screen flex justify-center items-center`}
          >
            <div className="w-[70%] h-[80%] relative border-4 border-red-800">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <button
                onClick={handleModalClose}
                className="absolute -top-3.5 -right-3.5 bg-red-700 rounded-sm p-0.5"
              >
                <img src="/ic_close.svg" alt="Close" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default HomePage;

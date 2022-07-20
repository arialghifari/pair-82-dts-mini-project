import React, { useEffect } from "react";
import { useDetailSeriesQuery } from "../services/moviesApi";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL } from "../apis/tmdb";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                src={`${BASE_IMAGE_URL}${data.poster_path}`}
                alt={data.name}
                className="h-[28rem] w-[18rem] object-cover object-center rounded-md shadow-lg shadow-neutral-900"
              />
              <div className="flex gap-4 flex-col justify-center">
                <p className="flex gap-1 bg-red-700 hover:bg-red-800 w-fit text-zinc-200 cursor-pointer py-2 px-3 rounded-sm">
                  <img src="/ic_play.svg" alt="" />
                  Watch Trailer
                </p>
                <p className="font-bold text-4xl text-shadow-title leading-[3.35rem]">
                  {`${data.name} (${data.first_air_date.split("-")[0]})`}
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p className="flex gap-1 w-fit font-medium text-shadow-white text-black text-sm px-2 rounded-sm bg-zinc-300">
                      <img src="/ic_calendar.svg" alt="" />
                      {formatDate(data.first_air_date)}
                    </p>
                    <p className="flex gap-1 w-fit font-medium text-shadow-white text-black text-sm px-2 rounded-sm bg-zinc-300">
                      <img src="/ic_clock.svg" alt="" />
                      {data.last_episode_to_air.runtime}min
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
                <p className="text-shadow-desc text-lg">{data.overview}</p>
              </div>
            </div>
          </div>
          <img
            src={`${BASE_IMAGE_URL}${data.backdrop_path}`}
            alt={data.title}
            className="h-[42rem] w-[200rem] object-cover object-center"
          />
          <div className="absolute top-0 bg-zinc-900 h-full w-full z-10 opacity-90"></div>
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;

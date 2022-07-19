import React from "react";
import { Link } from "react-router-dom";
import { BASE_IMAGE_URL } from "../apis/tmdb";

function MovieCard({ item }) {
  const formatDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const formatDate = date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formatDate;
  };

  return (
    <Link to={`/movie/${item.id}`}>
      <div className="movie-card flex flex-col gap-2 cursor-pointer">
        <img
          src={`${BASE_IMAGE_URL}${item.poster_path}`}
          alt={item.title}
          className="h-72 w-48 rounded-md object-cover object-center"
        />
        <p className="movie-card__title font-medium">
          {item.title}
        </p>
        <p className="text-sm">{formatDate(item.release_date)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;

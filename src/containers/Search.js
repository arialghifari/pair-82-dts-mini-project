import React from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useSearchMoviesQuery } from "../services/moviesApi";

function Search() {
  window.scrollTo(0, 0);
  const { query } = useParams();
  const { data, error, isLoading } = useSearchMoviesQuery(`${query}`);

  return (
    <div className="container mb-20">
      <p className="font-semibold text-lg pt-2 pb-6 text-zinc-200">
        Result for "{query}"
      </p>
      {error ? (
        <p className="text-center">Oh no, there was an error</p>
      ) : isLoading ? (
        <p className="text-center">Loading...</p>
      ) : data ? (
        <div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {data.total_results > 0 ? (
              data.results.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))
            ) : (
              <p>Not found</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Search;

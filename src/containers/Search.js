import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useSearchMoviesQuery } from "../services/moviesApi";

function Search() {
  window.scrollTo(0, 0);
  const { query, page } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSearchMoviesQuery({
    query: query,
    page: page,
  });

  const handlePrev = () => {
    navigate(`/search/${query}/${parseInt(page) - 1}`);
  };
  const handlePrevState = page <= 1 ? false : true;

  const handleNext = () => {
    navigate(`/search/${query}/${parseInt(page) + 1}`);
  };
  const handleNextState = data?.results.length < 20 ? false : true;

  return (
    <div className="container mb-20">
      {error ? (
        <p className="text-center">Oh no, there was an error</p>
      ) : isLoading ? (
        <p className="text-center">Loading...</p>
      ) : data ? (
        <>
          <p className="font-semibold text-lg pt-4 pb-6 text-zinc-200">
            Search Result for "{query}"
          </p>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {data.total_results > 0 ? (
              data.results.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))
            ) : (
              <p>Not found</p>
            )}
          </div>

          <div className="flex justify-center">
            <div className="flex justify-between gap-4 mt-10">
              {handlePrevState ? (
                <button
                  onClick={handlePrev}
                  className="border-2 border-red-700 hover:bg-red-700 rounded-sm px-6 py-1"
                >
                  Prev Page
                </button>
              ) : (
                <button className="cursor-default border-2 border-zinc-600 text-zinc-600 rounded-sm px-6 py-1">
                  Prev Page
                </button>
              )}

              {handleNextState ? (
                <button
                  onClick={handleNext}
                  className="border-2 border-red-700 hover:bg-red-700 rounded-sm px-6 py-1"
                >
                  Next Page
                </button>
              ) : (
                <button className="cursor-default border-2 border-zinc-600 text-zinc-600 rounded-sm px-6 py-1">
                  Next Page
                </button>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Search;

import { Button } from "@/components/ui/button";
import { Suspense, useEffect } from "react";
import TrandingMovieGroup from "@/components/TrandingMovieGroup";
import { Link } from "react-router-dom";
import TrandingSeriesGroup from "@/components/TrandingSeriesGroup";
import SearchBox from "@/components/SearchBox";
import { trandingMovies, trasndingSeries } from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import { getCurrentDate } from "@/lib/CurrentDate";
import { MovieCardLoder } from "@/components/MovieCard";

function Home() {
  const date = parseInt(getCurrentDate());
  const {
    data: trandingData,

    isLoading: trandingLoding,
  } = useQuery({
    queryKey: ["trandingMovies", date],
    queryFn: () => trandingMovies(1, date),
    staleTime: 60 * 60 * 1000,
  });
  const {
    data: trasndingSeriesData,
 
    isLoading: TrandingSeriesLoding,
  } = useQuery({
    queryKey: ["trandingSeries", date],
    queryFn: () => trasndingSeries(1, date),
    staleTime: 60 * 60 * 1000,
  });
  useEffect(()=>{
    document.title = "WatcherHub Home";
  },[])
  return (
    <main className="min-h-screen w-full px-5 md:px-10 xl:px-20 space-y-8">
      <SearchBox className="xl:w-1/2 mx-auto" />
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl">Trending Movies</h3>
          <Link to={"/all-movies"}>
            <Button>All Movies</Button>
          </Link>
        </div>
        <Suspense fallback={<MovieCardLoder />}>
          {trandingLoding ? (
            <MovieCardLoder />
          ) : (
            <TrandingMovieGroup data={trandingData!} />
          )}
        </Suspense>
      </section>
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl">Trending Series</h3>
          <Link to={"/all-series"}>
            <Button>All Series</Button>
          </Link>
        </div>
        {TrandingSeriesLoding ? (
          <MovieCardLoder />
        ) : (
          <TrandingSeriesGroup data={trasndingSeriesData!} />
        )}
      </section>
    </main>
  );
}

export default Home;

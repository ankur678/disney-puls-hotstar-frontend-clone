import { trendingDiscoverMoviesResultProps } from "@/helpers/trandingDiscover";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const FeaturedMoviesSwiperCon = ({
  data,
  setActiveIndex,
  setShowTrailer,
  activeIndex,
}: {
  data: trendingDiscoverMoviesResultProps[];
  setActiveIndex: (n: number) => void;
  setShowTrailer: (b: boolean) => void;
  activeIndex: number;
}) => {
  const containerRef = useRef(null);
  const [hiddenItemsCount, setHiddenItemsCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const itemWidth = container.querySelector(".item").offsetWidth;

    const totalItemsCount = data.length;
    const visibleItemsCount = Math.floor(containerWidth / itemWidth);
    const hiddenCount = totalItemsCount - visibleItemsCount;

    setHiddenItemsCount(hiddenCount);
  }, [data]);

  const scrollHiddenItemsLeft = () => {
    const container = containerRef.current;
    const itemWidth = container.querySelector(".item").offsetWidth;
    const scrollAmount = itemWidth * hiddenItemsCount + itemWidth * 2;

    container.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const scrollHiddenItemsRight = () => {
    const container = containerRef.current;
    const itemWidth = container.querySelector(".item").offsetWidth;
    const scrollAmount = itemWidth * hiddenItemsCount + itemWidth * 2;

    container.scrollBy({
      top: 0,
      left: -scrollAmount,
      behavior: "smooth",
    });
  };
  console.log(hiddenItemsCount);
  return (
    <div className=" sm:w-72 lg:w-96 xl:w-[30rem] md:h-16">
      <div className="w-fyll h-full relative z-10 flex justify-end overflow-hidden">
        <button
          className={cn(
            "h-10 lg:h-12 w-8 cursor-pointer  transition-all duration-300 ease-in-out absolute  bottom-0 transform  left-0 bg-gradient-to-r from-black z-20"
          )}
          onClick={scrollHiddenItemsRight}
        >
          <IoIosArrowBack className="w-8 h-8 text-white" />
        </button>
        <div
          className="flex space-x-2 items-end overflow-hidden pl-2"
          ref={containerRef}
        >
          {data.map((movie, index) => (
            <div
              key={index}
              className={cn(
                "item w-16 h-10 lg:w-20 lg:h-12 bg-cover bg-top bg-no-repeat rounded-md overflow-hidden cursor-pointer opacity-50 border-white hover:opacity-100 hover:scale-110  hover:-translate-y-2 transition-all duration-300 ease-in-out shrink-0",
                {
                  "opacity-100 border ": data.indexOf(movie) === activeIndex,
                  "hover:scale-100 hover:-translate-y-0":
                    data.indexOf(movie) === activeIndex,
                }
              )}
              onClick={() => setActiveIndex(index)}
            >
              <div>
                <img
                  src={`https://media.themoviedb.org/t/p/w92${movie.poster_path}`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className={cn(
            "h-12 w-8 cursor-pointer  transition-all duration-300 ease-in-out absolute  bottom-0 transform  right-0 bg-gradient-to-r from-black z-20",
            {
              "hidden invisible opacity-0": hiddenItemsCount === 0,
              "block visible opacity-100": hiddenItemsCount > 0,
            }
          )}
          onClick={scrollHiddenItemsLeft}
        >
          <IoIosArrowForward className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedMoviesSwiperCon;

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Header from "./components/Header";
import Filters from "./components/Filters";
import MovieCard from "./components/MovieCard";
import MovieTrailerPopup from "./components/MovieTrailerPopup";

import "./App.css";

function App() {

  const [data, setData] = useState(null);
  //Filtered Data
  const  [filtereddata, setFiltereddata] = useState(null);

  //Filters
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = React.useState("newest");
  const [moviesToShow, setMoviesToShow] = useState(20);

  //Selected Movie
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://in.bmscdn.com/m6/static/interview-mock/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    if(data && Object.keys(data).length > 0){
      const filterMovies = () => {
        if (!data || !data.moviesData) return [];
    
        let movies = Object.values(data.moviesData).filter((movie) => {
          return (
            (selectedLanguages.length === 0 ||
              selectedLanguages.includes(movie.EventLanguage)) &&
            (selectedGenres.length === 0 ||
              movie.EventGenre.split("|").some((genre) =>
                selectedGenres.includes(genre)
              )) &&
            movie?.EventTitle?.toLowerCase()?.includes(searchTerm.toLowerCase())
          );
        });
    
        switch (sortCriteria) {
          case "newest":
            return movies.sort(
              (a, b) => new Date(b.ShowDate) - new Date(a.ShowDate)
            );
          case "oldest":
            return movies.sort(
              (a, b) => new Date(a.ShowDate) - new Date(b.ShowDate)
            );
          case "votes":
            return movies.sort(
              (a, b) => b.ratings.totalWTSCount - a.ratings.totalWTSCount
            );
          default:
            return movies;
        }
      };

      const tFiltered = filterMovies();
      setFiltereddata(tFiltered);
    }
  }, [data, selectedLanguages, selectedGenres, searchTerm, sortCriteria]);

  

  const clearAllFilters = () => {
    setSelectedLanguages([]);
    setSelectedGenres([]);
    setSearchTerm("");
    setSortCriteria("newest");
  };


  return (
    <div className="App">
      <Header />
      <Filters
        languages={data?.languageList || []}
        genres={
          data
            ? [
                ...new Set(
                  Object.values(data?.moviesData).flatMap((movie) =>
                    movie?.EventGenre?.split("|")
                  )
                ),
              ]
            : []
        }
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        onClearAll={clearAllFilters}
      />

      <InfiniteScroll
        dataLength={moviesToShow}
        next={() => setMoviesToShow((prev) => prev + 10)}
        hasMore={moviesToShow < filtereddata?.length}
        loader={<h4>Loading...</h4>}
      >
        <div className="movies">
          {filtereddata?.slice(0, moviesToShow).map((movie) => (
            <MovieCard
              key={movie?.EventCode}
              movie={movie}
              onPlayClicked={setSelectedMovie}
            />
          ))}
        </div>
      </InfiniteScroll>

      {selectedMovie && (
        <MovieTrailerPopup
          onClick={() => setSelectedMovie(null)}
          movie={selectedMovie}
        />
      )}

    </div>
  );
}

export default App;

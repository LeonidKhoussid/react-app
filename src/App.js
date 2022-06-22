import * as React from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import axios from "axios";

const API_URL = "https://www.omdbapi.com?apikey=d024c15c";

const movie1 = {
  Title: "Italian Spiderman",
  Year: "2007",
  imdbID: "tt2705436",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const debounce = React.useCallback(
    (value) => {
      clearTimeout(searchTimeout);

      setSearchTimeout(
        setTimeout(() => {
          searchMovies(value);
        }, 2000)
      );
    },
    [searchTimeout]
  );

  const handleSearchChange = React.useCallback(
    ({ target: { value } }) => {
      setSearchValue(value);
      debounce(value);
    },
    [searchTimeout, debounce]
  );

  return (
    <AppContainer>
      <HeadingContainer>
        <Heading>MovieLand</Heading>
      </HeadingContainer>

      <SearchContainer>
        <Search>
          <input
            placeholder="Search for movies"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <img src={SearchIcon} alt="search" onClick={() => {}} />
        </Search>
      </SearchContainer>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  padding: 4rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0 2rem;
`;

const Search = styled.div`
  width: 35rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem;
  border-radius: 3rem;
  background: #1f2123;
  -webkit-box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
  box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;

  > input {
    flex: 1;
    border: none;
    font-size: 1.5rem;
    font-family: var(--font-raleway);
    font-weight: 500;
    padding-right: 1rem;

    outline: none;
    color: #a1a1a1;
    background: #1f2123;
  }

  > img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 3rem;
`;

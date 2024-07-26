import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import CharacterCard from "./components/character-card";
import Loader from "./components/loader";
import Navbar from "./components/navbar";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        next
        prev
        pages
      }
    }
  }
`;

function App() {
  const client = useApolloClient();
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    next: null,
    prev: null,
    pages: 0,
  });
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    client
      .query({ query: GET_CHARACTERS, variables: { page } })
      .then((result) => {
        console.log(result.data.characters.results);
        setCharacters(result.data.characters.results);
        setPageInfo(result.data.characters.info);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, [client, page]);

  const handleNextPage = () => {
    if (pageInfo.next) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo.prev) {
      setPage(page - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageDropdown = () => {
    return (
      <select
        className="form-select form-select-lg"
        value={page}
        onChange={(e) => handlePageClick(Number(e.target.value))}
        disabled={loading}
      >
        {Array.from({ length: pageInfo.pages }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mb-3">
        <h1 className="text-center fw-semibold">
          Rick and Morty Character List
        </h1>

        {loading ? ( // Display loading text when loading
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Loader></Loader>
          </div>
        ) : (
          <div className="row justify-content-center gap-3">
            {characters.map((character, index) => (
              <CharacterCard key={index} character={character}></CharacterCard>
            ))}
          </div>
        )}

        <div className="pagination-controls d-flex justify-content-around mt-3">
          <button
            className="btn btn-primary"
            onClick={handlePrevPage}
            disabled={!pageInfo.prev || loading}
          >
            Previous
          </button>
          <div className="col-md-2">{renderPageDropdown()}</div>
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={!pageInfo.next || loading}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

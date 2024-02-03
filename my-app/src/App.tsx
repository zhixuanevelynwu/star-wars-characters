import useFetchCharacters from "./hooks/UseFetchCharacters";
import CharacterCard from "./components/CharacterCard";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const MyApp: React.FC = () => {
  const {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchTerm,
  } = useFetchCharacters();

  const handleSearch = (e: any) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim();
    setSearchTerm(searchTerm);
    // reset to the first page to show search results
    setCurrentPage(1);
  };

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <form onSubmit={handleSearch}>
        <InputGroup className="mb-3" id="search-bar">
          <Form.Control name="search" placeholder="Search characters..." />
          <Button type="submit" variant="outline-secondary">
            Search
          </Button>
        </InputGroup>
      </form>

      <hr />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div id="card-container">
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousClick} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyApp;

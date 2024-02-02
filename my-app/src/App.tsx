import useFetchCharacters from "./hooks/UseFetchCharacters";
import CharacterCard from "./components/CharacterCard";
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
  } = useFetchCharacters();

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1>Star Wars Characters</h1>
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

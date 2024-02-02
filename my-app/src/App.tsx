import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import CharacterCard from "./components/CharacterCard";

/**
 * https://swapi.dev/
 * @returns display a list of all Star Wars characters using the endpoint “/people".
 */
export default function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Function to fetch characters
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();
        console.log(data);
        setCharacters(data.results);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <div id="card-container">
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { Character } from '../types/Character';

type FetchCharactersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

const useFetchCharacters = (initialPage = 1) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchCharacters = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const data: FetchCharactersResponse = await response.json();
      setCharacters(data.results);
      setError(null);

      // Assuming 10 characters per page as per SWAPI documentation
      const calculatedTotalPages = Math.ceil(data.count / 10);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      setError("Failed to fetch characters");
      console.error("Failed to fetch characters:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage, fetchCharacters]);

  return { characters, loading, error, currentPage, totalPages, setCurrentPage };
};

export default useFetchCharacters;

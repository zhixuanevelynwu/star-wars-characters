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
  const [searchTerm, setSearchTerm] = useState('');

  // fetches characters on current page, also called when searchTerm changes
  const fetchCharacters = useCallback(async (page: number) => {
    setLoading(true);
    const baseUrl = `https://swapi.dev/api/people/`;
    const searchQuery = searchTerm ? `?search=${searchTerm}` : `?page=${page}`;
    try {
      const response = await fetch(`${baseUrl}${searchQuery}`);
      const data: FetchCharactersResponse = await response.json();
      setCharacters(data.results);
      setError(null);

      // 10 characters per page as per documentation
      const calculatedTotalPages = searchTerm ? 1 : Math.ceil(data.count / 10);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      setError("Failed to fetch characters");
      console.error("Failed to fetch characters:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);
  

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage, fetchCharacters]);

  return { characters, loading, error, currentPage, totalPages, setCurrentPage, setSearchTerm };
};

export default useFetchCharacters;

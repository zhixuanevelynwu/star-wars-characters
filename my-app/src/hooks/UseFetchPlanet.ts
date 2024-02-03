import { useState, useEffect } from 'react';
import { Planet } from '../types/Planet';

/**
 * 
 * @param homeworldUrl link to character's homeworld
 * @returns 
 */
const useFetchPlanet = (homeworldUrl: string) => {
  const [planet, setPlanet] = useState<Planet>({} as Planet);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      if (!homeworldUrl) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(homeworldUrl);
        const data = await response.json();
        setPlanet(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch planet");
        console.error("Failed to fetch planet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [homeworldUrl]);

  return { planet, loading, error };
};

export default useFetchPlanet;

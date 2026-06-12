import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Standing } from '../types';

export function useStandings() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStandings();
  }, []);

  async function loadStandings() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getStandings();
      setStandings(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar classificação');
    } finally {
      setLoading(false);
    }
  }

  return { standings, loading, error, reload: loadStandings };
}
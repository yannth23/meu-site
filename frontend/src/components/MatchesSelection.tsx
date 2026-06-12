import { MatchCard } from './MatchCard';
import { Loading } from './Loading';
import { EmptyState } from './EmptyState';

import { useMatches } from '../hooks/useMatches';

export function MatchesSection() {
  const { matches, loading } = useMatches();

  if (loading) {
    return <Loading />;
  }

  if (!matches.length) {
    return (
      <EmptyState message="Nenhuma partida encontrada." />
    );
  }

  return (
    <section
      id="matches"
      className="px-4 py-12"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-6">
          Jogos de Hoje
        </h2>

        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
import { Loading } from './Loading';
import { EmptyState } from './EmptyState';

import { useStandings } from '../hooks/useStandings';

export function StandingsTable() {
  const { standings, loading } =
    useStandings();

  if (loading) {
    return <Loading />;
  }

  if (!standings.length) {
    return (
      <EmptyState message="Classificação indisponível." />
    );
  }

  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-black mb-6">
          Classificação
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-800">

          <table className="w-full">

            <thead className="bg-slate-900">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4">Pts</th>
                <th className="p-4">J</th>
                <th className="p-4">V</th>
                <th className="p-4">E</th>
                <th className="p-4">D</th>
              </tr>
            </thead>

            <tbody>
              {standings.map((team) => (
                <tr
                  key={team.teamId}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">
                    {team.position}
                  </td>

                  <td className="p-4">
                    {team.teamName}
                  </td>

                  <td className="p-4 text-center">
                    {team.points}
                  </td>

                  <td className="p-4 text-center">
                    {team.played}
                  </td>

                  <td className="p-4 text-center">
                    {team.wins}
                  </td>

                  <td className="p-4 text-center">
                    {team.draws}
                  </td>

                  <td className="p-4 text-center">
                    {team.losses}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}
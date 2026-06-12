export function Hero() {
  return (
    <section className="px-4 mt-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-b from-slate-900 to-blue-950 border border-slate-800 rounded-2xl p-8 md:p-16 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-700 bg-yellow-950/30 text-yellow-500 text-sm font-semibold">
            🏆 COPA DO MUNDO 2026
          </div>

          <h2 className="mt-6 text-5xl md:text-7xl font-black uppercase tracking-wide text-white">
            O MUNDO
          </h2>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wide text-yellow-500">
            JOGA
          </h2>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wide text-white">
            AQUI
          </h2>

          <p className="mt-8 max-w-2xl mx-auto text-slate-400 text-lg">
            Acompanhe todos os jogos, grupos,
            classificação e artilheiros da Copa do Mundo
            2026 em tempo real.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 border border-red-500 rounded-full px-5 py-2 bg-red-950/20">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

            <span className="text-red-400 text-sm font-medium">
              Copa em andamento · 48 seleções · 3 países-sede
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <a
              href="#signup"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition"
            >
              Receber alertas grátis
            </a>

            <a
              href="#matches"
              className="border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-xl font-semibold"
            >
              Ver jogos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
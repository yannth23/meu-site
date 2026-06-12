import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AlertBanner } from '../components/AlertBanner';
import { MatchesSection } from '../components/MatchesSection';
import { StandingsTable } from '../components/StandingsTable';
import { TopScorers } from '../components/TopScorers';
import { SignupForm } from '../components/SignupForm';

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Hero />

      <AlertBanner />

      <MatchesSection />

      <StandingsTable />

      <TopScorers />

      <SignupForm />
    </main>
  );
}
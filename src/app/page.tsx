import Hero from "@/components/Hero";
import About from "@/components/About";
import Zodiac from "@/components/Zodiac";

export default function Home() {
  return (
    <main className="md:ml-24 relative min-h-screen pb-20 pt-20">
      <Hero />
      <About />
      <Zodiac />
    </main>
  );
}

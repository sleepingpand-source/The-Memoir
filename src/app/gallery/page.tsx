import Gallery from "@/components/Gallery";

export default function GalleryPage() {
  return (
    <main className="md:ml-24 relative min-h-screen pb-20 pt-24">
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="font-headline text-5xl md:text-7xl text-[var(--on-surface)] mb-2">
          Journey of
        </h1>
        <h1 className="font-headline italic text-5xl md:text-7xl text-[var(--primary)]">
          Memories
        </h1>
        <p className="font-body text-center text-[var(--on-surface-variant)] mt-6 max-w-md font-light">
          A curated timeline of the moments that shaped us, captured in light and emotion.
        </p>
      </div>

      {/* The Gallery component itself handles the timeline feel and modals */}
      <div className="mt-10">
        <Gallery />
      </div>
    </main>
  );
}

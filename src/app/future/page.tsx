import Countdown from "@/components/Countdown";
import FutureLetters from "@/components/FutureLetters";
import LettersHeart from "@/components/LettersHeart";
import Image from "next/image";

export default function FuturePage() {
  return (
    <main className="md:ml-24 relative min-h-screen pb-20 pt-24">
      {/* Counting days & Surprise */}
      <Countdown />

      {/* Future Dreams (Bento Grid) */}
      <section className="w-full max-w-6xl mx-auto mb-40 relative z-20 px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="font-headline text-4xl md:text-6xl text-[var(--on-surface)] mb-6">Future Dreams</h2>
          <p className="font-body text-[var(--on-surface-variant)] max-w-2xl mx-auto text-lg leading-relaxed">
            A canvas of endless possibilities awaits. Here are the visions we hold for your incredibly bright future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(250px,auto)]">
          {/* Bento Item 1: Large Feature */}
          <div className="md:col-span-8 bg-[var(--surface-container-low)] backdrop-blur-md rounded-xl p-10 flex flex-col justify-end relative overflow-hidden border border-[var(--outline-variant)]/10 group shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)]">
            <img alt="Future Software Engineer" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWr6nwyLDg43PSF9viVZPyE_ZB2bbNHMBQoKjel0-5Q_p5HNHI2adWWe55s9q6SKOZO6W_1fQMPsG9zIUIBG_kA8ug9bGgRw9k2K5kUpc6mpdTQMhKd_cT_iGVcF2nUnUfdTKS8QgOy3hxVYbeIzA9lTstzsSGtg4nnk-7cya9Joqh0m0wSMz8Dvj9Ho_PehfjMG3n8dfJ4KfrRvxL_Qak8jLzYy1Z3DN-il36pvtryE3EuPMPhtPZzxHNBHVpiezu3j2JASnLwKU1" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-bright)]/90 via-[var(--surface-bright)]/50 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-container)]/50 flex items-center justify-center mb-6 backdrop-blur-md">
                <span className="material-symbols-outlined text-[var(--primary)]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </div>
              <h3 className="font-headline text-3xl text-[var(--on-surface)] mb-4">Future Software Engineer</h3>
              <p className="font-body text-[var(--on-surface-variant)] max-w-md line-clamp-3">
                Building the digital architectures of tomorrow. Your logic is poetry, and your code will shape new worlds.
              </p>
            </div>
          </div>

          {/* Bento Item 2: Code Editor Vibe – always dark bg so text is visible */}
          <div className="md:col-span-4 bg-[#1e1a2e] rounded-xl p-8 flex flex-col relative overflow-hidden border border-purple-900/30 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <div className="mt-8 font-body text-sm leading-relaxed">
              <p><span className="text-purple-300">const</span> <span className="text-white">dream</span> = <span className="text-pink-300">new</span> <span className="text-white">Vision</span>();</p>
              <p className="mt-2"><span className="text-white">dream</span>.<span className="text-pink-300">execute</span>({'{'}</p>
              <p className="pl-4"><span className="text-purple-300">passion</span>: <span className="text-white">Infinity</span>,</p>
              <p className="pl-4"><span className="text-purple-300">impact</span>: <span className="text-green-300">'Global'</span></p>
              <p>{'});'}</p>
            </div>
          </div>

          {/* Bento Item 3: Tall Vertical */}
          <div className="md:col-span-4 md:row-span-2 bg-[var(--surface-container-low)] backdrop-blur-md rounded-xl p-8 flex flex-col justify-between border border-[var(--outline-variant)]/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)]">
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--secondary-container)] flex items-center justify-center mb-6 backdrop-blur-md">
                <span className="material-symbols-outlined text-[var(--secondary)]" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
              </div>
              <h3 className="font-headline text-2xl text-[var(--on-surface)] mb-4">Dream Builder</h3>
              <p className="font-body text-[var(--on-surface-variant)] mb-8">
                Constructing realities out of pure imagination. 
              </p>
            </div>
            <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-[var(--surface-container-lowest)] shadow-inner opacity-80">
              <img alt="Abstract Architecture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCttsBX3KHk-R91cVm_GHOZvFWQYbF_eRYO3Mk7lWDKRl0xCBmZ4VWEpn9X6TBZWIjeEVu-YD26r7tixP2gKxCwMHtltQk2fnYQvyuMcO63wOB_ID5fMnGNTqPsUAYfLfwNbAnX3ZtWl-u8wTwqNYGXgFdDyhCCNu9CWuCFg6ewdgMnxeERgl8XqyrQXBn9k8odW_9walLUBNrPp6xoBnJvOVQOkIqYTQMq1M77osM0-93f1XOyDPoMBUS5n7HvH0Oq8xspfPnIIlXe" />
            </div>
          </div>

          {/* Bento Item 4: Wide Quote */}
          <div className="md:col-span-8 bg-[var(--surface-container-low)] backdrop-blur-md rounded-xl p-10 flex items-center justify-center border border-[var(--outline-variant)]/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <span className="material-symbols-outlined absolute -top-4 -left-4 text-9xl text-[var(--tertiary-container)]/40 rotate-180">format_quote</span>
            <blockquote className="relative z-10 text-center max-w-2xl">
              <p className="font-headline text-3xl text-[var(--on-surface)] leading-tight mb-6">"The future belongs to those who believe in the beauty of their dreams."</p>
              <footer className="font-body text-sm uppercase tracking-widest text-[var(--on-surface-variant)]">Eleanor Roosevelt</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* A Letter to You */}
      <FutureLetters />
      
      {/* Heart Letters */}
      <LettersHeart />

      {/* Finality */}
      <section className="w-full max-w-4xl mx-auto min-h-[512px] flex flex-col items-center justify-center text-center relative mt-20 md:mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface-container-low)] to-[var(--background)] -z-10 rounded-3xl blur-3xl opacity-50"></div>
        <div className="mb-12 relative">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-8 border-[var(--surface-container-lowest)] shadow-2xl relative z-10 mb-8">
            <img alt="Sisterly Bond" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC82jCH3BwXs-aWV9HlLjRtiuuLLTKwH12NqVvnj0hbwtvXmquNSQMwx6RfDFsdO2zxwIj14s8k8DPuGCIrTKYkReBqN9nga10x1pIJNs4vzLQfP-3DHYAgKwTWZWdAOL2XteeMLtWlBm2Bp8ZXUn9coQk1fTCUs9rUgwjr9Iz_Xmb_dtlCZiNpbEZ8wQ0czormA4kcynwuGTTZyPF6maZDdhcMu-wcOl8HJ-WbDgB-aPwuhQAuHf7zcPyFxFFh5CFrcKZ_juN9xlTE" />
          </div>
        </div>
        <h2 className="font-headline italic text-5xl md:text-7xl text-[var(--on-surface)] mb-10 leading-tight px-4">
          No matter how much you grow…
        </h2>
        <p className="font-headline text-2xl md:text-3xl text-[var(--primary)]/80 max-w-xl mx-auto px-4 opacity-90">
          you’ll always be my little sister <span className="text-red-400 inline-block align-middle ml-2 scale-125">❤️</span>
        </p>
      </section>
    </main>
  );
}

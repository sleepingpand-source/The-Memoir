"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden px-6 pt-24">
      {/* No background – inherits page background so no color patches */}

      <div className="relative z-10 max-w-4xl 2xl:max-w-6xl 3xl:max-w-screen-2xl mx-auto text-center flex flex-col items-center gap-6 2xl:gap-10 3xl:gap-14">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 2xl:px-6 2xl:py-2.5 3xl:px-8 3xl:py-3 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] font-body text-sm 2xl:text-lg 3xl:text-xl tracking-widest uppercase mb-2"
        >
          <span className="w-1.5 h-1.5 2xl:w-2.5 2xl:h-2.5 rounded-full bg-[var(--primary)] animate-pulse" />
          April 19, 2009 – Today
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[8rem] 3xl:text-[11rem] text-[var(--on-surface)] tracking-tight leading-[1.1] 2xl:leading-[1.05]"
        >
          Happy 17th Birthday, <br className="sm:hidden" />
          <span className="italic text-[var(--primary)]">Aleena</span> 🎂
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-body text-lg sm:text-xl md:text-2xl 2xl:text-4xl 3xl:text-5xl text-[var(--on-surface-variant)] max-w-xl md:max-w-2xl 2xl:max-w-5xl 3xl:max-w-6xl font-light 2xl:leading-relaxed"
        >
          To the girl who is growing, glowing, and coding her dreams ✨
        </motion.p>

        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-10 py-4 2xl:px-14 2xl:py-6 3xl:px-16 3xl:py-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-body font-semibold text-lg 2xl:text-2xl 3xl:text-4xl tracking-wide shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/50 transition-shadow duration-500"
        >
          Start the Journey
        </motion.button>
      </div>
    </section>
  );
}

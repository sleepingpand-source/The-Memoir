"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Lock, Unlock, X } from "lucide-react";

const getLetterContent = (age: number) => {
  if (age === 17) return "Dear Aleena, Happy 17th Birthday! I can hardly believe you are already 17 today. Watching you grow into the beautiful, brilliant, and strong young woman you are has been the greatest joy of my life. The whole world is ahead of you, wide open and waiting for your magic. Keep coding, keep dreaming, and never lose your radiant spark or that unstoppable spirit of yours. No matter where life takes you, remember that I am always here in your corner, cheering you on. I love you endlessly, and greater than the whole world.";
  if (age === 18) return "Happy 18th! You're officially an adult. Remember that your logic is poetry, and with adulthood comes the power to truly shape the world.";
  if (age === 20) return "Two decades! The twenties are for discovering who you really are. Take risks, make mistakes, but always bet on yourself.";
  if (age === 25) return "A quarter-century! I hope you are building the digital architectures of tomorrow by now. I'm always looking up to you.";
  return `This is a sealed letter for when you turn ${age}. I can't wait to see what you've accomplished by this age. I love you!`;
};

export default function FutureLetters() {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Current date logic is real-time
    const interval = setInterval(() => setCurrentDate(new Date()), 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const birthDate = new Date(2009, 3, 19); // April 19, 2009

  // Generate array of ages 17 through 50
  const letterAges = Array.from({ length: 34 }, (_, i) => 17 + i);

  return (
    <section className="mb-40 px-6 md:px-12 w-full max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl text-[var(--on-surface)] mb-4">A Letter to You...</h2>
        <p className="font-body text-[var(--on-surface-variant)] max-w-2xl mx-auto">
          I've pre-written messages for your future birthdays. They will unlock automatically when you reach that age.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {letterAges.map((age, index) => {
          // Precise mathematical definition of unlock: You turn 'age' on April 19 of (2009 + age)
          const unlockDate = new Date(birthDate.getFullYear() + age, 3, 19);
          const isUnlocked = currentDate.getTime() >= unlockDate.getTime();

          return (
            <motion.div
              key={age}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => isUnlocked && setSelectedAge(age)}
                disabled={!isUnlocked}
                className={`w-full relative aspect-[3/4] rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-500 overflow-hidden ${isUnlocked
                    ? 'bg-[var(--surface-container-low)] backdrop-blur-md shadow-lg shadow-[var(--primary)]/10 border border-[var(--primary)]/30 hover:scale-105 hover:shadow-[var(--primary)]/30 cursor-pointer group'
                    : 'bg-[var(--surface-container)] border border-[var(--outline-variant)]/20 opacity-70 cursor-not-allowed'
                  }`}
              >
                {/* Visual Flair for Unlocked */}
                {isUnlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary-container)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}

                <h3 className={`font-headline text-3xl mb-4 z-10 ${isUnlocked ? 'text-[var(--primary)]' : 'text-[var(--on-surface-variant)]/50'}`}>
                  {age}
                </h3>

                <div className="z-10">
                  {isUnlocked ? (
                    <div className="flex flex-col items-center">
                      <Unlock className="text-[var(--secondary)] mb-2" size={24} />
                      <span className="font-body text-xs text-[var(--on-surface)]">Read Letter</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Lock className="text-[var(--on-surface-variant)]/50 mb-2" size={24} />
                      <span className="font-body text-[10px] text-[var(--on-surface-variant)]/70 uppercase tracking-widest text-center mt-2">
                        Unlocks:<br />{unlockDate.getFullYear()}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedAge !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex justify-center items-center p-4 sm:p-8 backdrop-blur-md bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-[var(--surface-bright)] w-full max-w-2xl rounded-3xl p-8 relative shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <button
                className="absolute top-6 right-6 text-[var(--on-surface-variant)] hover:text-red-500 z-10 p-2 rounded-full hover:bg-[var(--surface-variant)] transition-colors"
                onClick={() => setSelectedAge(null)}
              >
                <X size={24} />
              </button>

              {/* Card Decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--tertiary)]"></div>

              <div className="overflow-y-auto no-scrollbar pt-6">
                <span className="text-[var(--primary)] font-body text-xs tracking-[0.2em] uppercase font-bold mb-2 block">
                  A Letter to you at {selectedAge}
                </span>

                <div className="font-headline italic text-xl md:text-2xl text-[var(--on-surface)] leading-relaxed whitespace-pre-wrap">
                  {getLetterContent(selectedAge)}
                </div>

                <div className="mt-12 flex justify-end">
                  <div className="text-right">
                    <p className="font-headline text-lg text-[var(--on-surface-variant)]">With love,</p>
                    <p className="font-headline text-2xl text-[var(--primary)]">Antigravity</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

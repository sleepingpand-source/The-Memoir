"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [currentAge, setCurrentAge] = useState(17);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Current date logic
    const birthYear = 2009;
    const now = new Date();
    
    // Check if it's currently April 19
    const isTodayBirthday = now.getMonth() === 3 && now.getDate() === 19;
    setIsBirthday(isTodayBirthday);
    
    // Set current age she turns or is turning
    const currentYear = now.getFullYear();
    const age = currentYear - birthYear;
    setCurrentAge(age);

    let target = new Date(currentYear, 3, 19).getTime(); // April 19th this year
    
    // If it's already past April 19 this year, track to next year
    if (!isTodayBirthday && now.getTime() > target) {
      target = new Date(currentYear + 1, 3, 19).getTime();
    }
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = target - currentTime;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[614px] relative mb-32 z-10">
      {(showConfetti || isBirthday) && <Confetti width={width} height={height} numberOfPieces={300} recycle={isBirthday} onConfettiComplete={() => { if(!isBirthday) setShowConfetti(false); }} />}
      
      {isBirthday ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="text-center w-full z-20 py-20"
        >
          <h1 className="font-headline text-6xl md:text-8xl text-[var(--primary)] mb-6 drop-shadow-lg">
            Happy {currentAge}th Birthday<br/><span className="text-[var(--secondary)]">Aleena!</span>
          </h1>
          <p className="font-body text-xl text-[var(--on-surface-variant)] max-w-2xl mx-auto">
            Today is entirely yours. Keep shining brighter than the stars. ❤️
          </p>
        </motion.div>
      ) : (
        <div className="text-center mb-16 relative z-20">
          <p className="font-label text-[var(--on-surface-variant)] tracking-widest uppercase text-sm mb-6">
            Counting days until your special day...
          </p>
          <div className="flex gap-4 md:gap-8 justify-center font-headline text-[var(--primary)]">
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-light tracking-tighter">
                {timeLeft.days.toString().padStart(2, '0')}
              </span>
              <span className="font-label text-xs uppercase tracking-widest mt-2 text-[var(--on-surface-variant)]">Days</span>
            </div>
            <span className="text-6xl md:text-8xl font-light text-[var(--primary)]/30">:</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-light tracking-tighter">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="font-label text-xs uppercase tracking-widest mt-2 text-[var(--on-surface-variant)]">Hrs</span>
            </div>
            <span className="text-6xl md:text-8xl font-light text-[var(--primary)]/30">:</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-light tracking-tighter">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="font-label text-xs uppercase tracking-widest mt-2 text-[var(--on-surface-variant)]">Min</span>
            </div>
          </div>
        </div>
      )}

      {/* Surprise button */}
      {!isBirthday && (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowConfetti(true)}
          className="bg-[var(--surface-container-low)] backdrop-blur-md px-8 py-4 rounded-full flex items-center gap-3 group relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(105,85,142,0.3)] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] border border-[var(--outline-variant)]/15 z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary-fixed-dim)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="font-headline text-xl text-[var(--primary)] z-10">Click for a Surprise</span>
          <span className="text-2xl z-10 group-hover:scale-125 transition-transform duration-300">🎁</span>
        </motion.button>
      )}

      {/* Decorative floating hearts */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <span className="material-symbols-outlined text-[var(--secondary-container)] absolute top-10 left-1/4 text-4xl opacity-60 rotate-12 blur-[2px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        <span className="material-symbols-outlined text-[var(--primary-container)] absolute bottom-20 right-1/4 text-5xl opacity-40 -rotate-12 blur-[1px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        <span className="material-symbols-outlined text-[var(--tertiary-container)] absolute top-1/2 right-10 text-3xl opacity-50 rotate-45 blur-[3px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
      </div>
    </section>
  );
}

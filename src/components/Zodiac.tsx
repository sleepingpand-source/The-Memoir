"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, Star, Compass } from "lucide-react";

type HoroscopeResponse = {
  data: {
    date: string;
    horoscope_data: string;
  };
  status: number;
  success: boolean;
};

export default function Zodiac() {
  const [horoscope, setHoroscope] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const response = await fetch("https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=aries&day=today");
        if (!response.ok) throw new Error("API failed");
        const data: HoroscopeResponse = await response.json();
        if (data.success) {
          setHoroscope(data.data.horoscope_data);
        } else {
          setHoroscope("The stars align for you today! Your energetic Aries spirit will conquer any challenge you face. Keep shining bright.");
        }
      } catch (err) {
        setHoroscope("The stars align for you today! Your energetic Aries spirit will conquer any challenge you face. Keep shining bright.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchHoroscope();
  }, []);

  return (
    <section id="stars" className="relative w-full py-24 px-5 sm:px-8 md:px-16 max-w-7xl 2xl:max-w-none 2xl:w-[80%] 3xl:w-[70%] mx-auto my-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#070311] rounded-[3rem] overflow-hidden shadow-2xl border border-purple-900/40">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen"></div>
        {/* Constellation Glow */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-600/20 blur-[100px] rounded-full"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 2xl:gap-24 items-center p-6 sm:p-8 lg:p-12 2xl:p-20">
        {/* Left: Aries Characteristics */}
        <div className="text-left text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 2xl:px-6 2xl:py-3 rounded-full border border-red-500/30 bg-red-500/10 mb-6 2xl:mb-8">
            <Flame className="text-orange-400 w-4 h-4 2xl:w-6 2xl:h-6" />
            <span className="font-mono text-sm 2xl:text-xl tracking-widest text-orange-200 uppercase">Fire Sign</span>
          </div>
          
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl 2xl:text-8xl text-white mb-6 2xl:mb-10 font-bold shadow-sm leading-tight">
            Aries <span className="text-red-500">Energy</span>
          </h2>
          
          <p className="font-body text-lg 2xl:text-3xl text-gray-300 leading-relaxed 2xl:leading-loose mb-8 2xl:mb-12">
            Born to stand out, driven to succeed. Like a true Aries, your brilliant mind operates with relentless passion. You dive headfirst into complex code and life's adventures with equal fearlessness.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 2xl:gap-10">
            <div className="bg-white/5 p-4 2xl:p-8 rounded-2xl border border-white/10 backdrop-blur-md">
              <Star className="text-yellow-400 mb-2 2xl:mb-4 w-6 h-6 2xl:w-10 2xl:h-10" />
              <h4 className="font-headline font-bold text-lg 2xl:text-3xl mb-1 2xl:mb-2">Pioneer</h4>
              <p className="font-body text-sm 2xl:text-xl text-gray-400">Always charting new paths.</p>
            </div>
            <div className="bg-white/5 p-4 2xl:p-8 rounded-2xl border border-white/10 backdrop-blur-md">
              <Compass className="text-blue-400 mb-2 2xl:mb-4 w-6 h-6 2xl:w-10 2xl:h-10" />
              <h4 className="font-headline font-bold text-lg 2xl:text-3xl mb-1 2xl:mb-2">Fearless</h4>
              <p className="font-body text-sm 2xl:text-xl text-gray-400">Embracing the unknown.</p>
            </div>
          </div>
        </div>

        {/* Right: Daily Horoscope Widget */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1c1332] to-[#120a23] rounded-3xl p-6 sm:p-8 2xl:p-14 border border-purple-500/30 shadow-[0_0_50px_rgba(105,85,142,0.3)] relative overflow-hidden"
        >
          {/* Subtle Aries Symbol watermark */}
          <div className="absolute -right-5 sm:-right-10 -bottom-5 sm:-bottom-10 text-8xl sm:text-9xl 2xl:text-[14rem] text-white/[0.02] font-headline">♈</div>
          
          <div className="flex items-center gap-3 mb-6 2xl:mb-10 relative z-10">
            <Sparkles className="text-purple-400 w-6 h-6 2xl:w-10 2xl:h-10" />
            <h3 className="font-headline text-2xl 2xl:text-4xl font-bold text-purple-100">Cosmic Insight</h3>
          </div>
          
          <div className="min-h-[160px] 2xl:min-h-[220px] flex items-center relative z-10">
            {loading ? (
              <div className="w-full flex justify-center py-8">
                <div className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-full border-2 2xl:border-4 border-purple-500 border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <p className="font-body text-lg 2xl:text-3xl text-purple-200 leading-relaxed 2xl:leading-loose italic">
                "{horoscope}"
              </p>
            )}
          </div>
          
          <div className="mt-6 2xl:mt-10 pt-4 2xl:pt-8 border-t border-purple-900/50 flex justify-between items-center relative z-10">
            <span className="font-mono text-xs 2xl:text-base text-purple-400 uppercase">Live Aries Reading</span>
            <span className="w-2 h-2 2xl:w-4 2xl:h-4 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

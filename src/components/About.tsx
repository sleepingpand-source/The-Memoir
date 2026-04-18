"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Camera } from "lucide-react";

const DEFAULT_PIC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC82jCH3BwXs-aWV9HlLjRtiuuLLTKwH12NqVvnj0hbwtvXmquNSQMwx6RfDFsdO2zxwIj14s8k8DPuGCIrTKYkReBqN9nga10x1pIJNs4vzLQfP-3DHYAgKwTWZWdAOL2XteeMLtWlBm2Bp8ZXUn9coQk1fTCUs9rUgwjr9Iz_Xmb_dtlCZiNpbEZ8wQ0czormA4kcynwuGTTZyPF6maZDdhcMu-wcOl8HJ-WbDgB-aPwuhQAuHf7zcPyFxFFh5CFrcKZ_juN9xlTE";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Sync profile picture from sidebar upload events
  const [profileUrl, setProfileUrl] = useState(DEFAULT_PIC);
  useEffect(() => {
    // Fetch saved pic on mount
    fetch("/api/profile-pic")
      .then((r) => r.json())
      .then((d) => { if (d.url) setProfileUrl(d.url); })
      .catch(() => {});
    // Listen for live updates
    const handler = (e: Event) => {
      const url = (e as CustomEvent<string>).detail;
      if (url) setProfileUrl(url);
    };
    window.addEventListener("profilePicUpdated", handler);
    return () => window.removeEventListener("profilePicUpdated", handler);
  }, []);

  return (
    <section ref={ref} id="about" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-16 max-w-7xl 2xl:max-w-none 2xl:w-[80%] 3xl:w-[70%] mx-auto bg-surface-container-low/50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          style={{ y: y1 }}
          className="md:col-span-5 md:col-start-2 z-10"
        >
          <h2 className="font-headline text-4xl md:text-5xl 2xl:text-7xl 3xl:text-8xl text-[var(--on-surface)] mb-6 2xl:mb-10">
            A Radiant Mind
          </h2>
          <div className="space-y-6 2xl:space-y-10 font-body text-lg 2xl:text-2xl 3xl:text-4xl text-[var(--on-surface-variant)] leading-relaxed 2xl:leading-[1.8]">
            <p>
              Seventeen years of brilliant curiosity. You've always looked at the world differently—seeing the underlying logic in chaos, and finding beauty in the precise syntax of a new language.
            </p>
            <p>
              From late-night debugging sessions to elegant problem-solving, your passion for technology isn't just about code; it's about building tools that matter, fueled by an unstoppable heart.
            </p>
          </div>
        </motion.div>

        {/* Floating Cards / Images */}
        <motion.div 
          style={{ y: y2 }}
          className="md:col-span-5 md:col-start-8 relative h-[600px] 2xl:h-[800px] 3xl:h-[1000px] w-full mt-10 md:mt-0"
        >
          {/* Code Aesthetic Card - always dark, text hardcoded for visibility */}
          <div className="absolute top-10 right-0 w-[80%] max-w-sm 2xl:max-w-lg 3xl:max-w-xl bg-[#1e1a2e] rounded-xl p-6 2xl:p-10 shadow-2xl border border-purple-500/20 z-20">
            <div className="flex items-center gap-2 mb-4 2xl:mb-6 border-b border-white/10 pb-2 2xl:pb-4">
              <span className="material-symbols-outlined text-purple-300 text-sm 2xl:text-xl">terminal</span>
              <span className="font-body text-[10px] 2xl:text-base text-white/50 tracking-widest uppercase">dreams.ts</span>
            </div>
            <pre className="font-body text-[11px] md:text-xs 2xl:text-lg 3xl:text-xl font-light overflow-x-hidden pt-2 leading-relaxed text-white">
              <span className="text-purple-300">const</span> <span className="text-cyan-300">aleena</span> = {'{'}
              <br/>  <span className="text-green-300">age</span>: <span className="text-orange-300">17</span>,
              <br/>  <span className="text-green-300">passion</span>: <span className="text-yellow-200">"code"</span>,
              <br/>  <span className="text-green-300">future</span>: <span className="text-yellow-200">"limitless"</span>
              <br/>{'}'};
              <br/>
              <br/><span className="text-purple-300">function</span> <span className="text-cyan-300">celebrate</span>() {'{'}
              <br/>  <span className="text-purple-300">return</span> <span className="text-yellow-200">"Happy Birthday!"</span>;
              <br/>{'}'}
            </pre>
          </div>
          
          {/* Memory Image – updates with profile pic */}
          <div className="absolute bottom-10 left-0 w-[75%] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(105,85,142,0.2)] z-10 group cursor-pointer" title="Change profile picture from the sidebar">
            <img
              alt="Aleena's Portrait"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
              src={profileUrl}
            />
            {/* Subtle overlay hinting it's linked to the sidebar */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <Camera size={14} className="text-white" />
                <span className="text-white text-xs font-body">Change via sidebar</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

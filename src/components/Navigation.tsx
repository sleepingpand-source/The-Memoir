"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun, Music2, Play, Pause, SkipForward, SkipBack, Volume2, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const playlists = {
  "Cinematic Tunes": [
    { title: "Time Lapse", url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=cinematic-time-lapse-115672.mp3" },
    { title: "Dreamy Atmosphere", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
  ],
  "Hollywood Pop": [
    { title: "Pop Vibe", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
  ],
  "Happy Birthday": [
    { title: "Birthday Classics", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ],
  "Bollywood Vibes": [
    { title: "Desi Grooves", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
  ]
};

const NAV_LINKS = [
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "The Gallery" },
  { href: "/future", label: "Future Days" },
];

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<keyof typeof playlists>("Cinematic Tunes");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio(playlists[currentCategory][0].url);
    audioRef.current.loop = false;
    audioRef.current.volume = volume;
    audioRef.current.onended = nextTrack;
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlists[currentCategory][currentTrackIndex].url;
      audioRef.current.volume = volume;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentCategory, currentTrackIndex]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const toggleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const nextTrack = () => {
    setCurrentTrackIndex(prev =>
      prev < playlists[currentCategory].length - 1 ? prev + 1 : 0
    );
  };
  const prevTrack = () => {
    setCurrentTrackIndex(prev =>
      prev > 0 ? prev - 1 : playlists[currentCategory].length - 1
    );
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  const linkClass = (href: string) =>
    `font-headline text-sm sm:text-base xl:text-lg 2xl:text-xl tracking-wide transition-all duration-300 hover:scale-105 whitespace-nowrap ${
      pathname === href
        ? "text-[var(--primary)] font-bold drop-shadow-[0_0_8px_rgba(138,108,189,0.9)]"
        : "text-slate-700 dark:text-white/80 hover:text-[var(--primary)] dark:hover:text-white"
    }`;

  return (
    <>
      {/* ── Desktop / Tablet Nav ─────────────────────────── */}
      <nav className="hidden sm:flex fixed top-3 left-1/2 -translate-x-1/2 z-50 items-center gap-4 lg:gap-8 px-5 lg:px-8 py-2.5 lg:py-3
        w-[calc(100%-2rem)] max-w-[1200px] 2xl:max-w-[1400px]
        bg-gradient-to-r from-pink-200/50 via-purple-100/50 to-fuchsia-200/50
        dark:from-indigo-950/80 dark:via-purple-950/80 dark:to-slate-900/80
        backdrop-blur-2xl rounded-full
        border border-white/50 dark:border-purple-800/30
        shadow-[0_8px_40px_rgba(138,108,189,0.22),0_2px_12px_rgba(180,130,230,0.12)]
        transition-all duration-300">

        {/* Logo */}
        <Link href="/" className="font-headline italic text-base lg:text-xl 2xl:text-2xl text-[var(--primary)] font-bold shrink-0">
          The Memoir
        </Link>

        {/* Nav Links */}
        <div className="flex gap-4 lg:gap-6 items-center flex-1 justify-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>{label}</Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-2 lg:gap-3 items-center shrink-0">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme}
            className="text-slate-600 dark:text-white/70 p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] lg:text-[24px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowPlaylist(!showPlaylist)}
            className={`p-2 rounded-full transition-colors flex items-center justify-center border ${
              isPlaying
                ? "text-[var(--primary)] bg-white/30 dark:bg-white/10 border-[var(--primary)]/30"
                : "text-slate-600 dark:text-white/70 border-white/30 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/10"
            }`}>
            <span className="material-symbols-outlined text-[20px] lg:text-[24px]">
              {isPlaying ? "music_note" : "music_off"}
            </span>
          </motion.button>
        </div>

        {/* Playlist dropdown */}
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 lg:top-20 right-4 lg:right-8 w-72 lg:w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl p-5 lg:p-6 shadow-2xl border border-[var(--outline-variant)]/20 z-[100]"
          >
            <div className="flex justify-between items-center mb-4 border-b border-[var(--outline)]/10 pb-2">
              <h3 className="font-headline text-base lg:text-lg text-[var(--on-surface)] flex items-center gap-2">
                <Music2 className="text-[var(--primary)]" size={18} /> Aleena's Playlist
              </h3>
              <button onClick={() => setShowPlaylist(false)} className="text-[var(--on-surface-variant)] hover:text-red-500"><X size={18} /></button>
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar py-1">
              {Object.keys(playlists).map((cat) => (
                <button key={cat} onClick={() => { setCurrentCategory(cat as any); setCurrentTrackIndex(0); }}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold ${currentCategory === cat ? "bg-[var(--primary)] text-white shadow-md" : "bg-[var(--surface-variant)] text-[var(--on-surface-variant)] hover:bg-[var(--primary-container)]"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="bg-[var(--surface-container-highest)]/50 rounded-xl p-3 mb-4 text-center">
              <p className="font-headline text-[var(--primary)] font-bold mb-1 line-clamp-1 text-sm">{playlists[currentCategory][currentTrackIndex].title}</p>
              <p className="font-body text-xs text-[var(--on-surface-variant)] uppercase tracking-wider">{currentCategory}</p>
            </div>
            <div className="flex items-center justify-center gap-5 mb-5">
              <button onClick={prevTrack} className="p-2 rounded-full hover:bg-[var(--surface-container-high)] text-[var(--on-surface)] transition-all"><SkipBack size={20} /></button>
              <button onClick={toggleMusic} className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-fixed-dim)] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all">
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="translate-x-0.5" />}
              </button>
              <button onClick={nextTrack} className="p-2 rounded-full hover:bg-[var(--surface-container-high)] text-[var(--on-surface)] transition-all"><SkipForward size={20} /></button>
            </div>
            <div className="flex items-center gap-3 text-[var(--on-surface-variant)] px-2">
              <Volume2 size={14} />
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={toggleVolume}
                className="w-full h-1 bg-[var(--surface-variant)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]" />
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── Mobile Nav ───────────────────────────────────── */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-50">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-4 py-3
          bg-gradient-to-r from-pink-200/70 via-purple-100/70 to-fuchsia-200/70
          dark:from-indigo-950/90 dark:via-purple-950/90 dark:to-slate-900/90
          backdrop-blur-2xl border-b border-white/40 dark:border-purple-800/20
          shadow-[0_4px_20px_rgba(138,108,189,0.15)]">
          <Link href="/" className="font-headline italic text-lg text-[var(--primary)] font-bold">
            The Memoir
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-white/70 hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full text-slate-700 dark:text-white/80 hover:bg-white/30 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-b from-pink-100/95 via-purple-50/95 to-fuchsia-100/95
                dark:from-indigo-950/95 dark:via-purple-950/95 dark:to-slate-900/95
                backdrop-blur-2xl border-b border-white/40 dark:border-purple-800/20
                shadow-[0_8px_30px_rgba(138,108,189,0.2)] px-6 pb-6 pt-2"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link key={href} href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-headline text-xl py-3 border-b border-[var(--outline-variant)]/20 last:border-0 transition-colors ${
                      pathname === href
                        ? "text-[var(--primary)] font-bold"
                        : "text-[var(--on-surface)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                {/* Music control in mobile menu */}
                <button onClick={() => { toggleMusic(); setMobileOpen(false); }}
                  className="mt-3 flex items-center gap-3 font-body text-base text-[var(--on-surface-variant)] py-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">
                    {isPlaying ? "music_note" : "music_off"}
                  </span>
                  {isPlaying ? "Pause Music" : "Play Music"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Spacer for mobile so content isn't under nav (mobile only) */}
      <div className="sm:hidden h-14" />
    </>
  );
}

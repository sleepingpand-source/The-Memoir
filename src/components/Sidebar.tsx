"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Camera } from "lucide-react";

const DEFAULT_PIC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCgodkGOoOE91q6daZzDzATceuyDVQDGsX5Ab1r9JOJw5go1a2_fBwp5ATmjLlP2wky2BSNGKEu3WRujbfHZZRMHmu2-eBOsvb8XttnZDQlHVRE9BESU_X9pVfF2uQ137qdYbnSS_P4krETs8HKxRZCtvDJraHJRODtbk3bLOfAeQYofSs7lRA_JNa1OffgVhcMgEpKWEuIo0JLPvhziL8TjKxECklKg2kBSXreKfRz41gS3lkM-aRhX_JcoxDzQrUcnO1ryvNtcipz";

const NAV_ITEMS = [
  { icon: "auto_awesome", href: "/", title: "The Beginning" },
  { icon: "child_care", href: "/story", title: "Shared Dreams" },
  { icon: "favorite", href: "/gallery", title: "The Gallery" },
  { icon: "edit_note", href: "/future", title: "Future Letters" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const fileRef = useRef<HTMLInputElement>(null);
  const [profileUrl, setProfileUrl] = useState<string>(DEFAULT_PIC);
  const [uploading, setUploading] = useState(false);

  // On mount – fetch stored profile pic from server
  useEffect(() => {
    fetch("/api/profile-pic")
      .then((r) => r.json())
      .then((d) => { if (d.url) setProfileUrl(d.url); })
      .catch(() => {});
  }, []);

  const handlePickFile = () => fileRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show instant local preview
    const localUrl = URL.createObjectURL(file);
    setProfileUrl(localUrl);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/profile-pic", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        setProfileUrl(data.url); // server URL with cache-buster
        // Broadcast to other sibling components (e.g. hero floating picture)
        window.dispatchEvent(new CustomEvent("profilePicUpdated", { detail: data.url }));
      }
    } catch {
      // Keep local preview even if server fails
    } finally {
      setUploading(false);
    }
    // Reset so the same file can be selected again
    e.target.value = "";
  };

  return (
    <aside className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center py-8 w-20 bg-white/20 dark:bg-purple-950/20 backdrop-blur-xl rounded-r-[3rem] h-[80vh] max-h-[600px] shadow-lg shadow-black/5 dark:shadow-purple-900/10 transition-all duration-300 border-r border-white/30 dark:border-purple-800/10 overflow-y-auto no-scrollbar">

      {/* ── Profile Picture ───────────────────────────────── */}
      <div className="mb-8 flex flex-col items-center">
        <div
          className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--primary)]/40 cursor-pointer group shadow-md"
          onClick={handlePickFile}
          title="Click to change profile picture"
          role="button"
          aria-label="Change profile picture"
        >
          <img
            alt="Aleena's Portrait"
            className="w-full h-full object-cover"
            src={profileUrl}
          />
          {/* Camera overlay on hover */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {uploading ? (
              <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <Camera size={14} className="text-white" />
            )}
          </div>
        </div>
        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* ── Nav icons ─────────────────────────────────────── */}
      <div className="flex flex-col gap-6 flex-grow justify-center pb-4 items-center">
        {NAV_ITEMS.map((item, idx) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={idx}
              href={item.href}
              title={item.title}
              className="group flex items-center justify-center w-full px-2"
            >
              <div
                className={`p-3 rounded-full flex items-center justify-center transition-all duration-700 ${
                  isActive
                    ? "bg-white/60 dark:bg-purple-900/40 text-[var(--on-surface)] scale-110 shadow-lg"
                    : "text-[var(--on-surface-variant)]/40 hover:text-[var(--on-surface)] hover:bg-white/40 dark:hover:bg-white/10 group-hover:scale-105"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

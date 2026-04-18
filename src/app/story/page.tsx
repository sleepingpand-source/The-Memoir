"use client";

import CodeBlock from "@/components/CodeBlock";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Trash2, X, AlertTriangle, Plus, Upload } from "lucide-react";

// ── Types ─────────────────────────────────────────────
type Reel = {
  id: number;
  title: string;
  caption: string;
  img: string;
  isStatic?: boolean; // static reels can be edited in local state only
};

// ── Static starter reels ───────────────────────────────
const INITIAL_REELS: Reel[] = [
  { id: 1, title: "Summer '19", caption: "The road trip we never planned but always needed.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6awcn2AFsg05vvh5s9HefdBHZ5qf88vl14pKqrhFO_j7bvBhRF0xWrFu_zYgFdxhy4gdARWgFpxz15As0q6lM8oQADYYICiRavuML5e4HJ57dcOeiraf2QAG07gzckKC6HNAF-EYYxL7nlMR2pVoVJGPMNblPNJLFgeVHfkwu7hFf85nM_uBZXNJixtfRxIEO0xmE9z-TujACnX4xJSCcRldGrwoVTci2OfcfsqyBDDp5N3lRo3J0fCwbRc2p_Baz3vPMkjRlpZti", isStatic: true },
  { id: 2, title: "Midnight Echoes", caption: "Singing until our voices gave out.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGYTT7hksqpNbyOZZGTFolo-godhE8zwofBlxAUeVI-opVl0b7e7gtwiTVp_LiR7jEMuJbzwAI3g_qOUKEHwgMJMJLux-TBgcK_ywEhSWrR1HDT-ut_rpLlBiwagdzZFrMMG-nH3aFtmhTtlH0KV-wXiqajXnE9Yo21LWDHrokR0Pe7V95CY-lPa1gk81lGvpBlfnDGa49vt5Le9HF-NwPMphY7XBEkhVwyZkAIDHVhUqy03zD7BkKWcxR2N1PSkQelQBnUIKLmVJS", isStatic: true },
  { id: 3, title: "Sparks Fly", caption: "Finding magic in the ordinary.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqB9vMcTbOet634rmBuLNChuOquxf970ibK89MhP_9ZiuMiGf7hWCshT9boDE4klNs8r8dD5D5IUQIzfX0BHVDxDyVnU4WPlgeMfy-c8BKuMxKn8O2B9fBJU14IPUCPSa1ACy6g2agPhxGXBkia5M3cPwYRs5-U3JyDxyg63y34wtjp9r_xJc1uAvQoSrx6iFJcxNWUkQhEf1JV5hTOLXKwSGcMdRwdnxQMwG_NjiIMZ4WwC1j359JwarzETy4CpQQNM1zWBBfLy7A", isStatic: true },
  { id: 4, title: "Golden Hour", caption: "Everything bathed in amber and love.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDutTdVgKKzEfSzzFifDqeBRAs3In47mwLMaL-pbJqPdJVCYvbqdZRYxQUHSmtxuRBZnU4scN3R9OCuNoRKUWyFG3AUthNASSHBzHDCiI0ZAK5rI37bIXZzE8Iz8ItvPT0wkeWnLiwbnhj_YABxW4HCWKrzoqFXGPVUcQk6i40QsCbYUcbUDiC1GfGFgGoROUJ7xCulf0Xczk0ayFe40M6t8sWu6VcFu3YLzD9K9iuv9_AyZqiYk5PpMWzd5vV6s0XV82Ml9N6-ybJ1", isStatic: true },
  { id: 5, title: "Dream Big", caption: "The sky was never the limit.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCttsBX3KHk-R91cVm_GHOZvFWQYbF_eRYO3Mk7lWDKRl0xCBmZ4VWEpn9X6TBZWIjeEVu-YD26r7tixP2gKxCwMHtltQk2fnYQvyuMcO63wOB_ID5fMnGNTqPsUAYfLfwNbAnX3ZtWl-u8wTwqNYGXgFdDyhCCNu9CWuCFg6ewdgMnxeERgl8XqyrQXBn9k8odW_9walLUBNrPp6xoBnJvOVQOkIqYTQMq1M77osM0-93f1XOyDPoMBUS5n7HvH0Oq8xspfPnIIlXe", isStatic: true },
  { id: 6, title: "City Lights", caption: "Lost in the glow of a thousand dreams.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFudFYIez3dQctVYY629ztguiAWzidKElXivha-b50KX-zLgUXBosjPtQ9kxjATEQVhk_05BFd18oLijHcSQ7dluby12230F4MN4QG4yWXWhDP7caN0LJvMWlRazr3r6jI_bPBw1XEb8vHPdLX_7BShooXVSjRAc6EadDweCFF3PX6rJ-f-jlgLLfNrL_UnvK0N5nlyh6kx9PBFu-q73DfAlPxGkWSbBTqYB8vIkZBsPq_s5gOf5dAVnLGdUHBcIX8gEcT1D9KMWs9", isStatic: true },
  { id: 7, title: "Study Mode", caption: "When caffeine becomes a personality.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgOL1ZTXHFx8wfVtQhCI09EnzRpTeLIu8QEkiw_QBo92xTZWMdrwigimAww9eOYYz68LGDOyudD-yZAqvwH2hYY3YwFz-A0kbsmxKM5YopDcOMNZUlNh_itc_DAbnxMFdtTXnP7MNkugN4_lIIgnksWu0W91k6iTyoKzkMBwRt3QvgIsd3lsLDfL40YSLBMPwp5RL9KwmON-42ZKYOgg098CKKPBbUTdy8z2txJ9uXokWN98EPvt8btdtnpXAA1SRH-HUinhuGER01", isStatic: true },
  { id: 8, title: "Ocean Whispers", caption: "The sound of waves at midnight.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCQyoTJLfsCZfFN2hXRyPLfBgKpQJvNfmYTfmxDa4c4D6UVtQGjv4QMiOfeMzF9dIxmUrMelt9I_x3YRJUCxjsG9rIExHDtgQ0FfY_GcijGrJHG5ksLCStDNCr45q5BzSEl-uiYarI2L99-e54Hx-wFur10feE6ek947VLfgv23aZnA5UfNxdq8QvODQ_lQLZ4kpN5uhYVvClh0U_2joQ8elD9j2pVUpzSgEL1RgGL3jmc4ahsSCCZkY_E-gAJXZ_qKF5OguIRn15", isStatic: true },
  { id: 9, title: "Laughing til dawn", caption: "When you're supposed to sleep but you're too busy laughing.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWr6nwyLDg43PSF9viVZPyE_ZB2bbNHMBQoKjel0-5Q_p5HNHI2adWWe55s9q6SKOZO6W_1fQMPsG9zIUIBG_kA8ug9bGgRw9k2K5kUpc6mpdTQMhKd_cT_iGVcF2nUnUfdTKS8QgOy3hxVYbeIzA9lTstzsSGtg4nnk-7cya9Joqh0m0wSMz8Dvj9Ho_PehfjMG3n8dfJ4KfrRvxL_Qak8jLzYy1Z3DN-il36pvtryE3EuPMPhtPZzxHNBHVpiezu3j2JASnLwKU1", isStatic: true },
  { id: 10, title: "Sisterhood", caption: "The kind of bond no distance can break.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC82jCH3BwXs-aWV9HlLjRtiuuLLTKwH12NqVvnj0hbwtvXmquNSQMwx6RfDFsdO2zxwIj14s8k8DPuGCIrTKYkReBqN9nga10x1pIJNs4vzLQfP-3DHYAgKwTWZWdAOL2XteeMLtWlBm2Bp8ZXUn9coQk1fTCUs9rUgwjr9Iz_Xmb_dtlCZiNpbEZ8wQ0czormA4kcynwuGTTZyPF6maZDdhcMu-wcOl8HJ-WbDgB-aPwuhQAuHf7zcPyFxFFh5CFrcKZ_juN9xlTE", isStatic: true },
];

const LS_KEY = "aleena_reels";

function loadReels(): Reel[] {
  if (typeof window === "undefined") return INITIAL_REELS;
  try {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : INITIAL_REELS;
  } catch { return INITIAL_REELS; }
}

function saveReels(reels: Reel[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(reels)); } catch {}
}

const isVideoUrl = (url: string | null | undefined) => {
  if (!url) return false;
  return /\.(mp4|webm|mov|ogg)$/i.test(url) || url.startsWith('data:video');
};

export default function StoryPage() {
  // ── Scroll drag ─────────────────────────────────────
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };
  const stopDrag = () => setIsDragging(false);

  // ── Reels state ──────────────────────────────────────
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  useEffect(() => { setReels(loadReels()); }, []);

  const persistReels = (updated: Reel[]) => {
    setReels(updated);
    saveReels(updated);
  };

  // ── Edit reel ────────────────────────────────────────
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [editForm, setEditForm] = useState({ title: "", caption: "" });

  const openEdit = (reel: Reel) => {
    setEditingReel(reel);
    setEditForm({ title: reel.title, caption: reel.caption });
  };
  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel) return;
    persistReels(reels.map(r => r.id === editingReel.id ? { ...r, ...editForm } : r));
    setEditingReel(null);
  };

  // ── Delete reel ──────────────────────────────────────
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const deleteReel = () => {
    if (!deletingId) return;
    persistReels(reels.filter(r => r.id !== deletingId));
    setDeletingId(null);
  };

  // ── Add reel ─────────────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", caption: "", img: "" });
  const [addPreview, setAddPreview] = useState<string | null>(null);
  const addFileRef = useRef<HTMLInputElement>(null);
  const [addFile, setAddFile] = useState<File | null>(null);

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAddPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    let imgUrl = addForm.img;

    // If file selected, upload it
    if (addFile) {
      const fd = new FormData();
      fd.append("title", addForm.title);
      fd.append("description", addForm.caption);
      fd.append("date", new Date().getFullYear().toString());
      fd.append("file", addFile);
      const res = await fetch("/api/memories", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        imgUrl = data.imageUrl;
      }
    }

    if (!imgUrl) return;
    const newReel: Reel = {
      id: Date.now(),
      title: addForm.title,
      caption: addForm.caption,
      img: imgUrl,
    };
    persistReels([...reels, newReel]);
    setShowAddModal(false);
    setAddForm({ title: "", caption: "", img: "" });
    setAddPreview(null);
    setAddFile(null);
  };

  return (
    <main className="relative z-10 w-full md:pl-24 max-w-[1600px] 2xl:max-w-none mx-auto pt-24 pb-32">

      {/* Section Header */}
      <header className="px-5 sm:px-8 md:px-16 mb-12 sm:mb-16 md:w-3/4 2xl:w-2/3">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl 2xl:text-8xl 3xl:text-9xl text-[var(--on-background)] leading-tight mb-4 sm:mb-6">
          Cinematic Soul <span className="italic text-[var(--primary)] font-light">&</span> Code
        </h1>
        <p className="font-body text-lg sm:text-xl 2xl:text-3xl 3xl:text-4xl text-[var(--on-surface-variant)] max-w-2xl 2xl:max-w-4xl 3xl:max-w-6xl leading-relaxed">
          A digital tapestry of shared memories, compiled and executed with endless affection.
        </p>
      </header>

      {/* ── Memory Reel ─────────────────────────────────── */}
      <section className="mb-32 w-full overflow-hidden">
        <div className="px-5 sm:px-8 md:px-16 mb-8 sm:mb-10 flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="material-symbols-outlined text-[var(--primary)] text-2xl sm:text-3xl 2xl:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
          <h2 className="font-headline text-2xl sm:text-3xl 2xl:text-5xl 3xl:text-6xl text-[var(--on-background)]">Memory Reel</h2>
          <span className="font-body text-xs sm:text-sm 2xl:text-lg text-[var(--on-surface-variant)] opacity-60 hidden sm:block">← drag to scroll →</span>
          <button
            onClick={() => setShowAddModal(true)}
            className="ml-auto flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] text-xs sm:text-sm 2xl:text-lg font-body font-semibold transition-colors"
          >
            <Plus size={16} className="w-4 h-4 2xl:w-6 2xl:h-6" /> Add Reel
          </button>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="w-full select-none"
          style={{ overflowX: "scroll", overflowY: "hidden", WebkitOverflowScrolling: "touch", cursor: isDragging ? "grabbing" : "grab", paddingBottom: "1.5rem" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <div style={{ display: "inline-flex", flexDirection: "row", gap: "20px", paddingLeft: "4rem", paddingRight: "8vw", paddingTop: "1rem" }}>
            {reels.map((reel) => (
              <div
                key={reel.id}
                className="relative rounded-2xl overflow-hidden flex-shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[var(--outline-variant)]/20 group"
                style={{ width: "260px", height: "370px", minWidth: "260px", transition: "transform 0.4s ease" }}
                onMouseEnter={e => { if (!isDragging) (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {isVideoUrl(reel.img) ? (
                  <video src={reel.img} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" />
                ) : (
                  <img src={reel.img} alt={reel.title} draggable={false} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="font-headline text-sm sm:text-base 2xl:text-xl text-white font-semibold leading-tight">{reel.title}</p>
                  <p className="font-body text-[10px] sm:text-xs 2xl:text-sm text-white/70 mt-0.5 line-clamp-2">{reel.caption}</p>
                </div>

                {/* Edit / Delete buttons – appear on hover */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(reel); }}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-[var(--primary)]/80 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                    title="Edit reel"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeletingId(reel.id); }}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-red-500/80 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                    title="Delete reel"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Code Editor Theme ────────────────────────────── */}
      <CodeBlock />

      {/* ── Edit Reel Modal ──────────────────────────────── */}
      <AnimatePresence>
        {editingReel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--surface-container-lowest)] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[var(--outline-variant)]/20">
              <div className="p-5 border-b border-[var(--outline-variant)]/20 flex justify-between items-center bg-[var(--surface-container-low)]">
                <h3 className="font-headline text-xl text-[var(--on-surface)] flex items-center gap-2">
                  <Pencil size={18} className="text-[var(--primary)]" /> Edit Reel
                </h3>
                <button onClick={() => setEditingReel(null)} className="p-1.5 rounded-full bg-[var(--surface-variant)] hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/40 transition-colors"><X size={16} /></button>
              </div>
              <form onSubmit={saveEdit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1.5 uppercase tracking-wide">Title</label>
                  <input type="text" required value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-2.5 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] text-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1.5 uppercase tracking-wide">Caption</label>
                  <textarea required value={editForm.caption}
                    onChange={e => setEditForm({ ...editForm, caption: e.target.value })}
                    className="w-full h-24 bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-2.5 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] text-sm transition-colors resize-none" />
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setEditingReel(null)}
                    className="flex-1 py-2.5 rounded-xl border border-[var(--outline-variant)]/30 text-[var(--on-surface-variant)] text-sm font-semibold hover:bg-[var(--surface-container)] transition-colors">Cancel</button>
                  <button type="submit"
                    className="flex-1 bg-[var(--primary)] text-white text-sm font-semibold py-2.5 rounded-xl shadow-md shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all">Save</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ──────────────────────────── */}
      <AnimatePresence>
        {deletingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              className="bg-[var(--surface-container-lowest)] w-full max-w-sm rounded-3xl p-7 shadow-2xl border border-[var(--outline-variant)]/20 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-500" size={28} />
              </div>
              <h3 className="font-headline text-xl text-[var(--on-surface)] mb-2">Remove this reel?</h3>
              <p className="font-body text-[var(--on-surface-variant)] text-sm mb-5">This reel will be removed from the list permanently.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--outline-variant)]/30 text-[var(--on-surface-variant)] text-sm font-semibold hover:bg-[var(--surface-container)] transition-colors">Cancel</button>
                <button onClick={deleteReel}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md shadow-red-500/20 transition-all">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Add Reel Modal ───────────────────────────────── */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--surface-container-lowest)] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[var(--outline-variant)]/20 max-h-[90vh] flex flex-col">
              <div className="p-5 border-b border-[var(--outline-variant)]/20 flex justify-between items-center bg-[var(--surface-container-low)]">
                <h3 className="font-headline text-xl text-[var(--on-surface)] flex items-center gap-2">
                  <Plus size={18} className="text-[var(--primary)]" /> Add New Reel
                </h3>
                <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-full bg-[var(--surface-variant)] hover:bg-red-100 hover:text-red-600 transition-colors"><X size={16} /></button>
              </div>
              <form onSubmit={submitAdd} className="p-5 space-y-4 overflow-y-auto no-scrollbar">
                <div>
                  <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1.5 uppercase tracking-wide">Title</label>
                  <input type="text" required value={addForm.title}
                    onChange={e => setAddForm({ ...addForm, title: e.target.value })}
                    className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-2.5 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] text-sm transition-colors"
                    placeholder="e.g. Birthday Night" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1.5 uppercase tracking-wide">Caption</label>
                  <textarea required value={addForm.caption}
                    onChange={e => setAddForm({ ...addForm, caption: e.target.value })}
                    className="w-full h-20 bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-2.5 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] text-sm transition-colors resize-none"
                    placeholder="What was special about this moment?" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1.5 uppercase tracking-wide">Photo / Video</label>
                  <div className="relative w-full h-40 border-2 border-dashed border-[var(--outline-variant)]/40 rounded-xl flex flex-col items-center justify-center bg-[var(--surface-container)] hover:bg-[var(--surface-container-high)] transition-colors overflow-hidden cursor-pointer group"
                    onClick={() => addFileRef.current?.click()}>
                    <input ref={addFileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleAddFile} />
                    {addPreview ? (
                      isVideoUrl(addPreview) || (addFile && addFile.type.startsWith('video/')) ? (
                        <video src={addPreview} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <img src={addPreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="flex flex-col items-center text-[var(--on-surface-variant)] gap-2">
                        <Upload size={28} className="opacity-50" />
                        <span className="text-sm font-body">Click to upload photo or video</span>
                      </div>
                    )}
                  </div>
                </div>
                {!addFile && (
                  <div>
                    <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1.5 uppercase tracking-wide">Or paste URL</label>
                    <input type="url" value={addForm.img}
                      onChange={e => setAddForm({ ...addForm, img: e.target.value })}
                      className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-2.5 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] text-sm transition-colors"
                      placeholder="https://..." />
                  </div>
                )}
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[var(--outline-variant)]/30 text-[var(--on-surface-variant)] text-sm font-semibold hover:bg-[var(--surface-container)] transition-colors">Cancel</button>
                  <button type="submit"
                    className="flex-1 bg-[var(--primary)] text-white text-sm font-semibold py-2.5 rounded-xl shadow-md shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all">Add Reel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

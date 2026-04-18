"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Plus, X, Upload, ChevronLeft, ChevronRight, ZoomIn, Pencil, Trash2, AlertTriangle } from "lucide-react";

// Static gallery photos (add as many as you like here)
const STATIC_PHOTOS = [
  { id: "s1", title: "Summer Evenings", description: "When time stood still under the stars.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgOL1ZTXHFx8wfVtQhCI09EnzRpTeLIu8QEkiw_QBo92xTZWMdrwigimAww9eOYYz68LGDOyudD-yZAqvwH2hYY3YwFz-A0kbsmxKM5YopDcOMNZUlNh_itc_DAbnxMFdtTXnP7MNkugN4_lIIgnksWu0W91k6iTyoKzkMBwRt3QvgIsd3lsLDfL40YSLBMPwp5RL9KwmON-42ZKYOgg098CKKPBbUTdy8z2txJ9uXokWN98EPvt8btdtnpXAA1SRH-HUinhuGER01" },
  { id: "s2", title: "Ocean Whispers", description: "The sound of waves at midnight.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCQyoTJLfsCZfFN2hXRyPLfBgKpQJvNfmYTfmxDa4c4D6UVtQGjv4QMiOfeMzF9dIxmUrMelt9I_x3YRJUCxjsG9rIExHDtgQ0FfY_GcijGrJHG5ksLCStDNCr45q5BzSEl-uiYarI2L99-e54Hx-wFur10feE6ek947VLfgv23aZnA5UfNxdq8QvODQ_lQLZ4kpN5uhYVvClh0U_2joQ8elD9j2pVUpzSgEL1RgGL3jmc4ahsSCCZkY_E-gAJXZ_qKF5OguIRn15" },
  { id: "s3", title: "City Lights", description: "Lost in the glow of a thousand dreams.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFudFYIez3dQctVYY629ztguiAWzidKElXivha-b50KX-zLgUXBosjPtQ9kxjATEQVhk_05BFd18oLijHcSQ7dluby12230F4MN4QG4yWXWhDP7caN0LJvMWlRazr3r6jI_bPBw1XEb8vHPdLX_7BShooXVSjRAc6EadDweCFF3PX6rJ-f-jlgLLfNrL_UnvK0N5nlyh6kx9PBFu-q73DfAlPxGkWSbBTqYB8vIkZBsPq_s5gOf5dAVnLGdUHBcIX8gEcT1D9KMWs9" },
  { id: "s4", title: "Golden Hour", description: "The world painted in amber and rose.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6awcn2AFsg05vvh5s9HefdBHZ5qf88vl14pKqrhFO_j7bvBhRF0xWrFu_zYgFdxhy4gdARWgFpxz15As0q6lM8oQADYYICiRavuML5e4HJ57dcOeiraf2QAG07gzckKC6HNAF-EYYxL7nlMR2pVoVJGPMNblPNJLFgeVHfkwu7hFf85nM_uBZXNJixtfRxIEO0xmE9z-TujACnX4xJSCcRldGrwoVTci2OfcfsqyBDDp5N3lRo3J0fCwbRc2p_Baz3vPMkjRlpZti" },
  { id: "s5", title: "Midnight Echoes", description: "Singing until our voices gave out.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGYTT7hksqpNbyOZZGTFolo-godhE8zwofBlxAUeVI-opVl0b7e7gtwiTVp_LiR7jEMuJbzwAI3g_qOUKEHwgMJMJLux-TBgcK_ywEhSWrR1HDT-ut_rpLlBiwagdzZFrMMG-nH3aFtmhTtlH0KV-wXiqajXnE9Yo21LWDHrokR0Pe7V95CY-lPa1gk81lGvpBlfnDGa49vt5Le9HF-NwPMphY7XBEkhVwyZkAIDHVhUqy03zD7BkKWcxR2N1PSkQelQBnUIKLmVJS" },
  { id: "s6", title: "Sparks Fly", description: "Finding magic in the ordinary.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqB9vMcTbOet634rmBuLNChuOquxf970ibK89MhP_9ZiuMiGf7hWCshT9boDE4klNs8r8dD5D5IUQIzfX0BHVDxDyVnU4WPlgeMfy-c8BKuMxKn8O2B9fBJU14IPUCPSa1ACy6g2agPhxGXBkia5M3cPwYRs5-U3JyDxyg63y34wtjp9r_xJc1uAvQoSrx6iFJcxNWUkQhEf1JV5hTOLXKwSGcMdRwdnxQMwG_NjiIMZ4WwC1j359JwarzETy4CpQQNM1zWBBfLy7A" },
  { id: "s7", title: "Dream Builder", description: "Constructing realities out of imagination.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCttsBX3KHk-R91cVm_GHOZvFWQYbF_eRYO3Mk7lWDKRl0xCBmZ4VWEpn9X6TBZWIjeEVu-YD26r7tixP2gKxCwMHtltQk2fnYQvyuMcO63wOB_ID5fMnGNTqPsUAYfLfwNbAnX3ZtWl-u8wTwqNYGXgFdDyhCCNu9CWuCFg6ewdgMnxeERgl8XqyrQXBn9k8odW_9walLUBNrPp6xoBnJvOVQOkIqYTQMq1M77osM0-93f1XOyDPoMBUS5n7HvH0Oq8xspfPnIIlXe" },
  { id: "s8", title: "Future Engineer", description: "The code that will shape new worlds.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWr6nwyLDg43PSF9viVZPyE_ZB2bbNHMBQoKjel0-5Q_p5HNHI2adWWe55s9q6SKOZO6W_1fQMPsG9zIUIBG_kA8ug9bGgRw9k2K5kUpc6mpdTQMhKd_cT_iGVcF2nUnUfdTKS8QgOy3hxVYbeIzA9lTstzsSGtg4nnk-7cya9Joqh0m0wSMz8Dvj9Ho_PehfjMG3n8dfJ4KfrRvxL_Qak8jLzYy1Z3DN-il36pvtryE3EuPMPhtPZzxHNBHVpiezu3j2JASnLwKU1" },
  { id: "s9", title: "Sisterly Bond", description: "No matter how much you grow.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC82jCH3BwXs-aWV9HlLjRtiuuLLTKwH12NqVvnj0hbwtvXmquNSQMwx6RfDFsdO2zxwIj14s8k8DPuGCIrTKYkReBqN9nga10x1pIJNs4vzLQfP-3DHYAgKwTWZWdAOL2XteeMLtWlBm2Bp8ZXUn9coQk1fTCUs9rUgwjr9Iz_Xmb_dtlCZiNpbEZ8wQ0czormA4kcynwuGTTZyPF6maZDdhcMu-wcOl8HJ-WbDgB-aPwuhQAuHf7zcPyFxFFh5CFrcKZ_juN9xlTE" },
  { id: "s10", title: "Laptop & Coffee", description: "Late nights fueled by caffeine and dreams.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDutTdVgKKzEfSzzFifDqeBRAs3In47mwLMaL-pbJqPdJVCYvbqdZRYxQUHSmtxuRBZnU4scN3R9OCuNoRKUWyFG3AUthNASSHBzHDCiI0ZAK5rI37bIXZzE8Iz8ItvPT0wkeWnLiwbnhj_YABxW4HCWKrzoqFXGPVUcQk6i40QsCbYUcbUDiC1GfGFgGoROUJ7xCulf0Xczk0ayFe40M6t8sWu6VcFu3YLzD9K9iuv9_AyZqiYk5PpMWzd5vV6s0XV82Ml9N6-ybJ1" },
  { id: "s11", title: "Architecture", description: "Where design meets structure.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCttsBX3KHk-R91cVm_GHOZvFWQYbF_eRYO3Mk7lWDKRl0xCBmZ4VWEpn9X6TBZWIjeEVu-YD26r7tixP2gKxCwMHtltQk2fnYQvyuMcO63wOB_ID5fMnGNTqPsUAYfLfwNbAnX3ZtWl-u8wTwqNYGXgFdDyhCCNu9CWuCFg6ewdgMnxeERgl8XqyrQXBn9k8odW_9walLUBNrPp6xoBnJvOVQOkIqYTQMq1M77osM0-93f1XOyDPoMBUS5n7HvH0Oq8xspfPnIIlXe" },
  { id: "s12", title: "Infinite Light", description: "Every spark leads to something greater.", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqB9vMcTbOet634rmBuLNChuOquxf970ibK89MhP_9ZiuMiGf7hWCshT9boDE4klNs8r8dD5D5IUQIzfX0BHVDxDyVnU4WPlgeMfy-c8BKuMxKn8O2B9fBJU14IPUCPSa1ACy6g2agPhxGXBkia5M3cPwYRs5-U3JyDxyg63y34wtjp9r_xJc1uAvQoSrx6iFJcxNWUkQhEf1JV5hTOLXKwSGcMdRwdnxQMwG_NjiIMZ4WwC1j359JwarzETy4CpQQNM1zWBBfLy7A" },
];

type Photo = { id: string; title: string; description: string; url: string };

export default function Gallery() {
  const [memories, setMemories] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', description: '', file: null as File | null });
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit state
  const [editingMemory, setEditingMemory] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ title: '', date: '', description: '' });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Lightbox state
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => { fetchMemories(); }, []);

  const allPhotos: Photo[] = [
    ...STATIC_PHOTOS,
    ...memories.map((m: any) => ({ id: `mem-${m.id}`, title: m.title, description: m.description, url: m.imageUrl }))
  ];

  const fetchMemories = async () => {
    try {
      const res = await fetch('/api/memories');
      if (res.ok) { const data = await res.json(); setMemories(data.memories); }
    } catch { }
  };

  const openLightbox = (photo: Photo) => {
    const idx = allPhotos.findIndex(p => p.id === photo.id);
    setLightboxIndex(idx);
    setLightboxPhoto(photo);
  };

  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);

  const lightboxPrev = useCallback(() => {
    const newIdx = (lightboxIndex - 1 + allPhotos.length) % allPhotos.length;
    setLightboxIndex(newIdx);
    setLightboxPhoto(allPhotos[newIdx]);
  }, [lightboxIndex, allPhotos]);

  const lightboxNext = useCallback(() => {
    const newIdx = (lightboxIndex + 1) % allPhotos.length;
    setLightboxIndex(newIdx);
    setLightboxPhoto(allPhotos[newIdx]);
  }, [lightboxIndex, allPhotos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxPhoto, lightboxNext, lightboxPrev, closeLightbox]);

  const currentYear = new Date().getFullYear();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.description || !formData.file) return;
    setIsSubmitting(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('file', formData.file);
    const res = await fetch('/api/memories', { method: 'POST', body: data });
    if (res.ok) {
      await fetchMemories();
      setShowUploadModal(false);
      setFormData({ title: '', date: '', description: '', file: null });
      setPreview(null);
    }
    setIsSubmitting(false);
  };

  // ── Edit handler ───────────────────────────────────
  const openEditModal = (mem: any) => {
    setEditingMemory(mem);
    setEditForm({ title: mem.title, date: mem.date, description: mem.description });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemory) return;
    setIsSavingEdit(true);
    const res = await fetch('/api/memories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingMemory.id, ...editForm }),
    });
    if (res.ok) {
      await fetchMemories();
      setEditingMemory(null);
    }
    setIsSavingEdit(false);
  };

  // ── Delete handler ─────────────────────────────────
  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    const res = await fetch(`/api/memories?id=${deletingId}`, { method: 'DELETE' });
    if (res.ok) {
      await fetchMemories();
      setDeletingId(null);
    }
    setIsDeleting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">


      {/* ── Memory Timeline ────────────────────────────── */}
      {memories.length > 0 && (
        <section className="relative mt-20 mb-32 w-full">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl text-[var(--on-surface)] mb-3">Memory Timeline</h2>
            <p className="font-body text-[var(--on-surface-variant)] font-light">Stories you've added, frozen in time.</p>
          </div>
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent -translate-x-1/2 z-0" />
          {memories.map((mem: any, index: number) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={mem.id} className={`relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 group w-full ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
                <div className={`w-full md:w-5/12 mb-8 md:mb-0 pl-12 ${isLeft ? 'md:pl-0 md:pr-16 text-left md:text-right' : 'md:pl-16'}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <div className="font-headline text-3xl text-[var(--on-surface)] flex-1">{mem.title}</div>
                    {/* Action buttons */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 mt-1">
                      <button
                        onClick={() => openEditModal(mem)}
                        className="p-1.5 rounded-lg bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] transition-colors"
                        title="Edit memory"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeletingId(mem.id)}
                        className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-500 transition-colors"
                        title="Delete memory"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="font-body text-sm text-[var(--primary)] mb-4 tracking-widest uppercase">{mem.date}</div>
                  <div className={`bg-[var(--surface-container-low)] rounded-xl p-6 border border-[var(--outline-variant)]/15 inline-block w-full md:max-w-md ${isLeft ? 'md:float-right' : ''}`}>
                    <p className="font-headline italic text-lg text-[var(--on-surface-variant)] leading-relaxed">"{mem.description}"</p>
                  </div>
                </div>
                <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--background)] shadow-[0_0_15px_rgba(105,85,142,0.4)] z-20 ${isLeft ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'}`} />
                <div className={`w-full md:w-5/12 pl-12 ${isLeft ? 'md:pl-16' : 'md:pl-0 md:pr-16'}`}>
                  <motion.div whileHover={{ y: -8 }} className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl cursor-pointer" onClick={() => openLightbox({ id: `mem-${mem.id}`, title: mem.title, description: mem.description, url: mem.imageUrl })}>
                    <img alt={mem.title} className="w-full h-full object-cover" src={mem.imageUrl} />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* ── Photo Gallery Grid ─────────────────────────── */}
      <section className="w-full pb-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-[var(--on-surface)] mb-3">The Gallery</h2>
          <p className="font-body text-[var(--on-surface-variant)] font-light">Fragments of time, preserved forever. Click any photo to explore.</p>
        </div>

        {/* Masonry-style responsive grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {allPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => openLightbox(photo)}
              className="break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 bg-[var(--surface-container-high)]"
            >
              <img
                alt={photo.title}
                src={photo.url}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-headline text-white text-base font-semibold leading-tight">{photo.title}</h3>
                    <p className="font-body text-white/70 text-xs mt-0.5 line-clamp-1">{photo.description}</p>
                  </div>
                  <ZoomIn className="text-white/80 shrink-0 ml-2" size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Photo Button */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-4 rounded-full font-headline text-lg shadow-xl shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-shadow"
          >
            <Plus size={22} /> Add Your Memory
          </motion.button>
        </div>
      </section>


      {/* ── Lightbox Modal ─────────────────────────────── */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors z-10"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors z-10"
            >
              <ChevronRight size={28} />
            </button>
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/70 text-white flex items-center justify-center border border-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxPhoto.id}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="font-headline text-white text-2xl">{lightboxPhoto.title}</h3>
                <p className="font-body text-white/60 text-sm mt-1">{lightboxPhoto.description}</p>
                <p className="font-body text-white/30 text-xs mt-2">{lightboxIndex + 1} / {allPhotos.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Upload Modal ───────────────────────────────── */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--surface-container-lowest)] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[var(--outline-variant)]/20 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-[var(--outline-variant)]/20 flex justify-between items-center bg-[var(--surface-container-low)]">
                <h3 className="font-headline text-2xl text-[var(--on-surface)]">Add a New Chapter</h3>
                <button onClick={() => setShowUploadModal(false)} className="p-2 bg-[var(--surface-variant)] rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/40 dark:hover:text-red-300 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleUpload} className="p-6 flex-1 overflow-y-auto no-scrollbar space-y-6">
                <div>
                  <label className="block font-body text-sm font-semibold text-[var(--on-surface)] mb-2 uppercase tracking-wide">Memory Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-3 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder="e.g. My 16th Birthday Trip" />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[var(--on-surface)] mb-2 uppercase tracking-wide">Date / Tagline</label>
                  <input type="text" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-3 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder={`e.g. Age 16 • Summer '${currentYear.toString().slice(2)}`} />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[var(--on-surface)] mb-2 uppercase tracking-wide">Your Story</label>
                  <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full h-32 bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-3 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" placeholder="Write down what made this memory special..." />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[var(--on-surface)] mb-2 uppercase tracking-wide">Photo Upload</label>
                  <div className="relative w-full h-48 border-2 border-dashed border-[var(--outline-variant)]/50 rounded-xl flex flex-col items-center justify-center bg-[var(--surface-container)] hover:bg-[var(--surface-container-high)] transition-colors overflow-hidden group">
                    <input type="file" required accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {preview ? (
                      <img src={preview} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" alt="preview" />
                    ) : (
                      <div className="flex flex-col items-center text-[var(--on-surface-variant)]">
                        <Upload size={32} className="mb-2 opacity-50" />
                        <span className="font-body text-sm font-medium">Click or drag image here</span>
                      </div>
                    )}
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full bg-[var(--primary)] text-white font-headline text-xl py-4 rounded-xl shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all disabled:opacity-50">
                  {isSubmitting ? 'Uploading...' : 'Save Memory'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {editingMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--surface-container-lowest)] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[var(--outline-variant)]/20"
            >
              <div className="p-6 border-b border-[var(--outline-variant)]/20 flex justify-between items-center bg-[var(--surface-container-low)]">
                <h3 className="font-headline text-2xl text-[var(--on-surface)] flex items-center gap-2">
                  <Pencil size={20} className="text-[var(--primary)]" /> Edit Memory
                </h3>
                <button onClick={() => setEditingMemory(null)} className="p-2 bg-[var(--surface-variant)] rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/40 dark:hover:text-red-300 transition-colors">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
                <div>
                  <label className="block font-body text-sm font-semibold text-[var(--on-surface)] mb-2 uppercase tracking-wide">Title</label>
                  <input
                    type="text" required
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-3 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[var(--on-surface)] mb-2 uppercase tracking-wide">Date / Tagline</label>
                  <input
                    type="text" required
                    value={editForm.date}
                    onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                    className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-3 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[var(--on-surface)] mb-2 uppercase tracking-wide">Story</label>
                  <textarea
                    required
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full h-28 bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 rounded-xl px-4 py-3 text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setEditingMemory(null)} className="flex-1 py-3 rounded-xl border border-[var(--outline-variant)]/30 text-[var(--on-surface-variant)] font-body font-semibold hover:bg-[var(--surface-container)] transition-colors">
                    Cancel
                  </button>
                  <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={isSavingEdit} className="flex-1 bg-[var(--primary)] text-white font-body font-semibold py-3 rounded-xl shadow-md shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all disabled:opacity-50">
                    {isSavingEdit ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ────────────────────────────── */}
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="bg-[var(--surface-container-lowest)] w-full max-w-sm rounded-3xl p-8 shadow-2xl border border-[var(--outline-variant)]/20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <h3 className="font-headline text-2xl text-[var(--on-surface)] mb-2">Delete Memory?</h3>
              <p className="font-body text-[var(--on-surface-variant)] text-sm mb-6">
                This will permanently remove this memory and its photo. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 py-3 rounded-xl border border-[var(--outline-variant)]/30 text-[var(--on-surface-variant)] font-body font-semibold hover:bg-[var(--surface-container)] transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-body font-semibold py-3 rounded-xl shadow-md shadow-red-500/20 transition-all disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

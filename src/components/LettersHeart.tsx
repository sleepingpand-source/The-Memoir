"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Heart } from "lucide-react";

export default function LettersHeart() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const letters = [
    {
      author: "Your Mama",
      content: "💌 To my beautiful Aleena, on your birthday, Though I cannot be there to wrap my arms around you today, I want you to know that I am surrounding you with my love, just as I always have. I am in every gentle breeze, every quiet moment of triumph, and every bright spark of that beautiful Aries fire inside you. I have watched you grow from that tiny, fierce little warrior into this incredibly brilliant, capable young woman. You have always looked at the world with such deep wonder, taking everything in with those big, beautiful eyes. Now, I see you using that brilliant mind of yours to learn, to code, and to build the future. As you write your own code and design your own life, always remember that your foundation is built on an endless, unconditional love. There will be days when the logic seems confusing or the world feels heavy. When those days come, close your eyes, take a deep breath, and listen to your heart. That is where you will always find my voice, reminding you of how strong you are and cheering you on. Your sibling loves you so very much and has built this beautiful space to remind you of your magic. But please know that my love for you is woven into the very fabric of your soul. I am so incredibly proud of the person you are, the mind you possess, and the kindness you share. Keep dreaming big, my sweet girl. Keep building, keep creating, and never forget that you are, and always will be, my greatest masterpiece. With infinite love, forever and always, MAMA",
    },
    {
      author: "Your Aimu",
      content: "To my beautiful Aleena(Baggu)🥹❤️, Happy Birthday. I want you to know that I love you greater than the whole world. You are my most precious person, and watching you grow into such a beautiful, kind, and strong young woman is the greatest blessing of my life. I know Mom is watching from above today, smiling with so much pride at the amazing person you are becoming; her love shines right through you. Please always remember that no matter how much you grow or where life takes you, I will forever be your safe place, your biggest cheerleader, and your best friend. You will never walk alone because I am always right by your side. Mama is watching over you today with so much pride, and I know she is smiling at the incredible person you are becoming. We carry her love with us, always. Keep writing your story, Aleena. Keep building, keep dreaming, and never lose that wonderful curiosity. I love you greater than the whole world, more than infinity, and forever. I am so incredibly proud of you, today and always. With all my love forever, Your Aimu",
    },
    {
      author: "Your Sheru",
      content: "Hum sth hoty hain bht khush rhty mza krty❤️ neena tu tou mera pyara beta h meri jaan h bhtt azeez ho tm mjhe. Mn chahhti hun t hmesha khush rho🫀 Tmrhi sari dili muraad puri hon aleena🥹 love you mera bacha meri choti behna💁🏻‍♀️ lkin tu mjhy he chota bnadeti h😼😭 aur tm kamyaab ho bht agy brdho apni zinadagi mn ho tum chaho wesa ho tmhey har more pe khushiyaan hon🤍🫶🏼 tm hum sb ko azeez ho tmhry bina na msti hai na mza kyunk tu aur mn tou puri mehfil ki jaan hain na pluss damad bh hain humlog😛 may we stay with each other forever InshaaAllah allah humsb ko nzron sy bachye jo jlty hain wh jal k mrjyen🤥 allah hmari dosti salamt rkhy hmari bonding aur hmara saathhh❤️‍🩹 I'm always here for you at any time. You mean alot to me.. don't forget sheraaa luvsss neenaaa😾🫶🏼",
    },
    {
      author: "Your Dabbu",
      content: "To Neenaaa🥹❤️ You are not just my friend, you are my sister for life.   No matter what happens, I will always stand by you.🫂 I pray your future is filled with success, peace, and endless reasons to smile.🫶🏻 Even if tough days come, I know you are strong enough to handle them all. You have always faced everything with so much grace and courage.   May life give you all the happiness you deserve, and then some more.🤍 Never forget that you are never alone in this, I am always here for you.😼 Keep being the amazing, fearless person you are. Stay blessed and keep shining.🤓🫀 Thank you for being my constant since day one😭 I LOVE YOU SO MUCHH NEENAAA🥰🥰",
    }
  ];

  return (
    <section className="mb-40 px-6 md:px-12 w-full max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl text-[var(--on-surface)] mb-4">Letters from the Heart</h2>
        <p className="font-body text-[var(--on-surface-variant)] max-w-2xl mx-auto">
          Tap the envelopes to reveal private messages from those who love you most.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {letters.map((letter, index) => {
          const isFlipped = flippedIndex === index;
          return (
            <div
              key={index}
              className="relative w-full h-64 cursor-pointer group perspective-1000"
              style={{ perspective: "1000px" }}
              onClick={() => setFlippedIndex(isFlipped ? null : index)}
            >
              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                {/* Front (Sealed Envelope) */}
                <div
                  className="absolute inset-0 w-full h-full p-6 bg-gradient-to-br from-[var(--surface-container-high)] to-[var(--surface-container-low)] rounded-xl shadow-[0_10px_30px_rgba(105,85,142,0.1)] border border-[var(--outline-variant)]/30 flex flex-col items-center justify-center backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Mail className="text-[var(--primary)] mb-4" size={48} strokeWidth={1} />
                  <span className="font-headline text-xl text-[var(--on-surface)]">To Aleena</span>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-red-100 rounded-full flex flex-col items-center justify-center rotate-12 shadow-sm border border-red-200">
                    <Heart className="text-red-500 fill-red-500 scale-75" size={24} />
                  </div>
                </div>

                {/* Back (Open Letter) */}
                <div
                  className="absolute inset-0 w-full h-full p-6 bg-white/90 dark:bg-[#1a0e40]/90 backdrop-blur-md rounded-xl shadow-2xl border border-[var(--primary)]/20 flex flex-col overflow-y-auto no-scrollbar"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <span className="font-body text-xs text-[var(--primary)] mb-4 tracking-widest uppercase border-b border-[var(--primary)]/10 pb-2">
                    From {letter.author}
                  </span>
                  <p className="font-headline italic text-sm text-[var(--on-surface)] leading-relaxed flex-1">
                    "{letter.content}"
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

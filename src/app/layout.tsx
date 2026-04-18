import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Sidebar from "@/components/Sidebar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "The Memoir - Aleena's 17th",
  description: "A lifelong digital diary forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${manrope.variable} ${notoSerif.variable} antialiased min-h-screen selection:bg-(--primary-container) selection:text-(--on-primary-container) overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Light Theme Specific Ambiance (Hidden in Dark mode via CSS) */}
          <div className="light-theme-particles fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Soft background glow */}
            <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-pink-300/20 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 right-0 w-[40vw] h-[40vw] bg-purple-300/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-1/4 w-[60vw] h-[60vw] bg-fuchsia-300/10 rounded-full blur-[150px]"></div>
            
            {/* Decorative SVGs/Emojis via CSS floating animations */}
            <div className="particle text-4xl hidden sm:block" style={{ width: 'auto', top: '15%', left: '10%' }}>🌸</div>
            <div className="particle text-2xl" style={{ width: 'auto', top: '25%', left: '30%', animationDelay: '3s', animationDuration: '18s' }}>✨</div>
            <div className="particle text-5xl opacity-40" style={{ width: 'auto', top: '60%', left: '70%', animationDelay: '6s' }}>🌺</div>
            <div className="particle text-3xl" style={{ width: 'auto', top: '40%', left: '80%', animationDelay: '1s', animationDuration: '22s' }}>💫</div>
            <div className="particle text-6xl opacity-30" style={{ width: 'auto', top: '80%', left: '20%', animationDelay: '9s' }}>🌸</div>
            <div className="particle text-xl" style={{ width: 'auto', top: '50%', left: '40%', animationDelay: '5s' }}>✨</div>
          </div>
          <CustomCursor />
          <Navigation />
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AirPower USA",
  description: "Learn about AirPower USA's mission to redefine clean, reliable, and deployable power with patented compressed air technology. Discover our story, values, and vision for the future.",
  keywords: "AirPower USA about, company mission, clean energy technology, compressed air engine, zero emissions power",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            {/* Animated overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-purple-600/30 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-blue-900/30"></div>
          </div>
          {/* Enhanced dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
        
        {/* Content - Better Centered */}
        <div className="relative z-20 mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl drop-shadow-2xl mb-8" 
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
            About AirPower USA
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light" 
             style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)' }}>
            Pioneering the future of clean, deployable energy with revolutionary compressed air technology.
          </p>
        </div>
        
        {/* Enhanced bottom gradient fade for better separation */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      </section>
      
      <About showTitle={false} className="bg-background" />
      <Footer />
    </main>
  );
}

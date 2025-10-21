import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoGallery from "@/components/sections/VideoGallery";
import { Suspense } from "react";

export default function VideoGalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section for Video Gallery */}
      <section className="relative pt-32 pb-8 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Watch Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                Technology
              </span>
              in Action
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-white/80">
              Experience AirPower's revolutionary compressed air energy solutions through comprehensive demonstrations, technical deep-dives, and real-world field testing.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div />}> 
        <VideoGallery />
      </Suspense>
      <Footer />
    </main>
  );
}
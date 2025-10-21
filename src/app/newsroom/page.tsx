import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsroomHero from "@/components/sections/NewsroomHero";
import VideoGallery from "@/components/sections/VideoGallery";
import NewsSection from "@/components/sections/NewsSection";
import { Suspense } from "react";
import { Newspaper } from "lucide-react";

export default function NewsroomPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <NewsroomHero />
      <NewsSection />
      <Suspense fallback={<div />}> 
        <VideoGallery />
      </Suspense>
      
      {/* Stay Connected CTA */}
      <section className="py-16 bg-card/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 backdrop-blur-sm">
              <div className="max-w-3xl">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Stay Connected with AirPower USA
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  This newsroom will feature the latest updates on our technology breakthroughs, partnerships, and market developments. Check back regularly for announcements.
                </p>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Newspaper className="w-5 h-5 mr-2" />
                  <span>News updates coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
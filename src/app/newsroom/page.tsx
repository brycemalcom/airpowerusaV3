import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsroomHero from "@/components/sections/NewsroomHero";
import VideoGallery from "@/components/sections/VideoGallery";
import NewsSection from "@/components/sections/NewsSection";
import { Suspense } from "react";
import NewsroomCta from "@/components/sections/NewsroomCta";

export default async function NewsroomPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <NewsroomHero />
      <NewsSection />
      <Suspense fallback={<div />}> 
        <VideoGallery />
      </Suspense>
      
      <NewsroomCta />
      
      <Footer />
    </main>
  );
} 
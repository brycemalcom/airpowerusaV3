"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";

export default function CustomerHero() {
  const t = useTranslations('customer.hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Play video on desktop after component mounts
    if (!isMobile && videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        video.play().catch(() => {
          // Video autoplay failed, fallback is already showing
          console.log('Video autoplay failed, using fallback background');
        });
      };

      if (video.readyState >= 3) {
        // Video is already loaded
        handleCanPlay();
      } else {
        video.addEventListener('canplay', handleCanPlay);
        return () => video.removeEventListener('canplay', handleCanPlay);
      }
    }
  }, [isMobile]);

  const scrollToInquiry = () => {
    const element = document.getElementById('inquiry-form');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Enhanced gradient fallback background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          {/* Animated gradient overlay for visual interest when video is disabled */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 animate-gradient-x"></div>
        </div>
        
        {/* Video Background - Show on desktop */}
        {!isMobile && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline

            onError={() => {
              console.log('Video failed to load, using gradient fallback');
            }}
          >
            <source src="/media/videos/airpower_station_loop.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Enhanced dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-32 pb-40 text-center lg:px-8">
        {/* Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full bg-primary/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary/30">
            <Phone className="mr-2 h-4 w-4" />
            {t('badge')}
          </span>
        </div>

        {/* Main headline with enhanced text shadows */}
        <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
          <span style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
            {t('titleTop')}
          </span>
          <span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-2"
            style={{ 
              textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(34, 211, 238, 0.4)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            {t('titleMid')}
          </span>
          <span 
            className="block mt-2"
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
          >
            {t('titleBottom')}
          </span>
        </h1>
        
        {/* Subheadline with text shadow */}
        <p 
          className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-white sm:text-xl lg:text-2xl font-light"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)' }}
        >
          {t('subtitle')}
        </p>
        
        {/* Enhanced CTA button */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <Button 
            size="lg" 
            className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-6 text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            onClick={scrollToInquiry}
            style={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {t('ctaPrimary')}
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent z-10" />
    </section>
  );
} 
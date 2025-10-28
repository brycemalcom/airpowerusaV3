"use client";

import { Badge } from "@/components/ui/badge";
import { FileText, Video, Newspaper, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NewsroomHero() {
  const t = useTranslations('home.newsroom.hero');
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      
      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
        {/* Badge */}
        <div className="mb-8">
          <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 text-sm font-bold uppercase tracking-wide">
            <Newspaper className="mr-2 h-4 w-4" />
            {t('badge', { default: 'Media Hub' })}
          </Badge>
        </div>

        {/* Main headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
          <span style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
            AirPower USA
          </span>
          <span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300 mt-2"
            style={{ 
              textShadow: '0 0 30px rgba(147, 51, 234, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            {t('title', { default: 'Newsroom' })}
          </span>
        </h1>
        
        {/* Subheadline */}
        <p 
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl font-light"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)' }}
        >
          {t('subtitle', { default: 'Latest news, press releases, video content, and media coverage from the forefront of clean energy innovation.' })}
        </p>

        {/* Quick navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center space-x-2 text-white/80">
            <Video className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium">{t('video', { default: 'Video Gallery' })}</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <FileText className="h-5 w-5 text-violet-400" />
            <span className="text-sm font-medium">{t('press', { default: 'Press Releases' })}</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <Newspaper className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium">{t('coverage', { default: 'Media Coverage' })}</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <Users className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-medium">{t('updates', { default: 'Company Updates' })}</span>
          </div>
        </div>
      </div>
    </section>
  );
} 
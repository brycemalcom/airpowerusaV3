"use client";

import { Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NewsroomCta() {
  const t = useTranslations('home.newsroom.cta');
  return (
    <section className="py-16 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 backdrop-blur-sm">
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                {t('title')}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {t('body')}
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Newspaper className="w-5 h-5 mr-2" />
                <span>{t('note')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



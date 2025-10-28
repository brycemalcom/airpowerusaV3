"use client";

import { Card } from "@/components/ui/card";
import { 
  Target,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Wind,
  Zap,
  Battery,
  Snowflake
} from "lucide-react";
import { useTranslations } from "next-intl";

const featureMeta = [
  { icon: Wind, key: 'fuel' },
  { icon: Zap, key: 'zero' },
  { icon: Battery, key: 'bess' },
  { icon: Snowflake, key: 'cold' }
];

interface AboutProps {
  showTitle?: boolean;
  className?: string;
}

export default function About({ showTitle = true, className = "" }: AboutProps) {
  const t = useTranslations('about');
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        )}

        <div className="space-y-20">
          {/* Mission Statement */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">
              {t('mission.title')}
            </h3>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-px bg-white"></div>
              <Target className="h-6 w-6 text-white mx-4" />
              <div className="w-16 h-px bg-white"></div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
              {t('mission.body')}
            </p>
          </div>

          {/* Our Story */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">
              {t('story.title')}
            </h3>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-px bg-white"></div>
              <BookOpen className="h-6 w-6 text-white mx-4" />
              <div className="w-16 h-px bg-white"></div>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
              <p>{t('story.p1')}</p>
              <p>{t('story.p2')}</p>
              <p>{t('story.p3')}</p>
            </div>
          </div>

          {/* What We Deliver */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">
              {t('deliver.title')}
            </h3>
            <div className="flex justify-center mb-12">
              <div className="w-16 h-px bg-white"></div>
              <Lightbulb className="h-6 w-6 text-white mx-4" />
              <div className="w-16 h-px bg-white"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureMeta.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-border bg-card/50">
                    <div className="flex justify-center mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm leading-tight">
                      {t(`deliver.features.${feature.key}.title`)}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(`deliver.features.${feature.key}.description`)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Looking Ahead */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">
              {t('ahead.title')}
            </h3>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-px bg-white"></div>
              <TrendingUp className="h-6 w-6 text-white mx-4" />
              <div className="w-16 h-px bg-white"></div>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
              <p>{t('ahead.p1')}</p>
              <p>{t('ahead.p2')}</p>
              <div className="mt-8 p-6 bg-card/50 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-lg">
                  {t('ahead.cta')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

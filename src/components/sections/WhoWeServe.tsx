"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf,
  Heart,
  Shield,
  Zap,
  HardHat,
  Car
} from "lucide-react";
import { useTranslations } from "next-intl";

const customerSegments = [
  { id: 1, titleKey: 'ag.title', descKey: 'ag.desc', categoryKey: 'ag.cat', detailsKey: 'ag.details', icon: Leaf, gradient: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
  { id: 2, titleKey: 'em.title', descKey: 'em.desc', categoryKey: 'em.cat', detailsKey: 'em.details', icon: Heart, gradient: 'from-red-500 to-rose-500', bgColor: 'bg-red-500/10' },
  { id: 3, titleKey: 'def.title', descKey: 'def.desc', categoryKey: 'def.cat', detailsKey: 'def.details', icon: Shield, gradient: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-500/10' },
  { id: 4, titleKey: 'util.title', descKey: 'util.desc', categoryKey: 'util.cat', detailsKey: 'util.details', icon: Zap, gradient: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-500/10' },
  { id: 5, titleKey: 'cons.title', descKey: 'cons.desc', categoryKey: 'cons.cat', detailsKey: 'cons.details', icon: HardHat, gradient: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-500/10' },
  { id: 6, titleKey: 'ev.title', descKey: 'ev.desc', categoryKey: 'ev.cat', detailsKey: 'ev.details', icon: Car, gradient: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-500/10' },
];

export default function WhoWeServe() {
  const t = useTranslations('customer.serve');
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            {t('titleLead')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Customer Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {customerSegments.map((segment) => {
            const Icon = segment.icon;
            return (
              <Card 
                key={segment.id} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-border bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {t(segment.categoryKey)}
                      </Badge>
                      <CardTitle className="text-base sm:text-lg leading-tight">
                        {t(segment.titleKey)}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-sm sm:text-base text-primary font-medium mb-3">
                    {t(segment.descKey)}
                  </CardDescription>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(segment.detailsKey)}
                  </p>
                  
                  {/* Benefits indicator */}
                  <div className="flex items-center space-x-4 pt-4 mt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs text-muted-foreground">{t('pillZero')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-xs text-muted-foreground">{t('pillMobile')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Info Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
            <div className="max-w-4xl">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                {t('bottomTitle')}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t('bottomBody', { amount: '$77M+' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
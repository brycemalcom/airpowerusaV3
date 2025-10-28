"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wind,
  Snowflake,
  Truck,
  Award
} from "lucide-react";
import { useTranslations } from "next-intl";

const benefits = [
  { id: 1, icon: Wind, key: 'noFuel', gradient: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
  { id: 2, icon: Snowflake, key: 'dual', gradient: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10' },
  { id: 3, icon: Truck, key: 'mobile', gradient: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-500/10' },
  { id: 4, icon: Award, key: 'validated', gradient: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/10' }
];

export default function WhyAirPower() {
  const t = useTranslations('customer.why');
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

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={benefit.id} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-border bg-card/50 backdrop-blur-sm h-full"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4">
                      <Icon className="w-10 h-10 text-foreground" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl leading-tight mb-2">
                      {t(`benefits.${benefit.key}.title`)}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-primary font-medium">
                      {t(`benefits.${benefit.key}.description`)}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {t(`benefits.${benefit.key}.details`, { amount: '$77M+' })}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm">
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                {t('bottomTitle')}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {t('bottomBody')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>{t('pillZero')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>{t('pillRapid')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>{t('pillProven')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span>{t('pillGlobal')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
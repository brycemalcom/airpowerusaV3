"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  Zap,
  Battery,
  Globe,
  DollarSign,
  BarChart3,
  MapPin,
  Lightbulb
} from "lucide-react";
import { useTranslations } from "next-intl";

const marketStats = [
  {
    value: "$28B+",
    label: "Global Generator Market",
    description: "Off-grid and backup power demand growing faster than ever.",
    icon: Zap,
    growth: "12% CAGR"
  },
  {
    value: "$45B+",
    label: "EV/BESS Infrastructure",
    description: "Clean storage and mobile charging stations are mission-critical.",
    icon: Battery,
    growth: "25% CAGR"
  },
  {
    value: "42%",
    label: "CAGR in Grid-Scale Battery Storage",
    description: "Demand for renewable-ready storage solutions is surging.",
    icon: BarChart3,
    growth: "42% CAGR"
  },
  {
    value: "40%",
    label: "of the World Lacks Reliable Grid Access",
    description: "Our solution is engineered for where the grid can't reach.",
    icon: Globe,
    growth: "2.8B People"
  }
];

const keyPoints = [
  {
    icon: TrendingUp,
    title: "Explosive Growth Markets",
    description: "Multi-billion dollar industries with double-digit growth rates"
  },
  {
    icon: MapPin,
    title: "Global Deployment Opportunity",
    description: "Serving markets from developed infrastructure to emerging regions"
  },
  {
    icon: Lightbulb,
    title: "Technology Convergence",
    description: "First solution to address generator, storage, and grid challenges simultaneously"
  }
];

export default function MarketOpportunity() {
  const t = useTranslations('home.market');
  return (
    <section className="py-24 bg-gradient-to-br from-card to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge', { default: 'Market Opportunity' })}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('titleLead', { default: 'A' })} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              {t('titleHighlight', { default: '$70B+ Market' })}
            </span>
            <span className="block">{t('titleTail', { default: 'Ready for Disruption' })}</span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            {t('subtitle', { default: 'AirPower sits at the intersection of three massive industries — all hungry for scalable, zero-emission power.' })}
          </p>
          
          {/* Intro Copy */}
          <div className="mt-8 p-6 rounded-xl bg-background/50 border border-border backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t('intro1', { default: 'From remote energy to military deployment, the need for clean, portable, high-capacity power has never been greater. The AirPower Station taps into explosive demand across generators, electric vehicle infrastructure, and battery storage — all with one modular, deployable system.' })}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4 font-semibold">
              {t('intro2', { default: "We're not just solving one problem. We're unlocking a whole new category." })}
            </p>
          </div>
        </div>

        {/* Market Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {marketStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-border bg-background/50 backdrop-blur-sm"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary/90" />
                    </div>
                    <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary">
                      {stat.growth}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-primary group-hover:text-primary/90 transition-colors duration-300 mb-2">
                        {stat.value}
                      </div>
                      <h3 className="text-xl font-bold text-foreground leading-tight">
                        {stat.label}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 ring-1 ring-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            );
          })}
        </div>

        {/* Key Insights */}
        <div className="border-t border-border pt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              {t('insightsTitle', { default: 'Why This Opportunity Matters Now' })}
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('insightsSubtitle', { default: "Multiple converging trends create an unprecedented window for AirPower's revolutionary technology" })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {keyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">
                    {point.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Total Market Calculation */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10">
                <DollarSign className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('tamTitle', { default: 'Total Addressable Market' })}
              </h3>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-4">
                $70B+
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('tamCopy', { default: "Conservative estimate combining generator replacement, EV infrastructure, and battery storage markets. AirPower's unique position enables capture across all three verticals." })}
              </p>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="h-px w-12 bg-border" />
            <span className="text-sm font-medium">{t('cta', { default: 'Ready to disrupt three industries at once?' })}</span>
            <div className="h-px w-12 bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
} 
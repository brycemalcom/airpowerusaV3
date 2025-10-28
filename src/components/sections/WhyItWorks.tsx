"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  Thermometer,
  Wind,
  Truck,
  Zap,
  Shield
} from "lucide-react";
import { useTranslations } from "next-intl";

const benefits = [
  {
    icon: MapPin,
    title: "Works in remote or off-grid locations",
    description: "No grid tie-in or fuel source required"
  },
  {
    icon: Thermometer,
    title: "Operates in extreme heat or cold",
    description: "Cold-air exhaust doubles as climate advantage"
  },
  {
    icon: Wind,
    title: "Zero-emission + low acoustic signature",
    description: "No fumes, no noise, no heat pollution"
  },
  {
    icon: Truck,
    title: "Easy to deploy + re-deploy",
    description: "Truck, trailer, or container-mounted formats"
  },
  {
    icon: Zap,
    title: "Instant startup, reliable uptime",
    description: "Compressed air engine never idles or clogs"
  },
  {
    icon: Shield,
    title: "Built for rugged terrains + mission-critical ops",
    description: "Military-grade durability with low maintenance"
  }
];



export default function WhyItWorks() {
  const t = useTranslations('home.why');
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge', { default: 'Universal Reliability' })}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('titleTop', { default: 'Why It Works' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleBottom', { default: 'Everywhere' })}
            </span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            {t('subtitle', { default: 'Built to operate in extreme conditions — from military zones to mountain villages.' })}
          </p>
          
          {/* Intro Copy */}
          <div className="mt-8 p-6 rounded-xl bg-card/50 border border-border">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t('intro1', { default: "The AirPower Station was engineered for the harshest environments and the most demanding missions. Unlike solar or diesel systems, it delivers instant, on-demand energy that's reliable, portable, and safe." })}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              {t('intro2', { default: 'With zero emissions, silent operation, and cold air as its only exhaust — this platform outperforms traditional generators in every category that matters.' })}
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            {t('advantages', { default: 'Competitive Advantages' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="group p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary group-hover:text-primary/90" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-cyan-400 mr-3" />
                    <h4 className="font-bold text-foreground leading-tight">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>



        {/* Bottom Stats */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">-40°C</div>
              <div className="text-sm text-muted-foreground">{t('statRange', { default: 'to +50°C Operating Range' })}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">{t('statUptime', { default: 'Continuous Operation' })}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">0</div>
              <div className="text-sm text-muted-foreground">{t('statFuel', { default: 'Fuel Requirements' })}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">100%</div>
              <div className="text-sm text-muted-foreground">{t('statReady', { default: 'Mission Ready' })}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
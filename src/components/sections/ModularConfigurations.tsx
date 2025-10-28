"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { 
  Truck,
  Container,
  Battery,
  Car,
  Zap,
  Users,
  MapPin,
  Clock
} from "lucide-react";

type Visual = { type: 'image' | 'video'; src: string; alt: string };

type ConfigMeta = {
  id: number;
  key: 'airpack' | 'container' | 'bess' | 'demo';
  icon: any;
  categoryKey: 'mobile' | 'industrial' | 'storage' | 'prototype';
  categoryColor: string;
  visual: Visual;
  specPairs: { labelKey: string; valueKey: string }[];
  featureKeys: string[];
};

const configurations: ConfigMeta[] = [
  {
    id: 1,
    key: 'airpack',
    icon: Truck,
    categoryKey: 'mobile',
    categoryColor: 'bg-red-500',
    visual: { type: 'image', src: '/media/images/airpack.png', alt: 'Truck-mounted AirPower Station for mobile deployment' },
    specPairs: [
      { labelKey: 'deployment', valueKey: 'deployment' },
      { labelKey: 'powerOutput', valueKey: 'powerOutput' },
      { labelKey: 'range', valueKey: 'range' },
      { labelKey: 'applications', valueKey: 'applications' }
    ],
    featureKeys: ['rapid', 'vehicleIntegrated', 'militaryGrade', 'offGridReady']
  },
  {
    id: 2,
    key: 'container',
    icon: Container,
    categoryKey: 'industrial',
    categoryColor: 'bg-blue-500',
    visual: { type: 'video', src: '/media/videos/airpower_station_loop.mp4', alt: 'Containerized AirPower Station in operation' },
    specPairs: [
      { labelKey: 'powerOutput', valueKey: 'powerOutput' },
      { labelKey: 'dailyCapacity', valueKey: 'dailyCapacity' },
      { labelKey: 'batteryStorage', valueKey: 'batteryStorage' },
      { labelKey: 'runtime', valueKey: 'runtime' }
    ],
    featureKeys: ['industrialScale', 'bessIntegration', 'containerized', 'gridLevel']
  },
  {
    id: 3,
    key: 'bess',
    icon: Battery,
    categoryKey: 'storage',
    categoryColor: 'bg-purple-500',
    visual: { type: 'image', src: '/media/images/bess.jpeg', alt: 'Commercial BESS battery storage system' },
    specPairs: [
      { labelKey: 'storageCapacity', valueKey: 'storageCapacity' },
      { labelKey: 'chargingSource', valueKey: 'chargingSource' },
      { labelKey: 'outputMode', valueKey: 'outputMode' },
      { labelKey: 'cycleLife', valueKey: 'cycleLife' }
    ],
    featureKeys: ['silent', 'gridCharging', 'longCycle', 'modular']
  },
  {
    id: 4,
    key: 'demo',
    icon: Car,
    categoryKey: 'prototype',
    categoryColor: 'bg-cyan-500',
    visual: { type: 'video', src: '/media/videos/proto_truck.mp4', alt: 'Prototype CAE-powered vehicle demonstration' },
    specPairs: [
      { labelKey: 'purpose', valueKey: 'purpose' },
      { labelKey: 'technology', valueKey: 'technology' },
      { labelKey: 'status', valueKey: 'status' },
      { labelKey: 'future', valueKey: 'future' }
    ],
    featureKeys: ['poc', 'caePowered', 'futureMobility', 'techDemo']
  }
];

export default function ModularConfigurations() {
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations('home.modular');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="modular-configurations" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge', { default: 'Flexible Deployment' })}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            {t('titleTop', { default: 'Modular Power,' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleBottom', { default: 'Anywhere You Need It' })}
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground">
            {t('subtitle', { default: 'Multiple deployment formats. Same breakthrough system.' })}
          </p>
          
          {/* Intro Copy */}
          <div className="mt-8 p-6 rounded-xl bg-background/50 border border-border">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              {t('intro1', { default: "The AirPower Station isn't just one product — it's a flexible energy platform that adapts to your mission. Whether truck-mounted or available in 20-foot (0.5MW) and 40-foot (1.5MW) containerized configurations, each unit delivers our full CAE + generator system, with optional BESS for battery storage." })}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mt-4">
              {t('intro2', { default: "From mobile operations to permanent grid support, AirPower's modular design means clean, scalable power — wherever it's needed most." })}
            </p>
          </div>
        </div>

        {/* Configurations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {configurations.map((config) => {
            const Icon = config.icon;
            return (
              <Card 
                key={config.id} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-background/50 backdrop-blur-sm"
              >
                {/* Header */}
                <div className="relative">
                  {/* Visual rendering */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    {config.visual.type === 'image' ? (
                      <img
                        src={config.visual.src}
                        alt={config.visual.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: config.title === "BESS-Only Module" || config.title === "AirPack - Truck Mounted Station" ? 'contain' : 'cover',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          zIndex: 1
                        }}
                      />
                    ) : config.visual.type === 'video' ? (
                      <>
                        {/* Video for desktop */}
                        {!isMobile ? (
                          <video
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          >
                            <source src={config.visual.src} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          /* Mobile fallback */
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <Icon className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground mx-auto mb-4" />
                              <p className="text-sm text-muted-foreground px-4">
                                {t(`cards.${config.key}.title`)}
                              </p>
                              <Badge variant="outline" className="mt-2">
                                VIDEO
                              </Badge>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Icon className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground px-4">
                            {typeof config.visual === 'string' ? config.visual : 'Coming Soon'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4" style={{zIndex: 10}}>
                      <Badge className={`${config.categoryColor} text-white border-0`}>
                        {t(`categories.${config.categoryKey}`)}
                      </Badge>
                    </div>
                    
                    {/* Configuration number */}
                    <div className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center" style={{zIndex: 10}}>
                      <span className="text-base sm:text-lg font-bold text-primary">
                        {config.id}
                      </span>
                    </div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" style={{zIndex: 5}} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Title and description */}
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-lg sm:text-xl leading-tight">
                          {t(`cards.${config.key}.title`)}
                        </h3>
                        <p className="text-xs sm:text-sm text-primary font-medium">
                          {t(`cards.${config.key}.subtitle`)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t(`cards.${config.key}.description`)}
                    </p>
                  </div>
                  
                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {config.specPairs.map((spec, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {t(`cards.${config.key}.specs.${spec.labelKey}`)}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-foreground">
                          {t(`cards.${config.key}.values.${spec.valueKey}`)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {t('features', { default: 'Key Features' })}
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {config.featureKeys.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {t(`cards.${config.key}.features.${feature}`)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="border-t border-border pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg bg-blue-500/10">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">5</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('statFormats', { default: 'Deployment Formats' })}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg bg-green-500/10">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">400+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('statHomes', { default: 'Homes Powered Daily' })}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg bg-purple-500/10">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">∞</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('statLocations', { default: 'Deployment Locations' })}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg bg-orange-500/10">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">15min</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('statSetup', { default: 'Min Setup Time' })}</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-muted-foreground mb-8">
            <div className="h-px w-8 sm:w-12 bg-border" />
            <span className="text-xs sm:text-sm font-medium">{t('cta', { default: 'Choose your deployment strategy' })}</span>
            <div className="h-px w-8 sm:w-12 bg-border" />
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {t('contact', { default: 'Contact Our Team' })}
          </Button>
        </div>
      </div>
    </section>
  );
} 
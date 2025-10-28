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

const configurations = [
  {
    id: 1,
    title: "AirPack - Truck Mounted Station",
    subtitle: "Mobile response, military-ready",
    description: "Engine + generator mounted in vehicle or flatbed. Ideal for rapid deployment, off-grid ops.",
    icon: Truck,
    category: "Mobile",
    specifications: [
      { label: "Deployment", value: "< 15 minutes" },
      { label: "Power Output", value: "Up to 50kW" },
      { label: "Range", value: "Unlimited mobility" },
      { label: "Applications", value: "Emergency, Military, Remote" }
    ],
    features: ["Rapid deployment", "Vehicle-integrated", "Military-grade", "Off-grid ready"],
    visual: {
      type: "image",
      src: "/media/images/airpack.png",
      alt: "Truck-mounted AirPower Station for mobile deployment"
    },
    categoryColor: "bg-red-500"
  },
  {
    id: 2,
    title: "Containerized Station",
    subtitle: "Available in 20-foot (0.5MW) and 40-foot (1.5MW) configurations",
    description: "Full AirPower Station with integrated BESS. Stationary or truck-portable infrastructure.",
    icon: Container,
    category: "Industrial",
    specifications: [
      { label: "Power Output", value: "Up to 0.5MW (20ft) or 1.5MW (40ft)" },
      { label: "Daily Capacity", value: "Up to 400 homes/day" },
      { label: "Battery Storage", value: "Optional BESS" },
      { label: "Runtime", value: "Up to 16 hours runtime per fill cycle" }
    ],
    features: ["Industrial scale", "BESS integration", "Containerized", "Grid-level power"],
    visual: {
      type: "video",
      src: "/media/videos/airpower_station_loop.mp4",
      alt: "Containerized AirPower Station in operation"
    },
    categoryColor: "bg-blue-500"
  },
  {
    id: 3,
    title: "BESS-Only Module",
    subtitle: "1.5MW battery storage unit",
    description: "Rechargeable from generator or grid. Enables silent, stored energy on demand.",
    icon: Battery,
    category: "Storage",
    specifications: [
      { label: "Storage Capacity", value: "1.5MW" },
      { label: "Charging Source", value: "CAE or Grid" },
      { label: "Output Mode", value: "Silent operation" },
      { label: "Cycle Life", value: "10,000+ cycles" }
    ],
    features: ["Silent operation", "Grid charging", "Long cycle life", "Modular design"],
    visual: {
      type: "image",
      src: "/media/images/bess.jpeg",
      alt: "Commercial BESS battery storage system"
    },
    categoryColor: "bg-purple-500"
  },
  {
    id: 4,
    title: "Demo Van / CAE Prototype",
    subtitle: "Functional vehicle running CAE",
    description: "Proof of concept for future air-powered mobility. Included as reference visual, not for sale.",
    icon: Car,
    category: "Prototype",
    specifications: [
      { label: "Purpose", value: "Proof of concept" },
      { label: "Technology", value: "CAE-powered vehicle" },
      { label: "Status", value: "Demonstration only" },
      { label: "Future", value: "Air-powered mobility" }
    ],
    features: ["Proof of concept", "CAE-powered", "Future mobility", "Technology demo"],
    visual: {
      type: "video",
      src: "/media/videos/proto_truck.mp4",
      alt: "Prototype CAE-powered vehicle demonstration"
    },
    categoryColor: "bg-cyan-500"
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
                    {typeof config.visual === 'object' && config.visual.type === 'image' ? (
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
                    ) : typeof config.visual === 'object' && config.visual.type === 'video' ? (
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
                                {config.title}
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
                        {config.category}
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
                          {config.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-primary font-medium">
                          {config.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                  
                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {config.specifications.map((spec, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {spec.label}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-foreground">
                          {spec.value}
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
                      {config.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
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
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import { 
  Wind,
  Zap,
  Battery,
  Thermometer,
  Database,
  Truck,
  VolumeX,
  Volume2
} from "lucide-react";

type ImageVisual = {
  type: "image";
  src: string;
  description: string;
  placeholder: string;
};

type VideoVisual = {
  type: "video";
  src: string;
  description: string;
  placeholder: string;
};

type ImageStackItem = { src: string; alt?: string };
type ImageStackVisual = {
  type: "imageStack";
  sources: ImageStackItem[];
  description: string;
  placeholder: string;
};

type Visual = ImageVisual | VideoVisual | ImageStackVisual;

type StepMeta = { number: string; icon: LucideIcon; key: string };

const stepsMeta: StepMeta[] = [
  { number: "01", icon: Wind, key: "s1" },
  { number: "02", icon: Zap, key: "s2" },
  { number: "03", icon: Database, key: "s3" },
  { number: "04", icon: Thermometer, key: "s4" },
  { number: "05", icon: Battery, key: "s5" },
  { number: "06", icon: Truck, key: "s6" }
];

const visualsByKey: Record<string, Visual> = {
  s1: {
    type: "image",
    src: "/media/images/air_tanks.png",
    description: "High-pressure air storage tanks in the AirPower Station",
    placeholder: "Air Storage Tanks"
  },
  s2: {
    type: "video",
    src: "/media/videos/howitworks_02.mp4",
    description: "CAE engine operation and belt movement",
    placeholder: "CAE Engine Operation"
  },
  s3: {
    type: "video",
    src: "/media/videos/howitworks_03.mp4",
    description: "Power generation process with lights activating",
    placeholder: "Power Generation Process"
  },
  s4: {
    type: "video",
    src: "/media/videos/howitworks_04.mp4",
    description: "Cold exhaust venting with visible temperature effects",
    placeholder: "Cold Air Exhaust (-35°C)"
  },
  s5: {
    type: "image",
    src: "/media/images/bess.room.jpg",
    description: "1.5MW BESS battery storage system with visible battery racks",
    placeholder: "BESS Battery System"
  },
  s6: {
    type: "imageStack",
    sources: [
      {
        src: "/media/images/trailer.airport2.png",
        alt: "Towable trailer-mounted generator unit"
      },
      {
        src: "/media/images/airpack.png",
        alt: "Truck-mounted AirPower Station"
      }
    ],
    description: "Truck and trailer-mounted deployment configurations",
    placeholder: "Deployment Configurations"
  }
};

export default function Technology() {
  const [isMobile, setIsMobile] = useState(false);
  const [isEngineVideoMuted, setIsEngineVideoMuted] = useState(true);
  const [isPowerGenVideoMuted, setIsPowerGenVideoMuted] = useState(true);
  const [isColdAirVideoMuted, setIsColdAirVideoMuted] = useState(true);
  const t = useTranslations('home.technology');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleEngineVideoSound = () => {
    setIsEngineVideoMuted(!isEngineVideoMuted);
  };

  const togglePowerGenVideoSound = () => {
    setIsPowerGenVideoMuted(!isPowerGenVideoMuted);
  };

  const toggleColdAirVideoSound = () => {
    setIsColdAirVideoMuted(!isColdAirVideoMuted);
  };



  return (
    <section id="technology" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <Badge variant="secondary" className="mb-4">
            {t('badge', { default: 'Patented Technology' })}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            {t('titleTop', { default: 'How the' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleBottom', { default: 'AirPower Station Works' })}
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground">
            {t('subtitle', { default: 'From compressed air to clean, continuous energy.' })}
          </p>
          
          {/* Intro Copy */}
          <div className="mt-8 p-6 rounded-xl bg-background/50 border border-border">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              {t('intro', { default: "AirPower's patented system transforms ambient air into clean, on-demand power using a closed-loop cycle. With no fuel, no combustion, and only cold air as its byproduct, the AirPower Station redefines how energy is generated, stored, and delivered — available in 20-foot (0.5MW) and 40-foot (1.5MW) containerized platforms." })}
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="space-y-12 mb-20">
          {stepsMeta.map((step, index) => {
            const Icon = step.icon;
            const visual = visualsByKey[step.key];
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}>
                {/* Content */}
                <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border-2 border-primary/20">
                      <span className="text-base sm:text-lg font-bold text-primary">{step.number}</span>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>
                  
                  {/* Step indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-12 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{t('stepLabel', { number: step.number })}</span>
                  </div>
                </div>

                {/* Visual */}
                <div className={`${isEven ? '' : 'lg:col-start-1'}`}>
                  <Card className="overflow-hidden">
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      {/* Conditional rendering based on visual type */}
                      {visual.type === "image" && (visual as ImageVisual).src ? (
                        <>
                          <img
                            src={(visual as ImageVisual).src}
                            alt={visual.description}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              display: 'block'
                            }}
                          />
                          {/* Subtle gradient overlay for better text contrast if needed */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </>
                      ) : visual.type === "imageStack" && Array.isArray((visual as ImageStackVisual).sources) ? (
                        <>
                          <div className="absolute inset-0 p-2 flex flex-col gap-2">
                            {(visual as ImageStackVisual).sources.map((img, idx, arr) => {
                              const isBottomImage = idx === arr.length - 1;
                              return (
                                <div key={idx} className="relative flex-1">
                                  <img
                                    src={img.src}
                                    alt={img.alt || visual.description}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: isBottomImage ? 'cover' : 'contain',
                                      objectPosition: isBottomImage ? '50% 70%' : 'center',
                                      display: 'block'
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </>
                      ) : visual.type === "video" && (visual as VideoVisual).src ? (
                        <>
                          {/* Video for desktop */}
                          {!isMobile ? (
                            <>
                              <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted={
                                  step.number === "02" ? isEngineVideoMuted :
                                  step.number === "03" ? isPowerGenVideoMuted :
                                  step.number === "04" ? isColdAirVideoMuted :
                                  true
                                }
                                playsInline
                              >
                                <source src={`${(visual as VideoVisual).src}?v=2024-12-19`} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              
                              {/* Clickable overlay for interactive videos */}
                              {(step.number === "02" || step.number === "03" || step.number === "04") && (
                                <div 
                                  className="absolute inset-0 w-full h-full cursor-pointer group z-10"
                                  onClick={
                                    step.number === "02" ? toggleEngineVideoSound :
                                    step.number === "03" ? togglePowerGenVideoSound :
                                    step.number === "04" ? toggleColdAirVideoSound :
                                    undefined
                                  }
                                >
                                  {/* Sound toggle icon */}
                                  <div className="absolute top-4 right-4 bg-black/50 rounded-full p-3 transition-all duration-300 group-hover:bg-black/70 z-20">
                                    {(step.number === "02" ? isEngineVideoMuted :
                                      step.number === "03" ? isPowerGenVideoMuted :
                                      step.number === "04" ? isColdAirVideoMuted :
                                      true) ? (
                                      <VolumeX className="w-6 h-6 text-white" />
                                    ) : (
                                      <Volume2 className="w-6 h-6 text-white" />
                                    )}
                                  </div>
                                  
                                  {/* Click hint */}
                                  {(step.number === "02" ? isEngineVideoMuted :
                                    step.number === "03" ? isPowerGenVideoMuted :
                                    step.number === "04" ? isColdAirVideoMuted :
                                    true) && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                      <div className="bg-black/70 rounded-lg px-4 py-2 text-white text-sm font-medium">
                                        {t('clickToHear', { default: 'Click to hear audio' })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            /* Mobile fallback */
                            <div className="text-center p-8">
                              <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <h4 className="font-semibold text-foreground mb-2">
                                {visual.placeholder}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {visual.description}
                              </p>
                              <Badge variant="outline" className="mt-4">
                                VIDEO
                              </Badge>
                            </div>
                          )}
                          {/* Gradient overlay for video */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                        </>
                      ) : (
                        <>
                          {/* Visual placeholder */}
                          <div className="text-center p-8">
                            <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h4 className="font-semibold text-foreground mb-2">
                              {visual.placeholder}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {visual.description}
                            </p>
                            <Badge variant="outline" className="mt-4">
                              {visual.type.toUpperCase()}
                            </Badge>
                          </div>
                          
                          {/* Gradient overlay for placeholder */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
} 
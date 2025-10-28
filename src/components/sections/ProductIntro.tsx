"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  Container, 
  Battery, 
  Zap, 
  Clock, 
  Gauge, 
  Truck, 
  Home,
  Wind,
  VolumeX,
  Volume2
} from "lucide-react";
import { useTranslations } from "next-intl";
// import Image from "next/image"; // Uncomment when adding the actual image

const features = [
  {
    icon: Container,
    title: "Available in 20-foot (0.5MW) and 40-foot (1.5MW) containerized platforms",
    description: "Complete mobility and rapid deployment"
  },
  {
    icon: Zap,
    title: "Fully integrated CAE + generator",
    description: "Proprietary compressed air engine technology"
  },
  {
    icon: Battery,
    title: "Optional 1.5MW BESS battery storage",
    description: "Enhanced capacity and load balancing"
  },
  {
    icon: Clock,
    title: "Up to 16 hours runtime per fill cycle",
    description: "Extended operation without refueling"
  },
  {
    icon: Gauge,
    title: "3-minute refill time per air tank",
    description: "Rapid turnaround for continuous operation"
  },
  {
    icon: Truck,
    title: "Truck-mountable or stationary installation",
    description: "Maximum flexibility for any deployment"
  },
  {
    icon: Home,
    title: "Up to 400 homes/day",
    description: "Industrial-scale clean energy solution"
  },
  {
    icon: Wind,
    title: "Zero emissions, cold air exhaust",
    description: "Clean power with useful cooling byproduct"
  }
];

export default function ProductIntro() {
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const t = useTranslations('home.productIntro');

  const toggleVideoSound = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <section id="products" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge', { default: 'Revolutionary Technology' })}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('titleTop', { default: 'Introducing the' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleBottom', { default: 'AirPower Station' })}
            </span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            {t('subtitle', { default: 'The fully integrated, containerized energy platform.' })}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Video Section */}
          <div className="relative">
            <div 
              className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-border cursor-pointer group"
              onClick={toggleVideoSound}
            >
              {/* AirPower Station Video */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
              >
                <source src="/media/videos/airpower_station_loop.mp4?v=2024-12-19" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Sound toggle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-4 right-4 bg-black/50 rounded-full p-3 transition-all duration-300 group-hover:bg-black/70">
                {isVideoMuted ? (
                  <VolumeX className="w-6 h-6 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white" />
                )}
              </div>
              
              {/* Click hint */}
              {isVideoMuted && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/70 rounded-lg px-4 py-2 text-white text-sm font-medium">
                    {t('click', { default: 'Click to hear how quiet it is' })}
                  </div>
                </div>
              )}
            </div>

            {/* Floating stats card */}
            <Card className="absolute -bottom-6 -right-6 p-4 bg-card/95 backdrop-blur-sm border-border">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">3 min</div>
                  <div className="text-xs text-muted-foreground">{t('fillTime', { default: 'Fill Time' })} <span className="text-primary font-medium">{t('fullCapacity', { default: '(full capacity)' })}</span></div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">16 hrs</div>
                  <div className="text-xs text-muted-foreground">{t('runtime', { default: 'Runtime' })} <span className="text-primary font-medium">{t('fullCapacity', { default: '(full capacity)' })}</span></div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">0.5–1.5MW</div>
                  <div className="text-xs text-muted-foreground">{t('output', { default: 'Output Capacity' })}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('headline', { default: 'Zero-emission, closed-loop energy solution' })}
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t('p1', { default: 'The AirPower Station is a zero-emission, closed-loop energy solution — available in 20-foot (0.5MW) and 40-foot (1.5MW) containerized platforms and ready to deploy anywhere. It includes our proprietary compressed air engine (CAE), integrated generator, air tanks, and optional BESS (Battery Energy Storage System).' })}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                {t('p2', { default: "Designed to run continuously with cold air as its only exhaust, the AirPower Station delivers scalable, on-demand power wherever it's needed — without fuel, without emissions, and without compromise. With just a 3-minute air tank fill, it provides up to 16 hours runtime per fill cycle." })}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-400 rounded-full" />
                <span className="text-sm font-medium text-foreground">Fully Integrated Platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-400 rounded-full" />
                <span className="text-sm font-medium text-foreground">Rapid Deployment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-cyan-400 rounded-full" />
                <span className="text-sm font-medium text-foreground">Scalable Power Output</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-yellow-400 rounded-full" />
                <span className="text-sm font-medium text-foreground">Cold Air Byproduct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="border-t border-border pt-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            {t('specs', { default: 'Technical Specifications & Features' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-border bg-card/50">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm leading-tight">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
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

const steps = [
  {
    number: "01",
    icon: Wind,
    title: "Ambient Air Compression",
    description: "Air is drawn from the atmosphere and compressed into onboard storage tanks using an integrated compressor system. The tanks in the AirPower Station fill in just 3 minutes to power the CAE for up to 16 hours runtime per fill cycle.",
    visual: {
      type: "image",
      src: "/media/images/air_tanks.png",
      description: "High-pressure air storage tanks in the AirPower Station",
      placeholder: "Air Storage Tanks"
    }
  },
  {
    number: "02",
    icon: Zap,
    title: "Engine Activation",
    description: "Stored compressed air powers our proprietary compressed air engine (CAE), which converts air pressure into mechanical energy.",
    visual: {
      type: "video",
      src: "/media/videos/howitworks_02.mp4",
      description: "CAE engine operation and belt movement",
      placeholder: "CAE Engine Operation"
    }
  },
  {
    number: "03",
    icon: Database,
    title: "Power Generation",
    description: "The engine drives an integrated generator to produce on-demand electricity — powering external equipment or charging the onboard battery storage system.",
    visual: {
      type: "video",
      src: "/media/videos/howitworks_03.mp4",
      description: "Power generation process with lights activating",
      placeholder: "Power Generation Process"
    }
  },
  {
    number: "04",
    icon: Thermometer,
    title: "Cold Air Exhaust",
    description: "As the engine operates, it releases only cold, dry air — no combustion, no emissions. Temperatures can reach below -35°C, making it ideal for industrial cooling applications.",
    visual: {
      type: "video",
      src: "/media/videos/howitworks_04.mp4",
      description: "Cold exhaust venting with visible temperature effects",
      placeholder: "Cold Air Exhaust (-35°C)"
    }
  },
  {
    number: "05",
    icon: Battery,
    title: "Optional Battery Storage (BESS)",
    description: "Excess energy generated is stored in an integrated 1.5MW lithium or graphene battery system for continuous uptime or backup use.",
    visual: {
      type: "image",
      src: "/media/images/bess.room.jpg",
      description: "1.5MW BESS battery storage system with visible battery racks",
      placeholder: "BESS Battery System"
    }
  },
  {
    number: "06",
    icon: Truck,
    title: "Deployment & Use",
    description: "The AirPower Station can be installed on-site, mounted on trucks, or delivered to remote locations. It's built to power everything from data centers and grow operations to disaster relief zones and off-grid microgrids.",
    visual: {
      type: "image",
      src: "/media/images/airpack.png",
      description: "AirPower Station truck-mounted deployment configuration",
      placeholder: "Deployment Applications"
    }
  }
];

export default function Technology() {
  const [isMobile, setIsMobile] = useState(false);
  const [isEngineVideoMuted, setIsEngineVideoMuted] = useState(true);
  const [isPowerGenVideoMuted, setIsPowerGenVideoMuted] = useState(true);
  const [isColdAirVideoMuted, setIsColdAirVideoMuted] = useState(true);

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
            Patented Technology
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            How the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              AirPower Station Works
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground">
            From compressed air to clean, continuous energy.
          </p>
          
          {/* Intro Copy */}
          <div className="mt-8 p-6 rounded-xl bg-background/50 border border-border">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              AirPower's patented system transforms ambient air into clean, on-demand power using a closed-loop cycle. 
              With no fuel, no combustion, and only cold air as its byproduct, the AirPower Station redefines how energy 
              is generated, stored, and delivered — available in 20-foot (0.5MW) and 40-foot (1.5MW) containerized platforms.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="space-y-12 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
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
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Step indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-12 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">Step {step.number}</span>
                  </div>
                </div>

                {/* Visual */}
                <div className={`${isEven ? '' : 'lg:col-start-1'}`}>
                  <Card className="overflow-hidden">
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      {/* Conditional rendering based on visual type */}
                      {step.visual.type === "image" && step.visual.src ? (
                        <>
                          <img
                            src={step.visual.src}
                            alt={step.visual.description}
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
                      ) : step.visual.type === "video" && step.visual.src ? (
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
                                <source src={`${step.visual.src}?v=2024-12-19`} type="video/mp4" />
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
                                        {step.number === "02" ? "Click to hear the engine" :
                                         step.number === "03" ? "Click to hear the power generation" :
                                         step.number === "04" ? "Click here to hear how quiet" :
                                         "Click to hear audio"}
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
                                {step.visual.placeholder}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {step.visual.description}
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
                              {step.visual.placeholder}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {step.visual.description}
                            </p>
                            <Badge variant="outline" className="mt-4">
                              {step.visual.type.toUpperCase()}
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
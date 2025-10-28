"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf,
  Server,
  Heart,
  Home,
  Ship,
  HardHat,
  Car,
  Stethoscope,
  Zap,
  Shield,
  Anchor,
  Truck
} from "lucide-react";
import { useTranslations } from "next-intl";

const applications = [
  {
    id: 1,
    title: "Grow Facilities",
    subtitle: "Climate-controlled indoor agriculture",
    description: "Continuous power and cold air output ideal for high-efficiency grow operations and environmental control.",
    icon: Leaf,
    category: "Agriculture",
    visual: {
      type: "image",
      src: "/media/images/agriculture.jpeg",
      alt: "Indoor grow facility with AirPower Station providing climate control"
    },
    categoryColor: "bg-green-500",
    tags: [
      { color: "bg-green-400", label: "Zero Emissions" },
      { color: "bg-blue-400", label: "Climate Control" }
    ]
  },
  {
    id: 2,
    title: "Data Centers",
    subtitle: "Always-on infrastructure for AI, crypto, and cloud computing",
    description: "Delivers resilient off-grid power with integrated cooling to support energy-intensive workloads including AI labs, crypto mining operations, and high-performance computing clusters.",
    icon: Server,
    category: "Technology",
    visual: {
      type: "image",
      src: "/media/images/server_room.jpeg",
      alt: "Server room with advanced computing infrastructure powered by AirPower Station"
    },
    categoryColor: "bg-blue-500",
    tags: [
      { color: "bg-green-400", label: "Zero Emissions" },
      { color: "bg-blue-400", label: "Integrated Cooling" }
    ]
  },
  {
    id: 3,
    title: "Disaster Relief",
    subtitle: "Mobile deployment in critical zones",
    description: "Power up emergency operations with off-grid, mobile-ready energy that can be deployed by truck or dropped on-site.",
    icon: Heart,
    category: "Emergency",
    visual: {
      type: "image",
      src: "/media/images/disaster_relief.jpeg",
      alt: "Emergency response operation powered by mobile AirPower Station"
    },
    categoryColor: "bg-red-500",
    tags: [
      { color: "bg-orange-400", label: "Rapid Deployment" },
      { color: "bg-purple-400", label: "Mobile-Ready" }
    ]
  },
  {
    id: 4,
    title: "Remote Communities",
    subtitle: "Independence from unreliable grids",
    description: "Ideal for tribal lands, island nations, and rural sites where clean, independent energy matters most.",
    icon: Home,
    category: "Community",
    visual: {
      type: "image",
      src: "/media/images/remote.jpeg",
      alt: "Remote off-grid community powered by AirPower Station"
    },
    categoryColor: "bg-purple-500",
    tags: [
      { color: "bg-green-400", label: "Zero Emissions" },
      { color: "bg-cyan-400", label: "Grid Independence" }
    ]
  },
  {
    id: 5,
    title: "Marine Applications",
    subtitle: "Power on water",
    description: "Compressed air engine proves real-world marine viability — scalable for outboard or vessel propulsion.",
    icon: Ship,
    category: "Marine",
    visual: {
      type: "image",
      src: "/media/images/marine_app.jpeg",
      alt: "Marine application with AirPower Station technology for water-based operations"
    },
    categoryColor: "bg-cyan-500",
    tags: [
      { color: "bg-purple-400", label: "Mobile-Ready" },
      { color: "bg-blue-400", label: "Marine Proven" }
    ]
  },
  {
    id: 6,
    title: "Off-Grid Construction",
    subtitle: "Jobsite power where the grid can't reach",
    description: "Power construction equipment, tools, and temporary facilities at remote jobsites. Build infrastructure anywhere without requiring grid connection first.",
    icon: HardHat,
    category: "Industrial",
    visual: {
      type: "image",
      src: "/media/images/construction_site.jpeg",
      alt: "Construction site powered by AirPower Station"
    },
    categoryColor: "bg-orange-500",
    tags: [
      { color: "bg-orange-400", label: "Rapid Deployment" },
      { color: "bg-yellow-400", label: "Rugged Design" }
    ]
  },
  {
    id: 7,
    title: "EV Infrastructure",
    subtitle: "Future-forward charging solutions",
    description: "Deployable systems to power EV charging hubs — without waiting for grid expansion.",
    icon: Car,
    category: "Transportation",
    visual: {
      type: "image",
      src: "/media/images/ev_charging.jpeg",
      alt: "EV charging station powered by AirPower Station technology"
    },
    categoryColor: "bg-emerald-500",
    tags: [
      { color: "bg-green-400", label: "Zero Emissions" },
      { color: "bg-emerald-400", label: "Future-Ready" }
    ]
  },
  {
    id: 8,
    title: "Medical & Healthcare",
    subtitle: "Critical power + cold storage for medical equipment",
    description: "Emergency medical equipment backup, field hospitals, vaccine cold storage, and mobile medical units requiring both power and cooling.",
    icon: Stethoscope,
    category: "Healthcare",
    visual: {
      type: "image",
      src: "/media/images/medical.jpeg",
      alt: "Medical equipment and healthcare facility powered by AirPower Station"
    },
    categoryColor: "bg-teal-500",
    tags: [
      { color: "bg-red-400", label: "Critical Backup" },
      { color: "bg-blue-400", label: "Cold Storage" }
    ]
  },
  {
    id: 9,
    title: "Microgrid & Backup Power",
    subtitle: "Utility-scale grid support and backup systems",
    description: "Grid stability solutions for utilities, telecommunications infrastructure, and critical facilities requiring reliable backup power and energy storage.",
    icon: Zap,
    category: "Utility",
    visual: {
      type: "image",
      src: "/media/images/grid.jpeg",
      alt: "Microgrid and backup power infrastructure with AirPower Station"
    },
    categoryColor: "bg-indigo-500",
    tags: [
      { color: "bg-yellow-400", label: "Grid Stability" },
      { color: "bg-indigo-400", label: "Utility-Scale" }
    ]
  },
  {
    id: 10,
    title: "Military Base & Field Power",
    subtitle: "Secure, off-grid energy for mission success",
    description: "Fully self-sustaining power and cooling systems for military bases, forward operating posts, and field deployments — zero emissions with minimal heat signature.",
    icon: Shield,
    category: "Defense",
    visual: {
      type: "image",
      src: "/media/images/base.jpeg",
      alt: "Military base powered by AirPower Station with secure off-grid energy systems"
    },
    categoryColor: "bg-slate-600",
    tags: [
      { color: "bg-slate-400", label: "Military-Grade" },
      { color: "bg-green-400", label: "Off-Grid Power" }
    ]
  },
  {
    id: 11,
    title: "Naval & Maritime Defense",
    subtitle: "Shipboard + dockside power & cooling",
    description: "Air-powered systems for naval bases, shipyards, and vessel operations — delivering clean power, cold air, and mission-critical backup at sea or in port.",
    icon: Anchor,
    category: "Defense",
    visual: {
      type: "image",
      src: "/media/images/navy.jpeg",
      alt: "Naval defense operations powered by AirPower Station for maritime and shipboard applications"
    },
    categoryColor: "bg-slate-600",
    tags: [
      { color: "bg-blue-400", label: "Maritime Power" },
      { color: "bg-cyan-400", label: "Cold Air Cooling" }
    ]
  },
  {
    id: 12,
    title: "Tactical Vehicle & Equipment Support",
    subtitle: "Power on the move for defense operations",
    description: "Deployable generator units and energy storage for armored vehicles, radar systems, communications hubs, and other mission-critical military assets.",
    icon: Truck,
    category: "Defense",
    visual: {
      type: "image",
      src: "/media/images/tactical_vehicle.jpeg",
      alt: "Tactical vehicle with AirPower Station for mobile defense operations"
    },
    categoryColor: "bg-slate-600",
    tags: [
      { color: "bg-orange-400", label: "Mobile Support" },
      { color: "bg-purple-400", label: "Communications Ready" }
    ]
  }
];

const categories = [...new Set(applications.map(app => app.category))];

export default function UseCases() {
  const t = useTranslations('home.useCases');
  return (
    <section id="use-cases" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge', { default: 'Real-World Applications' })}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            {t('titleTop', { default: 'Powering Real-World' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleBottom', { default: 'Possibilities' })}
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground">
            {t('subtitle', { default: "From farms to AI labs — clean power, anywhere it's needed." })}
          </p>
          
          {/* Intro Copy */}
          <div className="mt-8 p-6 rounded-xl bg-card/50 border border-border">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              {t('intro', { default: 'AirPower delivers high-capacity, zero-emission energy across industries. Whether powering infrastructure, operations, or innovation, the AirPower Station makes clean energy accessible in places traditional power cannot reach.' })}
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          <Badge variant="outline" className="px-3 py-2 text-xs sm:text-sm font-medium">
            {t('all', { default: 'All Industries' })}
          </Badge>
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="px-3 py-2 text-xs sm:text-sm font-medium">
              {category}
            </Badge>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <Card 
                key={app.id} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-border bg-card/50 backdrop-blur-sm"
              >
                {/* Visual Header */}
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                                    {/* Conditional rendering for image vs placeholder */}
                  {typeof app.visual === 'object' && app.visual.type === 'image' ? (
                    <img
                      src={(app.visual as { type: string; src: string; alt: string }).src}
                      alt={(app.visual as { type: string; src: string; alt: string }).alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Icon className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-xs sm:text-sm text-muted-foreground px-4">
                          {typeof app.visual === 'string' 
                            ? app.visual 
                            : 'Coming Soon'}
                        </p>
                      </div>
                    </div>
                  )}
                  

                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* ID number */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-primary">
                      {app.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-base sm:text-lg leading-tight">
                        {app.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-primary font-medium">
                        {app.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {app.description}
                  </p>
                  
                  {/* Benefits indicator */}
                  <div className="flex items-center space-x-4 pt-2">
                    {app.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${tag.color} rounded-full`} />
                        <span className="text-xs text-muted-foreground">{tag.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="h-px w-8 sm:w-12 bg-border" />
            <span className="text-xs sm:text-sm font-medium">{t('cta', { default: 'Ready to deploy clean energy?' })}</span>
            <div className="h-px w-8 sm:w-12 bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
} 
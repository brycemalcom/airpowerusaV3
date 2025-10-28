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

const applicationsMeta = [
  { id: 1, key: 'grow', icon: Leaf, categoryKey: 'agriculture', visual: { type: 'image', src: '/media/images/agriculture.jpeg', alt: 'Indoor grow facility with AirPower Station providing climate control' }, categoryColor: 'bg-green-500', tags: [ { color: 'bg-green-400', labelKey: 'zeroEmissions' }, { color: 'bg-blue-400', labelKey: 'climateControl' } ] },
  { id: 2, key: 'dataCenters', icon: Server, categoryKey: 'technology', visual: { type: 'image', src: '/media/images/server_room.jpeg', alt: 'Server room with advanced computing infrastructure powered by AirPower Station' }, categoryColor: 'bg-blue-500', tags: [ { color: 'bg-green-400', labelKey: 'zeroEmissions' }, { color: 'bg-blue-400', labelKey: 'integratedCooling' } ] },
  { id: 3, key: 'disasterRelief', icon: Heart, categoryKey: 'emergency', visual: { type: 'image', src: '/media/images/disaster_relief.jpeg', alt: 'Emergency response operation powered by mobile AirPower Station' }, categoryColor: 'bg-red-500', tags: [ { color: 'bg-orange-400', labelKey: 'rapidDeployment' }, { color: 'bg-purple-400', labelKey: 'mobileReady' } ] },
  { id: 4, key: 'remoteCommunities', icon: Home, categoryKey: 'community', visual: { type: 'image', src: '/media/images/remote.jpeg', alt: 'Remote off-grid community powered by AirPower Station' }, categoryColor: 'bg-purple-500', tags: [ { color: 'bg-green-400', labelKey: 'zeroEmissions' }, { color: 'bg-cyan-400', labelKey: 'gridIndependence' } ] },
  { id: 5, key: 'marine', icon: Ship, categoryKey: 'marine', visual: { type: 'image', src: '/media/images/marine_app.jpeg', alt: 'Marine application with AirPower Station technology for water-based operations' }, categoryColor: 'bg-cyan-500', tags: [ { color: 'bg-purple-400', labelKey: 'mobileReady' }, { color: 'bg-blue-400', labelKey: 'marineProven' } ] },
  { id: 6, key: 'construction', icon: HardHat, categoryKey: 'industrial', visual: { type: 'image', src: '/media/images/construction_site.jpeg', alt: 'Construction site powered by AirPower Station' }, categoryColor: 'bg-orange-500', tags: [ { color: 'bg-orange-400', labelKey: 'rapidDeployment' }, { color: 'bg-yellow-400', labelKey: 'ruggedDesign' } ] },
  { id: 7, key: 'evInfra', icon: Car, categoryKey: 'transportation', visual: { type: 'image', src: '/media/images/ev_charging.jpeg', alt: 'EV charging station powered by AirPower Station technology' }, categoryColor: 'bg-emerald-500', tags: [ { color: 'bg-green-400', labelKey: 'zeroEmissions' }, { color: 'bg-emerald-400', labelKey: 'futureReady' } ] },
  { id: 8, key: 'healthcare', icon: Stethoscope, categoryKey: 'healthcare', visual: { type: 'image', src: '/media/images/medical.jpeg', alt: 'Medical equipment and healthcare facility powered by AirPower Station' }, categoryColor: 'bg-teal-500', tags: [ { color: 'bg-red-400', labelKey: 'criticalBackup' }, { color: 'bg-blue-400', labelKey: 'coldStorage' } ] },
  { id: 9, key: 'microgrid', icon: Zap, categoryKey: 'utility', visual: { type: 'image', src: '/media/images/grid.jpeg', alt: 'Microgrid and backup power infrastructure with AirPower Station' }, categoryColor: 'bg-indigo-500', tags: [ { color: 'bg-yellow-400', labelKey: 'gridStability' }, { color: 'bg-indigo-400', labelKey: 'utilityScale' } ] },
  { id: 10, key: 'militaryBase', icon: Shield, categoryKey: 'defense', visual: { type: 'image', src: '/media/images/base.jpeg', alt: 'Military base powered by AirPower Station with secure off-grid energy systems' }, categoryColor: 'bg-slate-600', tags: [ { color: 'bg-slate-400', labelKey: 'militaryGrade' }, { color: 'bg-green-400', labelKey: 'offGridPower' } ] },
  { id: 11, key: 'navalDefense', icon: Anchor, categoryKey: 'defense', visual: { type: 'image', src: '/media/images/navy.jpeg', alt: 'Naval defense operations powered by AirPower Station for maritime and shipboard applications' }, categoryColor: 'bg-slate-600', tags: [ { color: 'bg-blue-400', labelKey: 'maritimePower' }, { color: 'bg-cyan-400', labelKey: 'coldAirCooling' } ] },
  { id: 12, key: 'tactical', icon: Truck, categoryKey: 'defense', visual: { type: 'image', src: '/media/images/tactical_vehicle.jpeg', alt: 'Tactical vehicle with AirPower Station for mobile defense operations' }, categoryColor: 'bg-slate-600', tags: [ { color: 'bg-orange-400', labelKey: 'mobileSupport' }, { color: 'bg-purple-400', labelKey: 'communicationsReady' } ] }
];

const categories = [...new Set(applicationsMeta.map(app => app.categoryKey))];

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
              {t(`categories.${category}`)}
            </Badge>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {applicationsMeta.map((app) => {
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
                        {t(`applications.${app.key}.title`)}
                      </h3>
                      <p className="text-xs sm:text-sm text-primary font-medium">
                        {t(`applications.${app.key}.subtitle`)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t(`applications.${app.key}.description`)}
                  </p>
                  
                  {/* Benefits indicator */}
                  <div className="flex items-center space-x-4 pt-2">
                    {app.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${tag.color} rounded-full`} />
                        <span className="text-xs text-muted-foreground">{t(`tags.${tag.labelKey}`)}</span>
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
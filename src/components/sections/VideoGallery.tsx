"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Video data - you can update these with your actual video files and metadata
type Video = {
  id: number;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  src: string;
  thumbnail: string;
  thumbnailType: "video" | "image";
  category: string;
  views: string;
};

const videos: Video[] = [
  {
    id: 7,
    title: "IUCN Abu Dhabi 2025 — Conference Walkthrough",
    titleEs: "IUCN Abu Dabi 2025 — Recorrido por la conferencia",
    description: "On-the-ground look at Air Power USA’s presence at the IUCN Conference in Abu Dhabi—brand visuals across event screens and exhibits, plus venue walkthrough footage as we introduce our ‘Thin Air to Clean Energy’ platform to regional stakeholders.",
    descriptionEs: "Vistazo en terreno de la presencia de Air Power USA en la IUCN de Abu Dabi: marca en pantallas y stands, y recorrido por el recinto mientras presentamos nuestra plataforma «Del aire a la energía limpia» a actores regionales.",
    src: "https://airpowe-videos.s3.us-east-2.amazonaws.com/abudhabi_2025.mp4",
    thumbnail: "https://airpowe-videos.s3.us-east-2.amazonaws.com/abudhabi_2025.mp4",
    thumbnailType: "video",
    category: "Events",
    views: "New"
  },
  {
    id: 1,
    title: "AirPower Station 20ft Unit Walkthrough",
    titleEs: "Recorrido por unidad de 20 pies de la AirPower Station",
    description: "Complete walkthrough of the 20-foot AirPower Station showcasing compact setup, easy panel operations, and remarkably quiet generator operation.",
    descriptionEs: "Recorrido completo con montaje compacto, manejo sencillo de paneles y funcionamiento notablemente silencioso del generador.",
    src: "/media/videos/airpowerstation.mp4",
    thumbnail: "/media/videos/airpowerstation.mp4", // Using video itself for thumbnail
    thumbnailType: "video", // video or image
    category: "Product Demo",
    views: "2.8K"
  },
  {
    id: 2,
    title: "AirPower CAE Start-Up & Power Demonstration",
    titleEs: "Puesta en marcha del CAE y demostración de potencia",
    description: "Watch the AirPower Compressed Air Engine come online in our controlled test environment. This demo features full system start-up, cold air exhaust venting at -20°C, and sequential activation of high-output industrial lighting—proof of the platform's rapid response, stable output, and clean, reliable power delivery.",
    descriptionEs: "Arranque completo del motor de aire comprimido, escape de aire frío a −20 °C y encendido secuencial de luminarias de alta potencia: respuesta rápida, salida estable y energía limpia.",
    src: "https://airpowe-videos.s3.us-east-2.amazonaws.com/cae_startup2.mp4",
    thumbnail: "/media/images/tech_thumbnail.png",
    thumbnailType: "image",
    category: "Technology",
    views: "1.9K"
  },
  {
    id: 3,
    title: "Compact AirPower Unit — Scaled-Down System Demonstration",
    titleEs: "Unidad AirPower compacta (demostración a escala)",
    description: "Step inside our French R&D facility for a demonstration of the scaled-down AirPower CAE platform. This compact unit delivers the same zero-emission performance in a reduced footprint—running quietly, powering industrial loads, and producing -35°C cold air exhaust for versatile applications from mobile power to microgrid deployment.",
    descriptionEs: "Demostración del sistema a escala reducida: funcionamiento silencioso, alimentación de cargas industriales y escape de aire a −35 °C para usos móviles y microredes.",
    src: "https://airpowe-videos.s3.us-east-2.amazonaws.com/cae_rd.mp4",
    thumbnail: "/media/images/rd_thumbnail.png",
    thumbnailType: "image",
    category: "R&D",
    views: "1.5K"
  },
  {
    id: 4,
    title: "AirPower Vehicle Integration — Engine Build & Field Test",
    titleEs: "Integración vehicular AirPower — armado y prueba en campo",
    description: "Go behind the scenes of our prototype vehicle integration. Watch the complete CAE installation process—engine assembly, component integration, and full vehicle rebuild—followed by real-world test drive. See how our zero-emission technology delivers seamless power and whisper-quiet operation on the road.",
    descriptionEs: "Ensamble del motor, integración de componentes y reconstrucción del vehículo, seguido de prueba de manejo: potencia continua y operación silenciosa en ruta.",
    src: "https://airpowe-videos.s3.us-east-2.amazonaws.com/airpower_prototype.mp4",
    thumbnail: "/media/images/field_thumbnail.png",
    thumbnailType: "image",
    category: "Field Testing",
    views: "3.2K"
  }
  ,
  {
    id: 5,
    title: "Compressed-Air Minibus — European Mobility Week Road Demo",
    titleEs: "Microbús de aire comprimido — Semana Europea de la Movilidad",
    description: "Shot in Rouen during European Mobility Week 2020, this clip shows our 14-seat compressed-air minibus in real-world operation—exterior walk-arounds and drive sequences highlighting quiet running, instant torque, and cold, clean air exhaust. A practical proof of our retrofit pathway that converts existing ICE platforms into zero-emission passenger transport.",
    descriptionEs: "Rodado en Rouen durante la Semana Europea de la Movilidad 2020: exterior, tomas en marcha y exhibición de par instantáneo y escape de aire frío y limpio.",
    src: "https://airpowe-videos.s3.us-east-2.amazonaws.com/Airpower_EU_mobility_week.mp4",
    thumbnail: "/media/images/mobilityweek_thumb.png",
    thumbnailType: "image",
    category: "Field Testing",
    views: "1.1K"
  }
  ,
  {
    id: 6,
    title: "Off-Grid Agriculture — Irrigation & Cold Storage with Compressed Air",
    titleEs: "Agricultura fuera de red — riego y cámara fría",
    description: "A short field piece showing how AirPower enables farmers to pump water for irrigation in remote locations—without diesel or grid power—and capture a second benefit from the same process: naturally cold, clean air for produce storage. Greater independence, longer shelf life, and zero tailpipe emissions for modern agriculture.",
    descriptionEs: "Cómo los agricultores bombean agua sin diésel ni red y aprovechan el mismo proceso para obtener aire frío y limpio para conservar productos: más autonomía y cero emisiones.",
    src: "https://airpowe-videos.s3.us-east-2.amazonaws.com/Airpower_maroc.mp4",
    thumbnail: "/media/images/agriculture.jpeg",
    thumbnailType: "image",
    category: "Agriculture",
    views: "1.4K"
  }
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEs = pathname?.startsWith('/es');
  const t = useTranslations('home.videos');

  // Open a specific video when linked like /videos?videoId=7
  const videoId = searchParams?.get("videoId");
  const ts = searchParams?.get("ts");
  useEffect(() => {
    if (!videoId) return;
    const match = videos.find(v => String(v.id) === videoId);
    if (match) setSelectedVideo(match);
  }, [videoId, ts]);

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge', { default: 'Video Content' })}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('titleTop', { default: 'Video' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              {t('titleBottom', { default: 'Gallery' })}
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('subtitle', { default: 'See AirPower technology in action with product demonstrations and behind-the-scenes content.' })}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card 
              key={video.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Video Thumbnail */}
              <div className="aspect-video relative bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                {video.thumbnailType === "video" ? (
                  <video
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                    onLoadedMetadata={(e) => {
                      const videoEl = e.currentTarget;
                      const seekTime = video.id === 4 ? 10 : 1;
                      setTimeout(() => {
                        videoEl.currentTime = seekTime;
                      }, 100);
                    }}
                    onSeeked={(e) => {
                      // Force a repaint after seeking
                      const videoEl = e.currentTarget;
                      videoEl.style.opacity = '0.99';
                      setTimeout(() => {
                        videoEl.style.opacity = '1';
                      }, 10);
                    }}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                    {video.category}
                  </Badge>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {isEs && video.titleEs ? video.titleEs : video.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {isEs && video.descriptionEs ? video.descriptionEs : video.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {video.views} views
                  </div>
                  <div className="text-primary font-medium">
                    {t('watch', { default: 'Watch Video →' })}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-card rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                ✕
              </button>

              {/* Video */}
              <div className="aspect-video">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  poster={selectedVideo.thumbnail}
                >
                  <source src={selectedVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {isEs && selectedVideo.titleEs ? selectedVideo.titleEs : selectedVideo.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {isEs && selectedVideo.descriptionEs ? selectedVideo.descriptionEs : selectedVideo.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {selectedVideo.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 
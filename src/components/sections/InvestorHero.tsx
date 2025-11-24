"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function InvestorHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && videoRef.current) {
      const video = videoRef.current;

      const handleCanPlay = () => {
        video.play().catch(() => {
          console.log("Video autoplay failed, using fallback background");
        });
      };

      if (video.readyState >= 3) {
        handleCanPlay();
      } else {
        video.addEventListener("canplay", handleCanPlay);
        return () => video.removeEventListener("canplay", handleCanPlay);
      }
    }
  }, [isMobile]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 animate-gradient-x"></div>
        </div>

        {!isMobile && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            onError={() => {
              console.log("Video failed to load, using gradient fallback");
            }}
          >
            <source src="/media/videos/proto_truck.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 py-32 text-center lg:px-8">
        {/* Badge */}
        <div className="mb-8">
          <div className="relative inline-block">
            <Badge
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-6 py-3 text-sm font-bold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => (window.location.href = "/filings")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Reg D - Round I Now Open
            </Badge>
            <div className="absolute -top-2 -right-2 z-[100]">
              <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-6 h-6 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center cursor-help transition-colors shadow-lg"
              >
                <span className="text-xs text-white font-bold">i</span>
              </div>
              {showTooltip && (
                <div className="absolute top-full left-0 mt-2 w-80 p-4 bg-white text-black rounded-lg shadow-xl border z-[100]">
                  <p className="font-semibold mb-2 text-black">
                    What is Regulation D?
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Regulation D allows private companies to raise funds from
                    accredited investors without a full SEC registration.
                  </p>
                  <p className="text-blue-600 text-xs font-medium">
                    💡 Click the badge to view our official SEC Form D filing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
          <span
            style={{
              textShadow:
                "3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
            }}
          >
            Invest in the Future of
          </span>
          <span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-2"
            style={{
              textShadow:
                "0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(34, 211, 238, 0.4)",
              WebkitTextStroke: "1px rgba(255,255,255,0.1)",
            }}
          >
            Clean, Off-Grid Energy
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl font-light"
          style={{
            textShadow:
              "2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)",
          }}
        >
          Reg D Round I is now open. Invest in a proven clean tech platform
          generating global demand—with deployable, off-grid energy and cold air
          built in.
        </p>

        {/* Key Investment Highlight */}
        <div className="mt-8 mb-12">
          <div className="inline-flex items-center space-x-8 bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">$3.00</div>
              <div className="text-sm text-white/70">per share</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">$10K</div>
              <div className="text-sm text-white/70">Minimum Investment</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">$25M</div>
              <div className="text-sm text-white/70">Goal</div>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-6 text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            onClick={() => (window.location.href = "https://invest.airpowerusa.net/")}
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              boxShadow:
                "0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            Join the Round
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12">
          <div className="max-w-2xl mx-auto bg-black/20 backdrop-blur-sm rounded-lg p-4">
            <p
              className="text-xs text-white/80 text-left leading-relaxed"
              style={{ fontSize: "12px", opacity: "0.8" }}
            >
              This offering is available to accredited investors under
              Regulation D. Please see our{" "}
              <Link
                href="/investor-faqs"
                className="text-cyan-400 hover:text-cyan-300 underline transition-colors font-semibold"
              >
                Investor FAQs here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent z-10" />
    </section>
  );
}
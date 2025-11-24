"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Shield, ArrowRight } from "lucide-react";

const highlights = [
  { icon: DollarSign, key: 'activeInterest' },
  { icon: TrendingUp, key: 'provenTech' },
  { icon: Shield, key: 'patent' }
];

export default function InvestorCTA() {
  const t = useTranslations('home.investorCta');

  return (
    <section id="contact-form" className="relative py-28 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Callout panel */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-slate-950/70 shadow-2xl backdrop-blur-md p-8 sm:p-12 lg:p-16 text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-3">
              {t('badge', { default: 'Investment Opportunity' })}
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {t('titleTop', { default: 'Investor' })}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {t('titleBottom', { default: 'Opportunity' })}
              </span>
            </h2>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/80">
              {t('subtitle', { default: 'AirPower USA is now open to accredited investors.' })}
            </p>
          </div>

          {/* Copy */}
          <div className="mx-auto max-w-3xl text-white/80">
            <p className="text-base sm:text-lg leading-relaxed">
              {t('p1', { default: "We're seeking strategic investors to help scale production and meet demand. With over $30M in active interest and a proven technology platform, AirPower is positioned for rapid growth." })}
            </p>
            <p className="text-base sm:text-lg leading-relaxed mt-4 font-semibold text-white/90">
              {t('p2', { default: 'Join us as we bring clean, compressed-air energy to the world.' })}
            </p>
          </div>

          {/* Highlights row */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </span>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">
                      {t(`highlights.${highlight.key}.title`)}
                    </div>
                    <div className="text-xs text-white/70 hidden sm:block">
                      {t(`highlights.${highlight.key}.description`)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Big CTA */}
          <div className="mt-12">
            <Button
              size="lg"
              className="group relative text-lg sm:text-xl px-12 py-7 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold shadow-[0_12px_40px_-8px_rgba(59,130,246,0.5)] hover:shadow-[0_16px_48px_-6px_rgba(6,182,212,0.55)]"
              onClick={() => (window.location.href = "https://invest.airpowerusa.net/")}
            >
              Join the Round
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
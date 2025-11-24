"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InvestorForm() {
  return (
    <section id="investor-form" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
          Ready to talk?
        </h2>
        <p className="text-lg text-white/80 mb-10">
          Book a call with our team to learn more about the round.
        </p>
        <Button
          size="lg"
          className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-6 text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
          onClick={() => (window.location.href = "https://invest.airpowerusa.net/")}
        >
          Book a Call
          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
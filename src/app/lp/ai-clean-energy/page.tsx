"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Phone } from "lucide-react";
import GhlInvestorLeadForm from "@/components/investor/GhlInvestorLeadForm";
import { getInvestorCalendarUrl } from "@/lib/investor-calendar";

/* ================================================================== */
/*  VARIANT A — "The Ally" — Story-driven, conversational              */
/* ================================================================== */
function VariantA() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:py-6">
          <a href="https://airpowerusa.net" target="_blank" rel="noopener noreferrer">
            <Image
              src="/media/images/airpowerlogowhite2.png"
              alt="AirPower USA"
              width={540}
              height={180}
              className="h-16 sm:h-20 lg:h-24 w-auto"
              priority
            />
          </a>
          <Button
            size="sm"
            className="h-9 bg-cyan-400 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
            onClick={scrollToForm}
          >
            Request Access
          </Button>
        </div>
      </header>

      <section className="border-b border-white/10 pt-40 pb-16 sm:pt-44 lg:pt-48">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="pt-2">
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
              Reg D Round I Open
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Power infrastructure for the AI era.
            </h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-cyan-200">
              Electricity and cooling from one deployable system. No fuel
              required.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              AirPower converts compressed air into clean electricity while
              producing extremely cold exhaust air for cooling. One platform
              solving two critical infrastructure problems: power generation and
              thermal management.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-white/80 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Patented compressed-air engine</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Containerized deployment (20ft / 40ft)</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Zero-combustion power generation</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Built-in cold-air cooling</div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: "$3.00", label: "Round 1 Price" },
                { value: "$10,000", label: "Minimum Investment" },
                { value: "$25M", label: "Capital Raise Target" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-slate-900 p-4 text-center">
                  <div className="text-2xl font-extrabold text-cyan-300">{item.value}</div>
                  <div className="mt-1 text-xs text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={formRef} className="lg:sticky lg:top-24">
            <Card className="border-white/15 bg-slate-900 shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                {!formSubmitted && (
                  <>
                    <h2 className="text-center text-2xl font-bold text-white">
                      Request Investor Access
                    </h2>
                    <p className="mt-2 text-center text-sm text-white/60">
                      For accredited investors interested in opportunities
                      starting at $10,000.
                    </p>
                    <p className="mt-2 text-center text-xs text-white/50">
                      Confidential follow-up within 1 business day.
                    </p>
                  </>
                )}
                <div className="mt-6">
                  <GhlInvestorLeadForm
                    variant="dark"
                    redirectUrl={getInvestorCalendarUrl()}
                    landingPageVariant="lp-a"
                    onSubmittedChange={setFormSubmitted}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Why This Opportunity Is Timely
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">
                AI compute demand is outpacing power infrastructure
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                AI workloads are accelerating faster than grid expansion,
                creating immediate demand for distributed energy systems.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">
                Cooling is becoming the next data center bottleneck
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Traditional thermal systems require massive water consumption.
                AirPower provides integrated cooling through cold-air exhaust.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">
                Commercial demand already emerging
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Market engagement and proposal activity indicate demand beyond
                R&D, supporting production scale-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Deployable Power for Critical Infrastructure
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                title: "AI Data Centers",
                body: "Power + cooling for high-performance compute environments.",
              },
              {
                title: "Defense & Remote Operations",
                body: "Portable clean power for mission-critical environments.",
              },
              {
                title: "Disaster Response",
                body: "Rapid deployment power systems when grid infrastructure fails.",
              },
              {
                title: "Microgrid Systems",
                body: "Distributed power generation supporting grid resilience.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Compressed Air Energy Platform
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">
            AirPower&apos;s patented compressed air engine converts stored air into
            mechanical energy to drive electrical generation.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Unlike traditional generators, the system produces no combustion
            emissions and generates cold exhaust air between -20C and -40C.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            This dual output enables both power generation and thermal
            management within a single deployable platform.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Designed for Serious Investor Review
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Detailed documentation is provided during investor
                  conversations.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "SEC Form D Filed",
                  "Patented technology platform",
                  "$32M+ inbound test orders",
                  "$45M+ corporate proposals",
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white/85">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6 text-center">
              <Button
                size="lg"
                className="bg-cyan-400 px-10 py-6 text-base font-semibold text-slate-950 hover:bg-cyan-300"
                onClick={scrollToForm}
              >
                <Phone className="mr-2 h-5 w-5" />
                Request Investor Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            The Future of Energy Infrastructure
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70">
            Artificial intelligence, data centers, and global infrastructure
            demand are driving unprecedented growth in electricity consumption.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/70">
            AirPower is building deployable clean power systems designed for a
            world where energy demand is accelerating faster than traditional
            grids can expand.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-cyan-400 px-10 py-6 text-base font-semibold text-slate-950 hover:bg-cyan-300"
            onClick={scrollToForm}
          >
            Request Investor Access
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/media/images/airpowerlogowhite2.png"
              alt="AirPower USA"
              width={200}
              height={65}
              className="h-6 w-auto opacity-40"
            />
          </div>
          <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-white/35">
            This is not an offer to sell or a solicitation to buy securities.
            Securities are offered only to accredited investors under SEC
            Regulation D, Rule 506(c). All investments involve risk including
            loss of principal. AirPower USA (CIK: 0002080497) has filed Form D
            with the SEC.{" "}
            <a
              href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002080497"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline"
            >
              View on SEC EDGAR
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-white/25">
            <a href="https://airpowerusa.net/filings" target="_blank" rel="noopener noreferrer" className="hover:text-white/40">SEC Filings</a>
            <span>·</span>
            <a href="https://airpowerusa.net/investor-faqs" target="_blank" rel="noopener noreferrer" className="hover:text-white/40">Investor FAQs</a>
            <span>·</span>
            <span>© {new Date().getFullYear()} Air Power USA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================================================================== */
/*  VARIANT B — "The Opportunity" — Numbers-first, premium, direct     */
/* ================================================================== */
function VariantB() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:py-6">
          <a href="https://airpowerusa.net" target="_blank" rel="noopener noreferrer">
            <Image
              src="/media/images/airpowerlogowhite2.png"
              alt="AirPower USA"
              width={540}
              height={180}
              className="h-16 sm:h-20 lg:h-24 w-auto"
              priority
            />
          </a>
          <Button
            size="sm"
            className="h-9 bg-cyan-400 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
            onClick={scrollToForm}
          >
            Request Investor Access
          </Button>
        </div>
      </header>

      <section className="border-b border-white/10 pt-40 pb-16 sm:pt-44 lg:pt-48">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-14">
          <div className="pt-2">
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
              Reg D Round I Open
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Power infrastructure that doesn&apos;t depend on the grid.
            </h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-cyan-200">
              Deployable clean power designed to replace diesel generators
              anywhere electricity is needed.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Most backup power systems still rely on diesel fuel.
            </p>
            <p className="mt-2 text-base text-white/75">
              Hospitals. Construction sites. Defense operations. Remote
              infrastructure.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
              AirPower is building a deployable energy platform that converts
              compressed air into electricity while producing extremely cold
              exhaust air for cooling.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
              One system designed to solve two infrastructure problems: reliable
              power generation and thermal management.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-white/80 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Patented compressed-air power engine</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Zero-combustion electricity generation</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Containerized deployment (20ft / 40ft formats)</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Cold-air output for cooling applications</div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: "$3.00", label: "Round 1 Price" },
                { value: "$10,000", label: "Minimum Investment" },
                { value: "$25M", label: "Capital Raise Target" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-slate-900 p-4 text-center">
                  <div className="text-2xl font-extrabold text-cyan-300">{item.value}</div>
                  <div className="mt-1 text-xs text-white/50">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={formRef} className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/15 bg-slate-900 p-6 shadow-2xl sm:p-8">
              {!formSubmitted && (
                <>
                  <h2 className="text-center text-2xl font-bold text-white">
                    Request Investor Access
                  </h2>
                  <p className="mt-2 text-center text-sm text-white/60">
                    Investor qualification form. Confidential follow-up within
                    one business day.
                  </p>
                  <p className="mt-2 text-center text-sm text-cyan-200">
                    For accredited investors interested in opportunities
                    starting at $10,000.
                  </p>
                </>
              )}
              <div className="mt-6">
                <GhlInvestorLeadForm
                  variant="dark"
                  redirectUrl={getInvestorCalendarUrl()}
                  submitLabel="Request Investor Access"
                  landingPageVariant="lp-b"
                  onSubmittedChange={setFormSubmitted}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Why the market is changing
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">
                Grid reliability is declining
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Aging infrastructure and rising electricity demand are
                increasing pressure on traditional power systems.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">Diesel is still the default</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Despite decades of innovation, diesel generators remain the
                primary backup power system worldwide.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">
                Deployable power demand is growing
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Industries increasingly require power systems that operate
                independently of grid infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Where deployable power matters most
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                title: "Defense and remote operations",
                body: "Portable clean power for mission-critical environments.",
              },
              {
                title: "Disaster response",
                body: "Rapid deployment energy when grid infrastructure fails.",
              },
              {
                title: "Industrial operations",
                body: "Reliable electricity for construction, mining, and remote infrastructure.",
              },
              {
                title: "Microgrid systems",
                body: "Distributed power generation supporting grid resilience.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Compressed Air Energy Platform
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">
            AirPower&apos;s patented compressed air engine converts stored air into
            mechanical energy to drive electrical generation.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Unlike traditional generators, the system produces no combustion
            emissions and generates cold exhaust air between -20C and -40C.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            This dual output enables both electricity generation and cooling
            capability within a single deployable platform.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Designed for disciplined investor review
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  This page begins the investor qualification process. Detailed
                  materials are shared with eligible investors during follow-up
                  conversations.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "SEC Form D Filed",
                  "Patented technology platform",
                  "$32M+ inbound test orders",
                  "$45M+ corporate proposals",
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white/85">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6 text-center">
              <Button
                size="lg"
                className="bg-cyan-400 px-10 py-6 text-base font-semibold text-slate-950 hover:bg-cyan-300"
                onClick={scrollToForm}
              >
                <Phone className="mr-2 h-5 w-5" />
                Request Investor Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            A new category of deployable power
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70">
            As global electricity demand increases, industries are searching for
            alternatives to traditional fuel-based generators.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/70">
            AirPower is developing a deployable clean power platform designed
            for environments where reliability and independence from the grid
            are critical.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-cyan-400 px-10 py-6 text-base font-semibold text-slate-950 hover:bg-cyan-300"
            onClick={scrollToForm}
          >
            Request Investor Access
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/media/images/airpowerlogowhite2.png"
              alt="AirPower USA"
              width={200}
              height={65}
              className="h-6 w-auto opacity-40"
            />
          </div>
          <p className="text-[11px] text-white/35 leading-relaxed text-center max-w-3xl mx-auto">
            This is not an offer to sell or a solicitation to buy securities.
            Securities are offered only to accredited investors under SEC
            Regulation D, Rule 506(c). All investments involve risk including
            loss of principal. AirPower USA (CIK: 0002080497) has filed Form D
            with the SEC.{" "}
            <a
              href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002080497"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline"
            >
              View on SEC EDGAR
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-white/25">
            <a href="https://airpowerusa.net/filings" target="_blank" rel="noopener noreferrer" className="hover:text-white/40">SEC Filings</a>
            <span>·</span>
            <a href="https://airpowerusa.net/investor-faqs" target="_blank" rel="noopener noreferrer" className="hover:text-white/40">Investor FAQs</a>
            <span>·</span>
            <span>© {new Date().getFullYear()} Air Power USA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================================================================== */
/*  PAGE — A/B Router                                                  */
/*  Randomly assigns visitors to A or B and remembers their assignment */
/* ================================================================== */
export default function AICleanEnergyLP() {
  const [variant, setVariant] = useState<"A" | "B" | null>(null);

  useEffect(() => {
    // Check URL param override first (?v=a or ?v=b)
    const params = new URLSearchParams(window.location.search);
    const override = params.get("v")?.toUpperCase();
    if (override === "A" || override === "B") {
      setVariant(override);
      return;
    }

    // Check if already assigned
    const stored = localStorage.getItem("lp_variant");
    if (stored === "A" || stored === "B") {
      setVariant(stored);
      return;
    }

    // Random assignment (50/50)
    const assigned = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem("lp_variant", assigned);
    setVariant(assigned);
  }, []);

  // Loading state (brief flash)
  if (!variant) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return variant === "A" ? <VariantA /> : <VariantB />;
}

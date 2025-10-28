import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InvestorFAQ from "@/components/sections/InvestorFAQ";
import { getTranslations } from "next-intl/server";

export default async function InvestorFAQsLocalePage() {
  const t = await getTranslations('home.investorCta');
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 animate-gradient-x"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>
        <div className="relative z-20 mx-auto max-w-4xl px-6 py-32 text-center lg:px-8">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
            <span style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
              Investor
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-2">
              FAQs
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl font-light">
            {t('thanksBody')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent z-10" />
      </section>
      <InvestorFAQ showTitle={false} className="bg-background" />
      <Footer />
    </main>
  );
}



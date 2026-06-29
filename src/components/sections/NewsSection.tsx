"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, FileText, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Placeholder news data - professional "coming soon" placeholders
type PressRelease = {
  id: number;
  title: string;
  titleEs?: string;
  excerpt: string;
  excerptEs?: string;
  date: string;
  category: string;
  link?: string;
  isPlaceholder?: boolean;
  contentUrl?: string; // English content path
  contentUrlEs?: string; // Spanish content path
};

type MediaCoverageItem = {
  id: number;
  title: string;
  publication: string;
  date: string;
  excerpt: string;
  link: string;
  isPlaceholder?: boolean;
  /** Shown as badge (Analysis / News / Interview); omit for generic "External". */
  coverageType?: "analysis" | "news" | "interview";
  /** When set, this item drives the large featured hero instead of the newest press release. */
  pinToHero?: boolean;
};

const pressReleases: PressRelease[] = [
  {
    id: 109,
    title:
      "Cyber Enviro-Tech, Inc. Highlights AirPower Relationship and Global Clean Energy Market Opportunity",
    excerpt:
      "CETI highlights its AirPower relationship and exclusive territory rights, positioning to pursue commercial opportunities across a described $2.4T clean energy and $847B off-grid market.",
    date: "June 29, 2026",
    category: "Official Updates",
    contentUrl: "/press/2026-06-29-ceti-airpower-global-clean-energy-market-opportunity.html",
  },
  {
    id: 108,
    title:
      "Cyber Enviro-Tech Positions AirPower Technology Agreement to Support U.S. Energy Independence Following April 2026 Presidential Actions",
    excerpt:
      "CETI highlights how its AirPower licensing agreement aligns with April 2026 Presidential Actions on U.S. energy infrastructure, grid resilience, and scalable domestic energy solutions.",
    date: "April 21, 2026",
    category: "Official Updates",
    contentUrl: "/press/2026-04-21-ceti-airpower-us-energy-independence-presidential-actions.html",
  },
  {
    id: 107,
    title: "Cyber Enviro-Tech Receives Initial Order Inquiry for AirPower Systems in Africa",
    excerpt:
      "Following the recent licensing agreement, CETI reports an early-stage inquiry tied to approximately 85 portable 3MW AirPower systems for African infrastructure applications.",
    date: "March 27, 2026",
    category: "Official Updates",
    contentUrl: "/press/2026-03-27-ceti-initial-order-inquiry-africa.html",
  },
  {
    id: 106,
    title: "Cyber Enviro-Tech and Air Power USA Agree to Exclusive Manufacturing and Distribution Rights",
    excerpt:
      "CETI (OTCQB: CETI) announces a manufacturing and distribution agreement with Air Power USA for compressed-air energy systems across the Middle East, Africa, and Kuwait.",
    date: "March 23, 2026",
    category: "Official Updates",
    contentUrl: "/press/2026-03-23-ceti-airpower-manufacturing-agreement.html",
  },
  {
    id: 105,
    title: "Air Power USA Debuts Compressed‑Air Power at IUCN Conference in Abu Dhabi",
    excerpt: "Senior VP Phil Plumley presents the ‘Thin Air to Clean Energy’ platform to UAE stakeholders; watch the brief event walkthrough.",
    date: "October 20, 2025",
    category: "Official Updates",
    contentUrl: "/press/2025-10-20-iucn-abu-dhabi-debut.html",
  },
  {
    id: 101,
    title: "Air Power USA Announces Engagement of DealMaker Securities",
    excerpt: "Company engages DealMaker Securities for investor awareness in connection with a $25M SEC REG D 504(c) filing.",
    date: "September 24, 2025",
    category: "Official Updates",
    contentUrl: "/press/2025-09-24-dealmaker-awareness.html",
  },
  {
    id: 102,
    title: "Air Power USA Announces $25M SEC REG D 504(c) Filing",
    excerpt: "Company files Regulation D 504(c) offering to fund introduction of its ‘Clean Energy from Thin Air’ technology.",
    date: "August 19, 2025",
    category: "Official Updates",
    contentUrl: "/press/2025-08-19-reg-d-504c-filing.html",
  },
  {
    id: 103,
    title: "Air Power USA Announces $5M SEC CF Crowdfunding Filing",
    excerpt: "Company files Reg CF crowdfunding to complement its ongoing Reg D 504(c) raise and broaden participation.",
    date: "October 6, 2025",
    category: "Official Updates",
    contentUrl: "/press/2025-10-06-sec-cf-crowdfunding.html",
  },
  {
    id: 104,
    title: "Air Power USA VP Phil Plumley to Speak at IUCN Conference in Abu Dhabi",
    excerpt: "Air Power USA technology to be introduced to the UAE; meetings with royal families and regional stakeholders.",
    date: "October 4, 2025",
    category: "Company News",
    contentUrl: "/press/2025-10-04-iucn-abu-dhabi.html",
  },
];

const mediaCoverage: MediaCoverageItem[] = [
  {
    id: 104,
    title:
      "Cyber Enviro-Tech Positions AirPower Technology Agreement to Support U.S. Energy Independence Following April 2026 Presidential Actions",
    publication: "PR Newswire",
    date: "April 21, 2026",
    excerpt:
      "Wire: CETI frames its AirPower platform alongside April 2026 Presidential Actions on U.S. energy infrastructure, grid resilience, and domestically deployable clean energy solutions.",
    link: "https://www.prnewswire.com/news-releases/cyber-enviro-tech-positions-airpower-technology-agreement-to-support-us-energy-independence-following-april-2026-presidential-actions-302749051.html",
    coverageType: "news",
  },
  {
    id: 103,
    title:
      "Cyber Enviro-Tech Inc Expands Board with AirPower CEO, Strengthens Leadership and Advances $200M+ Clean Energy Opportunities",
    publication: "OTC Markets",
    date: "April 7, 2026",
    excerpt:
      "CETI stock news: Brianna Stoecklein, CEO of Air Power USA, joins Cyber Enviro-Tech’s board—aligning leadership with the AirPower licensing path and framing a $200M+ clean energy opportunity set.",
    link: "https://www.otcmarkets.com/stock/CETI/news/Cyber-Enviro-Tech-Inc-Expands-Board-with-AirPower-CEO-Strengthens-Leadership-and-Advances-200M-Clean-Energy-Opportunitie?id=516473",
    coverageType: "news",
  },
  {
    id: 102,
    title:
      "Cyber Enviro-Tech Receives Initial Order Inquiry for AirPower Systems in Africa",
    publication: "PR Newswire",
    date: "March 27, 2026",
    excerpt:
      "Wire coverage of CETI’s early-stage inquiry for approximately 85 AirPower 3MW portable power stations in Africa—potential scale, 2026 delivery timing, and support from AirPower USA under the licensing agreement.",
    link: "https://www.prnewswire.com/news-releases/cyber-enviro-tech-receives-initial-order-inquiry-for-airpower-systems-in-africa-highlighting-early-commercial-traction-following-recent-licensing-agreement-302727219.html",
    coverageType: "news",
  },
  {
    id: 101,
    title: "CETI Bets on Compressed Air for Global Energy Pivot",
    publication: "BriefGlance",
    date: "March 23, 2026",
    excerpt:
      "Editorial analysis of Cyber Enviro-Tech’s exclusive manufacturing and distribution agreement with Air Power USA—compressed-air technology, target regions, and the path to commercialization.",
    link: "https://briefglance.com/articles/ceti-bets-on-compressed-air-for-global-energy-pivot",
    coverageType: "analysis",
  },
];

const pressGridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};
const pressGridItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Curated external reads (not specifically about AirPower)
const industryInsights = [
  {
    id: 2001,
    title: "How Battery Energy Storage Systems Power Modern Grids",
    publication: "BSLBATT Lithium",
    date: "July 7, 2025",
    excerpt: "Overview of how BESS stabilizes grids, core components (cells, inverters), safety, and investment models.",
    link: "https://bslbatt.com/blogs/how-bess-store-energy-and-balance-modern-power-grids/",
  },
];

export default function NewsSection() {
  const [selected, setSelected] = useState<PressRelease | null>(null);
  const [contentHtml, setContentHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('home.newsroom.sections');
  const isEs = pathname?.startsWith('/es');
  
  // Sort newest first by parsed date string (e.g., "October 6, 2025")
  const sortedPressReleases = [...pressReleases].sort((a, b) => {
    const ad = new Date(a.date).getTime();
    const bd = new Date(b.date).getTime();
    return bd - ad;
  });

  const heroMedia =
    mediaCoverage.find(
      (m) => m.pinToHero && !m.isPlaceholder && m.link && m.link !== "#",
    ) ?? null;

  const featuredRelease =
    !heroMedia &&
    sortedPressReleases[0] &&
    !sortedPressReleases[0].isPlaceholder &&
    sortedPressReleases[0].contentUrl
      ? sortedPressReleases[0]
      : null;

  const featuredMedia =
    !heroMedia &&
    (mediaCoverage.find((m) => !m.isPlaceholder && m.link && m.link !== "#") ?? null);

  const heroSecondaryPressRelease =
    heroMedia &&
    sortedPressReleases[0] &&
    !sortedPressReleases[0].isPlaceholder &&
    sortedPressReleases[0].contentUrl
      ? sortedPressReleases[0]
      : null;

  useEffect(() => {
    const url = (isEs && selected?.contentUrlEs) ? selected?.contentUrlEs : selected?.contentUrl;
    if (!url) {
      setContentHtml(null);
      setIsLoading(false);
      setLoadError(null);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setLoadError(null);
    fetch(url)
      .then(r => r.text())
      .then(html => {
        if (!cancelled) setContentHtml(html);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Failed to load press release.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isEs, selected?.contentUrl, selected?.contentUrlEs]);
  return (
    <section className="py-24 bg-gradient-to-b from-background via-slate-950/20 to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(heroMedia || featuredRelease) && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-blue-950/90 shadow-2xl shadow-blue-950/40"
              role="article"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(59,130,246,0.18),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(6,182,212,0.12),transparent_50%)]" />
              <div className="relative grid gap-10 p-8 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-12 items-center">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="border-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      {t("featured.badge")}
                    </Badge>
                    <Badge variant="outline" className="border-white/20 bg-white/5 text-foreground">
                      {heroMedia
                        ? heroMedia.publication
                        : featuredRelease!.category}
                    </Badge>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {heroMedia ? heroMedia.date : featuredRelease!.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-tight">
                    {heroMedia
                      ? heroMedia.title
                      : isEs && featuredRelease!.titleEs
                        ? featuredRelease!.titleEs
                        : featuredRelease!.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {heroMedia
                      ? heroMedia.excerpt
                      : isEs && featuredRelease!.excerptEs
                        ? featuredRelease!.excerptEs
                        : featuredRelease!.excerpt}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    {heroMedia ? (
                      <>
                        <a
                          href={heroMedia.link}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-flex"
                        >
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/30 hover:from-blue-500 hover:to-cyan-500"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t("coverage.readArticle")}
                          </Button>
                        </a>
                        {heroSecondaryPressRelease && (
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 bg-white/5 hover:bg-white/10"
                            onClick={() => setSelected(heroSecondaryPressRelease)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {t("featured.readRelease")}
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/30 hover:from-blue-500 hover:to-cyan-500"
                          onClick={() => setSelected(featuredRelease!)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {t("featured.readRelease")}
                        </Button>
                        {featuredMedia && (
                          <a
                            href={featuredMedia.link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex"
                          >
                            <Button
                              size="lg"
                              variant="outline"
                              className="border-white/20 bg-white/5 hover:bg-white/10"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              {t("featured.relatedCoverage")}
                            </Button>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none">
                  <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <Image
                    src="/media/images/air_tanks.png"
                    alt="Air Power USA compressed air energy systems"
                    fill
                    className="rounded-2xl object-cover ring-1 ring-white/10"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Press Releases */}
        <div className="mb-20 rounded-3xl border border-border/50 bg-gradient-to-b from-card/40 to-muted/10 p-6 shadow-inner shadow-black/20 md:p-10">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t('press.badge', { default: 'Official Updates' })}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('press.titleTop', { default: 'Press' })}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {t('press.titleBottom', { default: 'Releases' })}
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('press.subtitle', { default: 'Latest official announcements and company updates from AirPower USA.' })}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={pressGridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {sortedPressReleases.map((release) => (
              <motion.div key={release.id} variants={pressGridItem}>
              <Card 
                className={`group h-full border-border/50 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-950/10 transition-all duration-300 hover:scale-[1.02] ${release.isPlaceholder ? 'bg-muted/30 border-dashed border-2' : ''}`}
                onClick={() => {
                  if (!release.isPlaceholder && release.contentUrl) setSelected(release);
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={release.isPlaceholder ? "secondary" : "outline"} className={release.isPlaceholder ? "opacity-60" : ""}>
                      {release.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {release.date}
                    </div>
                  </div>
                  <CardTitle className={`line-clamp-2 transition-colors ${release.isPlaceholder ? 'text-muted-foreground' : 'group-hover:text-primary'}`}>
                    {isEs && release.titleEs ? release.titleEs : release.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed mb-4">
                    {isEs && release.excerptEs ? release.excerptEs : release.excerpt}
                  </CardDescription>
                  {release.isPlaceholder ? (
                    <div className="flex items-center text-sm text-muted-foreground font-medium">
                      <FileText className="w-4 h-4 mr-2" />
                      Coming Soon
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (release.contentUrl) setSelected(release);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {t('press.read', { default: 'Read Full Release' })}
                    </Button>
                  )}
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Media Coverage */}
        <div className="mb-20 rounded-3xl border border-border/40 bg-gradient-to-br from-violet-950/20 via-transparent to-slate-950/30 p-6 md:p-10">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t('coverage.badge', { default: 'External Coverage' })}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('coverage.titleTop', { default: 'Media' })}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                {t('coverage.titleBottom', { default: 'Coverage' })}
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('coverage.subtitle', { default: "Industry publications and media outlets covering AirPower's technology and market impact." })}
            </p>
          </div>

          <div
            className={
              mediaCoverage.length === 1
                ? "grid grid-cols-1 gap-8 max-w-xl mx-auto"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            }
          >
            {mediaCoverage.map((article) => (
              <Card key={article.id} className={`group border-border/50 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-950/15 transition-all duration-300 hover:scale-[1.02] ${article.isPlaceholder ? 'bg-muted/30 border-dashed border-2' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={`${article.isPlaceholder ? 'bg-purple-500/5 text-purple-400/60 border-purple-500/10 opacity-60' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                      {article.coverageType && !article.isPlaceholder
                        ? t(`coverage.types.${article.coverageType}`)
                        : t("coverage.external")}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className={`line-clamp-2 transition-colors ${article.isPlaceholder ? 'text-muted-foreground' : 'group-hover:text-primary'}`}>
                    {article.title}
                  </CardTitle>
                  <CardDescription className={`font-medium ${article.isPlaceholder ? 'text-muted-foreground/60' : 'text-primary'}`}>
                    {article.publication}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  {article.isPlaceholder ? (
                    <div className="flex items-center text-sm text-muted-foreground font-medium">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Stay Tuned
                    </div>
                  ) : (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("coverage.readArticle")}
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Insights */}
        <div className="mb-20 rounded-3xl border border-border/40 bg-gradient-to-br from-slate-950/30 via-transparent to-emerald-950/10 p-6 md:p-10">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t('insights.badge', { default: 'Curated Reads' })}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('insights.titleTop', { default: 'Industry' })}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-300">
                {t('insights.titleBottom', { default: 'Insights' })}
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('insights.subtitle', { default: 'Expert articles and explainers we recommend. External links open in a new tab.' })}
            </p>
          </div>

          <div
            className={
              industryInsights.length === 1
                ? "grid grid-cols-1 gap-8 max-w-xl mx-auto"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            }
          >
            {industryInsights.map((article) => (
              <Card key={article.id} className="group border-border/50 hover:border-emerald-500/25 hover:shadow-lg hover:shadow-emerald-950/10 transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-teal-500/10 text-teal-300 border-teal-500/20">Insight</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {article.publication}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('insights.read', { default: 'Read Article' })}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* Modal for full press release */}
        {selected && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="relative w-full max-w-4xl bg-card rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{isEs && selected.titleEs ? selected.titleEs : selected.title}</h3>
                    <div className="mt-1 text-sm text-muted-foreground flex items-center"><Calendar className="w-4 h-4 mr-1" />{selected.date}</div>
                  </div>
                  <Badge variant="outline">{selected.category}</Badge>
                </div>
              </div>
              <div className="h-[70vh] bg-background">
                {isLoading && (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">Loading…</div>
                )}
                {!isLoading && loadError && (
                  <div className="p-6 text-destructive">{loadError}</div>
                )}
                {!isLoading && !loadError && contentHtml && (
                  <div
                    className="w-full h-full overflow-auto p-0"
                    onClick={(e) => {
                      const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
                      if (!anchor) return;
                      try {
                        const url = new URL(anchor.href, window.location.origin);
                        const vid = url.searchParams.get('videoId');
                        const onNewsroom = url.pathname.includes('/newsroom') || url.pathname === '/videos';
                        if (vid && onNewsroom) {
                          e.preventDefault();
                          const ts = Date.now();
                          router.push(`${pathname}?videoId=${vid}&ts=${ts}`, { scroll: false });
                          setSelected(null);
                        }
                      } catch {}
                    }}
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                )}
                {!isLoading && !loadError && !contentHtml && (
                  <div className="p-6 text-muted-foreground">Content coming soon.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 
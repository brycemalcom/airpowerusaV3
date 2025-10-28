"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, FileText, X } from "lucide-react";
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

const pressReleases: PressRelease[] = [
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

const mediaCoverage = [
  {
    id: 1,
    title: "Industry Publications",
    publication: "Coming Soon",
    date: "Stay Tuned",
    excerpt: "Coverage from leading energy and technology publications will be featured here as our story unfolds.",
    link: "#",
    isPlaceholder: true
  },
  {
    id: 2,
    title: "Expert Analysis",
    publication: "Coming Soon", 
    date: "Stay Tuned",
    excerpt: "In-depth analysis and commentary from industry experts and thought leaders in clean energy.",
    link: "#",
    isPlaceholder: true
  },
  {
    id: 3,
    title: "Media Interviews",
    publication: "Coming Soon",
    date: "Stay Tuned", 
    excerpt: "Interviews with our leadership team and technical experts as featured in various media outlets.",
    link: "#",
    isPlaceholder: true
  }
];

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
  }, [selected?.contentUrl]);
  return (
    <section className="py-24 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Press Releases */}
        <div className="mb-20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPressReleases.map((release) => (
              <Card 
                key={release.id} 
                className={`group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${release.isPlaceholder ? 'bg-muted/30 border-dashed border-2' : ''}`}
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
            ))}
          </div>
        </div>

        {/* Industry Insights */}
        <div className="mt-4 mb-20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryInsights.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
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

        {/* Media Coverage */}
        <div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaCoverage.map((article) => (
              <Card key={article.id} className={`group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${article.isPlaceholder ? 'bg-muted/30 border-dashed border-2' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={`${article.isPlaceholder ? 'bg-purple-500/5 text-purple-400/60 border-purple-500/10 opacity-60' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                      External
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
                        Read Article
                      </Button>
                    </a>
                  )}
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
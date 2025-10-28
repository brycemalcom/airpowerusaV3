"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { key: "technology", href: "/#products" },
  { key: "useCases", href: "/#use-cases" },
  { key: "products", href: "/#modular-configurations" },
  { key: "newsroom", href: "/newsroom" },
  { key: "videos", href: "/videos" },
  { key: "about", href: "/about" },
] as const;

const hamburgerMenu = [
  { key: "customers", name: "For Customers", href: "/customer", color: "text-blue-400" },
  { key: "investorsSoon", name: "For Investors — Coming Soon", href: "#", color: "text-cyan-400 opacity-70" },
  { key: "faq", name: "Investor FAQs", href: "/investor-faqs", color: "text-emerald-400" },
  { key: "filings", name: "SEC Filings", href: "/filings", color: "text-yellow-400" },
  { key: "newsroom", name: "Newsroom", href: "/newsroom", color: "text-purple-400" },
  { key: "videos", name: "Video Gallery", href: "/videos", color: "text-pink-400" },
] as const;

export default function Header() {
  const t = useTranslations('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Simple locale utilities
  const computeLocaleSwapLinks = () => {
    try {
      const path = pathname || "/";
      const parts = path.split("/").filter(Boolean);
      const first = parts[0];
      const isLocalePrefixed = first === "en" || first === "es";
      const rest = isLocalePrefixed ? parts.slice(1).join("/") : parts.join("/");
      const base = rest ? `/${rest}` : "/";
      return {
        toEN: `/en${base}`,
        toES: `/es${base}`,
      };
    } catch {
      return { toEN: "/en", toES: "/es" };
    }
  };
  const { toEN, toES } = computeLocaleSwapLinks();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-sm border-b border-border' 
        : 'bg-transparent'
    }`}>
      <nav className={`mx-auto flex max-w-7xl items-center justify-between lg:px-8 transition-all duration-300 ${
        isScrolled ? 'px-4 sm:px-6 py-2 sm:py-3' : 'px-4 sm:px-6 py-4 sm:py-6'
      }`} aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <Image
              src="/media/images/airpowerlogowhite2.png"
              alt="AirPower USA Logo"
              width={540}
              height={180}
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-12 sm:h-14 lg:h-16' : 'h-16 sm:h-20 lg:h-24'
              }`}
              style={{
                filter: !isScrolled ? 'contrast(1.1) brightness(1.05) drop-shadow(0 1px 2px rgba(0,0,0,0.3))' : 'none'
              }}
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px"
              priority
              loading="eager"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors ${
                isScrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t(`nav.${item.key}`, { default: item.key })}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* Locale toggle (scoped to feature branch usage) */}
          <div className={`hidden md:flex items-center gap-2 mr-3 ${isScrolled ? 'text-muted-foreground' : 'text-white/90'}`}>
            <a href={toEN} className="text-sm font-semibold hover:text-foreground">EN</a>
            <span className="opacity-50">|</span>
            <a href={toES} className="text-sm font-semibold hover:text-foreground">ES</a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${
              isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/90 hover:text-white'
            }`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </nav>
      
      {/* Hamburger menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-24 right-6 bg-black/90 backdrop-blur-md rounded-xl p-6 min-w-48">
            <div className="space-y-4">
              {hamburgerMenu.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block text-lg font-semibold leading-7 transition-colors hover:opacity-80 ${item.color}`}
                  onClick={(e) => {
                    if (item.key === 'investorsSoon') {
                      e.preventDefault();
                      return;
                    }
                    setMobileMenuOpen(false);
                  }}
                  aria-disabled={item.name.startsWith('For Investors')}
                >
                  {item.key === 'investorsSoon' ? t('menu.investorsSoon', { default: item.name }) : t(`menu.${item.key}`, { default: item.name })}
                </a>
              ))}
            </div>
            <div className="border-t border-white/20 my-4"></div>
            <div className="flex flex-col space-y-4 items-center">
              <a
                href="https://linkedin.com/company/airpowerusa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/airpowerusa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 
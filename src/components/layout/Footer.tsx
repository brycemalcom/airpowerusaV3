"use client";
import { Separator } from "@/components/ui/separator";
import { Zap, Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const navigation = {
  main: [
    { key: "technology", name: "Technology", href: "#technology" },
    { key: "products", name: "Products", href: "#products" },
    { key: "useCases", name: "Use Cases", href: "#use-cases" },
    { key: "about", name: "About", href: "/about" },
  ],
  support: [
    { key: "documentation", name: "Documentation", href: "/filings" },
    { key: "contact", name: "Contact", href: "/contact" },
    { key: "investorRelations", name: "Investor Relations", href: "/invest" },
    { key: "investorFaqs", name: "Investor FAQs", href: "/investor-faqs" },
  ],
};

export default function Footer() {
  const t = useTranslations('common');
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">AirPower USA</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              {t('footer.blurb', { default: 'Revolutionary compressed air engine technology delivering zero-emission power solutions for a sustainable future. From mobile units to industrial-scale stations.' })}
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                info@airpowerusa.net
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                214.257.7957
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                San Diego, CA | Versailles, France
              </div>
            </div>
          </div>
          
          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t('footer.company', { default: 'Company' })}</h3>
            <ul className="mt-4 space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`footer.links.${item.key}`, { default: item.name })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t('footer.support', { default: 'Support' })}</h3>
            <ul className="mt-4 space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`footer.links.${item.key}`, { default: item.name })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 AirPower USA. {t('footer.rights', { default: 'All rights reserved.' })}
          </p>
          <div className="flex space-x-6">
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.privacy', { default: 'Privacy Policy' })}
            </a>
            <a href="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.terms', { default: 'Terms of Service' })}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
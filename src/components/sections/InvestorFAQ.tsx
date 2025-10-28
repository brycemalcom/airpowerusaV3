"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

const TOTAL_FAQS = 23 as const;

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="mb-4 bg-slate-800/50 rounded-2xl overflow-hidden">
      <button
        className="w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-300 group hover:bg-slate-700/30"
        onClick={onToggle}
      >
        <span className={`font-semibold pr-4 transition-colors duration-300 ${
          isOpen ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
        }`}>{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-400 flex-shrink-0 transition-all duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 transition-all duration-300 group-hover:text-blue-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-slate-700/50">
          <div className="pt-4">
            <p className="text-gray-300 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface InvestorFAQProps {
  showTitle?: boolean;
  className?: string;
}

export default function InvestorFAQ({ showTitle = true, className = "" }: InvestorFAQProps) {
  const t = useTranslations('faqs');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          {Array.from({ length: TOTAL_FAQS }, (_, i) => {
            const id = i + 1;
            const question = t(`items.q${id}.q`);
            const answer = t(`items.q${id}.a`);
            return { id, question, answer };
          }).map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200/50 shadow-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3">{t('bottom.title')}</h3>
            <p className="text-slate-700 mb-6 text-lg">{t('bottom.body')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:invest@airpowerusa.net"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              >
                invest@airpowerusa.net
              </a>
              <div className="text-slate-600">
                <span className="font-medium">{t('bottom.phone')} </span> 214.257.7957
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

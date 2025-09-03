"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "How do I invest in AirPower USA?",
    answer: "You can invest directly through our current Regulation D offering by completing the subscription agreement and submitting your payment. Once processed, your shares will be recorded with our transfer agent. Contact us at invest@airpowerusa.com for the investor packet and instructions."
  },
  {
    id: 2,
    question: "Am I eligible to invest?",
    answer: "Our current round is open to accredited investors under SEC Regulation D, Rule 506(c). You'll need to meet accreditation criteria such as income or net worth thresholds."
  },
  {
    id: 3,
    question: "What payment types are accepted?",
    answer: "We accept wire transfers and ACH payments for U.S.-based investors. International investors may also use bank wire. (Exact payment instructions are provided in your subscription packet.)"
  },
  {
    id: 4,
    question: "What is the price per share?",
    answer: "In Round 1, shares are offered at $3.00 per share with a $10,000 minimum investment."
  },
  {
    id: 5,
    question: "What is the minimum to invest?",
    answer: "$10,000 in this current round."
  },
  {
    id: 6,
    question: "What is the maximum I can invest?",
    answer: "There is no hard maximum for accredited investors under Reg D. Investments over certain thresholds may require additional compliance review."
  },
  {
    id: 7,
    question: "Can I invest in AirPower USA if I am a resident in another country?",
    answer: "Yes, non-U.S. residents may invest, subject to applicable local laws and completion of required compliance documentation."
  },
  {
    id: 8,
    question: "Where can I see my shares?",
    answer: "Your shares will be recorded with our appointed transfer agent, who will provide you with account access and documentation."
  },
  {
    id: 9,
    question: "Where can I find more information about AirPower USA?",
    answer: "Visit airpowerusa.com or contact invest@airpowerusa.com for our executive summary, pitch deck, and Reg D investor documents."
  },
  {
    id: 10,
    question: "Is there a direct number for the AirPower USA Investor Relations Team?",
    answer: "Yes — investor inquiries can be made at 214.257.7957."
  },
  {
    id: 11,
    question: "What platform(s) are AirPower USA investment opportunities available on?",
    answer: "Our current offering is conducted privately under Reg D and is available directly from the company, not through public crowdfunding platforms."
  },
  {
    id: 12,
    question: "When is the last day to buy shares?",
    answer: "Round 1 is open until fully subscribed. Availability is first-come, first-served."
  },
  {
    id: 13,
    question: "What is AirPower USA's valuation?",
    answer: "Valuation is based on current offering price and number of shares outstanding. Contact us for current details."
  },
  {
    id: 14,
    question: "What is the initial projected return on investment (ROI)?",
    answer: "Projected ROI depends on company growth, product adoption, and potential future liquidity events such as an IPO. ROI is not guaranteed."
  },
  {
    id: 15,
    question: "Does AirPower USA plan to do an initial public offering (IPO) and if so, when?",
    answer: "Yes. The company plans to be publicly listed by Q1-Q2 2026, emerging as an NYSE, AMEX, or NASDAQ trading entitiy."
  },
  {
    id: 16,
    question: "What happens to my shares if AirPower USA goes public?",
    answer: "Private shares typically convert to publicly tradable shares after IPO, subject to any lock-up periods or transfer restrictions."
  },
  {
    id: 17,
    question: "Will the investment draw dividends?",
    answer: "AirPower USA is currently reinvesting all profits into growth. Dividend payments are not expected in the near term."
  },
  {
    id: 18,
    question: "What is a Transfer Agent and who is AirPower USA's Transfer Agent?",
    answer: "A transfer agent maintains records of shareholder ownership. The appointed transfer agent will be disclosed in your investor documentation."
  },
  {
    id: 19,
    question: "Are AirPower USA shares transferable?",
    answer: "Shares may be transferable in accordance with applicable securities laws and company bylaws. Restrictions may apply for private securities."
  },
  {
    id: 20,
    question: "What is an accredited investor?",
    answer: "An accredited investor meets income or net worth thresholds defined by the SEC (e.g., $200,000 annual income or $1 million net worth excluding primary residence)."
  },
  {
    id: 21,
    question: "What is Regulation A?",
    answer: "Regulation A is an SEC exemption that allows certain public offerings to non-accredited investors. AirPower USA is not currently using Reg A."
  },
  {
    id: 22,
    question: "Where can I find the Regulation D offering memorandum?",
    answer: "Contact invest@airpowerusa.com to request the full investor packet, which includes the offering memorandum and subscription agreement."
  },
  {
    id: 23,
    question: "What is the difference between an accredited offering (Reg D) and a non-accredited offering (Reg A)?",
    answer: "Reg D offerings are limited to accredited investors and allow higher investment amounts with less public disclosure. Reg A offerings can include non-accredited investors but require additional SEC qualification and public filings."
  }
];

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
              Investor FAQs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about investing in AirPower USA's Regulation D offering.
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          {faqData.map((faq) => (
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
            <h3 className="text-xl font-bold text-blue-900 mb-3">Still have questions?</h3>
            <p className="text-slate-700 mb-6 text-lg">
              Contact our investor relations team for personalized assistance with your investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:invest@airpowerusa.com"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              >
                invest@airpowerusa.com
              </a>
              <div className="text-slate-600">
                <span className="font-medium">Phone:</span> 214.257.7957
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

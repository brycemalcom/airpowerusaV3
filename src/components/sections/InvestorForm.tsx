"use client";

import { Card, CardContent } from "@/components/ui/card";
import GhlInvestorLeadForm from "@/components/investor/GhlInvestorLeadForm";
import { getInvestorCalendarUrl } from "@/lib/investor-calendar";

export default function InvestorForm() {
  return (
    <section id="investor-form" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="mx-auto max-w-xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4">
            Book a call with our investor team
          </h2>
          <p className="text-lg text-white/80">
            Share your details so we can qualify fit for the Reg D round. After
            you submit, you can schedule a time that works for you.
          </p>
          <p className="text-sm text-white/60 mt-3">
            Typical response time: same business day if you prefer email follow-up.
          </p>
        </div>
        <Card className="border-white/15 bg-slate-900/80 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <GhlInvestorLeadForm
              variant="dark"
              redirectUrl={getInvestorCalendarUrl()}
              landingPageVariant="website"
              submitLabel="Book a call"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

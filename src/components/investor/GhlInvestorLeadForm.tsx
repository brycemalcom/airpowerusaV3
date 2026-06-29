"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Phone } from "lucide-react";
import { getInvestorCalendarUrl } from "@/lib/investor-calendar";
import {
  FormAntiSpam,
  type FormAntiSpamHandle,
} from "@/components/forms/FormAntiSpam";

export type GhlLandingPageVariant = "lp-a" | "lp-b" | "website";

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accredited: string;
  investmentRange: string;
  message: string;
}

const initialFormData: LeadFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  accredited: "",
  investmentRange: "",
  message: "",
};

export default function GhlInvestorLeadForm({
  variant = "dark",
  redirectUrl = getInvestorCalendarUrl(),
  submitLabel = "Request Investor Call",
  landingPageVariant,
  onSubmittedChange,
}: {
  variant?: "dark" | "light";
  redirectUrl?: string;
  submitLabel?: string;
  landingPageVariant: GhlLandingPageVariant;
  onSubmittedChange?: (submitted: boolean) => void;
}) {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const antiSpamRef = useRef<FormAntiSpamHandle>(null);

  useEffect(() => {
    onSubmittedChange?.(isSubmitted);
  }, [isSubmitted, onSubmittedChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof LeadFormData])
      setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<LeadFormData> = {};
    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.lastName.trim()) e.lastName = "Required";
    if (!formData.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone.trim()) e.phone = "Required";
    if (!formData.accredited) e.accredited = "Please select";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError("");
    if (antiSpamRef.current?.needsTurnstileInteraction()) {
      setSubmitError("Please complete the security verification below.");
      return;
    }
    const antiSpam = antiSpamRef.current?.getFields() ?? {};
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ghl/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          landingPageVariant,
          ...antiSpam,
        }),
      });
      if (!response.ok) {
        let errorMessage = "Lead submit failed";
        try {
          const errorPayload = await response.json();
          if (typeof errorPayload?.detail === "string") {
            errorMessage = errorPayload.detail;
          } else if (typeof errorPayload?.error === "string") {
            errorMessage = errorPayload.error;
          }
        } catch {
          // Keep default when response body is not JSON.
        }
        throw new Error(errorMessage);
      }
      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "We could not submit your info right now.";
      setSubmitError(
        `${message} Please try again or email investors@airpowerusa.net.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    variant === "dark"
      ? "bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500";

  const selectClass =
    variant === "dark"
      ? "bg-white/5 border-white/20 text-white"
      : "bg-slate-50 border-slate-200 text-slate-900";

  const optionBg = variant === "dark" ? "bg-slate-900" : "bg-white";

  if (isSubmitted) {
    return (
      <div className="py-6">
        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3
          className={`text-2xl font-bold mb-3 text-center ${variant === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Thanks, we received your information.
        </h3>
        <p
          className={`mb-2 text-sm text-center ${variant === "dark" ? "text-white/75" : "text-slate-600"}`}
        >
          Our investment team will review your submission and follow up within
          1 business day. Please check your spam folder if you don&apos;t see our reply.
        </p>
        <p
          className={`mt-6 text-lg font-semibold text-center ${variant === "dark" ? "text-white" : "text-slate-900"}`}
        >
          If you&apos;d like to move faster:
        </p>
        <p
          className={`mt-1 text-sm text-center ${variant === "dark" ? "text-white/70" : "text-slate-600"}`}
        >
          You can schedule a call with our investor relations lead, Brian.
          Please select the date and time that works best for you below.
        </p>

        {redirectUrl && (
          <div className="mt-5">
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10 bg-black/20">
              <iframe
                src={redirectUrl}
                title="Investor Call Scheduler"
                className="w-full h-[720px] bg-white"
              />
            </div>

            <p
              className={`mt-3 text-xs text-center ${variant === "dark" ? "text-white/40" : "text-slate-400"}`}
            >
              If the calendar does not load,{" "}
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                open scheduling in a new tab
              </a>
              .
            </p>
          </div>
        )}

        <p
          className={`mt-3 text-sm text-center ${variant === "dark" ? "text-white/50" : "text-slate-400"}`}
        >
          Prefer email? Write to investors@airpowerusa.net.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label
            className={`text-xs font-medium ${variant === "dark" ? "text-white/70" : "text-slate-500"}`}
          >
            First Name *
          </Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First"
            className={`mt-1 h-11 ${inputClass} ${errors.firstName ? "border-red-500" : ""}`}
          />
        </div>
        <div>
          <Label
            className={`text-xs font-medium ${variant === "dark" ? "text-white/70" : "text-slate-500"}`}
          >
            Last Name *
          </Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last"
            className={`mt-1 h-11 ${inputClass} ${errors.lastName ? "border-red-500" : ""}`}
          />
        </div>
      </div>

      <div>
        <Label
          className={`text-xs font-medium ${variant === "dark" ? "text-white/70" : "text-slate-500"}`}
        >
          Email *
        </Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`mt-1 h-11 ${inputClass} ${errors.email ? "border-red-500" : ""}`}
        />
      </div>

      {submitError && (
        <p
          className={`text-xs rounded-md px-3 py-2 border ${
            variant === "dark"
              ? "bg-red-500/10 border-red-400/40 text-red-200"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {submitError}
        </p>
      )}

      <div>
        <Label
          className={`text-xs font-medium ${variant === "dark" ? "text-white/70" : "text-slate-500"}`}
        >
          Phone *
        </Label>
        <Input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          className={`mt-1 h-11 ${inputClass} ${errors.phone ? "border-red-500" : ""}`}
        />
      </div>

      <div>
        <Label
          className={`text-xs font-medium ${variant === "dark" ? "text-white/70" : "text-slate-500"}`}
        >
          Are you an accredited investor? *
        </Label>
        <select
          name="accredited"
          value={formData.accredited}
          onChange={handleChange}
          className={`mt-1 w-full rounded-md border px-3 py-2.5 text-sm ${selectClass} ${errors.accredited ? "border-red-500" : ""}`}
        >
          <option value="" className={optionBg}>
            Select...
          </option>
          <option value="yes" className={optionBg}>
            Yes
          </option>
          <option value="not_sure" className={optionBg}>
            Not sure
          </option>
          <option value="no" className={optionBg}>
            No
          </option>
        </select>
      </div>

      <div>
        <Label
          className={`text-xs font-medium ${variant === "dark" ? "text-white/70" : "text-slate-500"}`}
        >
          Investment Range (optional)
        </Label>
        <select
          name="investmentRange"
          value={formData.investmentRange}
          onChange={handleChange}
          className={`mt-1 w-full rounded-md border px-3 py-2.5 text-sm ${selectClass}`}
        >
          <option value="" className={optionBg}>
            Select...
          </option>
          <option value="10k-25k" className={optionBg}>
            $10K – $25K
          </option>
          <option value="25k-50k" className={optionBg}>
            $25K – $50K
          </option>
          <option value="50k-100k" className={optionBg}>
            $50K – $100K
          </option>
          <option value="100k-250k" className={optionBg}>
            $100K – $250K
          </option>
          <option value="250k+" className={optionBg}>
            $250K+
          </option>
        </select>
      </div>

      <div>
        <Label
          className={`text-xs font-medium ${variant === "dark" ? "text-white/70" : "text-slate-500"}`}
        >
          Message (optional)
        </Label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Questions, timeline, or anything else you'd like us to know..."
          rows={3}
          className={`mt-1 w-full rounded-md border px-3 py-2.5 text-sm resize-none ${
            variant === "dark"
              ? "bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400"
              : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
          }`}
        />
      </div>

      <FormAntiSpam ref={antiSpamRef} variant={variant} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-13 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-base py-3.5 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 mt-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Submitting...
          </>
        ) : (
          <>
            <Phone className="mr-2 h-4 w-4" />
            {submitLabel}
          </>
        )}
      </Button>

      <p
        className={`text-xs text-center mt-3 ${variant === "dark" ? "text-white/40" : "text-slate-400"}`}
      >
        No obligation. 100% confidential. Submission creates your investor
        profile and we follow up within 1 business day.
      </p>
    </form>
  );
}

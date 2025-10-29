"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Send,
  DollarSign,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { useTranslations } from "next-intl";

interface InvestorFormData {
  name: string;
  email: string;
  phone: string;
  investmentRange: string;
  message: string;
}

const investmentRangeOptions = (t: (k: string) => string) => [
  { value: "", label: t('ranges.placeholder') },
  { value: "10k-50k", label: t('ranges.r1') },
  { value: "50k-250k", label: t('ranges.r2') },
  { value: "250k+", label: t('ranges.r3') }
];

export default function InvestorForm() {
  const t = useTranslations('investorForm');
  const [formData, setFormData] = useState<InvestorFormData>({
    name: "",
    email: "",
    phone: "",
    investmentRange: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<InvestorFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof InvestorFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<InvestorFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = t('errors.name');
    if (!formData.email.trim()) {
      newErrors.email = t('errors.email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errors.emailValid');
    }
    if (!formData.investmentRange) newErrors.investmentRange = t('errors.range');
    if (!formData.message.trim()) newErrors.message = t('errors.message');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || '';
      
      // Prepare payload for HubSpot API
      const payload = {
        firstname,
        lastname,
        email: formData.email,
        phone: formData.phone,
        message: `Investment Range: ${formData.investmentRange}\n\nMessage: ${formData.message}`
      };

      console.log('About to submit payload:', payload);

      // Submit to our API route
      const response = await fetch('/api/hubspot/submit-investor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      console.log('Response:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to submit form: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        investmentRange: "",
        message: ""
      });
    } catch (error) {
      console.error('Form submission error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="investor-form" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
                  <Card className="overflow-hidden border-blue-500/20 bg-black/30 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/30">
              <CheckCircle2 className="w-10 h-10 text-blue-400" />
            </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('thanks')}
              </h3>
              <p className="text-lg text-white/80 mb-4">
                {t('thanksBody')}
              </p>
              <p className="text-sm text-white/60 mb-6">
                📧 <strong>{t('checkSpam')}</strong> {t('checkTail')}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                {t('submitAnother')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="investor-form" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <DollarSign className="mr-2 h-4 w-4" />
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4">
            {t('titleTop')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleBottom')}
            </span>
          </h2>
          <p className="text-lg text-white/80">
            {t('subtitle')}
          </p>
        </div>

        {/* Form */}
        <Card className="overflow-hidden border-blue-500/20 bg-black/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-white">{t('cardTitle')}</CardTitle>
            <CardDescription className="text-white/70">
              {t('cardBody')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">{t('name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('phName')}
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">{t('email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('phEmail')}
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone and Investment Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">{t('phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('phPhone')}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investmentRange" className="text-white">{t('investmentRange')}</Label>
                  <select
                    id="investmentRange"
                    name="investmentRange"
                    value={formData.investmentRange}
                    onChange={handleInputChange}
                    className={`flex h-9 w-full rounded-md bg-white/10 border-white/20 text-white px-3 py-1 text-base shadow-xs transition-all outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                      errors.investmentRange ? "border-red-500" : "border-white/20"
                    }`}
                  >
                    {investmentRangeOptions((k) => t(k)).map(option => (
                      <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.investmentRange && (
                    <p className="text-sm text-red-400">{errors.investmentRange}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">{t('message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('phMessage')}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-500 ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && (
                  <p className="text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 text-lg font-semibold min-w-56"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5" />
                      {t('submit')}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-white/60">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">{t('footnote')}</span>
          </div>
        </div>
      </div>
    </section>
  );
} 
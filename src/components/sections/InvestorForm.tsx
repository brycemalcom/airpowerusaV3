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

interface InvestorFormData {
  name: string;
  email: string;
  phone: string;
  investmentRange: string;
  message: string;
}

const investmentRangeOptions = [
  { value: "", label: "Select investment range..." },
  { value: "10k-50k", label: "$10K – $50K" },
  { value: "50k-250k", label: "$50K – $250K" },
  { value: "250k+", label: "$250K+" }
];

export default function InvestorForm() {
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
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.investmentRange) newErrors.investmentRange = "Please select your investment range";
    if (!formData.message.trim()) newErrors.message = "Please provide some details about your investment interests";

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
                Thank You for Your Interest!
              </h3>
              <p className="text-lg text-white/80 mb-6">
                We've received your investment inquiry and will send you the investor packet within 24 hours.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Submit Another Inquiry
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
            Investment Inquiry
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4">
            Request Investor Info or
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Connect with Our Team
            </span>
          </h2>
          <p className="text-lg text-white/80">
            Get detailed information about our Regulation D offering and investment opportunity
          </p>
        </div>

        {/* Form */}
        <Card className="overflow-hidden border-blue-500/20 bg-black/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-white">Investment Inquiry</CardTitle>
            <CardDescription className="text-white/70">
              Complete the form below and we'll send you our comprehensive investor packet with detailed financials, market analysis, and offering terms.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@company.com"
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
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Optional phone number"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investmentRange" className="text-white">Investment Range *</Label>
                  <select
                    id="investmentRange"
                    name="investmentRange"
                    value={formData.investmentRange}
                    onChange={handleInputChange}
                    className={`flex h-9 w-full rounded-md bg-white/10 border-white/20 text-white px-3 py-1 text-base shadow-xs transition-all outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                      errors.investmentRange ? "border-red-500" : "border-white/20"
                    }`}
                  >
                    {investmentRangeOptions.map(option => (
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
                <Label htmlFor="message" className="text-white">Message / Questions *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your investment interests, timeline, and any specific questions about the offering..."
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5" />
                      Request Investor Packet
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
            <span className="text-sm">
              Air-Power USA is currently accepting accredited investors under Regulation D.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 
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
  MessageCircle,
  Clock,
  CheckCircle2
} from "lucide-react";

interface FormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}


export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.organization.trim()) newErrors.organization = "Organization is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please provide some details about your needs";

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
      
      // Prepare payload for HubSpot Customer API
      const payload = {
        firstname,
        lastname,
        email: formData.email,
        phone: formData.phone,
        company: formData.organization,
        location: formData.location,
        message: formData.message
      };

      console.log('About to submit customer inquiry payload:', payload);

      // Submit to our customer API route
      const response = await fetch('/api/hubspot/submit-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Customer API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Customer API Error Response:', errorText);
        throw new Error(`Failed to submit form: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Customer inquiry form submitted successfully:', result);
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        organization: "",
        email: "",
        phone: "",
        location: "",
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
      <section id="inquiry-form" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Thank You!
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                We've received your inquiry and will get back to you within 1 business day.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                📧 <strong>Please check your spam, junk, and promotions folders</strong> to ensure you don't miss our response.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="hover:bg-primary hover:text-primary-foreground"
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
    <section id="inquiry-form" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <MessageCircle className="mr-2 h-4 w-4" />
            Get Started
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
            Request a Callback or
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Technical Info Packet
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tell us about your power needs and we'll provide a customized solution
          </p>
        </div>

        {/* Form */}
        <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Contact Information</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you with detailed information about how AirPower can solve your energy challenges.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    name="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Company or organization"
                    className={errors.organization ? "border-destructive" : ""}
                  />
                  {errors.organization && (
                    <p className="text-sm text-destructive">{errors.organization}</p>
                  )}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@company.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Optional phone number"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location or Region</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State, Country"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message / Details *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your power requirements, deployment timeline, and any specific challenges you're facing..."
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 text-lg font-semibold min-w-48"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              We'll get back to you within 1 business day to discuss your application needs or schedule a short demo.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 
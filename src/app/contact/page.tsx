"use client";

import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FormAntiSpam,
  type FormAntiSpamHandle,
} from "@/components/forms/FormAntiSpam";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitError, setSubmitError] = useState("");
  const antiSpamRef = useRef<FormAntiSpamHandle>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    if (antiSpamRef.current?.needsTurnstileInteraction()) {
      setSubmitError("Please complete the security verification below.");
      return;
    }
    const antiSpam = antiSpamRef.current?.getFields() ?? {};

    setIsSubmitting(true);
    
    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || '';
      
      const payload = {
        inquiryKind: "general" as const,
        firstName: firstname,
        lastName: lastname,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        ...antiSpam,
      };

      const response = await fetch("/api/ghl/submit-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let data: { error?: string; detail?: string } = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText) as typeof data;
        } catch {
          setSubmitError(
            "We could not read the server response. Please try again or email info@airpowerusa.net."
          );
          return;
        }
      }

      if (!response.ok) {
        setSubmitError(
          typeof data.detail === "string"
            ? data.detail
            : typeof data.error === "string"
              ? data.error
              : `Something went wrong (${response.status}). Please try again.`
        );
        return;
      }
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 py-24 pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Thank You!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                We've received your message and will get back to you within 1 business day.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <Card className="p-12 text-center bg-background/50 backdrop-blur-sm border-border">
            <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Message Sent Successfully
            </h3>
            <p className="text-lg text-muted-foreground mb-4">
              Our team will review your inquiry and respond as soon as possible.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              📧 <strong>Please check your spam, junk, and promotions folders</strong> to ensure you don't miss our response.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsSubmitted(false)}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              Send Another Message
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 py-24 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Get in touch with our team for general inquiries, support, or partnership opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg leading-7 text-muted-foreground">
              We're here to help with any questions about our compressed air engine technology, 
              partnership opportunities, or general support.
            </p>

            {/* Contact Details */}
            <div className="mt-8 space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">info@airpowerusa.net</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground">214.885.2657</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Locations</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Corporate HQ:</strong><br />San Diego, CA<br />Targeted USA Manufacturing Facility 2025-26</p>
                    <p><strong>R&D Center:</strong><br />Versailles, France<br />Administrative & Research</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM PST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-background/50 backdrop-blur-sm border border-border">
            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Send us a message</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.subject ? "border-red-500" : ""}`}
                  placeholder="What is this regarding?"
                />
                {errors.subject && (
                  <p className="text-sm text-red-400 mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`mt-1 ${errors.message ? "border-red-500" : ""}`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="text-sm text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              <FormAntiSpam ref={antiSpamRef} variant="light" />

              {submitError ? (
                <p
                  className="text-sm rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-red-200"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}

              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-3 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

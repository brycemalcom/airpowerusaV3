"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  User
} from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  accreditedInvestor: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you are an accredited investor",
  }),
});

type FormData = z.infer<typeof formSchema>;

const highlights = [
  {
    icon: DollarSign,
    title: "$30M+ Active Interest",
    description: "Strong investor pipeline already established"
  },
  {
    icon: TrendingUp,
    title: "Proven Technology",
    description: "Field-tested CAE system with real-world deployments"
  },
  {
    icon: Shield,
    title: "Patent Protected",
    description: "Proprietary compressed air engine technology"
  }
];

export default function InvestorCTA() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      accreditedInvestor: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Split name into first and last name
      const nameParts = data.fullName.trim().split(' ');
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || '';
      
      // Prepare payload for HubSpot API (using same format as working investor form)
      const payload = {
        firstname,
        lastname,
        email: data.email,
        phone: data.phone || '',
        message: `Investment Interest: ${data.message || 'No specific message provided'}\n\nAccredited Investor: ${data.accreditedInvestor ? 'Yes' : 'No'}`
      };

      console.log('About to submit InvestorCTA payload:', payload);

      // Submit to our existing investor API route
      const response = await fetch('/api/hubspot/submit-investor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to submit form: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('InvestorCTA form submitted successfully:', result);
      
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-500/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Card className="p-12 text-center bg-background/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Thank You for Your Interest
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Your investor packet request has been received. Our team will review your submission and respond within 24 hours.
            </p>
            <div className="text-sm text-muted-foreground mb-8">
              📧 <strong>Please check your spam, junk, and promotions folders</strong> to ensure you don't miss our response.
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-500/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                Investment Opportunity
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Investor
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                  Opportunity
                </span>
              </h2>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                AirPower USA is now open to accredited investors.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-background/50 border border-border backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-muted-foreground">
                We're seeking strategic investors to help scale production and meet demand. With over $30M in active 
                interest and a proven technology platform, AirPower is positioned for rapid growth.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4 font-semibold">
                Join us as we bring clean, compressed-air energy to the world.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-background/30 border border-border/50">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <Card className="p-8 bg-background/50 backdrop-blur-sm border-border">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Request Investor Packet
              </h3>
              <p className="text-muted-foreground">
                Use the form below to request our investor packet and schedule a conversation with our team.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Full Name *</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email Address *</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number</span>
                        <span className="text-muted-foreground text-sm">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message / Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your investment interests or any questions you have..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accreditedInvestor"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium">
                          I confirm that I am an accredited investor *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Investor Packet"}
                </Button>
              </form>
            </Form>

            {/* Disclaimer */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> This offering is limited to accredited investors under SEC Regulation D. 
                All submissions are confidential. By submitting this form, you acknowledge that you understand the 
                risks associated with investing in early-stage companies.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
} 
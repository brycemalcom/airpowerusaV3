import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
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
                  <p className="text-muted-foreground">214.257.7957</p>
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
            <form className="space-y-6">
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
                    required
                    className="mt-1"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="mt-1"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-1"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

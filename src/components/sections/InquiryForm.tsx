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
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}


export default function InquiryForm() {
  const t = useTranslations('customer.form');
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
  const [submitError, setSubmitError] = useState("");

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
    
    if (!formData.name.trim()) newErrors.name = t('errors.name');
    if (!formData.organization.trim()) newErrors.organization = t('errors.organization');
    if (!formData.email.trim()) {
      newErrors.email = t('errors.email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errors.emailValid');
    }
    if (!formData.message.trim()) newErrors.message = t('errors.message');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || '';
      
      const payload = {
        inquiryKind: "customer" as const,
        firstName: firstname,
        lastName: lastname,
        email: formData.email,
        phone: formData.phone,
        company: formData.organization,
        location: formData.location,
        message: formData.message,
      };

      const response = await fetch("/api/ghl/submit-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let data: { success?: boolean; error?: string; detail?: string } = {};
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
        const msg =
          typeof data.detail === "string"
            ? data.detail
            : typeof data.error === "string"
              ? data.error
              : `Something went wrong (${response.status}). Please try again.`;
        setSubmitError(msg);
        return;
      }

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
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Check your connection and try again."
      );
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
                {t('thanks')}
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                {t('thanksBody')}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                📧 <strong>{t('checkSpam')}</strong> {t('checkTail')}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="hover:bg-primary hover:text-primary-foreground"
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
    <section id="inquiry-form" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <MessageCircle className="mr-2 h-4 w-4" />
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
            {t('titleTop')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('titleBottom')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Form */}
        <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">{t('contactInfo')}</CardTitle>
            <CardDescription>
              {t('contactBody')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('phName')}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization">{t('organization')}</Label>
                  <Input
                    id="organization"
                    name="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder={t('phOrg')}
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
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('phEmail')}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('phPhone')}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">{t('location')}</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                    placeholder={t('phLocation')}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('phMessage')}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              {submitError ? (
                <p
                  className="text-sm rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-destructive"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}

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
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{t('footerNote')}</span>
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function NewsroomCta() {
  const t = useTranslations("home.newsroom.cta");
  return (
    <section className="py-16 bg-gradient-to-b from-background to-card/30 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h3>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed sm:text-lg">
            {t("body")}
          </p>
          <Button
            size="lg"
            className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/25 hover:from-blue-500 hover:to-cyan-500"
            asChild
          >
            <Link href="/invest#investor-form">
              <Calendar className="mr-2 h-5 w-5" />
              {t("button")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

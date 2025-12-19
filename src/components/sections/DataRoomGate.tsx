"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function DataRoomGate() {
  const [email, setEmail] = useState("");
  const [nda, setNda] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [mode, setMode] = useState<"inline" | "email" | null>(null);

  const requestLink = async () => {
    setLoading(true);
    setError(null);
    setLink(null);
    try {
      const res = await fetch("/api/dataroom/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ndaAccepted: nda }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Request failed");
        return;
      }
      setMode(json.mode);
      if (json.link) {
        setLink(json.link);
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-xl px-6">
        <Card className="p-8 bg-background/60 backdrop-blur border-border">
          <h2 className="text-2xl font-bold mb-2">AirPower USA Data Room</h2>
          <p className="text-muted-foreground mb-6">
            Access is by invitation only. Enter your email and accept the NDA to receive a secure access link.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dr-email">Email</Label>
              <Input
                id="dr-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex items-start space-x-3 rounded-md border p-4">
              <Checkbox id="nda" checked={nda} onCheckedChange={(v) => setNda(!!v)} />
              <Label htmlFor="nda" className="leading-snug">
                I agree to the Non‑Disclosure Agreement (NDA) covering all materials in this data room. I will not
                redistribute or publicly disclose any information without written permission.
              </Label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
              disabled={loading || !email || !nda}
              onClick={requestLink}
            >
              {loading ? "Requesting Link..." : "Request Access Link"}
            </Button>
            {mode === "inline" && link && (
              <div className="mt-4 rounded-md border border-border p-4 bg-background/50">
                <p className="text-sm mb-2">
                  Copy this link or click to continue. It expires in 7 days and is tied to your email.
                </p>
                <a
                  href={link}
                  className="break-all text-cyan-400 hover:text-cyan-300 underline"
                >
                  {link}
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}



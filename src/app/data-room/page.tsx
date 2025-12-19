"use server";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/dataroomAuth";
import DataRoomGate from "@/components/sections/DataRoomGate";
import { dataRoomCategories } from "@/data/dataroom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

async function DataRoomContent() {
  const token = (await cookies()).get("dr_session")?.value || null;
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return <DataRoomGate />;
  }

  async function handleDownload(key: string) {
    "use server";
    // server action not used for now (CSR fetch below). Reserved for future.
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Data Room</h1>
          <p className="text-muted-foreground mt-1">
            Signed in as <span className="font-medium">{payload.email}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {dataRoomCategories.map((cat, idx) => (
            <Card key={idx} className="p-6 bg-background/60 backdrop-blur border-border">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{cat.title}</h2>
              </div>
              {cat.description && (
                <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>
              )}
              <div className="divide-y divide-border/60">
                {cat.files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium">{file.name}</div>
                      {file.description && (
                        <div className="text-xs text-muted-foreground">{file.description}</div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `/api/dataroom/sign?key=${encodeURIComponent(file.key)}`,
                          );
                          const json = await res.json();
                          if (json.url) {
                            window.location.href = json.url;
                          }
                        } catch {
                          // no-op
                        }
                      }}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  return <DataRoomContent />;
}



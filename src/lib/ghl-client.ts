export const GHL_API_BASE = "https://services.leadconnectorhq.com";
export const GHL_API_VERSION = "2021-07-28";

export const pickId = (obj: unknown): string | undefined => {
  if (!obj || typeof obj !== "object") return undefined;
  const record = obj as Record<string, unknown>;
  const id = record.id ?? record._id;
  return typeof id === "string" ? id : undefined;
};

export const getJsonArray = (data: unknown, key: string): unknown[] => {
  if (!data || typeof data !== "object") return [];
  const record = data as Record<string, unknown>;
  const value = record[key];
  return Array.isArray(value) ? value : [];
};

export async function ghlRequest(
  path: string,
  init: RequestInit,
  apiKey: string
): Promise<unknown> {
  const response = await fetch(`${GHL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const text = await response.text();
  const parsed = text
    ? (() => {
        try {
          return JSON.parse(text);
        } catch {
          return { raw: text };
        }
      })()
    : {};

  if (!response.ok) {
    throw new Error(
      `GHL ${init.method || "GET"} ${path} failed (${response.status}): ${JSON.stringify(parsed)}`
    );
  }

  return parsed;
}

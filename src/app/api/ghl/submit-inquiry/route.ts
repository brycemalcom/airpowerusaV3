import { NextRequest, NextResponse } from "next/server";
import { ghlRequest, pickId } from "@/lib/ghl-client";

type InquiryKind = "general" | "customer";

interface InquiryPayload {
  inquiryKind: InquiryKind;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  subject?: string;
  message: string;
}

const INQUIRY_CONFIG: Record<
  InquiryKind,
  { tags: string[]; source: string }
> = {
  general: {
    tags: ["contact"],
    source: "Main website - General inquiry (Contact)",
  },
  customer: {
    tags: ["customer"],
    source: "Main website - Customer inquiry",
  },
};

function buildFormMessage(body: InquiryPayload): string {
  if (body.inquiryKind === "general") {
    return [
      `Subject: ${(body.subject ?? "").trim()}`,
      "",
      body.message.trim(),
    ].join("\n");
  }
  return [
    `Organization: ${(body.company ?? "").trim()}`,
    `Location: ${(body.location ?? "").trim()}`,
    "",
    "Message:",
    body.message.trim(),
  ].join("\n");
}

async function upsertInquiryContact(
  body: InquiryPayload,
  locationId: string,
  apiKey: string
): Promise<string> {
  const { tags, source } = INQUIRY_CONFIG[body.inquiryKind];
  const message = buildFormMessage(body);
  const phone = (body.phone ?? "").trim();
  const lastName = body.lastName.trim() || "-";

  const payload = {
    locationId,
    firstName: body.firstName.trim(),
    lastName,
    email: body.email.trim(),
    phone,
    tags,
    source,
    customFields: [{ key: "form_message", value: message }],
  };

  let contactResponse: unknown;
  try {
    contactResponse = await ghlRequest(
      "/contacts/upsert",
      { method: "POST", body: JSON.stringify(payload) },
      apiKey
    );
  } catch {
    contactResponse = await ghlRequest(
      "/contacts/",
      { method: "POST", body: JSON.stringify(payload) },
      apiKey
    );
  }

  const contactId =
    pickId(contactResponse) ||
    pickId((contactResponse as Record<string, unknown>)?.contact) ||
    pickId((contactResponse as Record<string, unknown>)?.data);

  if (!contactId) {
    console.error(
      "GHL inquiry: missing contact id in response",
      JSON.stringify(contactResponse).slice(0, 800)
    );
    throw new Error("Unable to resolve contact ID from GHL response");
  }

  return contactId;
}

function normalizeInquiryKind(value: unknown): InquiryKind | null {
  if (value === "general" || value === "customer") return value;
  return null;
}

export async function POST(request: NextRequest) {
  try {
    let body: InquiryPayload;
    try {
      body = (await request.json()) as InquiryPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }
    const inquiryKind = normalizeInquiryKind(body.inquiryKind);

    if (!inquiryKind) {
      return NextResponse.json(
        { error: "Invalid or missing inquiryKind (general | customer)" },
        { status: 400 }
      );
    }

    const firstName = (body.firstName ?? "").trim();
    const lastName = (body.lastName ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, email, message" },
        { status: 400 }
      );
    }

    if (inquiryKind === "general") {
      const subject = (body.subject ?? "").trim();
      if (!subject) {
        return NextResponse.json(
          { error: "Subject is required for general inquiries" },
          { status: 400 }
        );
      }
    }

    if (inquiryKind === "customer") {
      const company = (body.company ?? "").trim();
      if (!company) {
        return NextResponse.json(
          { error: "Organization is required for customer inquiries" },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!apiKey || !locationId) {
      return NextResponse.json(
        {
          error:
            "GHL credentials not configured (GHL_API_KEY / GHL_LOCATION_ID)",
        },
        { status: 500 }
      );
    }

    const payload: InquiryPayload = {
      inquiryKind,
      firstName,
      lastName,
      email,
      phone: body.phone,
      company: body.company,
      location: body.location,
      subject: body.subject,
      message,
    };

    const contactId = await upsertInquiryContact(payload, locationId, apiKey);

    console.log("=== WEBSITE INQUIRY (GHL) ===");
    console.log("Kind:", inquiryKind);
    console.log("Name:", firstName, lastName);
    console.log("Email:", email);
    console.log("Tags:", INQUIRY_CONFIG[inquiryKind].tags.join(", "));
    console.log("Timestamp:", new Date().toISOString());
    console.log("=============================");

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      contactId,
      inquiryKind,
    });
  } catch (error) {
    console.error("GHL inquiry submission error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

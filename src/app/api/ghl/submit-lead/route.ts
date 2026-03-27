import { NextRequest, NextResponse } from "next/server";
import { getJsonArray, ghlRequest, pickId } from "@/lib/ghl-client";

const PIPELINE_NAME = "AirPower Investor Pipeline";
const STAGE_NAME = "New Lead";

type LandingPageVariant = "lp-a" | "lp-b" | "website";

interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accredited: string;
  investmentRange?: string;
  message?: string;
  landingPageVariant?: string;
}

interface GhlPipeline {
  id?: string;
  _id?: string;
  name?: string;
  stages?: Array<{ id?: string; _id?: string; name?: string }>;
  pipelineStages?: Array<{ id?: string; _id?: string; name?: string }>;
}

const normalizeVariant = (value: string | undefined): LandingPageVariant => {
  if (value === "lp-b") return "lp-b";
  if (value === "website") return "website";
  return "lp-a";
};

const leadSourceForVariant = (variant: LandingPageVariant): string => {
  if (variant === "website") return "Main website - Invest page";
  return `Landing Page ${variant.toUpperCase()}`;
};

const formatInvestmentRange = (value: string | undefined): string => {
  if (!value) return "Not specified";
  const labels: Record<string, string> = {
    "10k-25k": "$10K – $25K",
    "25k-50k": "$25K – $50K",
    "50k-100k": "$50K – $100K",
    "100k-250k": "$100K – $250K",
    "250k+": "$250K+",
  };
  return labels[value] ?? value;
};

const buildFormMessage = (
  accredited: string,
  investmentRange?: string,
  userMessage?: string
): string => {
  const lines = [
    `Accredited Investor: ${accredited === "yes" ? "Yes" : accredited === "no" ? "No" : "Not sure"}`,
    `Investment Range: ${formatInvestmentRange(investmentRange)}`,
  ];
  if (userMessage?.trim()) {
    lines.push("", "Message:", userMessage.trim());
  }
  return lines.join("\n");
};

async function upsertContact(
  lead: LeadPayload,
  locationId: string,
  apiKey: string,
  variant: LandingPageVariant
): Promise<string> {
  const tags = ["investor-lead", variant];
  const message = buildFormMessage(
    lead.accredited,
    lead.investmentRange,
    lead.message
  );

  const payload = {
    locationId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    tags,
    source: leadSourceForVariant(variant),
    customFields: [{ key: "form_message", value: message }],
  };

  let contactResponse: unknown;
  try {
    contactResponse = await ghlRequest(
      "/contacts/upsert",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      apiKey
    );
  } catch {
    contactResponse = await ghlRequest(
      "/contacts/",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      apiKey
    );
  }

  const contactId =
    pickId(contactResponse) ||
    pickId((contactResponse as Record<string, unknown>)?.contact) ||
    pickId((contactResponse as Record<string, unknown>)?.data);

  if (!contactId) {
    throw new Error("Unable to resolve contact ID from GHL response");
  }

  return contactId;
}

async function getPipelineAndStageIds(locationId: string, apiKey: string) {
  const pipelinesResponse = await ghlRequest(
    `/opportunities/pipelines?locationId=${encodeURIComponent(locationId)}`,
    { method: "GET" },
    apiKey
  );

  const pipelinesRaw = [
    ...getJsonArray(pipelinesResponse, "pipelines"),
    ...getJsonArray(pipelinesResponse, "data"),
    ...(Array.isArray(pipelinesResponse) ? pipelinesResponse : []),
  ] as GhlPipeline[];

  const pipeline = pipelinesRaw.find(
    (p) => (p.name || "").toLowerCase() === PIPELINE_NAME.toLowerCase()
  );
  if (!pipeline) {
    throw new Error(`Pipeline "${PIPELINE_NAME}" not found in GHL`);
  }

  const pipelineId = pipeline.id || pipeline._id;
  if (!pipelineId) {
    throw new Error(`Pipeline "${PIPELINE_NAME}" is missing an ID`);
  }

  const stages = [...(pipeline.stages || []), ...(pipeline.pipelineStages || [])];
  const stage = stages.find(
    (s) => (s.name || "").toLowerCase() === STAGE_NAME.toLowerCase()
  );
  if (!stage) {
    throw new Error(`Stage "${STAGE_NAME}" not found in pipeline "${PIPELINE_NAME}"`);
  }

  const stageId = stage.id || stage._id;
  if (!stageId) {
    throw new Error(`Stage "${STAGE_NAME}" is missing an ID`);
  }

  return { pipelineId, stageId };
}

async function createOpportunity(
  lead: LeadPayload,
  locationId: string,
  contactId: string,
  pipelineId: string,
  stageId: string,
  apiKey: string,
  variant: LandingPageVariant
) {
  const name = `Investor Lead - ${lead.firstName} ${lead.lastName}`;
  await ghlRequest(
    "/opportunities/",
    {
      method: "POST",
      body: JSON.stringify({
        locationId,
        contactId,
        name,
        pipelineId,
        pipelineStageId: stageId,
        status: "open",
        source: leadSourceForVariant(variant),
      }),
    },
    apiKey
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadPayload;
    const {
      firstName,
      lastName,
      email,
      phone,
      accredited,
      investmentRange,
      message,
      landingPageVariant,
    } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!accredited) {
      return NextResponse.json(
        { error: "Accredited field is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!apiKey || !locationId) {
      return NextResponse.json(
        { error: "GHL credentials not configured (GHL_API_KEY / GHL_LOCATION_ID)" },
        { status: 500 }
      );
    }

    const variant = normalizeVariant(landingPageVariant);
    const lead: LeadPayload = {
      firstName,
      lastName,
      email,
      phone,
      accredited,
      investmentRange,
      message,
      landingPageVariant: variant,
    };

    console.log("=== NEW INVESTOR LEAD ===");
    console.log("Name:", firstName, lastName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Accredited:", accredited);
    console.log("Investment Range:", investmentRange);
    console.log("LP Variant:", variant);
    console.log("Timestamp:", new Date().toISOString());
    console.log("========================");

    const contactId = await upsertContact(lead, locationId, apiKey, variant);
    const { pipelineId, stageId } = await getPipelineAndStageIds(locationId, apiKey);
    await createOpportunity(
      lead,
      locationId,
      contactId,
      pipelineId,
      stageId,
      apiKey,
      variant
    );

    return NextResponse.json({
      success: true,
      message: "Lead submitted to GHL successfully",
      contactId,
      pipeline: PIPELINE_NAME,
      stage: STAGE_NAME,
      variant,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

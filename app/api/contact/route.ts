import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/content/site-config";
import { sanitizeInquiry, validateInquiry } from "@/lib/contact-validation";

const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const inquiry = sanitizeInquiry(body as Record<string, unknown>);
  const errors = validateInquiry(inquiry);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CONTACT_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify({
          source: "serptrix-contact-form",
          submittedAt: new Date().toISOString(),
          ...inquiry,
        }),
      });
      if (!webhookResponse.ok) {
        return NextResponse.json(
          { ok: false, message: "Unable to process your inquiry right now. Please email us directly." },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { ok: false, message: "Unable to process your inquiry right now. Please email us directly." },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    console.info("[contact] inquiry received (no webhook configured)", {
      email: inquiry.email,
      company: inquiry.company,
      services: inquiry.services,
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Inquiry received.",
    fallbackEmail: siteConfig.contact.email,
  });
}

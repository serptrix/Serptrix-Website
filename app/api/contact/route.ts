import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/content/site-config";
import { sanitizeInquiry, validateInquiry } from "@/lib/contact-validation";

const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const MAX_REQUEST_BYTES = 64 * 1024;
const WEBHOOK_TIMEOUT_MS = 8_000;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateLimit.size >= MAX_RATE_LIMIT_ENTRIES) {
    for (const [key, value] of rateLimit) {
      if (now > value.reset) rateLimit.delete(key);
    }
    if (rateLimit.size >= MAX_RATE_LIMIT_ENTRIES) {
      const oldest = rateLimit.keys().next().value as string | undefined;
      if (oldest) rateLimit.delete(oldest);
    }
  }
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

async function isRequestRateLimited(ip: string): Promise<boolean> {
  const redisUrl = process.env.RATE_LIMIT_REDIS_URL;
  const redisToken = process.env.RATE_LIMIT_REDIS_TOKEN;
  if (!redisUrl || !redisToken) return isRateLimited(ip);

  const bucket = Math.floor(Date.now() / RATE_WINDOW_MS);
  const key = `serptrix:contact:${bucket}:${ip}`;
  try {
    const response = await fetch(`${redisUrl.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["PEXPIRE", key, RATE_WINDOW_MS],
      ]),
      signal: AbortSignal.timeout(2_000),
    });
    if (!response.ok) return isRateLimited(ip);
    const result = (await response.json()) as Array<{ result?: number }>;
    const count = Number(result[0]?.result ?? 0);
    return count > RATE_LIMIT;
  } catch {
    // Delivery remains available if the distributed limiter has an outage;
    // the bounded local guard still provides per-instance protection.
    return isRateLimited(ip);
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, message: "Request body is too large." }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (await isRequestRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(RATE_WINDOW_MS / 1000)) } },
    );
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ ok: false, message: "Request body is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
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
  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message: `Online delivery is temporarily unavailable. Please email ${siteConfig.contact.email} directly.`,
        fallbackEmail: siteConfig.contact.email,
      },
      { status: 503 },
    );
  }

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
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
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

  return NextResponse.json({
    ok: true,
    message: "Inquiry received.",
    fallbackEmail: siteConfig.contact.email,
  });
}

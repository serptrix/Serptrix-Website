"use client";

export type ContactAnalyticsEvent =
  | "contact_form_started"
  | "contact_form_step_completed"
  | "contact_form_submitted"
  | "contact_phone_clicked"
  | "contact_email_clicked"
  | "calendly_section_viewed"
  | "calendly_booking_started"
  | "calendly_booking_completed"
  | "project_inquiry";

export function trackContactEvent(
  event: ContactAnalyticsEvent,
  detail: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("serptrix:conversion", {
      detail: { type: event, ...detail },
    }),
  );
}

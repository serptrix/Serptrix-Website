"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/content/site-config";
import { servicePillars } from "@/content/service-catalog";
import { trackContactEvent } from "@/lib/analytics";
import { motionTokens } from "./motion/tokens";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  services: string[];
  goal: string;
  challenge: string;
  details: string;
  budget: string;
  timeline: string;
  referral: string;
  anythingElse: string;
  consent: boolean;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  services: [],
  goal: "",
  challenge: "",
  details: "",
  budget: "",
  timeline: "",
  referral: "",
  anythingElse: "",
  consent: false,
};

const steps = [
  "About you",
  "What do you need?",
  "Tell us about the project",
  "Investment and timeline",
  "Final details",
] as const;

const stepVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function ProjectForm({ preselectedService }: { preselectedService?: string }) {
  const formId = useId();
  const router = useRouter();
  const started = useRef(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(() => ({ ...initial, services: preselectedService ? [preselectedService] : [] }));
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      trackContactEvent("contact_form_started");
    }
  }, []);


  const update = (key: keyof FormState, value: string | boolean | string[]) =>
    setData((current) => ({
      ...current,
      [key]:
        typeof value === "string"
          ? value.slice(0, 2000).trimStart()
          : value,
    }));

  const toggleService = (service: string) => {
    setData((current) => {
      const has = current.services.includes(service);
      if (service === "Not Sure Yet") {
        return { ...current, services: has ? [] : ["Not Sure Yet"] };
      }
      const without = current.services.filter((s) => s !== "Not Sure Yet");
      return {
        ...current,
        services: has ? without.filter((s) => s !== service) : [...without, service],
      };
    });
  };

  const validateStep = () => {
    const nextErrors: string[] = [];
    if (step === 1) {
      if (!data.name.trim()) nextErrors.push("Enter your full name.");
      if (!/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.push("Enter a valid work email.");
      if (!data.company.trim()) nextErrors.push("Enter your company or brand name.");
    }
    if (step === 2 && data.services.length === 0) {
      nextErrors.push("Select at least one service area.");
    }
    if (step === 3) {
      if (!data.goal) nextErrors.push("Select a main goal.");
      if (!data.challenge.trim()) nextErrors.push("Describe your main challenge.");
      if (!data.details.trim()) nextErrors.push("Tell us briefly what you would like Serptrix to help you achieve.");
    }
    if (step === 4) {
      if (!data.budget) nextErrors.push("Choose a budget range.");
      if (!data.timeline) nextErrors.push("Choose an ideal start time.");
    }
    if (step === 5 && !data.consent) {
      nextErrors.push("Confirm that Serptrix may use the information provided to respond to your inquiry.");
    }
    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setSubmitError("");
      trackContactEvent("contact_form_step_completed", { step });
      setStep((current) => Math.min(5, current + 1));
    }
  };

  const back = () => {
    setErrors([]);
    setSubmitError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep() || sending) return;
    setSending(true);
    setSubmitError("");

    const payload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ]),
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; errors?: string[]; message?: string };

      if (!response.ok || !result.ok) {
        setSubmitError(result.errors?.[0] || result.message || "Something went wrong. Please try again.");
        setSending(false);
        return;
      }

      try {
        sessionStorage.setItem(
          "serptrix-inquiry",
          JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
        );
      } catch {
        // Browser storage is only a convenience for the thank-you summary.
        // Delivery has already succeeded, so storage restrictions must not turn
        // a successful inquiry into a false failure or duplicate submission.
      }
      trackContactEvent("contact_form_submitted", { services: data.services.join(", ") });
      trackContactEvent("project_inquiry", { service: data.services[0] || "unspecified" });
      setSubmitted(true);
      setSending(false);
      setTimeout(() => router.push("/thank-you"), 2400);
    } catch {
      setSending(false);
      setSubmitError(
        `We could not submit your inquiry. Please email ${siteConfig.contact.email} directly.`,
      );
    }
  };

  const progress = (step / 5) * 100;

  if (submitted) {
    return (
      <div className="project-form project-form-success" role="status" aria-live="polite">
        <div className="contact-success-icon" aria-hidden="true">✓</div>
        <h3>Thanks — we&apos;ve received your project details.</h3>
        <p>
          Our team will review your inquiry and get back to you using the contact information you provided.
        </p>
      </div>
    );
  }

  return (
    <form className="project-form" onSubmit={submit} noValidate aria-labelledby={`${formId}-title`}>
      <div className="form-progress" aria-live="polite">
        <div className="form-progress-meta">
          <span>
            STEP {step} OF 5
          </span>
          <span className="form-progress-pct" aria-hidden="true">
            {Math.round(progress)}%
          </span>
        </div>
        <div
          className="form-progress-track"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-label={`Form progress: step ${step} of 5`}
        >
          <i style={{ width: `${progress}%` }} />
        </div>
        <ol className="form-step-dots" aria-hidden="true">
          {steps.map((_, index) => (
            <li key={steps[index]} className={index + 1 <= step ? "active" : ""} />
          ))}
        </ol>
        <b id={`${formId}-title`}>{steps[step - 1]}</b>
      </div>

      {(errors.length > 0 || submitError) && (
        <div className="error-summary" role="alert">
          <b>{submitError ? "Something went wrong" : "Please review:"}</b>
          {submitError ? <p>{submitError}</p> : <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.premium }}
        >
          {step === 1 && (
            <fieldset>
              <legend>How can we reach you?</legend>
              <div className="field-row">
                <label>
                  Full name *
                  <input
                    name="name"
                    required
                    maxLength={120}
                    value={data.name}
                    onChange={(event) => update("name", event.target.value)}
                    autoComplete="name"
                  />
                </label>
                <label>
                  Work email *
                  <input
                    name="email"
                    required
                    maxLength={254}
                    value={data.email}
                    onChange={(event) => update("email", event.target.value)}
                    type="email"
                    autoComplete="email"
                  />
                </label>
              </div>
              <div className="field-row">
                <label>
                  Phone number
                  <input
                    name="phone"
                    maxLength={40}
                    value={data.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    type="tel"
                    autoComplete="tel"
                  />
                </label>
                <label>
                  Company / brand name *
                  <input
                    name="company"
                    required
                    maxLength={160}
                    value={data.company}
                    onChange={(event) => update("company", event.target.value)}
                    autoComplete="organization"
                  />
                </label>
              </div>
              <label>
                Website URL
                <input
                  name="website"
                  maxLength={300}
                  value={data.website}
                  onChange={(event) => update("website", event.target.value)}
                  type="url"
                  placeholder="https://"
                  inputMode="url"
                />
              </label>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend>What do you need?</legend>
              {preselectedService && data.services.includes(preselectedService) && (
                <div className="preselected-service" role="status">
                  <span>Selected from the service page</span>
                  <b>{preselectedService}</b>
                  <button type="button" onClick={() => toggleService(preselectedService)}>Remove</button>
                </div>
              )}
              {servicePillars.map((pillar) => (
                <div key={pillar.slug} className="service-group">
                  <p className="service-group-label">{pillar.name}</p>
                  <div className="choice-grid">
                    {pillar.categories.map((category) => (
                      <label key={category.slug} className={data.services.includes(category.name) ? "is-selected" : ""}>
                        <input
                          type="checkbox"
                          name="services"
                          checked={data.services.includes(category.name)}
                          onChange={() => toggleService(category.name)}
                        />
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="choice-grid choice-grid-single">
                <label className={data.services.includes("Not Sure Yet") ? "is-selected" : ""}>
                  <input
                    type="checkbox"
                    checked={data.services.includes("Not Sure Yet")}
                    onChange={() => toggleService("Not Sure Yet")}
                  />
                  <span>Not Sure Yet</span>
                </label>
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend>Tell us about the project</legend>
              <label>
                Main goal *
                <select value={data.goal} onChange={(event) => update("goal", event.target.value)} required>
                  <option value="">Select a goal</option>
                  {siteConfig.form.goalOptions.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                What is currently holding your business back? *
                <textarea
                  className="resize-none"
                  name="challenge"
                  required
                  maxLength={2000}
                  rows={4}
                  value={data.challenge}
                  onChange={(event) => update("challenge", event.target.value)}
                />
              </label>
              <label>
                Tell us briefly what you would like Serptrix to help you achieve. *
                <textarea
                  className="resize-none"
                  name="details"
                  required
                  maxLength={2000}
                  rows={4}
                  value={data.details}
                  onChange={(event) => update("details", event.target.value)}
                />
              </label>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend>Investment and timeline</legend>
              <label>
                Approximate budget *
                <select value={data.budget} onChange={(event) => update("budget", event.target.value)} required>
                  <option value="">Select a range</option>
                  {siteConfig.form.budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Ideal start time *
                <select value={data.timeline} onChange={(event) => update("timeline", event.target.value)} required>
                  <option value="">Select a timeline</option>
                  {siteConfig.form.timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>
          )}

          {step === 5 && (
            <fieldset>
              <legend>Final details</legend>
              <label>
                How did you hear about Serptrix?
                <select value={data.referral} onChange={(event) => update("referral", event.target.value)}>
                  <option value="">Select an option</option>
                  {siteConfig.form.referralOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Anything else?
                <textarea
                  className="resize-none"
                  rows={4}
                  value={data.anythingElse}
                  onChange={(event) => update("anythingElse", event.target.value)}
                  placeholder="Optional context, stakeholders, or useful links"
                />
              </label>
              <label className="consent-check">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                />
                <span>
                  I agree that Serptrix may use the information provided to respond to my inquiry. *{" "}
                  <a href="/privacy">Privacy Policy</a>
                </span>
              </label>
            </fieldset>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="form-actions">
        {step > 1 && (
          <button type="button" className="btn btn-quiet" onClick={back}>
            ← Back
          </button>
        )}
        {step < 5 ? (
          <button type="button" className="btn btn-primary" onClick={next}>
            Continue <span>→</span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? "Submitting…" : "Submit inquiry"}
            <span>{sending ? "" : "↗"}</span>
          </button>
        )}
      </div>
    </form>
  );
}

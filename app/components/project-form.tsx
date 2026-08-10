"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  service: string;
  goal: string;
  challenge: string;
  budget: string;
  timeline: string;
  contact: string;
  details: string;
  consent: boolean;
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  website: "",
  service: "",
  goal: "",
  challenge: "",
  budget: "",
  timeline: "",
  contact: "Email",
  details: "",
  consent: false,
};

const steps = [
  "Contact information",
  "Business and service needs",
  "Goals and challenges",
  "Budget and timing",
  "Final details",
] as const;

const services = [
  "Digital Marketing",
  "Website Development",
  "SaaS Development",
  "Ecommerce Development",
  "AI Development",
  "AI Automation",
  "Digital Strategy",
  "Not sure yet",
] as const;

export function ProjectForm() {
  const formId = useId();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (key: keyof FormState, value: string | boolean) =>
    setData((current) => ({
      ...current,
      [key]: typeof value === "string" ? value.slice(0, 2000).trimStart() : value,
    }));

  const validate = () => {
    const nextErrors: string[] = [];
    if (step === 1) {
      if (!data.name.trim()) nextErrors.push("Enter your name.");
      if (!/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.push("Enter a valid work email.");
      if (!data.company.trim()) nextErrors.push("Enter your company name.");
    }
    if (step === 2 && !data.service) nextErrors.push("Choose the service area closest to your need.");
    if (step === 3) {
      if (!data.goal.trim()) nextErrors.push("Describe the main business goal.");
      if (!data.challenge.trim()) nextErrors.push("Describe the main challenge.");
    }
    if (step === 4) {
      if (!data.budget) nextErrors.push("Choose a budget range.");
      if (!data.timeline) nextErrors.push("Choose a likely timeline.");
    }
    if (step === 5 && !data.consent) nextErrors.push("Confirm that Serptrix may respond to this inquiry.");
    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const next = () => {
    if (validate()) {
      setSubmitError("");
      setStep((current) => Math.min(5, current + 1));
    }
  };

  const back = () => {
    setErrors([]);
    setSubmitError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSubmitError("");
    try {
      const safe = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]),
      );
      sessionStorage.setItem(
        "serptrix-inquiry",
        JSON.stringify({ ...safe, createdAt: new Date().toISOString() }),
      );
      window.dispatchEvent(
        new CustomEvent("serptrix:conversion", {
          detail: { type: "project_inquiry", service: data.service },
        }),
      );
      setTimeout(() => router.push("/thank-you"), 280);
    } catch {
      setSending(false);
      setSubmitError("We could not prepare your inquiry in this browser. Please email hello@serptrix.com directly.");
    }
  };

  const progress = (step / 5) * 100;

  return (
    <form className="project-form" onSubmit={submit} noValidate aria-labelledby={`${formId}-title`}>
      <div className="form-progress">
        <div className="form-progress-meta">
          <span>STEP {step} OF 5</span>
          <span className="form-progress-pct" aria-hidden="true">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="form-progress-track" aria-hidden="true">
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

      {step === 1 && (
        <fieldset>
          <legend>How can we reach you?</legend>
          <div className="field-row">
            <label>
              Your name *
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
          <label>
            Company *
            <input
              name="company"
              required
              maxLength={160}
              value={data.company}
              onChange={(event) => update("company", event.target.value)}
              autoComplete="organization"
            />
          </label>
          <label>
            Current website
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
          <legend>What kind of help is closest?</legend>
          <div className="choice-grid">
            {services.map((service) => (
              <label key={service} className={data.service === service ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="service"
                  checked={data.service === service}
                  onChange={() => update("service", service)}
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
          <label>
            Preferred contact method
            <select value={data.contact} onChange={(event) => update("contact", event.target.value)}>
              <option>Email</option>
              <option>Video call</option>
              <option>Phone</option>
            </select>
          </label>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>What needs to change?</legend>
          <label>
            Main business goal *
            <textarea
              name="goal"
              required
              maxLength={2000}
              rows={4}
              value={data.goal}
              onChange={(event) => update("goal", event.target.value)}
              placeholder="What would meaningful progress look like?"
            />
          </label>
          <label>
            Main challenge *
            <textarea
              name="challenge"
              required
              maxLength={2000}
              rows={4}
              value={data.challenge}
              onChange={(event) => update("challenge", event.target.value)}
              placeholder="What is getting in the way today?"
            />
          </label>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend>Help us understand the scope.</legend>
          <label>
            Indicative budget range *
            <select value={data.budget} onChange={(event) => update("budget", event.target.value)}>
              <option value="">Select a range</option>
              <option>Under $10,000</option>
              <option>$10,000–$25,000</option>
              <option>$25,000–$50,000</option>
              <option>$50,000–$100,000</option>
              <option>$100,000+</option>
              <option>Need guidance</option>
            </select>
          </label>
          <label>
            Ideal timeline *
            <select value={data.timeline} onChange={(event) => update("timeline", event.target.value)}>
              <option value="">Select a timeline</option>
              <option>As soon as practical</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>6+ months</option>
              <option>Exploring options</option>
            </select>
          </label>
        </fieldset>
      )}

      {step === 5 && (
        <fieldset>
          <legend>Anything else we should know?</legend>
          <label>
            Final details
            <textarea
              rows={6}
              value={data.details}
              onChange={(event) => update("details", event.target.value)}
              placeholder="Context, stakeholders, constraints, or useful links"
            />
          </label>
          <label className="consent-check">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(event) => update("consent", event.target.checked)}
            />
            <span>I agree that Serptrix may use this information to respond to my inquiry. *</span>
          </label>
          <p className="privacy-note">
            Next, we prepare a summary you can send to{" "}
            <a href="mailto:hello@serptrix.com">hello@serptrix.com</a>. See our{" "}
            <a href="/privacy">privacy policy</a>.
          </p>
        </fieldset>
      )}

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
            {sending ? "Preparing your inquiry…" : "Prepare inquiry"}
            <span>{sending ? "" : "↗"}</span>
          </button>
        )}
      </div>
    </form>
  );
}

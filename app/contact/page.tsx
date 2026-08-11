import { ProjectForm } from "../components/project-form";

export const metadata = {
  title: "Contact",
  description: "Tell Serptrix what you are building, improving, or scaling.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <section className="contact-hero shell">
        <p className="eyebrow">
          <span /> START A CONVERSATION
        </p>
        <h1>
          Bring us the constraint.
          <br />
          <em>We’ll find the leverage.</em>
        </h1>
        <p>
          Tell us what you are trying to change. Five short steps, about four minutes—then we prepare a
          summary you can send by email.
        </p>
      </section>
      <section className="contact-main shell">
        <ProjectForm />
        <aside>
          <p className="section-index">WHAT HAPPENS NEXT</p>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>Prepare a clear brief</h3>
                <p>Your answers become a structured inquiry ready to send.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Complete by email</h3>
                <p>
                  Send the prepared message to <b>hello@serptrix.com</b> to start the handoff.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Useful first call</h3>
                <p>The conversation centers on the constraint—not a generic sales pitch.</p>
              </div>
            </li>
          </ol>
          <div className="contact-alternative">
            <span>PREFER EMAIL?</span>
            <a href="mailto:hello@serptrix.com">hello@serptrix.com ↗</a>
          </div>
        </aside>
      </section>
    </>
  );
}

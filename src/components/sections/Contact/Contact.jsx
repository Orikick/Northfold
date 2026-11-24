import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button.jsx";
import FormField from "@/components/ui/FormField/FormField.jsx";
import { submitEnquiry } from "@/data/api.js";
import { contact } from "@/data/navigation.js";
import styles from "./Contact.module.scss";

const EMPTY_FORM = { name: "", email: "", company: "", budget: "", message: "" };

const BUDGETS = [
  { value: "", label: "Choose a range" },
  { value: "under-15k", label: "Under €15,000" },
  { value: "15k-40k", label: "€15,000 to €40,000" },
  { value: "40k-100k", label: "€40,000 to €100,000" },
  { value: "over-100k", label: "Over €100,000" },
  { value: "unsure", label: "Not sure yet" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns { fieldName: message } in the same order as the fields appear.
function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter an email address like name@company.com.";
  if (values.message.trim().length < 20) errors.message = "Describe the project in at least 20 characters.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  // idle | submitting | success | error
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current.elements[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submitEnquiry(values);
      setValues(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title" tabIndex={-1}>
      <div className={styles.inner}>
        <div>
          <h2 id="contact-title" className={styles.title}>
            Tell us what you're making
          </h2>
          <p className={styles.lede}>
            A paragraph is enough to start. We reply within two working days with questions, a rough timeline and a
            price range.
          </p>
          <dl className={styles.details}>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>{contact.location}</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{contact.hours}</dd>
            </div>
          </dl>
        </div>

        {status === "success" ? (
          <div ref={successRef} className={styles.success} role="status" tabIndex={-1}>
            <h3 className={styles.successTitle}>Message sent</h3>
            <p>Thanks for writing. One of the partners will reply within two working days.</p>
            <Button onClick={() => setStatus("idle")}>Send another message</Button>
          </div>
        ) : (
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate aria-labelledby="contact-title">
            <div className={styles.row}>
              <FormField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
                required
              />
            </div>
            <div className={styles.row}>
              <FormField
                label="Company"
                name="company"
                value={values.company}
                onChange={handleChange}
                autoComplete="organization"
              />
              <FormField
                label="Budget"
                name="budget"
                type="select"
                options={BUDGETS}
                value={values.budget}
                onChange={handleChange}
              />
            </div>
            <FormField
              label="Project"
              name="message"
              type="textarea"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              hint="What you're making, who it's for and when you need it."
              required
            />

            <div className={styles.actions}>
              <Button type="submit" aria-disabled={submitting || undefined}>
                {submitting ? "Sending message" : "Send message"}
              </Button>
              {status === "error" && (
                <p className={styles.submitError} role="alert">
                  Message not sent. Check your connection and try again, or email {contact.email}.
                </p>
              )}
            </div>
            <p className="visually-hidden" role="status">
              {submitting ? "Sending your message" : ""}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

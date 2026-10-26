import { useState } from "react";

const EMPTY = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (values.message.trim().length < 10) errors.message = "Your message should be at least 10 characters.";
  return errors;
}

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text" },
];

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Demo flow: no contact backend exists yet, so nothing is sent.
    setSubmitted(true);
    setValues(EMPTY);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <span className="text-uppercase text-primary fw-bold fs-6" style={{ letterSpacing: 2 }}>Get in touch</span>
            <h1 className="fw-bold display-6 mt-2 mb-3">Contact Us</h1>
            <p className="text-muted lh-lg">Questions about an item or your order? Send us a note and we'll point you in the right direction.</p>
            <ul className="list-unstyled d-flex flex-column gap-3 mt-4">
              <li><i className="bi bi-envelope text-primary me-2" aria-hidden="true"></i><a href="mailto:support@shopnest.com">support@shopnest.com</a></li>
              <li><i className="bi bi-telephone text-primary me-2" aria-hidden="true"></i><a href="tel:+18005550199">+1 (800) 555-0199</a></li>
              <li><i className="bi bi-geo-alt text-primary me-2" aria-hidden="true"></i>Thirumala, Trivandrum, Kerala</li>
            </ul>
          </div>

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-4 shadow-sm p-4 p-md-5">
              {submitted && (
                <div className="alert alert-success" role="status">
                  Thanks! This is a demo form, so your message was validated but not sent anywhere.
                </div>
              )}

              {FIELDS.map(({ name, label, type, autoComplete }) => (
                <div className="mb-3" key={name}>
                  <label htmlFor={`contact-${name}`} className="form-label fw-semibold">{label} <span className="text-danger" aria-hidden="true">*</span></label>
                  <input
                    id={`contact-${name}`}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    required
                    className={`form-control${errors[name] ? " is-invalid" : ""}`}
                    value={values[name]}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
                  />
                  {errors[name] && <div id={`contact-${name}-error`} className="invalid-feedback">{errors[name]}</div>}
                </div>
              ))}

              <div className="mb-4">
                <label htmlFor="contact-message" className="form-label fw-semibold">Message <span className="text-danger" aria-hidden="true">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  className={`form-control${errors.message ? " is-invalid" : ""}`}
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                {errors.message && <div id="contact-message-error" className="invalid-feedback">{errors.message}</div>}
              </div>

              <button type="submit" className="btn btn-warm-amber">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

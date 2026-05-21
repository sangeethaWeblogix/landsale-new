"use client";

import { useState } from "react";
import { API_ENDPOINTS } from "@/config";
import "./contact.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!formData.phone.trim()) errs.phone = "Phone is required.";
    if (!formData.postcode.trim()) errs.postcode = "Postcode is required.";
    if (!formData.message.trim()) errs.message = "This field is required.";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("your-name", formData.name);
      body.append("your-email", formData.email);
      body.append("your-phone", formData.phone);
      body.append("your-postcode", formData.postcode);
      body.append("your-message", formData.message);

      const res = await fetch(API_ENDPOINTS.EnquiryForm, {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (data.status === "mail_sent") {
        setSubmitted(true);
      } else {
        setServerError(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setServerError("Unable to send your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <h1 className="contact-heading">Get in Touch</h1>

        {submitted ? (
          <div className="contact-success">
            <div className="success-icon">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-group">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.name && (
                <span className="contact-error-msg">{errors.name}</span>
              )}
            </div>

            <div className="contact-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <span className="contact-error-msg">{errors.email}</span>
              )}
            </div>

            <div className="contact-form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
              {errors.phone && (
                <span className="contact-error-msg">{errors.phone}</span>
              )}
            </div>

            <div className="contact-form-group">
              <input
                type="text"
                name="postcode"
                placeholder="Postcode*"
                value={formData.postcode}
                onChange={handleChange}
                autoComplete="postal-code"
              />
              {errors.postcode && (
                <span className="contact-error-msg">{errors.postcode}</span>
              )}
            </div>

            <div className="contact-form-group">
              <textarea
                name="message"
                placeholder="How can we help you?*"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <span className="contact-error-msg">{errors.message}</span>
              )}
            </div>

            {serverError && (
              <div className="contact-form-error">{serverError}</div>
            )}

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

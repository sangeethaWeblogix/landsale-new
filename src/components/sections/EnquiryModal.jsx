 "use client";
import { useEffect, useState } from "react";
import "./estate.css";


export default function EnquiryModal({ isOpen, onClose, title, landSlug }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error"
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  // ─── Validation ───────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    // Name - only letters & spaces
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters.";
    }

    // Email - must have @
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Phone - only numbers, 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits.";
    }

    // Postcode - only numbers, 4 digits
    if (formData.postcode && !/^\d{4}$/.test(formData.postcode)) {
      newErrors.postcode = "Postcode must be 4 digits.";
    }

    return newErrors;
  };

  // ─── Handle Change ────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name - block numbers & special chars while typing
    if (name === "name" && /[^a-zA-Z\s]/.test(value)) return;

    // Phone & Postcode - block non-numeric while typing
    if ((name === "phone" || name === "postcode") && /\D/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    // Clear error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // ─── Handle Submit ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lfs/estate-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estate_slug: landSlug,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          postcode: formData.postcode,
          enquiry_message: formData.message,
        }),
      });

      const data = await res.json();

     if (res.ok && (data?.success !== false)) {  // ← இப்படி check பண்ணு
  setSubmitStatus("success");
  setSubmitMessage("Enquiry submitted successfully!");
  setFormData({ name: "", email: "", phone: "", postcode: "", message: "" });
  setErrors({});
} else {
  setSubmitStatus("error");
  setSubmitMessage(data?.message || "Something went wrong.");
}
    } catch (err) {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────
// In EnquiryModal.tsx, change the overlay div to:
return (
  <div
    className="modal-overlay"
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      className="modal-box"
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "500px",
        width: "90%",
        position: "relative",
        zIndex: 10000,
      }}
    >

        <button className="close-btn" onClick={onClose}></button>
        <h2>Enquire About {title}</h2>

        {/* ── Success / Error Banner ── */}
        {submitStatus === "success" && (
          <div className="alert alert-success">✅ {submitMessage}</div>
        )}
        {submitStatus === "error" && (
          <div className="alert alert-error">❌ {submitMessage}</div>
        )}

        <form className="enquiry-form" onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="field">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              maxLength={50}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="field">
            <input
              type="text"
              name="phone"
              placeholder="Phone*"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          {/* Postcode */}
          <div className="field">
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              maxLength={4}
              inputMode="numeric"
            />
            {errors.postcode && <span className="field-error">{errors.postcode}</span>}
          </div>

          {/* Message */}
          <div className="field">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "SUBMIT"}
          </button>

        </form>
      </div>
    </div>
  );
}
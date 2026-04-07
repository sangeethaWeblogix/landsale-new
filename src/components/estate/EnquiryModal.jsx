"use client";
import { useEffect } from "react";

export default function EnquiryModal({ isOpen, onClose, title }) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}></button>

        <h2>Enquire About {title}</h2>

        <form className="enquiry-form">
          <input type="text" placeholder="Name*" required />
          <input type="email" placeholder="Email*" required />
          <input type="tel" placeholder="Phone*" required />
          <input type="text" placeholder="Postcode" />

          <button type="submit">SUBMIT</button>
        </form>

      </div>
    </div>
  );
}
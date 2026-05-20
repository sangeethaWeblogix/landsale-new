"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "./landdetails.css";
import { API_ENDPOINTS } from "@/config";

type Props = {
  landDetail: any;
};

const ListingDetail = ({ landDetail }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

   const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

 
  // ─── Validation (same as EnquiryModal) ───────────────────
  const validate = () => {
    const newErrors: Record<string, string> = {};

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

    // Postcode - only numbers, 4 digits (optional)
    if (formData.postcode && !/^\d{4}$/.test(formData.postcode)) {
      newErrors.postcode = "Postcode must be 4 digits.";
    }

    return newErrors;
  };

  // ─── Handle Change (same as EnquiryModal) ─────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  // ─── Handle Submit (same as EnquiryModal) ─────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lfs/land-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          land_slug: landDetail?.slug,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          postcode: formData.postcode,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.success !== false) {
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


  return (
    <section className="wrapper-layout listing-wrapper section">
      <div className="container">
        <div className="row">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <div className="topinfo_land_one">
              {/* GALLERY */}
              <div className="gallery">
                {/* MAIN SLIDER */}
                <Swiper
                  modules={[Navigation, Thumbs]}
                  navigation
                  thumbs={{ swiper: thumbsSwiper }}
                  className="swiper mainSwiper"
                >
                  {landDetail?.featured_image?.src && (
                    <SwiperSlide>
                      <img
                        src={landDetail.featured_image.src}
                        alt={landDetail.name}
                      />
                    </SwiperSlide>
                  )}

                  {landDetail?.gallery?.map((img: any, index: number) => (
                    <SwiperSlide key={index}>
                      <img src={img.src} alt={`gallery ${index}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* THUMB SLIDER */}
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  slidesPerView={4}
                  spaceBetween={10}
                  className="swiper thumbSwiper"
                >
                  {landDetail?.featured_image?.src && (
                    <SwiperSlide>
                      <img
                        src={landDetail.featured_image.src}
                        alt={landDetail.name}
                      />
                    </SwiperSlide>
                  )}

                  {landDetail?.gallery?.map((img: any, index: number) => (
                    <SwiperSlide key={index}>
                      <img src={img.src} alt={`Thumbnail ${index}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* PRICE + TITLE */}
            <div className="price-title">
              <h1>
                {landDetail.name} · {landDetail.price} ·{" "}
                {landDetail?.attributes?.["Land Size"]?.[0]?.name} Lot
              </h1>
              <p>{landDetail.address}</p>

              <span className="badge">
                {landDetail.estate?.estate_name} Estate
              </span>

              <a href="#" className="view-more">
                View More Listings in {landDetail.estate?.estate_name} Estate →
              </a>
            </div>

            {/* OVERVIEW */}
            <div className="content-box">
              <h2>Overview</h2>
              <p>{landDetail.description}</p>

              <h2>Key Features</h2>
              <ul>
                <li>370m² flat, level block ready to build</li>
                <li>12.5m frontage × 29.6m depth</li>
                <li>Fully serviced with water, sewer, power, NBN</li>
                <li>Located in the new Everdene Estate</li>
                <li>Close to schools, shops, and M4 Motorway</li>
              </ul>
            </div>

            {/* LOT DETAILS */}
            <div className="location-location">
              <h3>Lot Details</h3>

              <div className="lot-section">
                <div className="map-box">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(landDetail?.address)}&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="estate-box">
                  <div>
                    <img src="/images/everdene-logo.jpg" alt="Everdene" />

                    <div className="estate_update">
                      <p>
                        <img src="/images/checked.png" width="16" />
                        <span>Listed by Everdene Developments</span>
                      </p>
                      <p>
                        <img src="/images/check.png" width="18" />
                        <span>Verified Developer</span>
                      </p>
                      <a href="#" className="btn-primary">
                        View All Estate Listings
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="mt-2">{landDetail.address}</h6>
            </div>

            {/* LOCATION LINKS */}
            {/* <div className="location-box">
              <div className="footer-quick-links">
                <h2 className="footer-title">Location</h2>

                <div className="quick-links-grid">
                  <a href="#" className="quick-link-card">
                    <h3>Lot 1147, Riverstone Drive, Mulgoa, NSW</h3>
                    <p>View All Mulgoa Listings</p>
                    <span className="arrow">
                      <i className="icon icon-arr-r"></i>
                    </span>
                  </a>

                  <a href="#" className="quick-link-card">
                    <h3>Nearby Estates in the Western Sydney Region</h3>
                    <p>Browse Western Sydney Estates</p>
                    <span className="arrow">
                      <i className="icon icon-arr-r"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div> */}
          </div>

          {/* RIGHT FORM */}
           <div className="col-lg-4">
            <div className="enquiry-box">
              <h3>Contact us below.</h3>

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
                  {errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
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
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
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
                  {errors.phone && (
                    <span className="field-error">{errors.phone}</span>
                  )}
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
                  {errors.postcode && (
                    <span className="field-error">{errors.postcode}</span>
                  )}
                </div>

                {/* Message */}
                <div className="field">
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                     style={{ width: "100%", boxSizing: "border-box" , border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}
                  />
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Enquire Now"}
                </button>
              </form>

              <div className="secure-note">
                <div className="icon">
                  <img src="/images/lock.png" width="20" />
                </div>
                <strong>#1 Land Sales Site in Australia</strong>
                <p>Your enquiry is confidential and your details are secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingDetail;

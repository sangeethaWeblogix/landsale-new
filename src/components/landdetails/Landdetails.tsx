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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = new FormData();

      postData.append("_wpcf7", "52118");
      postData.append("_wpcf7_version", "5.9.3");
      postData.append("_wpcf7_locale", "en_US");
      postData.append("_wpcf7_unit_tag", "wpcf7-f3290-p45-o1");
      postData.append("_wpcf7_container_post", "45");

      postData.append("your-name", formData.name);
      postData.append("your-email", formData.email);
      postData.append("your-phone", formData.phone);

      postData.append("product-name", landDetail?.name || "");
      postData.append("product-sku", landDetail?.sku || "");
      postData.append("product-category", "land");
      postData.append("product-price", landDetail?.price || "");
      postData.append("product-url", window.location.href);

      const res = await fetch(API_ENDPOINTS.EnquiryForm, {
        method: "POST",
        body: postData,
      });

      const data = await res.json();

      if (data.status === "mail_sent") {
        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      } else {
      }
    } catch (error) {}

    setLoading(false);
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

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <button type="submit" disabled={loading}>
                  Enquire Now
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

"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import EnquiryModal from "@/components/estate/EnquiryModal";

import "./estate.css";

type Props = {
  estateDetail: any;
};

const Estate = ({ estateDetail }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

 
  const [open, setOpen] = useState(false);
  console.log("Estate Detail:", estateDetail); // Debugging log

  return (
    <>
      <EnquiryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={estateDetail?.name}
        landSlug={estateDetail?.slug}
      />
      {/* HERO SECTION */}
      <section className="hero">
        <div className="topinfo_land_one">
          <div className="gallery">
            {/* HERO OVERLAY */}
            <div className="hero-overlay">
              <img
                src={estateDetail?.logo}
                alt={estateDetail?.name}
                className="logo"
              />
              <p className="tagline">
                Acreage-Style Living • Wellbeing in Nature
              </p>
              <h2>
                From <span>{estateDetail?.land_lowest_price}</span>
              </h2>

              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => setOpen(true)}>
                  Enquire Now
                </button>
              </div>
            </div>

            {/* MAIN SLIDER */}
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              className="swiper mainSwiper"
            >
              {estateDetail?.featured_image?.src && (
                <SwiperSlide>
                  <img
                    src={estateDetail.featured_image.src}
                    alt={estateDetail?.name}
                  />
                </SwiperSlide>
              )}

              {estateDetail?.gallery?.map((g: any, index: number) => (
                <SwiperSlide key={index}>
                  <img src={g.src} alt={estateDetail?.name} />
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
              {estateDetail?.featured_image?.src && (
                <SwiperSlide>
                  <img src={estateDetail.featured_image.src} alt="Thumbnail" />
                </SwiperSlide>
              )}

              {estateDetail?.gallery?.map((g: any, index: number) => (
                <SwiperSlide key={index}>
                  <img src={g.src} alt="Thumbnail" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section className="wrapper-layout listing-wrapper section">
        <div className="container">
          <div className="row">
            {/* LEFT CONTENT */}
            <div className="col-lg-8">
              <div className="content-box">
                <h2>About {estateDetail?.name} Estate</h2>
                <p>{estateDetail?.description}</p>

                <h2>Estate Highlights</h2>
                <ul className="highlights">
                  <li>Large, family-sized lots ranging from 370m² to 800m²+</li>
                  <li>Picturesque setting with views of the Blue Mountains</li>
                  <li>Landscaped parks, playgrounds & walking trails</li>
                  <li>Close to schools, shopping & transport as</li>
                </ul>
              </div>

              {/* LOCATION */}
              <div className="location-location">
                <h3>Location</h3>
                <p>
                  <strong>{estateDetail?.name}</strong> •{" "}
                  {estateDetail?.address}
                </p>
                <a href="#" className="map-a">
                  View on Google Maps <i className="icon icon-arr-r"></i>
                </a>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4">
              <aside className="sidebar">
                <img
                  src={estateDetail?.logo}
                  className="sidebar-logo"
                  alt={estateDetail?.name}
                />
                <p className="developer">
                  Developed by {estateDetail?.taxonomies?.developer?.[0]?.name}
                </p>

                <span className="verified">
                  <img src="/images/check.png" width="18" />
                  <span> Verified Developer</span>
                </span>

                <div className="info-row">
                  <span>City Council</span>
                  <strong>
                    {estateDetail?.taxonomies?.["city-council"]?.[0]?.name}
                  </strong>
                </div>
                <div className="info-row">
                  <span>Region</span>
                  <strong>{estateDetail?.location?.region}</strong>
                </div>
                <div className="info-row">
                  <span>Estate Size</span>
                  <strong>13D • 1015</strong>
                </div>
                <div className="info-row">
                  <span>Lot Sizes</span>
                  <strong>370m² – 800m²+</strong>
                </div>
                <div className="info-row">
                  <span>Final Release</span>
                  <strong>2024</strong>
                </div>

                <button
                  className="enquire-btn btn primary full mt-3"
                  onClick={() => setOpen(true)}
                >
                  Enquire Now
                </button>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* All Land Listings */}
      {estateDetail?.child_lands?.length > 0 && (

      <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_1">
        <div className="container">
          <div className="box-title style-1 wow fadeInUp">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="title text-start">
{estateDetail?.child_lands?.length} Blocks of Land For Sale in{" "}
          {estateDetail?.name} Estate                    </h3>
                  </div>

                  {/* Card 1 */}
      {estateDetail?.child_lands?.map((land: any) => (


                  <div className="col-lg-3" key={land.land_id}>
                    <a href={`/land/${land.slug}`} className="homelengo-categories">
                      <div className="listing-card">
                        <div className="image_card">
                          <img
                            src={land?.featured_image }
                            alt=""
                          />
                        </div>
                        <div className="info_content">
                          <h4>{land.name}</h4>

                          <p className="location">
                            <i className="icon icon-mapPin"></i> {land.land_suburb} {land.land_postcode}
                          </p>
                          <div className="price">
                            <span className="price_data">{land.price}</span>
                            <button className="btn-primary">
                              View Details <i className="icon icon-arr-r"></i>

                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
      ))}

                

                

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export default Estate;

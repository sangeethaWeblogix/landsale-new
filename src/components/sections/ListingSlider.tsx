import { LandListing } from "@/types/apiTypes";
import Link from "../NavLink";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import EnquiryModal from "./EnquiryModal";

type ListingSliderProps = {
  title?: string;
  items: LandListing[];
};

export default function ListingSlider({ title, items }: ListingSliderProps) {
    const [open, setOpen] = useState(false);  
      const [selectedItem, setSelectedItem] = useState<LandListing | null>(null);

  if (!items?.length) return null;
  
  return (
    <>
     <EnquiryModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name}
        landSlug={selectedItem?.slug}
      />

    <section className="flat-section slider_new flat-categories arrow_shadow pt-0">
      <div className="container">
        {title && (
          <div className="box-title style-1">
            <h3 className="title mt-4">{title}</h3>
          </div>
        )}
        <div className="wrap-categories-sw">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".nav-prev-category",
              prevEl: ".nav-next-category",
            }}
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
            }}
            className="tf-sw-categories"
          >
            {items.map((item) => (
              <SwiperSlide key={item?.id}>
                  <Link
                                     href={`/estate/${item.slug}`} className="homelengo-categories">
                  <div className="listing-card">
                    <div className="image_card">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="info_content">
                      <h4>{item.name}</h4>
                      <p className="location">
                        <i className="icon icon-mapPin"></i> {item.location}
                      </p>
                      <div className="price">
                        <span className="price_data">Sale price</span>
                        {item.area_size && (
                          <span className="sqft_data">
                            <i className="icon icon-sqft"></i> {item.area_size}
                          </span>
                        )}
                      </div>
                      <div className="buttons">
                        <button className="btn-primary">View Estate</button>
                        <button className="btn-outline" onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedItem(item); // ✅ track which item
                            }}
                          >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="nav-prev-category swiper-button-next round-toggle"></div>
          <div className="nav-next-category swiper-button-prev round-toggle"></div>
        </div>
      </div>
    </section>
    </>
  );
}

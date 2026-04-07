"use client";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./home.css";
import {
  BlogListResponse,
  LandListingResponse,
  StateCountResponse,
} from "@/types/apiTypes";
import { formatDate } from "@/lib/utils/formatDate";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE_URL, STATE_NAMES } from "@/config";
import ListingSlider from "@/components/sections/ListingSlider";

type SuggestionGroupProps = {
  title: string;
  items: {
    name: string;
    uri: string;
  }[];
};

type HomeProps = {
  blogs: BlogListResponse;
  stateCount: StateCountResponse;
  exclusiveListing: LandListingResponse;
  featuredListing: LandListingResponse;
};

const SuggestionGroup = ({ title, items }: SuggestionGroupProps) => (
  <div className="suggestion-group">
    <h5 className="suggestion-title">{title}</h5>
    <ul className="suggestion-list">
      {items?.map((item: any) => (
        <li key={item?.uri}>
          <Link href={item?.uri} className="suggestion-link">
            {item?.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Home = ({
  blogs,
  stateCount,
  exclusiveListing,
  featuredListing,
}: HomeProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const getStateSlug = (stateKey: string) => {
    const match = STATE_NAMES.find(
      (item) => item.code.toLowerCase() === stateKey.toLowerCase(),
    );
    return match?.slug || "";
  };

  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions(null);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${SITE_URL}/api/lfs/location-search?keyword=${keyword}`,
        );
        const data = await res.json();
        setSuggestions(data?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchSuggestions(), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <>
      {/* HERO SEARCH */}
      <section className="flat-slider home-1 home_new">
        <div className="container relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="slider-content">
                <div className="heading">
                  <h1>Land for Sale in Australia</h1>
                </div>
                {/* <div className="search-bar">
                  <div className="tabs">
                    <button>
                      <i className="icon icon-buy-home1"></i> Buy Land
                    </button>
                    <span>|</span>
                    <button>
                      <i className="icon icon-listing"></i> List Land
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Location: state, region / suburb"
                    value={keyword}
                    onChange={onSearchChange}
                  />
                  <button className="btn-primary">Search Land</button>
                </div>

                {keyword.trim() && (
                  <div className="search-container">
                    <div className="search-suggestions">
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          {Object.values(suggestions || {}).some(
                            (arr) => Array.isArray(arr) && arr.length > 0,
                          ) ? (
                            <>
                              {suggestions.location?.length > 0 && (
                                <SuggestionGroup
                                  title={"Location"}
                                  items={suggestions?.location}
                                />
                              )}

                              {suggestions?.["growth-region"]?.length > 0 && (
                                <SuggestionGroup
                                  title={"Growth Region"}
                                  items={suggestions?.["growth-region"]}
                                />
                              )}

                              {suggestions.estate?.length > 0 && (
                                <SuggestionGroup
                                  title={"Estate"}
                                  items={suggestions?.estate}
                                />
                              )}

                              {suggestions.developer?.length > 0 && (
                                <SuggestionGroup
                                  title={"Developer"}
                                  items={suggestions?.developer}
                                />
                              )}

                              {suggestions?.["city-council"]?.length > 0 && (
                                <SuggestionGroup
                                  title={"City Council"}
                                  items={suggestions?.["city-council"]}
                                />
                              )}

                              {suggestions.builders?.length > 0 && (
                                <SuggestionGroup
                                  title={"Builders"}
                                  items={suggestions?.builders}
                                />
                              )}
                            </>
                          ) : (
                            <p>No results found for '{keyword}'</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )} */}

                <div className="banner_keyword hidden-xs">
                  <ul>
                    <li>Verified Developers</li>
                    <li>Direct Enquires</li>
                    <li>Australia-Wide Listings</li>
                    <li>New Listings Daily</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </section>

      {/* BROWSE BY STATE */}
      <section className="flat-section flat-categories">
        <div className="container">
          <h2 className="section-title text-center">Browse Land by State</h2>

          <div className="state-grid">
            {stateCount?.data?.map((item) => (
              <Link
                key={item?.state}
                className="state-card"
                href={`/${getStateSlug(item.state)}`}
              >
                {item?.state}
                <br />
                <span>{item?.count}</span>
              </Link>
            ))}
          </div>

          <div className="tags">
            <span>Melbourne West</span>
            <span>Gold Coast</span>
            <span>Geelong</span>
            <span>Central Coast</span>
            <span>Bendigo</span>
            <span>Latrobe</span>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container">
        <div className="featured">
          <Image
            src={
              exclusiveListing?.data?.data[0]?.image ||
              "/images/home_new_featured.jpg"
            }
            fill
            priority
            alt="Exclusive Listing"
            className="featured-bg"
          />
          <div className="featured-content">
            <small>
              <span className="icon icon-star"></span> Sponsored
            </small>
            <h3>{exclusiveListing?.data?.data[0]?.name}</h3>
            <p>{exclusiveListing?.data?.data[0]?.location}</p>
            <div className="buttons">
              <button
                className="btn-primary"
                onClick={() =>
                  router.push(`/${exclusiveListing?.data?.data[0]?.slug}`)
                }
              >
                View Estate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWEST LAND LISTINGS */}

      <ListingSlider
        title={"Newest Land Listings"}
        items={featuredListing?.data?.data || []}
      />

      {/* CTA */}
      <section className="container cta-grid">
        <div className="cta-card">
          <div className="content_area">
            <h3>For Developers</h3>
            <p>List your estate to buyers across Australia</p>
            <ul>
              <li>Featured placement</li>
              <li>Lead capture & analytics</li>
            </ul>
            <button className="btn-primary">Developer Portal</button>
          </div>
        </div>

        <div className="cta-card light">
          <div className="content_area">
            <h3>For Private Sellers</h3>
            <p>List your block in minutes and manage enquiries</p>
            <ul>
              <li>Upload photos</li>
              <li>Set price & manage leads</li>
            </ul>
            <button className="btn-primary">Post a Listing</button>
          </div>
        </div>
      </section>
      <section className="flat-section bg-primary-new">
        <div className="container">
          <div className="box-title text-left">
            <h3 className="title mt-4 fw-6">
              <a href="">Blog(s), News & Latest Updates</a>
            </h3>
          </div>

          <div className="slider_control">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".nav-prev-latest",
                prevEl: ".nav-next-latest",
              }}
              spaceBetween={15}
              slidesPerView={3}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
              className="tf-sw-latest"
            >
              {blogs?.data?.map((item) => (
                <SwiperSlide key={String(item?.id)}>
                  <Link
                    href={`/${item?.slug}`}
                    className="flat-blog-item hover-img"
                  >
                    <div className="img-style">
                      <img src={item?.image} alt={item?.title} />
                    </div>
                    <div className="content-box">
                      <div className="post-author">
                        <span>{formatDate(item?.date)}</span>
                      </div>
                      <h5 className="title link">{item?.title}</h5>
                      <p
                        className="description"
                        dangerouslySetInnerHTML={{ __html: item?.excerpt }}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* NAVIGATION */}
            <div className="nav-prev-latest swiper-button-next round-toggle"></div>
            <div className="nav-next-latest swiper-button-prev round-toggle"></div>
          </div>
        </div>
      </section>
    </>
  );
};

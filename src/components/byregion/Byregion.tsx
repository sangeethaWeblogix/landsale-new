"use client";
import Link from "../NavLink";
import "./byregion.css";
import { useState } from "react";

type RegionProps = {
  stateCode: string;
  region: string;
  suburbs: any;
  featuredEstates: any;
  stateSlug: string;
  landList: any; // Add this
  nonFeaturedLands: any;
  featuredLands: any;
};
export default function LandPage({
  stateCode,
  region,
  suburbs,
  stateSlug,
  featuredEstates,
  nonFeaturedLands,
  featuredLands,
  landList, // Add this
}: RegionProps) {
  const [showAllSuburbs, setShowAllSuburbs] = useState(false);
  const formatName = (name: string) =>
    name.replace(/\b\w/g, (c) => c.toUpperCase());

  const regionName = formatName(region.replace(/-/g, " "));

  const visibleSuburbs = showAllSuburbs
    ? suburbs?.suburbs
    : suburbs?.suburbs?.slice(0, 12);
  return (
    <>
      {/* Top Section */}
      <section className="section-top-map find_map_location">
        <div className="wrap-map">
          <h1 className="dynamic-title">
            Land for Sale in the {regionName} Region
          </h1>
        </div>
      </section>

      {/* Featured Estates */}
      {featuredEstates?.count > 0 && (
        <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_1">
          <div className="container">
            <div className="box-title style-1 wow fadeInUp">
              <h3 className="title">Featured Estates in {regionName}</h3>

              <div className="row">
                {/* Card 1 */}
                {featuredEstates?.data?.map((item: any) => (
                  <div className="col-lg-3" key={item.estate_id}>
                    <Link
                      href={`/estate/${item.estate_slug}`}
                      className="homelengo-categories"
                    >
                      <div className="listing-card">
                        <div className="image_card">
                          <img src={item.image} alt={item.estate_name} />
                        </div>
                        <div className="info_content">
                          <h4>{item.estate_name}</h4>
                          <p className="location">
                            <i className="icon icon-mapPin"></i>
                            {item.suburb}, {item.state_code}
                          </p>
                          <p className="mb-2 lot-count">
                            {item.lot_count} lots available
                          </p>
                          <div className="price">
                            <span className="price_data">
                              <small>From</small>
                              {item.land_lowest_price}
                            </span>
                            <button className="btn-primary">
                              View Estate <i className="icon icon-arr-r"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}

                {/* Button */}
                <div className="col-lg-12">
                  <Link href="estates" className="all-listing-button">
                    View All Estates <i className="icon icon-arr-r"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Suburbs */}
      {suburbs?.suburbs?.length > 0 && (
        <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_1">
          <div className="container">
            <div className="box-title style-1 wow fadeInUp">
              <h3 className="title">Top {regionName} Suburbs</h3>

              <div className="row">
                {visibleSuburbs.map((item: any) => (
                  <div className="col-lg-3" key={item.id}>
                    <Link
                      href={`/${stateSlug}/${region}/${item.suburb.toLowerCase().replace(/\s+/g, "-")}-${item.postcode}`}
                      className="homelengo-categories"
                    >
                      <div className="listing-card">
                        <div className="image_card">
                          <img src={item.image} alt={item.suburb} />
                        </div>
                        <div className="info_content">
                          <h4>
                            {formatName(item.suburb)} {item.postcode}
                          </h4>
                          <p className="mb-2 lot-count">
                            {item.listing_count} lots available
                          </p>
                          <div className="price">
                            <span className="price_data">
                              <small>From</small>₹
                              {item.starting_price
                                ? Number(item.starting_price).toLocaleString(
                                    "en-IN",
                                  )
                                : "0"}
                            </span>
                            <button className="btn-primary">
                              View Details <i className="icon icon-arr-r"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}

                {/* Button - outside map, inside row */}

                {suburbs.suburbs.length > 10 && (
                  <div className="col-lg-12">
                    <button
                      className="all-listing-button"
                      onClick={() => setShowAllSuburbs(!showAllSuburbs)}
                    >
                      {showAllSuburbs ? (
                        <>
                          View Less <i className="icon icon-arr-up"></i>
                        </>
                      ) : (
                        <>
                          View All Suburbs <i className="icon icon-arr-r"></i>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured land Listings */}
      {featuredLands?.length > 0 && (
        <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_3">
          <div className="container">
            <div className="box-title style-1 wow fadeInUp">
              <div className="row">
                <>
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="title text-start">
                          Featured Land Listings in {stateCode?.toUpperCase()}
                        </h3>
                      </div>

                      {/* Card 1 */}
                      {featuredLands.map((item: any) => (
                        <div className="col-lg-4" key={item.land_id}>
                          <Link
                            href={`/land/${item.land_slug}`}
                            className="homelengo-categories"
                          >
                            <div className="listing-card">
                              <div className="image_card">
                                <img src={item.image} alt={item.land_title} />
                              </div>
                              <div className="info_content">
                                <h4>{item.land_address}</h4>
                                 <div className="title_logo">


                                <p className="location">
                                  <i className="icon icon-mapPin"></i>{" "}
                                  {item.suburb} {item.pincode}
                                </p>
                                  <p className="owner_name">
                                  {item.listing_owner_name}
                                </p>
                                  </div>
                                <div className="price">
                                  <span className="price_data">
                                    {" "}
                                    {item.price}
                                  </span>
                                  <button className="btn-primary">
                                    View Details{" "}
                                    <i className="icon icon-arr-r"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}

                      {/* Button */}
                      {/* <div className="col-lg-12">
                      <Link href="land" className="all-listing-button">
                        View All Land <i className="icon icon-arr-r"></i>
                      </Link>
                    </div> */}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="col-lg-3">
                    <div className="side-sticky-img">
                      <img src="/images/sidebar-image-03.png" alt="" />
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Latest land Listings */}
      {nonFeaturedLands?.length > 0 && (
        <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_3">
          <div className="container">
            <div className="box-title style-1 wow fadeInUp">
              <div className="row">
                <>
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="title text-start">
                          Latest Land Listings in {stateCode?.toUpperCase()}
                        </h3>
                      </div>

                      {/* Card 1 */}
                      {nonFeaturedLands.map((item: any) => (
                        <div className="col-lg-4" key={item.land_id}>
                          <Link
                            href={`/land/${item.land_slug}`}
                            className="homelengo-categories"
                          >
                            <div className="listing-card">
                              <div className="image_card">
                                <img src={item.image} alt={item.land_title} />
                              </div>
                              <div className="info_content">
                                <h4>{item.land_address}</h4>
                                <div className="title_logo">


                                <p className="location">
                                  <i className="icon icon-mapPin"></i>{" "}
                                  {item.suburb} {item.pincode}
                                </p>
                                  <p className="owner_name">
                                  {item.listing_owner_name}
                                </p>
                                  </div>
                                <div className="price">
                                  <span className="price_data">
                                    {" "}
                                    {item.price}
                                  </span>
                                  <button className="btn-primary">
                                    View Details{" "}
                                    <i className="icon icon-arr-r"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}

                      {/* Button */}
                      <div className="col-lg-12">
                        <Link href="land" className="all-listing-button">
                          View All Land <i className="icon icon-arr-r"></i>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="col-lg-3">
                    <div className="side-sticky-img">
                      <img src="/images/sidebar-image-03.png" alt="" />
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

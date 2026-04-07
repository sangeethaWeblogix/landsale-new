"use client";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import "./state.css";
import { MAPBOX_TOKEN, SORT_OPTIONS, STATE_NAMES } from "@/config";
import ListingSlider from "@/components/sections/ListingSlider";
import SearchFilterBar from "@/components/sections/SearchFilterBar";
import Image from "next/image";
import {
  FilterListing,
  FilterListingResponse,
  LandListingResponse,
} from "@/types/apiTypes";
import { formatPrice } from "@/lib/utils/formatPrice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { getListingsWithFilters } from "@/lib/api/apiService";
import SkeletonCard from "../skeleton/SkeletonCard";

type StateProps = {
  exclusiveListing: LandListingResponse;
  featuredListing: LandListingResponse;

  stateCode: string;
  region?: string;
  suburb?: string;

  clickidQuery?: string;
  filters: {
    type?: string;
    sortBy?: string;
    min_price?: number;
    max_price?: number;
    min_land_size?: number;
    max_land_size?: number;
  };
};

const State = ({
  exclusiveListing,
  featuredListing,

  stateCode,
  region,
  suburb,

  filters,
  clickidQuery,
}: StateProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  const stateName = STATE_NAMES.find(
    (item) => item.code === stateCode.toLowerCase(),
  )?.name;

  const [listings, setListings] = useState<FilterListingResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProperties, setTotalProperties] = useState(1);

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = totalPages ? currentPage >= totalPages : false;

  const firstItemIndex =
    listings?.page && listings?.page <= listings?.total_pages
      ? (listings?.page - 1) * listings?.limit + 1
      : 0;

  const lastItemIndex =
    listings?.count && listings?.total
      ? Math.min(firstItemIndex + listings?.count - 1, listings?.total)
      : 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const sortFromQuery = (searchParams.get("sort-by") || "").toLowerCase();
    const isValidSort = SORT_OPTIONS.some(
      (item) => item.value === sortFromQuery,
    );

    setSortBy(isValidSort ? sortFromQuery : "");
  }, [searchParams]);

  useEffect(() => {
    sessionStorage.removeItem("listing_seed");
    const newSeed = Math.floor(Math.random() * 999999);
    sessionStorage.setItem("listing_seed", String(newSeed));
  }, [pathname]);

  useEffect(() => {
    const pageFromStorage = clickidQuery
      ? localStorage.getItem(clickidQuery)
      : null;
    const page = pageFromStorage ? Number(pageFromStorage) : 1;

    setCurrentPage(page);
    fetchPageData(page);
  }, [filters, stateCode, region, suburb]);

  const fetchPageData = async (page: number) => {
    try {
      setLoading(true);

      const seed = Number(sessionStorage.getItem("listing_seed"));
      const data = await getListingsWithFilters({
        state: stateCode,
        ...(region && { region }),
        ...(suburb && { suburb }),
        ...(filters?.min_price ? { min_price: filters?.min_price } : {}),
        ...(filters?.max_price ? { max_price: filters?.max_price } : {}),
        ...(filters?.min_land_size
          ? { min_land_size: filters?.min_land_size }
          : {}),
        ...(filters?.max_land_size
          ? { max_land_size: filters?.max_land_size }
          : {}),
        ...(filters?.type ? { category: filters?.type } : {}),
        ...(filters?.sortBy ? { order: filters?.sortBy } : { seed }),
        page: page,
      });

      if (data?.total_pages > 0 && page > data?.total_pages) {
        setCurrentPage(1);
        fetchPageData(1);
        return;
      }

      setListings(data);
      setTotalPages(data.total_pages);
      setTotalProperties(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };
  const landData = [
    {
      badge: "Estate",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/03/2530-huntley-illawarra-new-south-wales.jpg",
      title: "Sunset Ridge Estate",
      location: "Box Hill",
      price: "From $599,900",
    },
    {
      badge: "Private",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/03/2525-figtree-illawarra-new-south-wales.jpg",
      title: "Lot 3, Little Forest",
      location: "Little Forest",
      price: "$649,900",
    },
    {
      badge: "Estate",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/09/2620-sutton-capital-new-south-wales.jpg",
      title: "Highview Estate",
      location: "Morrisset",
      price: "Price on application",
    },
    {
      badge: "Private",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/09/2620-tralee-capital-new-south-wales.jpg",
      title: "Lot 7 Ocean Dr",
      location: "Lake Cathie",
      price: "$720,000",
    },
    // repeated cards (as per your HTML)
    {
      badge: "Estate",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/03/2530-huntley-illawarra-new-south-wales.jpg",
      title: "Sunset Ridge Estate",
      location: "Box Hill",
      price: "From $599,900",
    },
    {
      badge: "Private",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/03/2525-figtree-illawarra-new-south-wales.jpg",
      title: "Lot 3, Little Forest",
      location: "Little Forest",
      price: "From $649,900",
    },
    {
      badge: "Estate",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/09/2620-sutton-capital-new-south-wales.jpg",
      title: "Highview Estate",
      location: "Morrisset",
      price: "Price on application",
    },
    {
      badge: "Private",
      image:
        "https://www.landsales.com.au/wp-content/uploads/2025/09/2620-tralee-capital-new-south-wales.jpg",
      title: "Lot 7 Ocean Dr",
      location: "Lake Cathie",
      price: "$720,000",
    },
  ];
  const lots = [
    {
      image: "/images/land_lot1.jpg",
      title: "Lot 532",
      price: "$599,900",
      size: "370m²",
    },
    {
      image: "/images/land_lot2.jpg",
      title: "Lot 656",
      price: "$649,900",
      size: "457m²",
    },
    {
      image: "/images/land_lot1.jpg",
      title: "Lot 532",
      price: "Price on application",
      size: "509m²",
    },
  ];
  const quickLinks = [
    { title: "Sydney", subtitle: "Sydney Metro", href: "#" },
    { title: "Hunter Valley", subtitle: "NSW", href: "#" },
    { title: "Central Coast", subtitle: "Central Coast", href: "#" },
    { title: "Illawarra", subtitle: "South Coast", href: "#" },

    { title: "Sydney", subtitle: "Sydney Metro", href: "#" },
    { title: "Hunter Valley", subtitle: "NSW", href: "#" },
    { title: "Central Coast", subtitle: "Central Coast", href: "#" },
    { title: "Illawarra", subtitle: "South Coast", href: "#" },

    { title: "Sydney", subtitle: "Sydney Metro", href: "#" },
    { title: "Hunter Valley", subtitle: "NSW", href: "#" },
    { title: "Central Coast", subtitle: "Central Coast", href: "#" },
    { title: "Illawarra", subtitle: "South Coast", href: "#" },

    { title: "Sydney", subtitle: "Sydney Metro", href: "#" },
    { title: "Hunter Valley", subtitle: "NSW", href: "#" },
    { title: "Central Coast", subtitle: "Central Coast", href: "#" },
  ];
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);

    const query = new URLSearchParams(window.location.search);

    if (value) {
      query.set("sort-by", value);
    } else {
      query.delete("sort-by");
    }

    query.delete("clickid");

    const queryString = query.toString();

    router.push(`?${queryString}`);
  };

  const handlePrevPageClick = () => {
    if (isPrevDisabled) {
      return;
    }
    const prevPage = currentPage - 1;
    const params = new URLSearchParams(searchParams.toString());

    if (prevPage === 1) {
      params.delete("clickid");
      router.push(`${window.location.pathname}?${params.toString()}`);
      return;
    }

    const clickId = uuidv4();
    localStorage.setItem(clickId, prevPage.toString());
    params.set("clickid", clickId);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleNextPageClick = () => {
    if (isNextDisabled) {
      return;
    }
    const nextPage = currentPage + 1;
    const clickId = uuidv4();
    localStorage.setItem(clickId, nextPage.toString());

    const params = new URLSearchParams(searchParams.toString());
    params.set("clickid", clickId);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <>
      {/* <section className="section-top-map find_map_location">
        <div className="wrap-map">
          <div id="map" className="row-height">
            <Map
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{
                latitude: -37.970726,
                longitude: 144.3937214,
                zoom: 16,
              }}
              scrollZoom={true}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/light-v11"
            >
              <Marker latitude={-37.970726} longitude={144.39372147} />
            </Map>
          </div>
        </div>
      </section>
      <section className="wrapper-layout layout-2 section">
        <div className="container">
          <div className="topinfo_land_one">
            <div className="content-wrapper">
              <div className={`content ${expanded ? "expanded" : "collapsed"}`}>
                
                <h1 className="dynamic-title">
                  104 Estates with Land for Sale in New South Wales, Australia
                </h1>

                <p>
                  <span style={{ fontWeight: 400 }}>
                    New South Wales is a vibrant property market, offering
                    estates with blocks of land, house and land packages, and
                    townhouses for sale. From the bustling hubs of Sydney South
                    West and Sydney North West to the coastal charm of the
                    Central Coast and the industrial strength of the Hunter
                    Region (Greater Newcastle), NSW caters to diverse buyer
                    needs. Governed by proactive local councils, these growth
                    areas are primed for investment and lifestyle.
                  </span>
                </p>

                <h2>
                  <b>Getting Around New South Wales</b>
                </h2>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    NSW’s transportation infrastructure supports its thriving
                    growth regions. Sydney’s rail network, including the Sydney
                    Metro, T1 Western Line, and Central Coast &amp; Newcastle
                    Line, connects suburbs like Parramatta, Blacktown, and
                    Gosford. NSW TrainLink services extend to regional centers
                    like Maitland. Key motorways such as the M1 Pacific, M4
                    Western, and M5 ensure easy access to Sydney’s CBD and
                    beyond. Planned expansions, like the Sydney Metro West,
                    promise even greater connectivity.
                  </span>
                </p>

                <h2>
                  <b>Career Prospects in NSW</b>
                </h2>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    New South Wales offers robust employment opportunities
                    across its key regions. Sydney South West and North West
                    feature vibrant commercial centers like Liverpool,
                    Campbelltown, and Parramatta, with retail hubs such as
                    Westfield Penrith. The Hunter Region, anchored by Newcastle,
                    thrives in healthcare, education, and manufacturing,
                    supported by institutions like John Hunter Hospital and the
                    University of Newcastle. The Central Coast is a growing hub
                    for tourism and professional services.
                  </span>
                </p>

                <h2>
                  <b>Community and Leisure in NSW</b>
                </h2>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    NSW’s regions offer diverse lifestyles and amenities for
                    families, professionals, and retirees. Sydney South West and
                    North West provide vibrant communities with access to parks,
                    top-rated schools, and major shopping precincts like
                    Westfield Parramatta. The Central Coast blends coastal
                    living with cultural attractions, including beaches like
                    Avoca and events like the Central Coast Regional Show,
                    appealing to outdoor enthusiasts and families. The Hunter
                    Region offers a mix of urban and rural charm, with
                    Newcastle’s vibrant arts scene, historic Maitland, and the
                    renowned Hunter Valley wine region, ensuring a high quality
                    of life for residents.
                  </span>
                </p>
              </div>
              
              <div className="view-more-wrap">
                <button
                  className="view-more-btn"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "View Less" : "View More"}
                  
                </button>
              </div>
            </div>

           
          </div>
        </div>
      </section> */}
      <section className="top-search">
        <div className="container">
          {stateName && (
            <h1 className="dynamic-title">Land for sale in {stateName}</h1>
          )}
          <SearchFilterBar />
        </div>
      </section>
      <div className="container">
        <div className="short_by">
          <div className="short_by_count">
            {!loading &&
              (totalProperties === 0 ? (
                <p>No properties found</p>
              ) : firstItemIndex > 0 && lastItemIndex > 0 ? (
                <p>
                  Showing {firstItemIndex} - {lastItemIndex} of{" "}
                  {totalProperties} properties
                </p>
              ) : null)}
          </div>

          <div className="short_by_inner ">
            <label>Sort by:</label>
            <select
              name="orderby"
              className="form-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              {SORT_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ListingSlider items={featuredListing?.data?.data || []} />

      {exclusiveListing?.data?.data?.length ? (
        <section className="section">
          <div className="container">
            <div className="sponsored-project">
              <Image
                src={
                  exclusiveListing?.data?.data[0]?.image ||
                  "/images/lake_bg_sponserd.jpg"
                }
                fill
                priority
                alt="Exclusive Listing"
                className="featured-bg"
              />
              <span className="tag">Sponsored Project</span>

              <div className="overlay">
                <h2>{exclusiveListing?.data?.data[0]?.name}</h2>
                <p>{exclusiveListing?.data?.data[0]?.location}</p>

                <div className="project-footer">
                  <span>From $245,000 · Multiple lots available</span>

                  <div className="actions">
                    <Link
                      href={`/${exclusiveListing?.data?.data[0]?.slug}`}
                      className="btn outline"
                    >
                      View Project
                    </Link>

                    <Link
                      href={`/${exclusiveListing?.data?.data[0]?.slug}`}
                      className="btn primary"
                    >
                      Enquire <i className="icon icon-arr-r"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <section className="land_list section">
        <div className="container">
          {loading ? (
            <div className="card-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : listings?.data?.length ? (
            <div className="card-grid">
              {listings?.data.map((item) => (
                <Link href={`/${item.slug}`} key={item?.id}>
                  <article className="land-card">
                    <div className="image_card">
                      <span className="badge">PrivateEstate</span>
                      {item.image && <img src={item.image} alt={item.name} />}
                    </div>

                    <div className="info_content">
                      <h3>{item.name}</h3>

                      <p className="location">
                        <i className="icon icon-mapPin"></i> {item.location}
                      </p>

                      <div className="footer_data">
                        <p className="price">
                          {item.price
                            ? formatPrice(item.price)
                            : "Price on application"}
                        </p>
                        <i className="icon icon-arr-r"></i>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : null}
          {!loading && totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={handlePrevPageClick}
                disabled={isPrevDisabled}
              >
                &lt;
              </button>
              <span className="page-info">
                {currentPage} of {totalPages || 1}
              </span>
              <button
                className="page-btn"
                onClick={handleNextPageClick}
                disabled={isNextDisabled}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="spot_lite">
        <div className="container">
          <h2 className="section-title text-center">
            Consider This Premium Estate in New South Wales
          </h2>

          <div className="spot_bg">
            {/* ESTATE INFO */}
            <div className="estate-box">
              <div className="estate-info">
                <h3>Everdene Estate</h3>
                <p className="location">Mulgoa, NSW</p>
                <p className="highlight">Naturally centred</p>
                <p className="price">From $70/m²</p>

                <div className="actions">
                  <Link href="#" className="btn primary">
                    View Estate <i className="icon icon-arr-r"></i>
                  </Link>
                  <Link href="#" className="btn outline">
                    Enquire <i className="icon icon-arr-r"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* LOT LIST */}
            <h5>Available Lots in Everdene Estate</h5>

            <div className="lot-list">
              {lots.map((lot, index) => (
                <div className="lot-item" key={index}>
                  <div className="lot_top">
                    <img src={lot.image} alt={lot.title} />

                    <div>
                      <h3>{lot.title}</h3>
                      <p className="price">{lot.price}</p>
                      <span className="sqft">
                        <i className="icon icon-sqft"></i> {lot.size}
                      </span>
                    </div>
                  </div>

                  <div className="actions">
                    <Link href="#" className="btn small primary">
                      View
                    </Link>
                    <Link href="#" className="btn small outline">
                      Enquire
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="footer-quick-links">
        <div className="container">
          <h2 className="footer-title">Land For Sale by Region</h2>

          <div className="quick-links-grid">
            {quickLinks.map((item, index) => (
              <Link href={item.href} className="quick-link-card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <span className="arrow">
                  <i className="icon icon-arr-r"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default State;

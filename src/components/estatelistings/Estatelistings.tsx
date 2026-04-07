"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "./estatelistings.css";

const EstateListings = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const heroImages = ["land1.jpg", "land2.jpg", "land3.jpg", "land4.jpg"];

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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


    return (
        <>
            {/* HERO SECTION */}
            <section className="hero">
                <div className="topinfo_land_one">
                    <div className="gallery">

                        {/* HERO OVERLAY */}
                        <div className="hero-overlay">
                            <img
                                src="/images/everdene-logo.png"
                                alt="Everdene Mulgoa"
                                className="logo"
                            />
                            <p className="tagline">
                                Acreage-Style Living • Wellbeing in Nature
                            </p>
                            <h2>
                                From <span>$599,900</span>
                            </h2>

                            <div className="hero-buttons">
                                <a href="#" className="btn-primary">
                                    Enquire Now
                                </a>
                            </div>
                        </div>

                        {/* MAIN SLIDER */}
                        <Swiper
                            modules={[Navigation, Thumbs]}
                            navigation
                            thumbs={{ swiper: thumbsSwiper }}
                            className="swiper mainSwiper"
                        >
                            {heroImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={`/images/${img}`} alt="Land View" />
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
                            {heroImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={`/images/${img}`} alt="Thumbnail" />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
            </section>
            <section className="wrapper-layout layout-2 section">
                <div className="container">
                    <div className="topinfo_land_one">
                        <div className="">
                            <div className="content">
                                <h2>Available Lots in Everdene Estate</h2>
                                <p>Browse all current listings in Everdene Estate.</p>
                            </div>
                        </div>



                    </div>
                </div>
            </section>
            <section className="top-search">
                <div className="container">
                    <div className="search-wrap" ref={wrapperRef}>

                        <div className="search-filters">

                            {/* LOCATION */}
                            <div className="filter">
                                <button
                                    className="filter-btn"
                                    onClick={() => toggleDropdown("location")}
                                >
                                    <i className="icon icon-mapPin"></i> Location
                                </button>

                                <div
                                    className={`dropdown ${openDropdown === "location" ? "active" : ""}`}
                                >
                                    <input type="text" placeholder="Search suburb or region" />
                                    <ul>
                                        <li>Sydney Metro</li>
                                        <li>Hunter Valley</li>
                                        <li>Central Coast</li>
                                        <li>Illawarra</li>
                                    </ul>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="filter">
                                <button
                                    className="filter-btn"
                                    onClick={() => toggleDropdown("price")}
                                >
                                    $ Price
                                </button>

                                <div
                                    className={`dropdown ${openDropdown === "price" ? "active" : ""}`}
                                >
                                    <label>Min Price</label>
                                    <input type="number" placeholder="$100,000" />

                                    <label>Max Price</label>
                                    <input type="number" placeholder="$1,500,000" />

                                    <button className="apply-btn">Apply</button>
                                </div>
                            </div>

                            {/* LISTING */}
                            <div className="filter">
                                <button
                                    className="filter-btn"
                                    onClick={() => toggleDropdown("listing")}
                                >
                                    Listing Type
                                </button>

                                <div
                                    className={`dropdown checkbox_friendly ${openDropdown === "listing" ? "active" : ""
                                        }`}
                                >
                                    <label><input type="checkbox" /> Estate</label>
                                    <label><input type="checkbox" /> Private Seller</label>
                                    <label><input type="checkbox" /> Prestige</label>
                                </div>
                            </div>

                            {/* SORT */}
                            <div className="filter">
                                <button
                                    className="filter-btn"
                                    onClick={() => toggleDropdown("sort")}
                                >
                                    Sort
                                </button>

                                <div
                                    className={`dropdown ${openDropdown === "sort" ? "active" : ""}`}
                                >
                                    <ul>
                                        <li>Newest</li>
                                        <li>Price (Low → High)</li>
                                        <li>Price (High → Low)</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <button
                            className="reset-btn"
                            onClick={() => setOpenDropdown(null)}
                        >
                            Reset
                        </button>

                    </div>
                </div>
            </section>
            <section className="land_list section">
                <div className="container">
                    <div className="card-grid">
                        {landData.map((item, index) => (
                            <article className="land-card" key={index}>
                                <div className="image_card">
                                    <span className="badge">{item.badge}</span>
                                    <img src={item.image} alt={item.title} />
                                </div>

                                <div className="info_content">
                                    <h3>{item.title}</h3>

                                    <p className="location">
                                        <i className="icon icon-mapPin"></i> {item.location}
                                    </p>

                                    <div className="footer_data">
                                        <p className="price">{item.price}</p>
                                        <i className="icon icon-arr-r"></i>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="pagination">
                        <button className="page-btn">&lt;</button>
                        <span className="page-info">1 of 3</span>
                        <button className="page-btn">&gt;</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="cta">
                        <div>
                            <h3>Enquire About Everdene Estate</h3>
                            <p>Interested in securing a lot? Get in touch with us today.</p>
                        </div>
                        <a className="btn primary large">Enquire Now</a>
                    </div>
                </div>
            </section>


        </>
    );
};

export default EstateListings;

"use client";
 
import { useState, useEffect, useRef } from "react";
import Link from "../NavLink";
import Image from "next/image";
import "./header.css";
import { STATE_NAMES } from "@/config";
import { useRouter } from "next/navigation";

interface Suggestion {
  label: string;
  short: string;
  uri: string;
}

interface LocationSearchResponse {
  state_only: {
    key: string;
    uri: string;
    address: string;
    short_address: string;
  }[];
  region_state: {
    key: string;
    uri: string;
    address: string;
    short_address: string;
  }[];
  pincode_location_region_state: {
    uri: string;
    address: string;
    short_address: string;
  }[];
}



const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
   const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const transformUri = (uri: string, type: "state" | "region" | "suburb"): string => {
  const parts = uri.split("/");
  
  if (type === "state") {
    // victoria-state → victoria
    const state = parts[0].replace("-state", "");
    return `/${state}`;
  }
  
  if (type === "region") {
    // victoria-state/melbourne-region → victoria/melbourne
    const state = parts[0].replace("-state", "");
    const region = parts[1].replace("-region", "");
    return `/${state}/${region}`;
  }
  
  if (type === "suburb") {
    // victoria-state/mornington-peninsula-region/arthurs-seat-suburb/3936
    // → victoria/mornington-peninsula/arthurs-seat-3936
    const state = parts[0].replace("-state", "");
    const region = parts[1].replace("-region", "");
    const suburb = parts[2].replace("-suburb", "");
    const postcode = parts[3];
    return `/${state}/${region}/${suburb}-${postcode}`;
  }
  
  return `/${uri}`;
};


 useEffect(() => {
  if (debounceRef.current) clearTimeout(debounceRef.current);

  if (!query.trim()) {
    setSuggestions([]);
    return;
  }

  debounceRef.current = setTimeout(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/lfs/location-search?keyword=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      const results: Suggestion[] = [];

      (data.state_only || []).forEach((item: any) => {
        results.push({
          label: item.address,
          short: item.short_address,
    uri: transformUri(item.uri, "state"),
        });
      });

      (data.region_state || []).forEach((item: any) => {
        results.push({
          label: item.address,
          short: item.short_address,
    uri: transformUri(item.uri, "region"),
        });
      });

      (data.pincode_location_region_state || []).forEach((item: any) => {
        results.push({
          label: item.address,
          short: item.short_address,
uri: transformUri(item.uri, "suburb"),         });
      });

      setSuggestions(results);
    } catch (err) {
      console.error("Search error:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 300);
}, [query]);

 const handleSelect = (uri: any) => {
    setSuggestions([]);
    setQuery("");
    setOpen(false);
    router.push(uri);
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      handleSelect(suggestions[0].uri);
    }
  };


  
  return (
    <>
      <header
        id="header"
        className={`main-header header-fixed fixed-header ${isFixed ? "is-fixed" : ""
          }`}
      >
        <div className="container">
          <div className="header-lower">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner-header">
                  {/* LEFT */}
                  <div className="inner-header-left">
                    <div className="logo-box flex">
                      <div className="logo">
                        <Link href="/">
                          <Image
                            src="/images/logo.svg"
                            alt="logo"
                            className="logo-white"
                            width={180}
                            height={50}
                          />
                          <Image
                            src="/images/logo.svg"
                            alt="logo"
                            className="logo-dark"
                            width={180}
                            height={50}
                          />
                        </Link>
                      </div>
                    </div>
                    {/* DESKTOP SEARCH */}
                    <div className="search-wrapper hidden-xs">
                      {/* SVG Icon */}
                      <span className="search-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <circle cx="11" cy="11" r="7" stroke="#42b977" strokeWidth="2" />
                          <line
                            x1="16.5"
                            y1="16.5"
                            x2="21"
                            y2="21"
                            stroke="#42b977"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>

                      <input
                        type="text"
                        placeholder="Search suburb, postcode or state"
                        value={query}
                      onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                       {(suggestions.length > 0 || loading) && (
                        <ul className="search-dropdown">
                          {loading && <li className="search-loading">Searching...</li>}
                          {!loading &&
                            suggestions.map((s, i) => (
                              <li key={i} onClick={() => handleSelect(s.uri)}>
                                <span className="suggestion-label">{s.label}</span>
                                {/* <span className="suggestion-short">{s.short}</span> */}
                              </li>
                              
                            ))}
                        </ul>
                      )}
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="nav-outer flex align-center">
                      <nav className="main-menu show navbar-expand-md">
                        <div
                          className="navbar-collapse collapse clearfix"
                          id="navbarSupportedContent"
                        >
                          <ul className="navigation ">
                            <li>
                              <Link href="/">Home</Link>
                            </li>

                            <li className="dropdown2">
                              <Link href="#">Land for sale</Link>
                              <ul>
                                {STATE_NAMES.map((item) => (
                                  <li key={item.code}>
                                    <Link href={`/${item.slug}`}>
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>

                            <li>
                              <Link href="/blog">Blog</Link>
                            </li>
                            <li>
                              <Link href="/contact">Contact us</Link>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>

                  {/* MOBILE TOGGLER */}
                  <div
                    className="mobile-nav-toggler mobile-button"
                    onClick={() => setMobileOpen(true)}
                  >
                    <span></span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
            <div
              className="menu-backdrop"
              onClick={() => setMobileOpen(false)}
            ></div>

            <nav className="menu-box">
              <div className="nav-logo">
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    alt="nav-logo"
                    width={174}
                    height={44}
                  />
                </Link>
              </div>

              <div className="bottom-canvas">
                {/* Clone desktop menu via CSS/JS if needed */}
                <div className="menu-outer">
                  <ul className="navigation clearfix">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li className="dropdown2">
                      <Link href="#">Land for sale</Link>
                      <ul>
                        {STATE_NAMES.map((item) => (
                          <li key={item.code}>
                            <Link href={`/${item.slug}`}>{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact us</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="close-btn" onClick={() => setMobileOpen(false)}>
                <span className="icon flaticon-cancel-1"></span>
              </div>
            </nav>
          </div>
        </div>

      </header>
      {/* Trigger Search Bar */}
      <div
        className="mobile-search hidden-lg hidden-md hidden-sm"
        onClick={() => setOpen(true)}
      >
        <div className="search-wrapper">
          <span className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#42b977" strokeWidth="2" />
              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
                stroke="#42b977"
                strokeWidth="2"
              />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search suburb, postcode or state"
            value={query}
            readOnly
          />
        </div>
      </div>

      {/* FULL SCREEN POPUP */}
      {open && (
        <div className="mobile-search-popup">
          <div className="popup-header">
            {/* Back Button */}
            <button className="back-btn" onClick={() => setOpen(false)}>
              <i className="icon icon-arrow-left2"></i>
            </button>

            {/* Input */}
            <input
              autoFocus
              type="text"
              placeholder="Search suburb, postcode or state"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

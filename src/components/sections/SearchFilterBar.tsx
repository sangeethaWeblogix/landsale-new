"use client";

import {
  LAND_OPTIONS,
  LISTING_TYPES,
  PRICE_OPTIONS,
  SITE_URL,
  STATE_NAMES,
} from "@/config";
import { buildUrlFromFilters } from "@/lib/utils/filters/buildUrlFromFilters";
import { parseFiltersFromUrl } from "@/lib/utils/filters/parseFiltersFromUrl";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchFilterBar() {
  const [openFilters, setOpenFilters] = useState(false);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState("");
  const [draftState, setDraftState] = useState("");
  const [stateOptions, setStateOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [region, setRegion] = useState("");
  const [draftRegion, setDraftRegion] = useState("");
  const [regionOptions, setRegionOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [priceMin, setPriceMin] = useState("");
  const [draftPriceMin, setDraftPriceMin] = useState("");

  const [priceMax, setPriceMax] = useState("");
  const [draftPriceMax, setDraftPriceMax] = useState("");

  const [landMin, setLandMin] = useState("");
  const [draftLandMin, setDraftLandMin] = useState("");

  const [landMax, setLandMax] = useState("");
  const [draftLandMax, setDraftLandMax] = useState("");

  const [listingType, setListingType] = useState("");
  const [draftListingType, setDraftListingType] = useState("");

  const modalRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filteredMinOptions = PRICE_OPTIONS.filter((v) => {
    if (v === "Any") return true;
    if (!draftPriceMax) return true;
    return Number(v) < Number(draftPriceMax);
  });

  const filteredMaxOptions = PRICE_OPTIONS.filter((v) => {
    if (v === "Any") return true;
    if (!draftPriceMin) return true;
    return Number(v) > Number(draftPriceMin);
  });

  const filteredLandMinOptions = LAND_OPTIONS.filter((v) => {
    if (v === "Any") return true;
    if (!draftLandMax) return true;
    return Number(v) < Number(draftLandMax);
  });

  const filteredLandMaxOptions = LAND_OPTIONS.filter((v) => {
    if (v === "Any") return true;
    if (!draftLandMin) return true;
    return Number(v) > Number(draftLandMin);
  });

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenFilters(false);
      }
    };
    if (openFilters) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openFilters]);
  useEffect(() => {
    if (openFilters) {
      setDraftState(state);
      setDraftRegion(region);
      setDraftPriceMin(priceMin);
      setDraftPriceMax(priceMax);
      setDraftLandMin(landMin);
      setDraftLandMax(landMax);
      setDraftListingType(listingType);
    }
  }, [openFilters]);

  useEffect(() => {
    if (openFilters) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup (important for route change / unmount)
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openFilters]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFilters(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!params?.slug) return;

    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];

    const filters = parseFiltersFromUrl(slugArray);

    setState(filters.state || "");
    setRegion(filters.region || "");
    setPriceMin(filters.min_price?.toString() || "");
    setPriceMax(filters.max_price?.toString() || "");
    setLandMin(filters.min_land_size?.toString() || "");
    setLandMax(filters.max_land_size?.toString() || "");
  }, [params]);

  useEffect(() => {
    const typeFromQuery = (searchParams.get("type") || "").toLowerCase();
    const isValidType = LISTING_TYPES.some(
      (item) => item.value === typeFromQuery,
    );

    setListingType(isValidType ? typeFromQuery : "");
  }, [searchParams]);

  const clearFilters = () => {
    setDraftState("");
    setDraftRegion("");
    setDraftPriceMin("");
    setDraftPriceMax("");
    setDraftLandMin("");
    setDraftLandMax("");
    setDraftListingType("");
  };

  const activeFilterCount = [
    state || region ? 1 : 0,
    priceMin || priceMax ? 1 : 0,
    listingType ? 1 : 0,
    landMin || landMax ? 1 : 0,
  ].reduce((totalCount, currentItem) => totalCount + currentItem, 0);

  const applyFilters = () => {
    const filters = {
      state: draftState || undefined,
      region: draftRegion || undefined,
      min_price: draftPriceMin ? Number(draftPriceMin) : undefined,
      max_price: draftPriceMax ? Number(draftPriceMax) : undefined,
      min_land_size: draftLandMin ? Number(draftLandMin) : undefined,
      max_land_size: draftLandMax ? Number(draftLandMax) : undefined,
    };
    const segment = buildUrlFromFilters(filters);

    const cleanPath = pathname
      .split("/")
      .filter(
        (part) =>
          !/^(over-|under-|between-).*?(m2)?$/.test(part) &&
          !/-state$/.test(part) &&
          !/-region$/.test(part) &&
          !/-suburb$/.test(part),
      )
      .join("/");

    const query = new URLSearchParams(window.location.search);

    if (draftListingType) {
      query.set("type", draftListingType);
    } else {
      query.delete("type");
    }

    query.delete("clickid");

    const queryString = query.toString();

    const finalUrl =
      `${cleanPath}${segment === "/" ? "" : segment}` +
      (queryString ? `?${queryString}` : "");

    router.push(finalUrl);
    setOpenFilters(false);
  };

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions(null);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${SITE_URL}/api/lfs/location-format?keyword=${search}`,
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchSuggestions(), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("/api/lfs/filter-options?field=state");
        const json = await res.json();

        if (json?.success) {
          setStateOptions(json.data?.state || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (!draftState) {
      setRegionOptions([]);
      return;
    }

    const fetchRegions = async () => {
      try {
        const res = await fetch(
          `/api/lfs/filter-options?field=regions&state=${encodeURIComponent(draftState)}`,
        );
        const json = await res.json();
        if (json?.success) {
          setRegionOptions(json.data?.regions || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRegions();
  }, [draftState]);

  return (
    <>
      <div className="srpBar">
        {/* Search input */}
        <div className="srpSearchWrap">
          <span className="icon">
            <i className="icon icon-search search-icon"></i>
          </span>
          <input
            className="srpSearchInput"
            placeholder="Search region, suburb or postcode"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Pills */}
        <div className="actions">
          <button
            className="pillBtn pillPrimary"
            onClick={() => setOpenFilters(true)}
          >
            {activeFilterCount > 0 && (
              <span className="pillCount">{activeFilterCount}</span>
            )}
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 12.375V3.4375M5.5 12.375C5.86467 12.375 6.21441 12.5199 6.47227 12.7777C6.73013 13.0356 6.875 13.3853 6.875 13.75C6.875 14.1147 6.73013 14.4644 6.47227 14.7223C6.21441 14.9801 5.86467 15.125 5.5 15.125M5.5 12.375C5.13533 12.375 4.78559 12.5199 4.52773 12.7777C4.26987 13.0356 4.125 13.3853 4.125 13.75C4.125 14.1147 4.26987 14.4644 4.52773 14.7223C4.78559 14.9801 5.13533 15.125 5.5 15.125M5.5 15.125V18.5625M16.5 12.375V3.4375M16.5 12.375C16.8647 12.375 17.2144 12.5199 17.4723 12.7777C17.7301 13.0356 17.875 13.3853 17.875 13.75C17.875 14.1147 17.7301 14.4644 17.4723 14.7223C17.2144 14.9801 16.8647 15.125 16.5 15.125M16.5 12.375C16.1353 12.375 15.7856 12.5199 15.5277 12.7777C15.2699 13.0356 15.125 13.3853 15.125 13.75C15.125 14.1147 15.2699 14.4644 15.5277 14.7223C15.7856 14.9801 16.1353 15.125 16.5 15.125M16.5 15.125V18.5625M11 6.875V3.4375M11 6.875C11.3647 6.875 11.7144 7.01987 11.9723 7.27773C12.2301 7.53559 12.375 7.88533 12.375 8.25C12.375 8.61467 12.2301 8.96441 11.9723 9.22227C11.7144 9.48013 11.3647 9.625 11 9.625M11 6.875C10.6353 6.875 10.2856 7.01987 10.0277 7.27773C9.76987 7.53559 9.625 7.88533 9.625 8.25C9.625 8.61467 9.76987 8.96441 10.0277 9.22227C10.2856 9.48013 10.6353 9.625 11 9.625M11 9.625V18.5625"
                stroke="#161E2D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Filters
          </button>

          {/* Search CTA */}
          <button className="searchBtn">Search</button>
          <button className="pillBtn mapBtn">
            <i className="icon icon-map-trifold"></i> Map
          </button>
        </div>
      </div>
      {suggestions && (
        <div className="srp-search-container">
          <div className="srp-search-suggestions">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {suggestions.region_state?.length > 0 && (
                  <div className="srp-suggestion-group">
                    <div className="srp-suggestion-title">Regions</div>
                    <ul className="srp-suggestion-list">
                      {suggestions.region_state.map((item: any, i: number) => (
                        <li
                          key={i}
                          className="srp-suggestion-link"
                          onClick={() => {
                            const [stateCodeFromUri, regionSlug] =
                              item.uri.split("/");

                            const stateSlug =
                              STATE_NAMES.find(
                                (s) =>
                                  s.code === stateCodeFromUri.toLowerCase(),
                              )?.slug || "";

                            router.push(
                              `/listings/${stateSlug}-state/${regionSlug}`,
                            );

                            setSuggestions(null);
                          }}
                        >
                          {item.address}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {suggestions.pincode_location_region_state?.length > 0 && (
                  <div className="srp-suggestion-group">
                    <div className="srp-suggestion-title">Suburbs</div>
                    <ul className="srp-suggestion-list">
                      {suggestions.pincode_location_region_state.map(
                        (item: any, i: number) => (
                          <li
                            key={i}
                            className="srp-suggestion-link"
                            onClick={() => {
                              const parts = item.uri.split("/");

                              const suburbSlug = parts[0];
                              const regionSlug = parts[1];
                              const stateSlug = parts[2];
                              const postcode = parts[3];

                              const suburbWithPostcode = suburbSlug.replace(
                                "-suburb",
                                `-${postcode}-suburb`,
                              );

                              router.push(
                                `/listings/${stateSlug}/${regionSlug}/${suburbWithPostcode}`,
                              );

                              setSuggestions(null);
                            }}
                          >
                            {item.address}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
                {!suggestions.region_state?.length &&
                  !suggestions.pincode_location_region_state?.length && (
                    <p>No results found for '{search}'</p>
                  )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {openFilters && <div className="overlay" />}

      {/* Filters Modal */}
      {openFilters && (
        <div className="filterModal" ref={modalRef}>
          <div className="modalHeader">
            <h3>Filters</h3>
            <button className="closeBtn" onClick={() => setOpenFilters(false)}>
              ✕
            </button>
          </div>

          <div className="modalBody">
            {/* Location */}
            <div className="filterGroup">
              <div className="filterTitle">Location</div>
              <div className="filterGrid">
                <div>
                  <label>State</label>
                  <select
                    className="form-select"
                    value={draftState}
                    onChange={(e) => {
                      setDraftState(e.target.value);
                      setDraftRegion("");
                    }}
                  >
                    {stateOptions.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
                {draftState && (
                  <div>
                    <label>Region</label>
                    <select
                      className="form-select"
                      value={draftRegion}
                      onChange={(e) => setDraftRegion(e.target.value)}
                    >
                      {regionOptions.map((region, i) => (
                        <option
                          key={`${region.value}-${i}`}
                          value={region.value}
                        >
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <hr></hr>
            {/* Price */}
            <div className="filterGroup">
              <div className="filterTitle">Price</div>
              <div className="filterGrid">
                <div>
                  <label>Min</label>
                  <select
                    className="form-select"
                    value={draftPriceMin}
                    onChange={(e) => setDraftPriceMin(e.target.value)}
                  >
                    {filteredMinOptions.map((v) => (
                      <option key={v} value={v === "Any" ? "" : v}>
                        {v === "Any" ? "Any" : `$${Number(v).toLocaleString()}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Max</label>
                  <select
                    className="form-select"
                    value={draftPriceMax}
                    onChange={(e) => setDraftPriceMax(e.target.value)}
                  >
                    {filteredMaxOptions.map((v) => (
                      <option key={v} value={v === "Any" ? "" : v}>
                        {v === "Any" ? "Any" : `$${Number(v).toLocaleString()}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <hr></hr>

            {/* Land size */}
            <div className="filterGroup">
              <div className="filterTitle">Land size (m²)</div>
              <div className="filterGrid">
                <div>
                  <label>Min</label>
                  <select
                    className="form-select"
                    value={draftLandMin}
                    onChange={(e) => setDraftLandMin(e.target.value)}
                  >
                    {filteredLandMinOptions.map((v) => (
                      <option key={v} value={v === "Any" ? "" : v}>
                        {v === "Any" ? "Any" : `${v} m²`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Max</label>
                  <select
                    className="form-select"
                    value={draftLandMax}
                    onChange={(e) => setDraftLandMax(e.target.value)}
                  >
                    {filteredLandMaxOptions.map((v) => (
                      <option key={v} value={v === "Any" ? "" : v}>
                        {v === "Any" ? "Any" : `${v} m²`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <hr></hr>

            {/* Land size */}
            <div className="filterGroup">
              <div className="filterTitle">Listing Type</div>
              <div className="filterGrid">
                <div>
                  <select
                    className="form-select"
                    value={draftListingType}
                    onChange={(e) => setDraftListingType(e.target.value)}
                  >
                    {LISTING_TYPES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="modalFooter">
            <button className="clearBtn" onClick={clearFilters}>
              Clear
            </button>
            <button className="applyBtn" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
}

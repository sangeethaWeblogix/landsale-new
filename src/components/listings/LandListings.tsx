"use client";

import { getSessionSeed } from "@/lib/seed";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import Link from "next/link";

type LandListingsProps = {
  stateCode: string;
  state?: string;
  region?: string;
  suburb?: string;
};

export default function LandListings({
  stateCode,
  state,
  region,
  suburb,
}: LandListingsProps) {
  const [data, setData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const clickidQuery = searchParams.get("clickid");

  const totalPages = data?.total_pages || 1;
  const currentApiPage = data?.page || currentPage;

  const fetchPageData = async (page: number) => {
    try {
      setLoading(true);
      const seed = getSessionSeed();
      const params = new URLSearchParams();

      if (state) params.set("state", state);
      if (region) params.set("region", region);
      if (suburb) params.set("suburb", suburb);

      params.set("category", "land");
      params.set("page", page.toString());
      params.set("limit", "24");

      if (seed) params.set("seed", seed);

      const res = await fetch(`/api/lfs/land-list?${params.toString()}`);
      const result = await res.json();

      if (result?.total_pages > 0 && page > result.total_pages) {
        setCurrentPage(1);
        fetchPageData(1);
        return;
      }

      setData(result);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromStorage = clickidQuery
      ? localStorage.getItem(clickidQuery)
      : null;

    const page = pageFromStorage ? Number(pageFromStorage) : 1;

    setCurrentPage(page);
    fetchPageData(page);
  }, [clickidQuery]);

  const handleNextPageClick = () => {
    if (currentPage >= (data?.total_pages || 1)) return;
    const nextPage = currentPage + 1;

    const clickId = uuidv4();
    localStorage.setItem(clickId, nextPage.toString());

    const params = new URLSearchParams(searchParams.toString());
    params.set("clickid", clickId);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handlePrevPageClick = () => {
    if (currentPage <= 1) return;

    const prevPage = currentPage - 1;

    const params = new URLSearchParams(searchParams.toString());

    if (prevPage === 1) {
      params.delete("clickid");
      router.push(`${window.location.pathname}`);
      return;
    }

    const clickId = uuidv4();
    localStorage.setItem(clickId, prevPage.toString());

    params.set("clickid", clickId);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };
  return (
    <>
      {/* Top Section */}
      <section className="section-top-map find_map_location">
        <div className="wrap-map">
          <h1 className="dynamic-title">Land Listings</h1>
        </div>
      </section>

      {/* Latest land Listings */}
      <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_3">
        <div className="container">
          <div className="box-title style-1 wow fadeInUp">
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="title text-start">
                      Latest Land Listings in {stateCode?.toUpperCase()}
                    </h3>
                  </div>

                  {loading && (
                    <>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div className="col-lg-4 mb-4" key={i}>
                          <SkeletonCard />
                        </div>
                      ))}
                    </>
                  )}

                  {!loading && data?.count === 0 && (
                    <div className="col-lg-12">
                      <p>No listings found</p>
                    </div>
                  )}

                  {/* Card 1 */}
                  {!loading &&
                    data?.count > 0 &&
                    data?.data?.map((item: any) => (
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
                              <p className="location">
                                <i className="icon icon-mapPin"></i>{" "}
                                {item.suburb} {item.pincode}
                              </p>
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

                  {!loading && data?.count > 0 && (
                    <div className="col-lg-12">
                      <div className="pagination">
                        <button
                          className="page-btn"
                          onClick={handlePrevPageClick}
                          disabled={currentApiPage <= 1}
                        >
                          &lt;
                        </button>
                        <span className="page-info">
                          {currentApiPage} of {totalPages}
                        </span>
                        <button
                          className="page-btn"
                          onClick={handleNextPageClick}
                          disabled={currentApiPage >= totalPages}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-3">
                <div className="side-sticky-img">
                  <img src="/images/sidebar-image-03.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

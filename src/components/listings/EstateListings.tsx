"use client";

import { getSessionSeed } from "@/lib/seed";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import Link from "next/link";

type EstateListingsProps = {
  state?: string;
  region?: string;
  suburb?: string;
};

export default function EstateListings({
  state,
  region,
  suburb,
}: EstateListingsProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  const clickidQuery = searchParams.get("clickid");

  const fetchPageData = async (page: number) => {
    try {
      setLoading(true);

      const seed = getSessionSeed();
      const params = new URLSearchParams();

      if (state) params.set("state", state);
      if (region) params.set("region", region);
      if (suburb) params.set("suburb", suburb);

      params.set("category", "estate");
      params.set("page", page.toString());
      params.set("limit", "24");

      if (seed) params.set("seed", seed);

      const res = await fetch(`/api/lfs/estate-list?${params.toString()}`);
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

  const totalPages = data?.total_pages || 1;
  const currentApiPage = data?.page || currentPage;

  const handleNextPageClick = () => {
    if (currentApiPage >= totalPages) return;

    const nextPage = currentPage + 1;

    const clickId = uuidv4();
    localStorage.setItem(clickId, nextPage.toString());

    const params = new URLSearchParams(searchParams.toString());
    params.set("clickid", clickId);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handlePrevPageClick = () => {
    if (currentApiPage <= 1) return;

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
          <h1 className="dynamic-title">Estate Listings</h1>
        </div>
      </section>

      {/* Featured Estates */}

      <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_1">
        <div className="container">
          <div className="box-title style-1 wow fadeInUp">
            <h3 className="title">Estates</h3>

            <div className="row">
              {loading && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div className="col-lg-3 mb-4" key={i}>
                      <SkeletonCard />
                    </div>
                  ))}
                </>
              )}

              {!loading && data?.count === 0 && (
                <div className="col-lg-12">
                  <p>No estates found</p>
                </div>
              )}
              {/* Card 1 */}

              {!loading &&
                data?.count > 0 &&
                data.data.map((item: any) => (
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
        </div>
      </section>
    </>
  );
}

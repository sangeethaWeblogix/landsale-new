"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogListResponse } from "@/types/apiTypes";
import { formatDate } from "@/lib/utils/formatDate";
import "./blog.css?=2";

const PER_PAGE = 6;

interface Props {
  blogs: BlogListResponse;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function BlogPage({ blogs }: Props) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const allBlogs = blogs?.data ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allBlogs;
    return allBlogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q)
    );
  }, [search, allBlogs]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage]);

  const recentPosts = allBlogs.slice(0, 5);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startItem = filtered.length === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1;
  const endItem = Math.min(currentPage * PER_PAGE, filtered.length);

  return (
    <section className="blog-page">
      <div className="container">
        <div className="blog-page-header">
          <h1>Blog(S), News &amp; Latest Updates</h1>
          <p>Insights, tips and updates from the Land Sales team</p>
        </div>

        <div className="blog-page-inner">
          {/* Main Grid */}
          <div>
            {/* <p className="blog-results-count">
              {filtered.length > 0 ? (
                <>
                  Showing <strong>{startItem}–{endItem}</strong> of{" "}
                  <strong>{filtered.length}</strong> articles
                </>
              ) : (
                "No articles found"
              )}
            </p> */}

            <div className="blog-grid">
              {paginated.length > 0 ? (
                paginated.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/${blog.slug}`}
                    className="blog-card"
                  >
                    <div className="blog-card-img">
                      <img src={blog.image} alt={blog.title} loading="lazy" />
                    </div>
                    <div className="blog-card-body">
                      <span className="blog-card-date">
                        {formatDate(blog.date)}
                      </span>
                      <h2 className="blog-card-title">{blog.title}</h2>
                      <p
                        className="blog-card-excerpt"
                        dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                      />
                      <span className="blog-card-link">Read more &rarr;</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="blog-no-results">
                  <h3>No articles found</h3>
                  <p>Try a different search term.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="blog-pagination">
                <button
                  className="pagination-btn pagination-arrow"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  &#8592;
                </button>

                {getPageNumbers(currentPage, totalPages).map((page, i) =>
                  page === "..." ? (
                    <span key={`ellipsis-${i}`} className="pagination-ellipsis">
                      &hellip;
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`pagination-btn${currentPage === page ? " pagination-btn--active" : ""}`}
                      onClick={() => goToPage(page as number)}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  className="pagination-btn pagination-arrow"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  &#8594;
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            {/* Search Widget */}
            {/* <div className="sidebar-widget">
              <h3 className="sidebar-widget-title">Search Articles</h3>
              <div className="sidebar-search">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <svg
                  className="sidebar-search-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div> */}

            {/* Recent Posts Widget */}
            <div className="sidebar-widget">
              <h3 className="sidebar-widget-title">Recent Posts</h3>
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="recent-post-item"
                >
                  <div className="recent-post-thumb">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                  <div className="recent-post-info">
                    <span>{formatDate(post.date)}</span>
                    <p>{post.title}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Widget */}
            <div className="sidebar-widget sidebar-cta">
              <h3 className="sidebar-widget-title">Get in Touch</h3>
              <p>
                Looking for land listings or need help with your property
                search? Our team is ready to assist.
              </p>
              <Link href="/contact">Contact Us Today</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

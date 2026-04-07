import { SITE_URL } from "@/config";

// Blog List
export async function getBlogs() {
  const res = await fetch(`${SITE_URL}/api/lfs/blog-list`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

// State Count
export async function getStateCount() {
  const res = await fetch(`${SITE_URL}/api/lfs/state-count`);
  if (!res.ok) throw new Error("Failed to fetch state count");
  return res.json();
}

// Listing
export async function getListing(params: Record<string, string | number>) {
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  ).toString();

  const res = await fetch(`${SITE_URL}/api/lfs/new-list?${query}`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}

// Filter Listing
export async function getListingsWithFilters(
  params: Record<string, string | number | undefined>,
) {
  params.limit = 24;
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  const res = await fetch(`${SITE_URL}/api/lfs/filter-api?${query}`);
  if (!res.ok) throw new Error("Failed to fetch filter listings");
  return res.json();
}

import { LandFilters } from "./parseFiltersFromUrl";

export function buildUrlFromFilters(filters: LandFilters): string {
  const segments: string[] = [];

  const state = filters.state;
  const region = filters.region;

  const minPrice = filters.min_price;
  const maxPrice = filters.max_price;

  const minLand = filters.min_land_size;
  const maxLand = filters.max_land_size;

  // State
  if (state) {
    segments.push(`${state}-state`);
  }

  // Region
  if (region) {
    segments.push(`${region}-region`);
  }

  // Price
  if (minPrice && maxPrice) {
    segments.push(`between-${minPrice}-${maxPrice}`);
  } else if (minPrice) {
    segments.push(`over-${minPrice}`);
  } else if (maxPrice) {
    segments.push(`under-${maxPrice}`);
  }

  // Land size
  if (minLand && maxLand) {
    segments.push(`between-${minLand}m2-${maxLand}m2`);
  } else if (minLand) {
    segments.push(`over-${minLand}m2`);
  } else if (maxLand) {
    segments.push(`under-${maxLand}m2`);
  }

  return segments.length ? `/${segments.join("/")}` : "/";
}

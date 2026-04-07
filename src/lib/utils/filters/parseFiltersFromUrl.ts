import { LAND_OPTIONS, PRICE_OPTIONS } from "@/config";

export interface LandFilters {
  state?: string;
  region?: string;
  min_price?: number;
  max_price?: number;
  min_land_size?: number;
  max_land_size?: number;
}

export function parseFiltersFromUrl(slugParts: string[]): LandFilters {
  const filters: LandFilters = {};

  const parts = slugParts.map((raw) => decodeURIComponent(raw).split("?")[0]);

  const statePart = parts.find((part) => part.endsWith("-state"));
  if (statePart) {
    filters.state = statePart.replace("-state", "");
  }

  const regionPart = parts.find((part) => part.endsWith("-region"));
  if (regionPart) {
    filters.region = regionPart.replace("-region", "");
  }

  const priceParts = parts.filter(
    (part) => /^(over-|under-|between-)/.test(part) && !part.includes("m2"),
  );

  const landSizeParts = parts.filter(
    (part) => /^(over-|under-|between-)/.test(part) && part.includes("m2"),
  );

  const isValidPrice = (val: number) => PRICE_OPTIONS.includes(val.toString());
  const isValidLandSize = (val: number) =>
    LAND_OPTIONS.includes(val.toString());

  if (priceParts.length > 0) {
    const part = priceParts[0];

    let match = part.match(/^over-(\d+)$/);
    if (match) {
      const value = Number(match[1]);
      if (isValidPrice(value)) filters.min_price = value;
    }

    match = part.match(/^under-(\d+)$/);
    if (match) {
      const value = Number(match[1]);
      if (isValidPrice(value)) filters.max_price = value;
    }

    match = part.match(/^between-(\d+)-(\d+)$/);
    if (match) {
      const min = Number(match[1]);
      const max = Number(match[2]);
      if (isValidPrice(min) && isValidPrice(max) && min < max) {
        filters.min_price = min;
        filters.max_price = max;
      }
    }
  }

  if (landSizeParts.length > 0) {
    const part = landSizeParts[0];

    let match = part.match(/^over-(\d+)m2$/);
    if (match) {
      const value = Number(match[1]);
      if (isValidLandSize(value)) filters.min_land_size = value;
    }

    match = part.match(/^under-(\d+)m2$/);
    if (match) {
      const value = Number(match[1]);
      if (isValidLandSize(value)) filters.max_land_size = value;
    }

    match = part.match(/^between-(\d+)m2-(\d+)m2$/);
    if (match) {
      const min = Number(match[1]);
      const max = Number(match[2]);
      if (isValidLandSize(min) && isValidLandSize(max) && min < max) {
        filters.min_land_size = min;
        filters.max_land_size = max;
      }
    }
  }

  return filters;
}

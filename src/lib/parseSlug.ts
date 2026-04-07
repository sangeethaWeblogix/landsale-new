import { ListingType, ParsedSlug } from "./types";

const LISTING_TYPES = new Set(["estates", "land", "townhouses", "house-land"]);

export function parseSlug(segments: string[]): ParsedSlug {
  if (!segments?.length) return {};

  const segs = [...segments];

  const state = segs.shift();

  let listingType: ListingType | undefined;
  const last = segs[segs.length - 1];

  if (LISTING_TYPES.has(last)) {
    listingType = last as ListingType;
    segs.pop();
  }

  let region: string | undefined;
  let suburb: string | undefined;
  let postcode: string | undefined;
  let isSuburbsPage = false;

  for (const seg of segs) {
    if (seg === "suburbs") {
      isSuburbsPage = true;
      continue;
    }

    const parts = seg.split("-");
    const lastPart = parts[parts.length - 1];

    if (/^\d{4}$/.test(lastPart)) {
      postcode = lastPart;
      suburb = parts.slice(0, -1).join("-");
      continue;
    }

    if (!region) {
      region = seg;
    }
  }

  return {
    state,
    region,
    suburb,
    postcode,
    listingType,
    isSuburbsPage,
  };
}

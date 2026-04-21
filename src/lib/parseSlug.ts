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

  // ✅ Handle /suburbs route
  if (segs.includes("suburbs")) {
    isSuburbsPage = true;
    return { state, region: segs[0], isSuburbsPage };
  }

  // ✅ Assign region (always first)
  region = segs[0];

  // ✅ Handle suburb + postcode (second segment)
  const suburbWithPostcode = segs[1];

  if (suburbWithPostcode) {
    const parts = suburbWithPostcode.split("-");
    const lastPart = parts[parts.length - 1];

    if (/^\d{4}$/.test(lastPart)) {
      postcode = lastPart;
      suburb = parts.slice(0, -1).join("-");
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

export type ListingType = "estates" | "land" | "townhouses" | "house-land";

export type ParsedSlug = {
  state?: string;
  region?: string;
  suburb?: string;
  postcode?: string;
  listingType?: ListingType;
  isSuburbsPage?: boolean;
};

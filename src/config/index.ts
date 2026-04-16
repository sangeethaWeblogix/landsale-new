export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const API_CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL,
  API_TOKEN: process.env.API_TOKEN,
};

export const API_ENDPOINTS = {
  BlogList: "/blog-list",
  StateCount: "/state-count",
  NewListing: "/new_list",
  LocationSearch: "/location-search",
  FilterApi: "/filter-api",
  LocSearch: "/loc-search",
  LocationFormat: "/location-format",
  FilterOptions: "/filter-options",
  EstateList: "/estate_list",
  StateBasedRegion: "/state_based_region",
  LandList: "/land_list",
  LandDetail: "/land_detail",
  EstateDetails: "/estate_details",
  EnquiryForm:
    "https://www.admin.landsales.com.au/wp-json/contact-form-7/v1/contact-forms/52118/feedback",
};

export const PRICE_OPTIONS = [
  "Any",
  "100000",
  "200000",
  "300000",
  "400000",
  "500000",
  "750000",
  "1000000",
  "1500000",
  "2000000",
];
export const LAND_OPTIONS = [
  "Any",
  "100",
  "200",
  "300",
  "400",
  "500",
  "750",
  "1000",
  "2000",
  "5000",
];
export const LISTING_TYPES = [
  { value: "", label: "Any" },
  { value: "estate", label: "Estate" },
  { value: "private_seller", label: "Private Seller" },
  { value: "agent", label: "Agent" },
];
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price (Low to High)" },
  { value: "price_desc", label: "Price (High to Low)" },
  { value: "year-desc", label: "Year Made (High to Low)" },
  { value: "year-asc", label: "Year Made (Low to High)" },
];

export const STATE_NAMES = [
  { code: "nsw", name: "New South Wales", slug: "new-south-wales" },
  { code: "qld", name: "Queensland", slug: "queensland" },
  { code: "wa", name: "Western Australia", slug: "western-australia" },
  { code: "vic", name: "Victoria", slug: "victoria" },
  { code: "sa", name: "South Australia", slug: "south-australia" },
  {
    code: "act",
    name: "Australian Capital Territory",
    slug: "australian-capital-territory",
  },
  { code: "tas", name: "Tasmania", slug: "tasmania" },
  { code: "nt", name: "Northern Territory", slug: "northern-territory" },
];

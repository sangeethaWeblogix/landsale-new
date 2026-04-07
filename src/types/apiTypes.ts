// BlogList
interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
  permalink: string;
}

export interface BlogListResponse {
  success: boolean;
  limit: number;
  offset: number;
  total: number;
  count: number;
  data: Blog[];
  cached: boolean;
}

//StateCount
interface StateCountItem {
  state: string;
  slug: string;
  count: number;
}

export interface StateCountResponse {
  success: boolean;
  data: StateCountItem[];
}

//LandListing
export interface LandListing {
  id: number;
  name: string;
  regular_price: string;
  sale_price: string;
  image: string;
  slug: string;
  link: string;
  location: string;
  area_size: string;
}
interface LandListingData {
  total: number;
  page: number;
  limit: number;
  data: LandListing[];
}
export interface LandListingResponse {
  success: boolean;
  data: LandListingData;
}

//FilterApi
export interface FilterListing {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string | false;
  area_size: string;
  location: string;
}

export interface FilterListingResponse {
  page: number;
  count: number;
  total_pages: number;
  total: number;
  limit: number;
  seed: number;
  data: FilterListing[];
}

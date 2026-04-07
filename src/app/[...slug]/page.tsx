import { parseSlug } from "@/lib/parseSlug";
import Bystate from "@/components/bystate/Bystate";
import Byregion from "@/components/byregion/Byregion";
import Suburbs from "@/components/suburbs/Suburbs";
import { SITE_URL, STATE_NAMES } from "@/config";
import EstateListings from "@/components/listings/EstateListings";
import LandListings from "@/components/listings/LandListings";

type Params = Promise<{
  slug?: string[];
}>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const parsed = parseSlug(slug ?? []);

  const { state, region, suburb, listingType, isSuburbsPage } = parsed;

  const stateCodeFromSlug =
    STATE_NAMES.find((s) => s.slug === state)?.code ?? "";

  if (listingType) {
    const baseParams: Record<string, string> = {};

    if (state) baseParams.state = state;
    if (region) baseParams.region = region;
    if (suburb) baseParams.suburb = suburb;

    if (listingType === "estates") {
      return <EstateListings state={state} region={region} suburb={suburb} />;
    }

    if (listingType === "land") {
      return (
        <LandListings
          stateCode={stateCodeFromSlug ?? ""}
          state={state}
          region={region}
          suburb={suburb}
        />
      );
    }
  }

  if (state && !region && !suburb && !isSuburbsPage) {
    const query = new URLSearchParams({
      featured: "yes",
      limit: "8",
      state: state,
    }).toString();

    const res = await fetch(`${SITE_URL}/api/lfs/estate-list?${query}`);

    const featuredEstates = await res.json();

    const regionsRes = await fetch(
      `${SITE_URL}/api/lfs/state-based-region?state=${state}`,
    );

    const regionsData = await regionsRes.json();

    const landRes = await fetch(
      `${SITE_URL}/api/lfs/land-list?state=${state}&limit=6&category=land`,
    );

    const landList = await landRes.json();

    return (
      <Bystate
        // state={state}
        stateCode={stateCodeFromSlug ?? ""}
        featuredEstates={featuredEstates}
        regions={regionsData}
        landList={landList}
      />
    );
  }

  if (state && region && !suburb && !isSuburbsPage) {
    return (
      <Byregion
      // stateCode={stateCodeFromSlug}
      // region={region}
      />
    );
  }

  if (state && region && suburb && !isSuburbsPage) {
    return (
      <Suburbs
      // stateCode={stateCodeFromSlug}
      // region={region}
      // suburb={suburb}
      // postcode={postcode}
      />
    );
  }

  return <></>;
}

import State from "@/components/state/State";
import { STATE_NAMES } from "@/config";
import { getListing } from "@/lib/api/apiService";
import { parseFiltersFromUrl } from "@/lib/utils/filters/parseFiltersFromUrl";

export default async function ListingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
    type?: string;
    "sort-by"?: string;
    clickid?: string;
  }>;
}) {
  const { slug = [] } = await params;
  const { type, "sort-by": sortBy, clickid } = await searchParams;

  let stateSlug: string | undefined;
  let region: string | undefined;
  let suburb: string | undefined;

  slug.forEach((segment) => {
    if (segment.endsWith("-state")) {
      stateSlug = segment.replace("-state", "");
    }

    if (segment.endsWith("-region")) {
      region = segment.replace("-region", "");
    }

    if (segment.endsWith("-suburb")) {
      suburb = segment.replace("-suburb", "");
    }
  });

  const stateCodeFromSlug =
    STATE_NAMES.find((s) => s.slug === stateSlug)?.code ?? "";

  const { min_price, max_price, min_land_size, max_land_size } =
    parseFiltersFromUrl(slug);

  const exclusiveListing = await getListing({
    exclusive: "yes",
    limit: 1,
    state: stateCodeFromSlug ?? "",
  });

  const featuredListing = await getListing({
    featured: "yes",
    state: stateCodeFromSlug ?? "",
  });

  return (
    <State
      exclusiveListing={exclusiveListing}
      featuredListing={featuredListing}
      stateCode={stateCodeFromSlug ?? ""}
      region={region}
      suburb={suburb}
      filters={{
        min_price,
        max_price,
        min_land_size,
        max_land_size,
        type,
        sortBy,
      }}
      clickidQuery={clickid}
    />
  );
}

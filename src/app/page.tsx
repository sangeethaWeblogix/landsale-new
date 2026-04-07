import { Home } from "@/components/home/Home";
import { getBlogs, getListing, getStateCount } from "@/lib/api/apiService";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const blogs = await getBlogs();
  const stateCount = await getStateCount();
  const exclusiveListing = await getListing({
    exclusive: "yes",
    limit: 1,
  });
  const featuredListing = await getListing({
    featured: "yes",
  });

  return (
    <Home
      blogs={blogs}
      stateCount={stateCount}
      exclusiveListing={exclusiveListing}
      featuredListing={featuredListing}
    />
  );
}

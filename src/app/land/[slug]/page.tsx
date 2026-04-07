import ListingDetail from "@/components/landdetails/Landdetails";
import { SITE_URL } from "@/config";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(`${SITE_URL}/api/lfs/land-detail?slug=${slug}`);

  const result = await res.json();

  return <ListingDetail landDetail={result} />;
}

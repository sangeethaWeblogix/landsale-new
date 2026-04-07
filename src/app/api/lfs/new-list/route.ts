import { API_ENDPOINTS } from "@/config";
import { apiFetch } from "@/lib/api/fetcher";
import { LandListingResponse } from "@/types/apiTypes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const query = new URL(req.url).searchParams.toString();
    const data: LandListingResponse = await apiFetch(
      `${API_ENDPOINTS.NewListing}?${query}`,
      { method: "GET" },
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching listings:", err);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

import { API_ENDPOINTS } from "@/config";
import { apiFetch } from "@/lib/api/fetcher";
import { FilterListingResponse } from "@/types/apiTypes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const query = new URL(req.url).searchParams.toString();
    const data: FilterListingResponse = await apiFetch(
      `${API_ENDPOINTS.FilterApi}?${query}`,
      { method: "GET" },
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching filter listings:", err);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

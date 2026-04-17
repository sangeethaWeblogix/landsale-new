import { API_ENDPOINTS } from "@/config";
import { apiFetch } from "@/lib/api/fetcher";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const queryString = searchParams.toString();

    const data = await apiFetch(
      `${API_ENDPOINTS.RegionBasedSuburb}?${queryString}`,
      {
        method: "GET",
      },
    );

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

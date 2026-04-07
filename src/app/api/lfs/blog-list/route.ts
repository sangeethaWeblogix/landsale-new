import { API_ENDPOINTS } from "@/config";
import { apiFetch } from "@/lib/api/fetcher";
import { BlogListResponse } from "@/types/apiTypes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data: BlogListResponse = await apiFetch(API_ENDPOINTS.BlogList, {
      method: "GET",
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

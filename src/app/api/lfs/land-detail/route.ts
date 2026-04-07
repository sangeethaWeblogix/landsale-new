import { API_ENDPOINTS } from "@/config";
import { apiFetch } from "@/lib/api/fetcher";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug required" },
        { status: 400 },
      );
    }

    const data = await apiFetch(`${API_ENDPOINTS.LandDetail}?slug=${slug}`, {
      method: "GET",
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, data: null }, { status: 500 });
  }
}

import { API_ENDPOINTS } from "@/config";
import { apiFetch } from "@/lib/api/fetcher";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword") || "";

    if (!keyword.trim()) {
      return NextResponse.json({ success: true, data: null });
    }

    const data = await apiFetch(
      `${API_ENDPOINTS.LocSearch}?keyword=${encodeURIComponent(keyword)}`,
      { method: "GET" },
    );

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

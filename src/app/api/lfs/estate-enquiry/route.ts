 import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Body received:", body);

    const res = await fetch(
      "https://www.admin.landsales.com.au/wp-json/lfs/v1/public/estate-enquiry",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer estate_ro_7F9cQmA2XkL8pVJH4sNwRZDeYB6T0Uo`,
        },
        body: JSON.stringify(body),
      }
    );

    console.log("Statusee:", res.status);

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      console.log("JSON Response:", data);
      return NextResponse.json(data);
    } else {
      const text = await res.text();
      console.log("Text Response:", text);

      if (res.ok) {
        return NextResponse.json({ success: true, message: "Enquiry submitted successfully!" });
      } else {
        return NextResponse.json({ success: false, message: text }, { status: res.status });
      }
    }
  } catch (err: any) {
    console.error("Error:", err?.message, err?.cause);
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
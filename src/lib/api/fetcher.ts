import { API_CONFIG } from "@/config";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const fullUrl = `${API_CONFIG.API_BASE_URL}${path}`;
  console.log("Full API URL:", fullUrl); // இதை add பண்ணுங்க
  const res = await fetch(`${API_CONFIG.API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_CONFIG.API_TOKEN}`,
      ...(options.headers || {}),
    },
    next: { revalidate: 300 },
  });
  console.log("Status:", res.status); // Status பாருங்க

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await res.text();

    console.error("Error non-JSON:", text.slice(0, 300));
    throw new Error("API returned non-JSON response");
  }

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }
  return res.json();
}

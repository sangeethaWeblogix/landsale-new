"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // Route change ஆனா favicon restore
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = "/favicon.ico";
    }
  }, [pathname]);

  return null;
}
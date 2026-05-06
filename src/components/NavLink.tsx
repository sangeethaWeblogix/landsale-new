"use client";
import { useRouter } from "next/navigation";

export default function NavLink({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Tab-ல spinner set பண்ணு
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = "/spinner.gif"; // 👈 உன் public folder-ல வை
    }

    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
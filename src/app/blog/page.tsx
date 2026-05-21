import BlogPage from "@/components/blog/BlogPage";
import { getBlogs } from "@/lib/api/apiService";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & News | Land Sales",
  description:
    "Read the latest land sales news, property insights, and market updates from the Land Sales team across Australia.",
};

export default async function BlogListPage() {
  const blogs = await getBlogs();
  return <BlogPage blogs={blogs} />;
}

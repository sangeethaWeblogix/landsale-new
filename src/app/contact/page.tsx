import Contact from "@/components/contact/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Land Sales",
  description:
    "Get in touch with Land Sales. We're here to help with any enquiries about land listings across Australia.",
};

export default function ContactPage() {
  return <Contact />;
}

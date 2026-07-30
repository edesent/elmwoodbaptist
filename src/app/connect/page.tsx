import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import ConnectCardForm from "@/components/ConnectCardForm";

export const metadata: Metadata = {
  title: "Connect Card",
  description:
    "Share your contact and family information with Elmwood Baptist Church — for first-time visitors, returning visitors, and regular attendees alike.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect Card | Elmwood Baptist Church",
    description: "Let us get to know you and your family better.",
    url: "/connect",
    type: "website",
  },
};

export default function ConnectPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="We'd Love to Know You"
          title="Connect Card"
          subtitle="Thank you for being with us at Elmwood Baptist Church! We would love the opportunity to get to know you and your family better. Please share as much information as you are comfortable providing."
        />
        <section className="py-16 md:py-20 bg-cream">
          <div className="px-6">
            <ConnectCardForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

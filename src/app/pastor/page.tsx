import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "Meet Our Pastor",
  description:
    "Get to know Dr. Gary Randall, Senior Pastor of Elmwood Baptist Church in Brighton, Colorado — his family and the heart behind his ministry.",
  alternates: { canonical: "/pastor" },
  openGraph: {
    title: "Meet Our Pastor | Elmwood Baptist Church",
    description: "Get to know our pastor and the heart behind his ministry.",
    url: "/pastor",
    type: "profile",
  },
};

export default function PastorPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Our Pastor"
          title="Meet Dr. Gary Randall"
          subtitle="Husband, father, and shepherd of our church family"
        />
        <section className="py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 prose prose-lg">
            <p className="text-lg text-text-body leading-relaxed mb-6">
              Dr. Gary Randall serves as Senior Pastor of Elmwood Baptist Church. He and his
              wife, Betty, came to Elmwood in September of 2000, answering the unanimous call of
              the seventeen remaining members of the church. In the years since, the Lord has
              graciously grown that small flock into the thriving church family we are today.
            </p>
            <p className="text-text-body leading-relaxed mb-6">
              Pastor and Mrs. Randall have been married for fifty-two years and have shared
              forty-three of those years together in full-time ministry. The Lord has blessed
              them with five children. Their oldest daughter, Chassidy, and her husband, Tim,
              pastor Florence Baptist Church in Montana — a continuing testimony to a family
              given wholly to the work of the Gospel.
            </p>
            <h2 className="font-serif text-2xl font-bold text-text-dark mt-10 mb-4">
              His Heart for Ministry
            </h2>
            <p className="text-text-body leading-relaxed mb-6">
              Pastor Randall is known for his faithful, verse-by-verse preaching of the King
              James Bible and his shepherd&rsquo;s heart for the people God has entrusted to his
              care. His desire, and the desire of our entire ministry, is to see souls saved,
              believers grow, and families strengthened in the things of the Lord. At Elmwood we
              truly are more than a church — we&rsquo;re a family, and that begins with a pastor
              who loves his people.
            </p>
            <h2 className="font-serif text-2xl font-bold text-text-dark mt-10 mb-4">
              Our Pastoral Team
            </h2>
            <p className="text-text-body leading-relaxed mb-6">
              Pastor Randall is joined by a faithful team of men who serve alongside him.
              Pastor Brandon Bowser serves as Associate Pastor over our bus ministry and junior
              church, having joined the staff in 2019. Pastor Ben serves as Assistant Pastor
              over outreach and evangelism, joining the team in 2022. Pastor Rick Lopez, who has
              served at Elmwood for some thirteen years, is the Administrator of Elmwood Baptist
              Academy and oversees our youth ministry.
            </p>
            <h2 className="font-serif text-2xl font-bold text-text-dark mt-10 mb-4">
              How to Reach Him
            </h2>
            <p className="text-text-body leading-relaxed">
              Pastor Randall loves hearing from members and visitors alike. Call the church
              office at <a href="tel:+13036593818" className="text-brown-light font-semibold">(303) 659-3818</a>,
              email <a href="mailto:office@elmwoodbaptist.org" className="text-brown-light font-semibold">office@elmwoodbaptist.org</a>,
              or use the chat widget on the homepage.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

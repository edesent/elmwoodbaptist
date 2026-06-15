import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "Statement of Faith",
  description:
    "Our Statement of Faith — the historic doctrines of the Independent Baptist faith that Elmwood Baptist Church of Brighton, Colorado holds and preaches.",
  alternates: { canonical: "/statement-of-faith" },
  openGraph: {
    title: "Statement of Faith | Elmwood Baptist Church",
    description: "The doctrines we hold and preach.",
    url: "/statement-of-faith",
    type: "article",
  },
};

const articles = [
  {
    title: "The Scriptures",
    body: "We believe the King James Bible is the verbally inspired, inerrant, and preserved Word of God. It is our sole and final authority for faith and practice.",
  },
  {
    title: "The Godhead",
    body: "We believe in one God eternally existing in three Persons: Father, Son, and Holy Spirit — equal in every divine perfection.",
  },
  {
    title: "The Person and Work of Christ",
    body: "We believe Jesus Christ is fully God and fully man, conceived of the Holy Spirit, born of the Virgin Mary, who lived a sinless life, died for our sins, rose bodily from the grave, ascended to heaven, and is coming again.",
  },
  {
    title: "Salvation",
    body: "We believe salvation is by grace through faith in the Lord Jesus Christ alone — not of works — and that all who repent and believe receive eternal life and are eternally secure.",
  },
  {
    title: "The Church",
    body: "We believe the local New Testament church is a Baptist body of immersed believers, autonomous and self-governing, gathered to worship God, edify one another, and proclaim the Gospel to a lost world.",
  },
  {
    title: "Baptism and the Lord's Supper",
    body: "We believe in believer's baptism by immersion as a public testimony of one's faith in Christ, and in the Lord's Supper as a memorial of His death — both being ordinances given to the local church.",
  },
  {
    title: "Last Things",
    body: "We believe in the pre-tribulational, pre-millennial return of Christ, the bodily resurrection of the saved to everlasting life and the lost to everlasting punishment.",
  },
];

export default function StatementOfFaithPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="What We Believe"
          title="Statement of Faith"
          subtitle="The doctrines we hold and preach"
        />
        <section className="py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 space-y-10">
            {articles.map((article, i) => (
              <article key={article.title}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-2">
                  Article {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-dark mb-3 leading-snug">
                  {article.title}
                </h2>
                <p className="text-lg text-text-body leading-relaxed">{article.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

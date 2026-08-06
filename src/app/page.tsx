import Navbar from "@/components/Navbar";
import PreachingHero from "@/components/PreachingHero";
import Connect from "@/components/Connect";
import Leaders from "@/components/Leaders";
import ServiceTimes from "@/components/ServiceTimes";
import ChurchEvents from "@/components/ChurchEvents";
import ManCamp from "@/components/ManCamp";
import OldWestSunday from "@/components/OldWestSunday";
import ScriptureBanner from "@/components/ScriptureBanner";
import LatestSermon from "@/components/LatestSermon";
import Give from "@/components/Give";
import PhotoGallery from "@/components/PhotoGallery";
import MapAddress from "@/components/MapAddress";
import Footer from "@/components/Footer";

const churchSchema = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Elmwood Baptist Church",
  alternateName: "Independent Baptist Church, Brighton CO",
  url: "https://www.elmwoodbaptist.org",
  logo: "https://www.elmwoodbaptist.org/brand/logo-navy.svg",
  image: "https://www.elmwoodbaptist.org/og-image.jpg",
  slogan: "More Than A Church… We're A Family!",
  description:
    "Elmwood Baptist Church is a King James Bible, Independent Baptist church family in Brighton, Colorado. Sunday Service at 10:00 AM, Family Bible Time at 11:30 AM, and Sunday Afternoon Service at 1:30 PM.",
  telephone: "+1-303-659-3818",
  email: "office@elmwoodbaptist.org",
  address: {
    "@type": "PostalAddress",
    streetAddress: "13100 E 144th Ave",
    addressLocality: "Brighton",
    addressRegion: "CO",
    postalCode: "80601",
    addressCountry: "US",
  },
  sameAs: [
    "https://facebook.com/elmwoodbaptistbrighton",
    "https://youtube.com/@elmwoodbaptist",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "19:00",
      closes: "20:30",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
      />
      <Navbar />
      <main>
        <PreachingHero />
        <Connect />
        <Leaders />
        <ServiceTimes />
        <ChurchEvents />
        <ManCamp />
        <OldWestSunday />
        <ScriptureBanner />
        <LatestSermon />
        <Give />
        <PhotoGallery />
        <MapAddress />
      </main>
      <Footer />
    </>
  );
}

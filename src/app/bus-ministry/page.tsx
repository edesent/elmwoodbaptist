import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fredoka } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
  ArrowRightIcon,
  BusIcon,
  ChevronIcon,
  DiceIcon,
  HeartIcon,
  IdBadgeIcon,
  MailIcon,
  MedicalIcon,
  MusicIcon,
  PhoneIcon,
  PinIcon,
  ShieldCheckIcon,
  SmileIcon,
  StarIcon,
  TrophyIcon,
} from "./icons";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bus Ministry",
  description:
    "Ride the Elmwood church bus! We pick up kids and families around the city for songs, games, prizes, and new friends on the way to church. Licensed drivers, background-checked workers, and trained medical staff on site.",
  alternates: { canonical: "/bus-ministry" },
  // Keep hidden from search engines until online pickup sign-up is live and
  // the page is linked from the main site. Remove this block to launch.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Ride the Church Bus! | Elmwood Baptist Church",
    description:
      "Songs, games, prizes, and new friends on the way to church. Kids and families welcome!",
    url: "/bus-ministry",
    type: "website",
    images: [
      {
        url: "/bus-ministry/hero-on-the-bus.webp",
        width: 1774,
        height: 887,
        alt: "Illustration of kids and families clapping and singing together on the Elmwood church bus",
      },
    ],
  },
};

const PHONE_DISPLAY = "(303) 659-3818";
const PHONE_HREF = "tel:+13036593818";
const EMAIL = "office@elmwoodbaptist.org";
const EMAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Church bus pickup",
)}&body=${encodeURIComponent(
  "Hi! We'd like to ride the church bus.\n\nRider names and ages:\n\nPickup address:\n\nBest phone number:\n",
)}`;

// Display font utility (Fredoka, rounded and friendly). Written as a literal so
// Tailwind can see it.
const display = "font-[family-name:var(--font-fredoka)]";

const btn =
  "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-base font-bold transition-all sm:px-8 sm:py-4 sm:text-lg hover:-translate-y-0.5 active:translate-y-1 active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4";
const btnYellow = `${btn} ${display} bg-bus text-brown-deep shadow-[0_6px_0_var(--color-bus-dark)] focus-visible:outline-white`;
const btnNavy = `${btn} ${display} bg-brown-deep text-white shadow-[0_6px_0_#000] focus-visible:outline-brown-deep`;
const btnGhost = `${btn} ${display} border-4 border-white/80 text-white hover:bg-white/10 focus-visible:outline-white`;

const funCards = [
  {
    title: "Sing-alongs",
    text: "Belt out songs with the whole bus. Don't know the words yet? You will by the time we get to church!",
    Icon: MusicIcon,
    card: "border-coral bg-white -rotate-2",
    blob: "bg-coral text-white",
  },
  {
    title: "Games",
    text: "Fun games to play together on the way. Everybody gets a turn and everybody gets to join in.",
    Icon: DiceIcon,
    card: "border-gold bg-white rotate-1",
    blob: "bg-gold text-white",
  },
  {
    title: "New friends",
    text: "Sit with a buddy or make a brand-new one. There's room for everybody on this bus.",
    Icon: SmileIcon,
    card: "border-bus bg-white -rotate-1",
    blob: "bg-bus text-brown-deep",
  },
  {
    title: "A friendly crew",
    text: "Our bus team will be smiling and waving when you hop on. They can't wait to see you!",
    Icon: HeartIcon,
    card: "border-brown-light bg-white rotate-2",
    blob: "bg-brown-light text-white",
  },
];

const trustCards = [
  {
    title: "Licensed, safety-checked drivers",
    text: "Every one of our bus drivers is properly licensed and safety checked before they ever pick up a rider.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Background-checked workers",
    text: "All of our bus workers are background checked. The grown-ups on your child's bus are people we have vetted.",
    Icon: IdBadgeIcon,
  },
  {
    title: "Trained medical staff on site",
    text: "Our church has trained medical staff on site, so help is close by if anyone needs it.",
    Icon: MedicalIcon,
  },
];

const steps = [
  {
    title: "Tell us where to find you",
    text: "Sign up for a pickup or give us a call. We'll talk about your address and who's riding.",
    Icon: PinIcon,
  },
  {
    title: "Watch for the yellow bus",
    text: "On Sunday, our bus team stops by to pick you up. Wave hello!",
    Icon: BusIcon,
  },
  {
    title: "Sing your way to church",
    text: "Enjoy the bus program on the way, then arrive at Elmwood ready for a great day.",
    Icon: MusicIcon,
  },
];

const busNotes = [
  { left: "18%", color: "#ff6b57", delay: "0s", dx: "-110px", dy: "-80px", rot: "-24deg", size: 26 },
  { left: "42%", color: "#2bb3d6", delay: ".55s", dx: "-150px", dy: "-95px", rot: "18deg", size: 30 },
  { left: "64%", color: "#8b5cf6", delay: "1.1s", dx: "-130px", dy: "-70px", rot: "-14deg", size: 24 },
  { left: "30%", color: "#34c759", delay: "1.65s", dx: "-170px", dy: "-90px", rot: "26deg", size: 28 },
  { left: "76%", color: "#ffb300", delay: "2.2s", dx: "-120px", dy: "-100px", rot: "-30deg", size: 26 },
  { left: "52%", color: "#ec4899", delay: "2.75s", dx: "-160px", dy: "-75px", rot: "12deg", size: 24 },
];

const faqs = [
  {
    q: "Is that really a church bus, and not a school bus?",
    a: "Yes! It looks just like a school bus, but it belongs to Elmwood Baptist Church. We use it on Sundays to bring kids and families to church.",
  },
  {
    q: "Can my whole family ride?",
    a: "Absolutely. We pick up kids and families, so come along with your children if you'd like to ride together.",
  },
  {
    q: "Who is on the bus with my child?",
    a: "Our drivers are licensed and safety checked, and all of our bus workers are background checked. They are friendly grown-ups who love kids.",
  },
  {
    q: "What if my child gets hurt or isn't feeling well?",
    a: "Our church has trained medical staff on site, so there is always someone ready to help.",
  },
  {
    q: "Does the bus come to my neighborhood?",
    a: "We pick up all around the city. Call or email us with your address and we'll let you know how we can get you on the bus.",
  },
];

function Wave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute -bottom-px left-0 h-8 w-full fill-current md:h-14 ${className}`}
    >
      <path d="M0 28C180 68 360 0 600 24s420 44 600 8c100-20 180-24 240-14v42H0Z" />
    </svg>
  );
}

function Eyebrow({
  children,
  className = "bg-white text-gold-dark",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-[0.16em] ${className}`}
    >
      {children}
    </p>
  );
}

export default function BusMinistryPage() {
  return (
    <div className={fredoka.variable}>
      <Navbar />
      <main>
        {/* ───────── Hero ───────── */}
        <section
          aria-labelledby="hero-title"
          className="relative isolate flex flex-col overflow-hidden bg-brown-deep text-white lg:block lg:min-h-[44rem] xl:min-h-[48rem]"
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-28 lg:pb-48 lg:pt-44">
            <div className="max-w-xl">
              <p
                className={`${display} inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] backdrop-blur`}
              >
                <BusIcon className="h-5 w-auto" />
                Elmwood Bus Ministry
              </p>
              <h1
                id="hero-title"
                className={`${display} mt-5 text-5xl font-bold leading-[1.02] drop-shadow-[0_4px_0_rgba(0,0,0,.25)] sm:text-6xl lg:text-7xl`}
              >
                Hop on the <span className="text-bus">Church Bus!</span>
              </h1>
              <p className="mt-6 max-w-md text-xl leading-relaxed text-white/95">
                Yes, that big yellow bus! It&rsquo;s headed to church with
                songs, games, prizes, and a seat saved just for you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#ride" className={btnYellow}>
                  Save my seat
                  <ArrowRightIcon className="h-5 w-5" />
                </a>
                <a href="#on-the-bus" className={btnGhost}>
                  Peek inside
                </a>
              </div>
              <p className="mt-6 text-base text-white/80">
                Kids &amp; families welcome &middot; Pickups all around the city
              </p>
            </div>
          </div>

          <div className="relative order-last aspect-[2/1] w-full lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
            <Image
              src="/bus-ministry/hero-on-the-bus.webp"
              alt="Illustration of kids, families, and our friendly bus driver clapping and singing together on the Elmwood church bus"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-brown-deep to-transparent lg:hidden" />
            <div className="absolute inset-0 hidden bg-gradient-to-r from-brown-deep via-brown-deep/70 to-transparent lg:block lg:w-3/5" />
            <div className="absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-t from-brown-deep/50 to-transparent lg:block" />
          </div>
          <Wave className="z-10 text-sky-soft" />
        </section>

        {/* ───────── Spotted the bus? ───────── */}
        <section
          aria-labelledby="spotted-title"
          className="relative bg-sky-soft px-6 pb-28 pt-16 md:pb-36 md:pt-20"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <AnimateOnScroll>
              <div className="relative mx-4 lg:mx-0">
                <div className="relative aspect-[3/2] -rotate-2 overflow-hidden rounded-[2rem] border-[10px] border-white shadow-[0_18px_40px_-12px_rgba(11,39,64,.35)]">
                  <Image
                    src="/bus-ministry/hero-adventure.webp"
                    alt="Illustration of children with backpacks and their parents happily lining up to board our yellow church bus"
                    fill
                    sizes="(min-width: 1024px) 560px, 90vw"
                    className="object-cover object-[80%_center]"
                  />
                </div>
                <div
                  className={`${display} absolute -bottom-6 -right-1 rotate-3 rounded-2xl border-4 border-brown-deep bg-bus px-5 py-3 text-brown-deep shadow-[0_6px_0_rgba(11,39,64,.3)] md:-right-6`}
                >
                  <p className="text-sm font-semibold uppercase tracking-wider">
                    <s className="decoration-coral decoration-4">School bus</s>
                  </p>
                  <p className="text-3xl font-bold leading-none">Church bus!</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150}>
              <Eyebrow>Did you see us?</Eyebrow>
              <h2
                id="spotted-title"
                className={`${display} mt-4 text-4xl font-bold leading-tight text-brown-deep md:text-5xl`}
              >
                Yep, that yellow bus is ours!
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-text-dark">
                If you&rsquo;ve seen a big yellow bus rolling through the
                neighborhood on Sunday, you&rsquo;re right &mdash; it looks
                just like a school bus. But it&rsquo;s not!
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                It&rsquo;s the Elmwood church bus, and it&rsquo;s out picking
                up kids and families to bring them to church. Maybe next
                Sunday, it&rsquo;ll be picking up <em>you</em>.
              </p>
              <a
                href="#safety"
                className={`${display} mt-6 inline-flex items-center gap-2 text-lg font-semibold text-brown-light underline decoration-2 underline-offset-4 hover:text-brown-deep`}
              >
                Parents: see how we keep riders safe
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </AnimateOnScroll>
          </div>
          <Wave className="text-bus-soft" />
        </section>

        {/* ───────── On the bus ───────── */}
        <section
          id="on-the-bus"
          aria-labelledby="bus-title"
          className="relative bg-bus-soft px-6 pb-28 pt-16 md:pb-36 md:pt-20"
        >
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll className="mx-auto max-w-2xl text-center">
              <Eyebrow>The bus program</Eyebrow>
              <h2
                className={`${display} mt-4 text-4xl font-bold leading-tight text-brown-deep md:text-5xl`}
                id="bus-title"
              >
                The fun starts the second you sit down!
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-text-dark">
                Every ride comes with its own bus program. No boring rides
                here &mdash; we sing, we play, we laugh, and we show up to
                church with big smiles.
              </p>
            </AnimateOnScroll>

            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {funCards.map(({ title, text, Icon, card, blob }, i) => (
                <li key={title}>
                  <AnimateOnScroll delay={i * 100} className="h-full">
                    <div
                      className={`h-full rounded-[1.75rem] border-4 p-7 shadow-[0_10px_0_rgba(11,39,64,.08)] transition-transform hover:rotate-0 hover:-translate-y-1 ${card}`}
                    >
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${blob}`}
                      >
                        <Icon className="h-9 w-9" />
                      </span>
                      <h3
                        className={`${display} mt-5 text-2xl font-bold text-brown-deep`}
                      >
                        {title}
                      </h3>
                      <p className="mt-2 text-lg leading-relaxed">{text}</p>
                    </div>
                  </AnimateOnScroll>
                </li>
              ))}
            </ul>
          </div>
          <Wave className="text-brown-deep" />
        </section>

        {/* ───────── Prizes & outings ───────── */}
        <section
          aria-labelledby="prizes-title"
          className="relative overflow-hidden bg-brown-deep px-6 pb-28 pt-16 text-white md:pb-36 md:pt-20"
        >
          <StarIcon className="absolute left-[6%] top-14 h-10 w-10 text-bus motion-safe:animate-[bob_4s_ease-in-out_infinite] [--bob-rotate:-12deg]" />
          <StarIcon className="absolute right-[8%] top-24 h-14 w-14 text-coral motion-safe:animate-[bob_5s_ease-in-out_infinite_.8s] [--bob-rotate:14deg]" />
          <StarIcon className="absolute bottom-40 left-[10%] hidden h-8 w-8 text-gold-light md:block motion-safe:animate-[bob_4.5s_ease-in-out_infinite_.4s]" />
          <StarIcon className="absolute bottom-36 right-[12%] hidden h-9 w-9 text-bus md:block motion-safe:animate-[bob_5.5s_ease-in-out_infinite_1.2s] [--bob-rotate:8deg]" />

          <div className="relative mx-auto max-w-5xl">
            <AnimateOnScroll className="mx-auto max-w-2xl text-center">
              <Eyebrow className="bg-bus text-brown-deep">Even more fun</Eyebrow>
              <h2
                id="prizes-title"
                className={`${display} mt-4 text-4xl font-bold leading-tight md:text-6xl`}
              >
                Win prizes. Go places.{" "}
                <span className="text-bus">Make memories!</span>
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-white/90">
                The bus doesn&rsquo;t just go to church. It goes on adventures,
                too.
              </p>
            </AnimateOnScroll>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Bus promotions",
                  text: "Riders can join in on special promotions for the chance to win awesome prizes. Hop on, play along, and see what you can win!",
                  Icon: TrophyIcon,
                  tilt: "md:-rotate-1",
                  color: "bg-bus text-brown-deep",
                },
                {
                  title: "Bus outings",
                  text: "Every so often, the bus takes us out for special activities. The good times don't stop when church is over!",
                  Icon: PinIcon,
                  tilt: "md:rotate-1",
                  color: "bg-coral text-white",
                },
              ].map(({ title, text, Icon, tilt, color }, i) => (
                <AnimateOnScroll key={title} delay={i * 150}>
                  <div
                    className={`relative rounded-[2rem] border-4 border-dashed border-white/50 bg-brown/80 p-8 md:p-10 ${tilt}`}
                  >
                    <span
                      className={`flex h-20 w-20 items-center justify-center rounded-full ${color} shadow-[0_6px_0_rgba(0,0,0,.3)]`}
                    >
                      <Icon className="h-11 w-11" />
                    </span>
                    <h3 className={`${display} mt-6 text-3xl font-bold`}>
                      {title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-white/90">
                      {text}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <p
              className={`${display} mt-12 text-center text-xl font-semibold text-bus`}
            >
              Ask our bus team what&rsquo;s coming up next!
            </p>
          </div>
          <Wave className="text-warm-white" />
        </section>

        {/* ───────── Parents / safety ───────── */}
        <section
          id="safety"
          aria-labelledby="safety-title"
          className="relative bg-warm-white px-6 pb-28 pt-16 md:pb-36 md:pt-20"
        >
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll className="mx-auto max-w-2xl text-center">
              <Eyebrow className="bg-sky-soft text-gold-dark">
                For parents &amp; families
              </Eyebrow>
              <h2
                id="safety-title"
                className={`${display} mt-4 text-4xl font-bold leading-tight text-brown-deep md:text-5xl`}
              >
                Fun for the kids. Peace of mind for you.
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-text-dark">
                We know you&rsquo;re trusting us with someone precious. Here is
                how we take care of every rider.
              </p>
            </AnimateOnScroll>

            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {trustCards.map(({ title, text, Icon }, i) => (
                <li key={title}>
                  <AnimateOnScroll delay={i * 100} className="h-full">
                    <div className="h-full rounded-3xl bg-sky-soft p-8">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brown-deep text-bus">
                        <Icon className="h-9 w-9" />
                      </span>
                      <h3
                        className={`${display} mt-5 text-2xl font-bold leading-snug text-brown-deep`}
                      >
                        {title}
                      </h3>
                      <p className="mt-2 text-lg leading-relaxed">{text}</p>
                    </div>
                  </AnimateOnScroll>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center text-lg">
              Want to meet us first?{" "}
              <Link
                href="/visit-us"
                className="font-bold text-brown-light underline decoration-2 underline-offset-4 hover:text-brown-deep"
              >
                Plan a visit to Elmwood
              </Link>
              .
            </p>
          </div>
          <Wave className="text-sky-soft" />
        </section>

        {/* ───────── How it works ───────── */}
        <section
          aria-labelledby="steps-title"
          className="relative bg-sky-soft px-6 pb-28 pt-16 md:pb-36 md:pt-20"
        >
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll className="mx-auto max-w-2xl text-center">
              <Eyebrow>How it works</Eyebrow>
              <h2
                id="steps-title"
                className={`${display} mt-4 text-4xl font-bold leading-tight text-brown-deep md:text-5xl`}
              >
                Getting on the bus is easy!
              </h2>
            </AnimateOnScroll>

            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map(({ title, text, Icon }, i) => (
                <li key={title}>
                  <AnimateOnScroll delay={i * 120} className="h-full">
                    <div className="relative h-full rounded-3xl bg-white p-8 pt-12 text-center shadow-[0_10px_0_rgba(11,39,64,.08)]">
                      <span
                        className={`${display} absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-coral text-3xl font-bold text-white shadow-[0_5px_0_rgba(0,0,0,.2)]`}
                      >
                        {i + 1}
                      </span>
                      <Icon className="mx-auto h-14 w-auto text-gold-dark" />
                      <h3
                        className={`${display} mt-4 text-2xl font-bold text-brown-deep`}
                      >
                        {title}
                      </h3>
                      <p className="mt-2 text-lg leading-relaxed">{text}</p>
                    </div>
                  </AnimateOnScroll>
                </li>
              ))}
            </ol>
          </div>
          <Wave className="text-bus" />
        </section>

        {/* ───────── Register ───────── */}
        <section
          id="ride"
          aria-labelledby="ride-title"
          className="relative scroll-mt-16 bg-bus px-6 pb-28 pt-16 md:pb-36 md:pt-20"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll>
              <Eyebrow className="bg-brown-deep text-white">
                Pickup sign-up
              </Eyebrow>
              <h2
                id="ride-title"
                className={`${display} mt-4 text-5xl font-bold leading-[1.05] text-brown-deep md:text-6xl`}
              >
                Save a seat on the bus!
              </h2>
              <p className="mt-5 max-w-lg text-xl leading-relaxed text-brown-deep">
                Online pickup sign-up is coming soon. Until then, getting on
                the list is simple &mdash; just call or email our church
                office and we&rsquo;ll take it from there.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150}>
              {/*
                Future home of the pickup registration form. When it's ready,
                replace the "coming soon" notice and the contact buttons below
                with the form (the "have these handy" list is the field list).
              */}
              <div
                id="pickup-registration"
                className="relative rounded-[2rem] border-4 border-brown-deep bg-white p-8 shadow-[0_10px_0_rgba(11,39,64,.35)] md:p-10"
              >
                <span
                  className={`${display} absolute -top-5 right-6 rotate-3 rounded-full bg-coral px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_4px_0_rgba(0,0,0,.2)]`}
                >
                  Online sign-up coming soon
                </span>
                <h3
                  className={`${display} text-2xl font-bold text-brown-deep`}
                >
                  Have these handy when you reach out:
                </h3>
                <ul className="mt-4 space-y-3 text-lg">
                  {[
                    "Names and ages of everyone riding",
                    "Your pickup address",
                    "The best phone number to reach you",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bus text-brown-deep">
                        <StarIcon className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={PHONE_HREF} className={`${btnNavy} whitespace-nowrap`}>
                    <PhoneIcon className="h-5 w-5" />
                    Call {PHONE_DISPLAY}
                  </a>
                  <a
                    href={EMAIL_HREF}
                    className={`${btn} ${display} border-4 border-brown-deep text-brown-deep hover:bg-brown-deep/5 focus-visible:outline-brown-deep`}
                  >
                    <MailIcon className="h-5 w-5" />
                    Email us
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
          <Wave className="text-warm-white" />
        </section>

        {/* ───────── FAQ ───────── */}
        <section
          aria-labelledby="faq-title"
          className="bg-warm-white px-6 pb-20 pt-16 md:pt-20"
        >
          <div className="mx-auto max-w-3xl">
            <AnimateOnScroll className="text-center">
              <Eyebrow className="bg-sky-soft text-gold-dark">
                Good questions
              </Eyebrow>
              <h2
                id="faq-title"
                className={`${display} mt-4 text-4xl font-bold leading-tight text-brown-deep md:text-5xl`}
              >
                Parents, we&rsquo;ve got answers!
              </h2>
            </AnimateOnScroll>

            <div className="mt-10 space-y-4">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-2xl border-2 border-cream-dark bg-white open:border-bus open:shadow-[0_6px_0_var(--color-bus)]"
                >
                  <summary
                    className={`${display} flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-xl font-semibold text-brown-deep marker:hidden focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden`}
                  >
                    {q}
                    <ChevronIcon className="h-6 w-6 shrink-0 text-gold-dark transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-lg leading-relaxed">{a}</p>
                </details>
              ))}
            </div>

            <p
              className={`${display} mt-12 text-center text-3xl font-bold text-brown-deep`}
            >
              See you on the bus!
            </p>
          </div>
        </section>

        {/* ───────── Road ───────── */}
        <div
          id="tmp-road"
          aria-hidden="true"
          className="relative h-44 overflow-hidden bg-warm-white"
        >
          <div className="absolute inset-x-0 bottom-0 h-10 bg-[#26394b]">
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[linear-gradient(90deg,#ffc61a_50%,transparent_50%)] bg-[length:64px_100%] motion-safe:animate-[road-dashes_1.2s_linear_infinite]" />
          </div>
          <div className="absolute bottom-6 left-0 w-28 motion-safe:animate-[drive_18s_linear_infinite] motion-reduce:left-[40%]">
            <BusIcon className="w-full" />
            {/* Music notes pop out of the windows, drift up, and are left
                behind (they slide backward relative to the moving bus). */}
            {busNotes.map(({ left, color, delay, dx, dy, rot, size }, i) => (
              <MusicIcon
                key={i}
                className="absolute top-2 opacity-0 motion-reduce:hidden motion-safe:animate-[note-float_3.2s_ease-out_infinite_backwards]"
                style={
                  {
                    left,
                    color,
                    width: size,
                    height: size,
                    animationDelay: delay,
                    "--dx": dx,
                    "--dy": dy,
                    "--rot": rot,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

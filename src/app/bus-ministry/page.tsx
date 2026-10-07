import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Bus Ministry",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  description: "Hop aboard with Elmwood Baptist Church! Our bus ministry brings kids and families to church with songs, friendship, special activities, and plenty of fun.",
  alternates: { canonical: "/bus-ministry" },
  openGraph: {
    title: "Hop Aboard! | Elmwood Baptist Church Bus Ministry",
    description: "A ride to church. A bus full of friends. A place for your family.",
    url: "/bus-ministry",
    type: "website",
    images: [{ url: "/bus-ministry/hero-on-the-bus.webp", alt: "Illustrated children and families singing and having fun inside the bus" }],
  },
};

const adventures = [
  { number: "01", title: "Sing all the way!", text: "The fun starts before we get to church. Join in the songs, share a laugh, and make friends along the way.", color: "peach", icon: "♫" },
  { number: "02", title: "Find your people.", text: "Come to church, learn about Jesus, and find a church family that is excited to get to know you.", color: "mint", icon: "♡" },
  { number: "03", title: "Bring on the fun!", text: "Special activities, fun promotions, and chances to earn prizes give our riders something extra to smile about.", color: "yellow", icon: "★" },
];

export default function BusMinistryPage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroBackdrop} aria-hidden="true" />
          <Link href="/" className={styles.homeLink}><span aria-hidden="true">←</span> Elmwood Baptist Church</Link>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>ELMWOOD BUS MINISTRY</p>
            <h1>Ride The<br />Sunday <s>School</s><br /><span className={styles.churchWord}>Church</span><br />Bus</h1>
            <p className={styles.intro}>Big smiles. Loud songs. New friends.<br />And a church family ready to welcome yours.</p>
            <div className={styles.heroActions}>
              <a href="#ride" className={styles.primary}>Let&apos;s ride! <span aria-hidden="true">↗</span></a>
              <a href="#aboard-title" className={styles.heroLink}>See what&apos;s ahead <span aria-hidden="true">↓</span></a>
            </div>
            <p className={styles.small}>Picking up kids &amp; families for church around our city.</p>
          </div>
          <div className={styles.heroBadge}><span aria-hidden="true">✦</span> There&apos;s a place<br />for you here.</div>
          <div className={styles.heroBottom}><span>YOUR SUNDAY STARTS HERE</span><a href="#aboard-title" aria-label="Explore the bus ministry">↓</a><span>COME AS YOU ARE. COME ALONG.</span></div>
        </section>

        <div className={styles.ribbon}><span>TURN UP THE SONGS</span><span aria-hidden="true">✦</span><span>BRING ON THE FRIENDS</span><span aria-hidden="true">✦</span><span>LET THE ADVENTURE BEGIN</span></div>

        <section className={styles.section} aria-labelledby="aboard-title">
          <p className={styles.eyebrow}>The ride is just the beginning</p>
          <h2 id="aboard-title">Way more than a ride.</h2>
          <p className={styles.sectionIntro}>More than a way to get to church — it&apos;s a chance to connect, belong, and have fun together.</p>
          <div className={styles.cards}>
            {adventures.map((item) => (
              <article key={item.number} className={`${styles.card} ${styles[item.color]}`}>
                <div className={styles.cardTop}><span>{item.number}</span><span className={styles.symbol} aria-hidden="true">{item.icon}</span></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.activity} aria-labelledby="activity-title">
          <div className={styles.activityInner}>
            <div className={styles.prizeArt} aria-hidden="true">
              <div className={styles.prizeOrbit} />
              <span className={styles.prizeStar}>✦</span>
              <span className={styles.prizeLabel}>OUTINGS · PROMOTIONS · PRIZES</span>
              <strong>Oh, yeah.<br /><em>There&apos;s more.</em></strong>
              <span className={styles.prizeTicket}>GOOD TIMES AHEAD ↗</span>
            </div>
            <div>
              <p className={styles.eyebrow}>Little moments. Big memories.</p>
              <h2 id="activity-title">Big fun. Bigger memories.</h2>
              <p>We also take the bus out for activities! From special outings to fun promotions, there are more ways to spend time together beyond the ride to church.</p>
              <p>Kids can join in special challenges, earn prizes, and enjoy fun things along the way. Ask our team what&apos;s coming up!</p>
              <a href="#ride" className={styles.textLink}>Come be part of the fun <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className={styles.safety} aria-labelledby="safety-title">
          <div className={styles.section}>
            <p className={styles.eyebrow}>Care for your family, every step of the way</p>
            <h2 id="safety-title">Big smiles.<br />Thoughtful care.</h2>
            <p className={styles.sectionIntro}>We want you to feel comfortable sending your kids or coming along as a family. Here&apos;s how our team prepares to welcome you.</p>
            <div className={styles.safetyGrid}>
              <article>
                <span className={styles.safetyIcon} aria-hidden="true">✓</span>
                <h3>Licensed &amp; safety-tested drivers</h3>
                <p>Our bus drivers are fully licensed and safety tested.</p>
              </article>
              <article>
                <span className={styles.safetyIcon} aria-hidden="true">✓</span>
                <h3>Background-checked workers</h3>
                <p>All of our bus ministry workers are background checked.</p>
              </article>
              <article>
                <span className={styles.safetyIcon} aria-hidden="true">+</span>
                <h3>Trained medical staff</h3>
                <p>We have trained medical staff at the church.</p>
              </article>
            </div>
            <a href="tel:+13036593818" className={styles.textLink}>Questions about your child&apos;s care? Talk with our team <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section id="ride" className={`${styles.section} ${styles.ride}`} aria-labelledby="ride-title">
          <div>
            <p className={styles.eyebrow}>Your next stop</p>
            <h2 id="ride-title">Let&apos;s get your family on board.</h2>
            <p className={styles.sectionIntro}>Interested in riding? We&apos;d love to hear from you. Our team can talk with you about pickup availability and help you plan your first ride.</p>
            <ol className={styles.steps}>
              <li><span>1</span><div><h3>Say hello.</h3><p>Let our church team know your family would like to ride.</p></div></li>
              <li><span>2</span><div><h3>Plan your pickup.</h3><p>Talk with us about your location and the details for your ride.</p></div></li>
              <li><span>3</span><div><h3>Hop aboard!</h3><p>Come ready for songs, smiles, and a day at church together.</p></div></li>
            </ol>
          </div>
          <div className={styles.registration}>
            <span className={styles.comingSoon}>Coming soon</span>
            <h3>Your adventure starts here.</h3>
            <p>Online ride registration is on its way! Soon, you&apos;ll be able to tell us about your family and request a ride right here.</p>
            {/* Reserved for the future bus ride registration form. */}
            <div className={styles.formSpace} aria-label="Future ride registration form">
              <span aria-hidden="true">✉</span>
              <strong>A spot for your family.</strong>
              <span>Ride registration form coming soon</span>
            </div>
            <p>Want to ride before then? Call our church office and ask about the bus ministry.</p>
            <a href="tel:+13036593818" className={styles.primary}>Call (303) 659-3818</a>
            <p className={styles.contactNote}>Prefer to write? <a href="mailto:office@elmwoodbaptist.org">Email our team</a></p>
          </div>
        </section>

        <section className={styles.questions} aria-labelledby="questions-title">
          <div className={styles.section}>
            <p className={styles.eyebrow}>For parents &amp; families</p>
            <h2 id="questions-title">Parents, we&apos;ve got you.</h2>
            <div className={styles.faqs}>
              <details><summary>Can our family ride together?</summary><p>Kids and families are welcome! Contact our team to talk about who will be riding and arrange the details for your family.</p></details>
              <details><summary>Does the bus pick up near me?</summary><p>Our bus ministry picks up around our city. Call the church office with your location so our team can discuss pickup availability.</p></details>
              <details><summary>What time will we be picked up?</summary><p>Our team will talk through pickup details with you when you arrange your ride. Contact us before your first visit so we can help you plan.</p></details>
              <details><summary>How do we find out about activities and prizes?</summary><p>Ask the bus ministry team about upcoming outings, special promotions, and how to participate. We&apos;d love to tell you what&apos;s coming next!</p></details>
            </div>
            <Link href="/visit-us" className={styles.textLink}>Get to know Elmwood Baptist Church <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
    </>
  );
}

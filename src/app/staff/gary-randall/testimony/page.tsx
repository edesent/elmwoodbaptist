import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "Pastor Randall's Testimony",
  description:
    "The personal testimony of Dr. Gary Randall, Senior Pastor of Elmwood Baptist Church in Brighton, Colorado.",
  alternates: { canonical: "/staff/gary-randall/testimony" },
  openGraph: {
    title: "Pastor Randall's Testimony | Elmwood Baptist Church",
    description: "The personal testimony of Dr. Gary Randall, Senior Pastor of Elmwood Baptist Church.",
    url: "/staff/gary-randall/testimony",
    type: "article",
  },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-dark mt-14 mb-5 first:mt-0">
      {children}
    </h2>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-4 border-gold-dark pl-6 md:pl-8 py-1 font-serif italic text-2xl md:text-3xl text-brown-light leading-snug">
      {children}
    </blockquote>
  );
}

export default function GaryRandallTestimonyPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Senior Pastor"
          title="The Personal Testimony"
          subtitle="of Pastor Gary Randall"
        />

        <section className="py-20 md:py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6">
            {/* Lead photo */}
            <figure className="mb-14 rounded-2xl overflow-hidden shadow-xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/staff/pastor-gary-randall-pulpit-upscale.jpg"
                alt="Pastor Gary Randall preaching from the pulpit at Elmwood Baptist Church"
                className="w-full h-auto rounded-lg"
              />
            </figure>

            <div className="text-lg text-text-body leading-relaxed space-y-6">
              <SectionHeading>Growing Up Fast</SectionHeading>

              <p>
                Born February 24, 1955 in Great Fails Montana to Harold and Ruth Randall. At the
                age of two my parents divorced and I along with my 3 older sisters were then
                raised by my Father.
              </p>
              <p>
                During my early years my Father took us to the Methodist Church were he was quite
                active as a Sunday School Teacher, but we stopped going and I began to run the
                streets getting into trouble. My Father thought that the solution was to get me
                involved playing music. As a result I started my first Rock Band.
              </p>
              <p>
                At this time I met Betty Louise Hovland, who would on April 1, 1972 become my
                wife.
              </p>

              <SectionHeading>Captured by Drugs</SectionHeading>

              <p>
                The lead guitar player in the band introduced me to drugs. From that point on the
                thrill and excitement of drug use captivated me and I began using everyday. It
                wasn&rsquo;t long before I was freebasing heroin, and using many other drugs to
                stay high.
              </p>
              <p>
                I made money playing with various Rock bands, and selling drugs for a drug family,
                but in June of 1976 I was arrested and jailed with the drummer in the band on
                charges of illegal possession of dangerous drugs, and given a 3 year deferred
                prison sentence. As a result the band broke up.
              </p>
              <p>
                Needing to support my family, I found work on the railroad as a spiker. But in the
                spring of 1977 I was injured while working on the railroad and landed in the
                hospital. I had no idea at the time that this injury would be what God used to get
                my attention and change the course of my life and my forever!
              </p>

              {/* Mugshot photo */}
              <figure className="my-10 max-w-xs mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/staff/randall-mugshot.jpg"
                  alt="Gary Randall's booking photo from his 1976 arrest"
                  className="w-full h-auto rounded-lg shadow-lg border border-cream-dark"
                />
                <figcaption className="text-center text-sm text-text-light mt-3">
                  Gary&rsquo;s booking photo, June 1976 — a year before God got his attention.
                </figcaption>
              </figure>

              <SectionHeading>The Room That Changed Everything</SectionHeading>

              <p>
                On the morning of June 30th while in traction in the hospital an CNA named Vernice
                Sanders walked into my room. Vernice was a Christian and a member of Fairview
                Baptist Church, and was concerned about me, because as she said later &ldquo;he
                looked scared, and was as white as a sheet.&rdquo;
              </p>
              <p>
                She had no idea that I had just woke up from a terrible nightmare that I had died
                and a voice inside telling me that this was it, no more chances! I thought I had
                lost my mind&hellip;I was terrified.
              </p>
              <p>
                Vernice left my room and went down the hall where she spoke to Pastor Marc
                Elledge, the Visitation Pastor for Fairview Baptist Church, and asked if he would
                go down to talk to the troubled young man in room 324.
              </p>
              <p>
                Pastor Marc came into my room and I thought he was a police detective ... The drug
                life made me so paranoid that I trusted no one. He introduced himself as a pastor
                ... even worse! I am amazed even to this day that I didn&rsquo;t kick him out of my
                hospital room.
              </p>
              <p>
                I told him about my dream of dying at which point he asked if I knew for sure I
                would go to heaven. I didn&rsquo;t know. He then asked &ldquo;If I could see in the
                Bible how to know I could go to heaven, would I believe the Bible?&rdquo; I
                didn&rsquo;t believe any preacher or church, but I said I would believe the Bible.
              </p>

              <PullQuote>
                &ldquo;If I could see in the Bible how to know I could go to heaven, would I
                believe the Bible?&rdquo;
              </PullQuote>

              <p>
                In the Bible he began to show me how that God loved me, Jesus died for me, and
                that HE would save me if I would just turn to the Lord and accept HIM as my
                Savior.
              </p>
              <p>
                I was 22 years old and grew up in a &ldquo;Religious&rdquo; home, but I had never
                heard that God loved me so much that He sent His Son Jesus to die for me, so with
                tears streaming down my cheeks I asked the Lord to forgive my sins and be my
                Savior and Lord! I was wonderfully saved June 30th 1977!
              </p>

              <SectionHeading>A New Life, A New Family</SectionHeading>

              <p>
                Two weeks following my release from the hospital my wife Betty prayed and asked
                the Lord to save her, however she later said,{" "}
                <span className="italic font-bold">
                  &ldquo;I prayed because I was scarred of Gary&hellip; not because I really wanted
                  to be saved&rdquo;
                </span>
              </p>
              <p>
                Pastor Marc discipled me every week, and it was during this time that my life
                began to dramatically change. God miraculously delivered me from drugs and
                alcohol, I was truly free for the first time in many years.
              </p>
              <p>
                We started attending Fairview Baptist Church, but the way I looked, I wondered how
                people would react to me. I was shocked ... the people loved us, and made us feel
                welcome. Later on November 22, 1978, Pastor Richard A. Dion baptized me on my
                profession of faith in Christ.
              </p>
              <p>
                Six years later Betty came to me in tears and told me that she had been under
                conviction for a long time that she was not saved. We both got on our knees that
                day in May 1983 and Betty turned to the Lord Jesus Christ and received HIM as her
                savior!
              </p>
              <p>
                What joy to watch Pastor Dion baptize Betty on her genuine profession of faith the
                very next Sunday at Fairview Baptist Church. Betty has a marvelous testimony of
                God&rsquo;s grace to share, and has been the greatest helpmeet that God could have
                ever given to me, and is indeed a sweet, godly lady.
              </p>
              <p>
                The following year I also had the privilege of praying with my daughter Chassidy,
                and she asked Christ to save her at the age of eleven. Chassidy today is a
                Pastor&rsquo;s wife, and Mother of five children and Grandmother of 17. She is a
                godly lady, and the apple of her Mom and Dad&rsquo;s eye.
              </p>

              <SectionHeading>Serving and Learning</SectionHeading>

              <p>
                From my earliest Christian memories God really put on my heart to help young
                people, and so Betty and I began to work in the Youth Ministry at Fairview, and God
                was able to use us in the lives of the young people.
              </p>
              <p>
                Pastor Marc began to take me out with him every week teaching me how to talk to
                others about Christ. I also began to drive a Sunday School Bus, later becoming the
                Bus Captain of that route and also the new sixth grade Sunday School Teacher at
                Fairview Baptist.
              </p>
              <p>
                In 1981 Pastor Dion was led of the Lord to start Mountain States Baptist College.
                At the time I was a heavy equipment operator for a local Construction Company, but
                had just re-injured my old railroad injury and was trying to heal up, (one year
                later I had to have a spinal fusion).
              </p>
              <p>
                Once again God used an injury to shape and direct my life. After much prayer and
                personal internal struggle, I surrendered to the Lord&rsquo;s leading and enrolled
                in the first semester of Mountain States Baptist College not really knowing why
                God wanted me in Bible College!
              </p>
              <p>
                During that semester God showed me in{" "}
                <span className="italic" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Romans 10:14-15
                </span>{" "}
                that He wanted me to be a Gospel Preacher. I surrendered to that call and God
                confirmed it by opening doors for me to preach His Word immediately! By the time I
                graduated from Bible College, I had preached His Word in over 250 services!
              </p>

              <SectionHeading>Years of Preparation and Trial</SectionHeading>

              <p>
                In the years 1984 and 1985 I had the joy of being the interim Pastor at Calvary
                Baptist Church of Havre Montana, and also Heritage Baptist Church of Columbia Falls
                Montana (later became Gospel Light Baptist of Kalispell, MT).
              </p>
              <p>
                We traveled hundreds of miles across Montana nearly every Lord&rsquo;s Day to go
                and preach God&rsquo;s Word in these needy young and struggling churches. This was
                a great time of seeing the Lord work in hearts and lives.
              </p>
              <p>
                These years were also a time of great trial for Betty and I. We had three babies
                die in Betty&rsquo;s womb in the fourth and fifth month of pregnancy, and our
                second daughter Charith Jean was still born at six months on May 22nd 1986.
              </p>
              <p>
                As devastating as this time was for us, we know that we have four beautiful
                children in Heaven, and God&rsquo;s grace was indeed sufficient to get us through.
                God has used this time in our lives to be a strength and encouragement to others
                that have struggled in the same areas.
              </p>
              <p>
                The Lord in His great love and goodness has blessed our son-in-law and first born
                daughter Chassidy with a large family, and has given to Betty and I five beautiful
                grandchildren and 17 Great grandchildren. Our fourth grandchild is named
                &ldquo;Charith.&rdquo;
              </p>

              <SectionHeading>Ordained and Sent Out</SectionHeading>

              <p>
                After graduating in the first graduation class of Mountain States Baptist College
                (a miracle considering I was a High School dropout and had to get a G.E.D just to
                start college) Fairview Baptist Church ordained me to the Gospel Preaching
                Ministry.
              </p>
              <p>
                All through college I truly believed that God wanted me to prepare to be an
                Evangelist, but was counseled to work on a Church Staff with a Pastor to get some
                experience, and so I began to pray that God would provide me an opportunity. In a
                short time Pastor Dion approached me about remaining at Fairview Baptist as the new
                Youth Pastor. I accepted.
              </p>
              <p>
                I served as the Youth Pastor at Fairview from 1985 to 1987. This time was
                wonderfully blessed of God as we saw the Youth Ministry grow both numerically and
                spiritually, and in the first eighteen months these on fire teenagers won over four
                hundred and fifty precious souls to Christ!
              </p>
              <p>
                In the midst of all this excitement, it came as a real shock when the Lord revealed
                His desire to call us to another Ministry. Pastor James Nolan and the Bible Baptist
                Church of Puyallup Washington asked me to pray about coming to be their new
                Associate Pastor. After much prayer I felt it was indeed God&rsquo;s will for us,
                and so I accepted that call to come.
              </p>
              <p>
                God used Betty and I to reorganized and build up the Youth Ministry and start the
                Saturday Teen Soul winning program. We also helped start their first Bus Ministry.
              </p>
              <p>
                What a wonderful ministry in Washington, however I still believed that God wanted
                me in Evangelism. So after a year and a half of ministry there I resigned and moved
                back to Great Falls to begin the work of an Evangelist under the ministry of
                Fairview Baptist Church. The next several months we scheduled Revival meetings and
                Youth activities, and saw many souls coming to Christ!
              </p>

              <SectionHeading>Florence Baptist Church</SectionHeading>

              <p>
                In September of 1989 Pastor Mark Davis of the Florence Baptist Church called me to
                say that because of his wife&rsquo;s health, he was resigning and asked if I would
                come and fill the pulpit and help the church find a Pastor.
              </p>
              <p>
                I had a long familiarity with Florence Baptist Church going back to 1981 when God
                gave me the privilege to preach there. This church had been one of the largest
                works in Montana, but had really been struggling as the result of a terrible church
                split three years earlier.
              </p>
              <p>
                The first Sunday they asked if I would pray about coming as their Pastor. Convinced
                that God still wanted me in Evangelism I was reluctant to even pray about it
                thinking that it was some lack of faith on my part, however Betty and I would pray
                about it, and after two months of fervent praying God made it perfectly clear that
                Betty and I were to be at Florence Baptist Church.
              </p>
              <p>
                There were only 10 adult members left out of this once thriving Church, but they
                extended a unanimous call to us on November 26, 1989, and we accepted the call. At
                my first service we had 14 in attendance including the kids. Over the next ten
                years we would see the Lord bless in such marvelous ways!
              </p>
              <p>
                All areas of ministry had to be built again from the ground up. In 1990 I asked
                Brother Rick Hammond to come by faith as my new Bus Director. Six months later the
                Church had grown to the place where we were able to call him as our new Assistant
                Pastor. Brother Rick was on staff for four years before going out from Florence
                Baptist Church to Dillon Montana to plant Bethany Baptist Church.
              </p>
              <p>
                In 1991 I asked my son-in-law and daughter Tim and Chassidy Johnson to come from
                their home in Minnesota to help us build a new Youth Program at Florence Baptist
                Church. Tim and Chassidy served with Betty and I for over 8 years and did a
                magnificent job!, and when we resigned in 1999, the church called Tim as their new
                Pastor. Tim and Chassidy have served faithfully at Florence Baptist for over 35
                years.
              </p>
              <p>
                In the nearly ten years Betty and I were at Florence Baptist we saw hundreds of
                souls reached for Christ, and many baptized on their professions of faith. God also
                used this church to help start 3 other churches in Montana!
              </p>

              <SectionHeading>A Season of Testing, and the Call to Elmwood</SectionHeading>

              <p>
                In February 1999, I resigned the pastorate of Florence Baptist to answer the call
                of North Valley Baptist Church in Redding California to come and Assistant Dr.
                Royal Blue, and succeed him upon his retirement.
              </p>
              <p>
                However, after coming to North Valley Baptist of Redding it became painfully
                obvious that our convictions as fundamental Baptists were at odds with some in
                positions of leadership, and although we did enjoy the love and support of many, it
                was clear that God would only use our short time at North Valley to strengthen our
                convictions and faith and prepare us for a greater ministry in the future.
              </p>
              <p>
                In early July 2000, 2 months after my resignation from NVBC of Redding, Elmwood
                Baptist Church of Brighton Colorado called to ask if I would consider coming to
                fill their vacant pulpit following the sudden death of their pastor.
              </p>
              <p>
                Elmwood Baptist had been struggling for many months and facing enormous debt,
                however a faithful core of 17 people remained, and on July 30th I accepted their
                unanimous call to come as their new pastor.
              </p>
              <p>
                Since our first Sunday on September 3rd 2000, we have witnessed God bring a church
                dedicated to HIS glory back to life. Today the church is averaging over 300 every
                Sunday, with souls saved and baptized regularly!
              </p>

              <p>
                Elmwood Baptist&rsquo;s future is as sure as the vision and faith of it&rsquo;s
                people in our miraculous working God, and Betty and I are blessed to be able to
                serve the Lord, and honored to be able to serve HIM at Elmwood Baptist Church.
              </p>
            </div>

            <div className="pt-10 mt-10 border-t border-cream-dark">
              <Link
                href="/staff/gary-randall"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-light hover:text-brown transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                Back to Pastor Randall&rsquo;s Bio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

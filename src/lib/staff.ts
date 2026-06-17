export interface StaffMember {
  slug: string;
  names: string; // couple, as displayed
  role: string; // short role for cards
  titles: string[]; // full list of roles/responsibilities
  photo: string;
  bio: string[]; // paragraphs
  lead?: boolean;
}

export const staff: StaffMember[] = [
  {
    slug: "gary-randall",
    names: "Dr. Gary & Betty Randall",
    role: "Senior Pastor",
    titles: ["Senior Pastor"],
    photo: "/staff/randall.jpg",
    lead: true,
    bio: [
      "Pastor Gary Randall and his wife Betty came to Elmwood Baptist Church in September of 2000, accepting the unanimous call of the church. In the years since, the Lord has used his faithful, Bible-centered ministry to grow Elmwood into a thriving church family where hundreds of people now call EBC their church home and decisions for Christ are made every week.",
      "His ministry rests on three simple convictions: preaching the Word, praying in faith, and witnessing to the lost. That heart shapes everything at Elmwood — clear preaching from the King James Bible, a praying people, and a church that takes the Gospel to its community.",
      "Pastor and Mrs. Randall have been married for 52 years, with 43 of those years spent serving together in ministry. They would love to meet you and welcome you into the Elmwood family.",
    ],
  },
  {
    slug: "brandon-bowser",
    names: "Pastor Brandon & Meghan Bowser",
    role: "Associate Pastor",
    titles: ["Associate Pastor", "Bus Ministry Director", "Junior Church Director"],
    photo: "/staff/bowser.jpg",
    bio: [
      "Pastor Brandon and Meghan Bowser joined the staff at Elmwood Baptist Church in December of 2019. They oversee the bus and junior church ministries and pour into the next generation through Elmwood Baptist Academy and the Brighton High School Bible Club.",
      "Brandon teaches grades 7–12 and leads the Thursday Foundations classes. Together the Bowsers have served in ministry for over 17 years across several states, and they bring that experience and energy to the families and young people of Elmwood.",
    ],
  },
  {
    slug: "pastor-ben",
    names: "Pastor Ben & Amber",
    role: "Assistant Pastor",
    titles: [
      "Assistant Pastor",
      "Out-Reach Evangelism Leader",
      "Life & Home Builders Bible Class Instructor",
      "Brookdale Assisted Living Service Leader",
    ],
    photo: "/staff/ben.jpg",
    bio: [
      "Pastor Ben and Amber joined the staff at Elmwood Baptist Church in February of 2022. Both came to faith in Christ through the ministry of Elmwood, which gives them a deep love for reaching others with the same Gospel that changed their lives.",
      "Ben leads outreach evangelism, teaches the Life & Home Builders Bible class, and leads the service at Brookdale Assisted Living. Before returning to Elmwood for formal ministry training, he and Amber helped establish Horizon Baptist Church. They have one son.",
    ],
  },
  {
    slug: "rick-lopez",
    names: "Pastor Rick & Shannon Lopez",
    role: "Academy Administrator",
    titles: [
      "Elmwood Baptist Academy Administrator",
      "EBC Security Director",
      "Jesus First Youth Ministry Leader",
      "Men's Retreat Director",
      "Financial Director",
    ],
    photo: "/staff/lopez.jpg",
    bio: [
      "The Lopez family has faithfully served at Elmwood Baptist Church for 13 years. Pastor Rick administrates Elmwood Baptist Academy and has led the youth ministry for the past four years, pointing students to put Jesus first in everything.",
      "Rick also serves as the church's security director and men's retreat director, while Shannon serves as Financial Director. The Lopezes have six children and remain wholeheartedly committed to serving Christ and the Elmwood family.",
    ],
  },
];

export function getStaff(slug: string) {
  return staff.find((m) => m.slug === slug);
}

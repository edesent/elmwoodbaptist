export interface StaffMember {
  slug: string;
  names: string; // couple, as displayed
  role: string; // short role for cards
  titles: string[]; // full list of roles/responsibilities
  photo: string;
  bio: string[]; // paragraphs
  lead?: boolean;
  testimonyUrl?: string; // link to a dedicated personal testimony page, if one exists
}

export const staff: StaffMember[] = [
  {
    slug: "gary-randall",
    names: "Dr. Gary & Betty Randall",
    role: "Senior Pastor",
    titles: ["Senior Pastor"],
    photo: "/staff/randall.jpg",
    lead: true,
    testimonyUrl: "/staff/gary-randall/testimony",
    bio: [
      "Pastor Gary Randall and his wife Betty came to Elmwood Baptist Church in September of 2000, accepting the unanimous call of the church. In the years since, the Lord has used his faithful, Bible-centered ministry to grow Elmwood into a thriving church family where hundreds of people now call EBC their church home and decisions for Christ are made every week.",
      "His ministry rests on three simple convictions: preaching the Word, praying in faith, and witnessing to the lost. That heart shapes everything at Elmwood — clear preaching from the King James Bible, a praying people, and a church that takes the Gospel to its community.",
      "Pastor and Mrs. Randall have been married for over 50 years, with over 40 of those years spent serving together in ministry. They would love to meet you and welcome you into the Elmwood family.",
    ],
  },
  {
    slug: "pastor-ben",
    names: "Pastor Ben & Amber",
    role: "Associate Pastor",
    titles: [
      "Associate Pastor",
      "Out-Reach Evangelism Leader",
      "Life & Home Builders Bible Class Instructor",
    ],
    photo: "/staff/ben.jpg",
    bio: [
      "Pastor Ben and Amber joined the staff at Elmwood Baptist Church in February of 2022. Both came to faith in Christ through the ministry of Elmwood, which gives them a deep love for reaching others with the same Gospel that changed their lives.",
      "Ben leads outreach evangelism and teaches the Life & Home Builders Bible class. Before returning to Elmwood for formal ministry training, he and Amber helped establish Horizon Baptist Church. They have one son.",
    ],
  },
  {
    slug: "chris-clay",
    names: "Pastor Chris & Brenda Clay",
    role: "Assistant Pastor",
    titles: [
      "Assistant Pastor",
      "H.O.P.E. Restoration Ministry",
      "Brookdale Senior Living Center Ministry",
      "Jail Ministry",
      "Bus Ministry",
    ],
    photo: "/staff/clays.jpg",
    bio: [
      "Pastor Chris and Brenda Clay came to faith in Christ and were baptized through the ministry of Elmwood Baptist Church. Having experienced God's grace firsthand, they share a burden to reach the lost and see lives forever changed by Jesus Christ.",
      "Together, Chris and Brenda lead the H.O.P.E. Restoration Ministry and the Brookdale Senior Living Center Ministry. Pastor Chris also actively shares the Gospel through the church's jail ministry and bus ministry, while Brenda serves as the Nursery Director, lovingly overseeing the care of Elmwood's youngest members. Blessed with 5 children and 4 grandchildren, Chris and Brenda are devoted to serving the Lord at Elmwood Baptist Church.",
    ],
  },
  {
    slug: "terry-mcclain",
    names: "Pastor Terry & Peggy McClain",
    role: "Assistant Pastor",
    titles: ["Assistant Pastor", "Way of the Cross Jail Ministry"],
    photo: "/staff/mcclain.jpg",
    bio: [
      "Pastor Terry and Peggy McClain serve the Elmwood family through the Way of the Cross Jail Ministry. A full biography is coming soon — please check back for more about the McClains and the ministry the Lord has entrusted to them.",
    ],
  },
  {
    slug: "rick-lopez",
    names: "Pastor Rick & Shannon Lopez",
    role: "Assistant Pastor",
    titles: [
      "Assistant Pastor",
      "Elmwood Christian Academy Administrator",
      "EBC Security Director",
      "Men's Retreat Director",
      "Little Blessings Daycare Director",
      "Financial Director",
    ],
    photo: "/staff/lopez.jpg",
    bio: [
      "The Lopez family has faithfully served at Elmwood Baptist Church for over a decade. Pastor Rick administrates Elmwood Christian Academy with a heart for pointing students to Christ.",
      "Rick also serves as the church's security director, men's retreat director, and Little Blessings Daycare director, while Shannon serves as Financial Director. The Lopezes have six children and remain wholeheartedly committed to serving Christ and the Elmwood family.",
    ],
  },
];

export function getStaff(slug: string) {
  return staff.find((m) => m.slug === slug);
}

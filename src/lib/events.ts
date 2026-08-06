export interface ChurchEvent {
  when: string;
  title: string;
  detail?: string;
}

// The regular weekly rhythm of the church (evergreen — safe to show on the homepage).
export const weeklyEvents: ChurchEvent[] = [
  { when: "Sunday · 10:00 AM", title: "Sunday Morning Service", detail: "Singing, prayer, and Bible preaching" },
  { when: "Sunday · 11:30 AM", title: "Family Bible Time", detail: "Sunday School classes for every age" },
  { when: "Sunday · 1:30 PM", title: "Afternoon Service", detail: "Lord's Supper on the last Sunday of each month" },
  { when: "Thursday · 7:00 PM", title: "Master Club & Teen Time", detail: "Mid-week for kids, teens, and adults" },
  { when: "Saturday · 10:30 AM", title: "GATE Outreach & Bus Visitation", detail: "Reaching our community with the Gospel" },
  { when: "Last Saturday · 1:00 PM", title: "LACE Ladies Fellowship", detail: "Encouragement, Bible study, and fellowship for the ladies" },
];

// Standing outreach and fellowship ministries (shown on the full Events page).
export const ministryEvents: ChurchEvent[] = [
  { when: "1st Saturday · 8:30 AM", title: "Men's Prayer Breakfast", detail: "Food, fellowship, and prayer" },
  { when: "Last Saturday · 1:00 PM", title: "LACE Ladies Fellowship", detail: "Encouragement, Bible study, and fellowship for the ladies" },
  { when: "Sunday · 1:00 PM", title: "Brookdale Senior Living Ministry", detail: "Bringing a service to our local seniors" },
  { when: "Weekly", title: "Adams County & Broomfield Jail Ministry", detail: "Sharing Christ with those who are incarcerated" },
  { when: "Ongoing", title: "Hope Restoration Ministry", detail: "Walking with people toward freedom in Christ" },
  { when: "Annual", title: "Man Camp", detail: "A retreat built to sharpen men in their walk with God" },
];

import { redirect } from "next/navigation";

// Old West Sunday doesn't have its own dedicated page — all the details live
// on the Events page card instead. This route stays in place (rather than
// 404ing) in case the URL was shared anywhere, and just sends visitors on
// to the Events page.
export default function OldWestSundayPage() {
  redirect("/events");
}

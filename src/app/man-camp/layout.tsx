import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import ManCampNav from "@/components/mancamp/ManCampNav";
import ManCampFooter from "@/components/mancamp/ManCampFooter";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Man Camp | Elmwood Baptist Church",
    template: "%s | Man Camp",
  },
};

export default function ManCampLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${oswald.variable} flex-1 flex flex-col bg-parchment text-bark-light`}>
      <ManCampNav />
      <main className="flex-1 pt-20 text-lg">{children}</main>
      <ManCampFooter />
    </div>
  );
}

import type { Metadata } from "next";
import ManCampNav from "@/components/mancamp/ManCampNav";
import ManCampFooter from "@/components/mancamp/ManCampFooter";

export const metadata: Metadata = {
  title: {
    default: "Man Camp | Elmwood Baptist Church",
    template: "%s | Man Camp",
  },
};

export default function ManCampLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ManCampNav />
      <main className="flex-1 pt-20 text-lg">{children}</main>
      <ManCampFooter />
    </>
  );
}

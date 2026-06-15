interface Props {
  number: number;
  name: string;
  purpose: string;
  /** Tone influences badge contrast over dark vs light section backgrounds. */
  tone?: "light" | "dark";
}

// The captioned demo badges are intentionally hidden on the live site.
// (They were a design-tool affordance in the boilerplate.) Props are kept
// so existing section components don't need to change.
export default function SectionBadge(_props: Props) {
  return null;
}

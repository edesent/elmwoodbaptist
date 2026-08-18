"use client";

type PdfPopupLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function PdfPopupLink({ href, children, className = "" }: PdfPopupLinkProps) {
  const openPopup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(
      href,
      "pdfPopup",
      "width=800,height=900,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes"
    );
  };

  return (
    <a href={href} onClick={openPopup} className={className}>
      {children}
    </a>
  );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elmwood Baptist Church",
    short_name: "Elmwood Baptist",
    description:
      "Elmwood Baptist Church — a King James Bible Independent Baptist church family in Brighton, Colorado.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fcfd",
    theme_color: "#0b2740",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

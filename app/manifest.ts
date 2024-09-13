import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Monster Minesweeper",
    short_name: "Minesweeper",
    description:
      "A fully customizable minesweeper game with interactive tutorials",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1c",
    theme_color: "#1a1a1c",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

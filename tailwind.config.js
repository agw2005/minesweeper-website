/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: { BoardWidth: "404px", TileWidth: "48px" },
      height: { BoardHeight: "404px", TileHeight: "48px" },
      borderWidth: { BoardBorderWidth: "10px", TileBorderWidth: "1px" },
    },
  },
  plugins: [],
};

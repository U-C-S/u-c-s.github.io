/** @type {import('tailwindcss').Config} */
export default {
  content: ["./templates/**/*.html", "./src/typescript/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "cosmic-violets": "url('/assets/cosmic-violets.webp')",
      },
    },
  },
  plugins: [],
};

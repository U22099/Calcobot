/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "scale-in": "scaleIn .6s linear"
      },
    },
  },
  plugins: [],
}
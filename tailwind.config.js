/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1E3A5F',
        secondary: '#2E5C8A',
        accent: '#EFF6FF',
        contrast: '#3B82F6',
      },
    },
  },
  plugins: [],
}

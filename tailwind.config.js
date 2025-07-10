// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        
        'red-hat': ['Red Hat Text', 'sans-serif'],
       
      },
    },
  },
  plugins: [],
}
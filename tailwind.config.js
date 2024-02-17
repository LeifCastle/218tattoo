/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'Mobile-S': '320px',
        //'Mobile-M': '375px',
        'Mobile-L': '425px',
        'Tablet': '768px',
        'Laptop': '1024px',
        'Monitor': '1440px',
      },
      fontFamily: {
        heading: ['"Fredoka"', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'navLinkInactiveSize' : '2rem',
        'navLinkActiveSize' : '2.25rem',
      },
      colors: {
        'navLinkInactiveColor' : 'white',
        'navLinkActiveColor' : 'black',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

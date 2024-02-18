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
        'navLinkInactiveSize' : '1.5rem',
        'navLinkActiveSize' : '1.7rem',
      },
      colors: {
        'navLinkInactiveColor' : '#4F4118',
        'navLinkActiveColor' : '#000000',
        'navLinkHoverColor' : '#A2852D', 
        'NavbarBackground': '#D6D6D6',
        'NavbarBackgroundScrolled': '#BFBFBF',
      },
      backgroundImage: {
        'homePage': "url('https://marineagency.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-16-at-9.28.25-AM-1024x679.png')",
      },
    },
  },
  plugins: [],
};

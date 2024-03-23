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
        heading: ['"Fredoka"', ...defaultTheme.fontFamily.sans],
        underlineNav: 'var(--underline)',
      },
      fontSize: {
        'navLinkInactiveSize': '1.5rem',
        'navLinkActiveSize': '1.7rem',
      },
      borderColor: {
        inputBorder:  "#3882F6",
      },
      colors: {
        NavbarBackground: 'var(--NavbarBackground)',
        navLinkInactiveColor: 'var(--navLinkInactiveColor)',
        navLinkActiveColor: 'var(--navLinkActiveColor)',
        navLinkHoverColor: 'var(--navLinkHoverColor)',
        greyB: '#C1C1C1',
        blackA: '#1B1D1F',
        brownA: '#998c7e',
        blueA: '#184d54',
        inputBg: "rgba(255, 255, 255, .5)",
        inputHoverBg: "rgba(255, 255, 255, .75)",
      },
      gridTemplateColumns: {
        'dateTime': '200px repeat(5, minmax(20px, 200px))',
        'listView': 'repeat(4, minmax(20px, 400px))',
      },
      backgroundImage: {
        'homePage': "url('https://marineagency.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-16-at-9.28.25-AM-1024x679.png')",
      },
    },
  },
  plugins: []
};

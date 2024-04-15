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
        'title': ['"Shadows Into Light"', 'cursive']
      },
      fontSize: {
        'navLinkInactiveSize': '1.5rem',
        'navLinkActiveSize': '1.7rem',
        'mobileNavActiveSize': '3.5rem',
        'mobileNavInactiveSize': '3rem',
      },
      borderColor: {
        inputBorder:  "#3882F6",
        inputError: "#8E0000",
      },
      colors: {
        NavbarBackground: '#FFFFFF',
        navLinkInactiveColorDefault: '#919191',
        navLinkActiveColorDefault: '#FFFFFF',
        navLinkHoverColorDefault: '#bdbdbd',
        navLinkInactiveColorContrast: '#000000',
        navLinkActiveColorContrast: '#184d54',
        navLinkHoverColorContrast: '#998c7e',
        greyB: '#C1C1C1',
        blackA: '#1B1D1F',
        brownA: '#998c7e',
        blueA: '#184d54',
        inputBg: "rgba(255, 255, 255, .5)",
        inputHoverBg: "rgba(255, 255, 255, .75)",
        inputError: "#8E0000",
        mobileNavBg: "rgba(0, 0, 0, .875)",
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

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
      keyframes: {
        arrowAnimate: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-30px)' },
          '60%': { transform: 'translateY(-15px)' },
        },
        progressForward: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        progressBackward: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        arrowAnimate: 'arrowAnimate 1.25s ease-in-out infinite',
        barAnimate: 'barAnimate 1.25s ease-in-out infinite',
        progressForward: 'progressForward ease-in-out forwards',
        progressBackward: 'progressBackward ease-in-out forwards',
      },
      screens: {
        'Mobile-S': '320px',
        'Mobile-M': '375px',
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
        inputError: "#B91C1C",
        inputBorder: "#998C7E",
      },
      colors: {
        NavbarBackground: '#FFFFFF',
        navLinkInactiveColorDefault: '#919191',
        navLinkActiveColorDefault: '#FFFFFF',
        navLinkHoverColorDefault: '#bdbdbd',
        navLinkInactiveColorContrast: '#000000',
        navLinkActiveColorContrast: '#0C857B',
        navLinkHoverColorContrast: '#998c7e',
        greyB: '#C1C1C1',
        blackA: '#1B1D1F',
        brownA: '#998c7e',
        blueA: '#184d54',
        inputBg: "rgba(255, 255, 255, .5)",
        inputHoverBg: "rgba(255, 255, 255, .75)",
        inputError: "#8E0000",
        mobileNavBg: "rgba(0, 0, 0, .875)",
        progressBarComplete: '#0C857B' //origional: #184d54 //teal-600: #0C857B
      },
      gridTemplateColumns: {
        'dateTime': 'minmax(50px, 100px) repeat(var(--dynamic-columns), minmax(10px, 100px))',
        'listView': 'repeat(4, minmax(20px, 400px))',
      },
      backgroundImage: {
        'homePage': "url('https://marineagency.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-16-at-9.28.25-AM-1024x679.png')",
        'test': "url('https://png.pngtree.com/thumb_back/fh260/background/20231104/pngtree-abstract-texture-subtle-gray-light-overlay-image_13781884.png')"
      },
    },
  },
  plugins: []
};

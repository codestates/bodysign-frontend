module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        IBM: ['IBM Plex Sans KR', 'sans-serif'],
       }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

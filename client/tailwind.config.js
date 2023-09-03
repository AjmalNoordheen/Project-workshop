/** @type {import('tailwindcss').Config} */
export default {
  content: [   './src/**/*.html',
  './src/**/*.jsx',],
  theme: {
    extend: {
      fontFamily: {
        'gravitas-one': ['Gravitas One', 'cursive'],
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
         'jockey-one':['Noto Sans JP', 'sans-serif'],
         'Shrikand':['Shrikhand', 'cursive']
      },
    },
  },
  plugins: [],
}


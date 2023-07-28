/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#A301AA',
        'lightPurple': '#C853CD',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'linear-orange':'linear-gradient(180deg, #FBBB07 0%, #DC6A00 100%)',
      },
      boxShadow: {
        'x': '0px 17px 19px 2px rgba(0, 0, 0, 0.52)',
      }
    },
  },
  plugins: [],
}

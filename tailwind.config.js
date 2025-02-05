const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],

  theme: {
    extend: {
      colors: {
        'dark-mode': '#1B1B1B',
        'red-custom': '#E31A1C',
        'green-custom': '#33A02C',
        'yellow-custom': '#F4BE37'

        // 'brand-blue': '#1D4ED8',  // Menambahkan warna biru khusus
        // 'brand-green': '#10B981', // Menambahkan warna hijau khusus
        // 'dark-mode': '#1a202c',   // Warna custom untuk dark mode
        // 'soft-yellow': '#FBBF24', // Menambahkan warna kuning lembut
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }, 
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}


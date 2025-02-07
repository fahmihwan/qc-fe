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
        'dark-mode-v2': '#232326',
        'red-custom': '#E31A1C',
        'green-custom': '#33A02C',
        'yellow-custom': '#F4BE37',
        'dark-gray-custom': '#909090',
        'light-gray-custom': '#505050'

        // 'brand-blue': '#1D4ED8',  // Menambahkan warna biru khusus
        // 'brand-green': '#10B981', // Menambahkan warna hijau khusus
        // 'dark-mode': '#1a202c',   // Warna custom untuk dark mode
        // 'soft-yellow': '#FBBF24', // Menambahkan warna kuning lembut
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(3%)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}


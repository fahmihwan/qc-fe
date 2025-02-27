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
        // 'dark-mode-v2': '#0b0d0f',
        'dark-mode-v2': '#1d1e24',
        // 'dark-mode-bg': '#101316',
        'dark-mode-bg': '#23262b',
        'dark-mode-border': '#3c3e3f',
        'light-mode-bg': '#fafafa',
        'light-border': '#E5E7EB',
        'dark-border': '#3C3E3F',
        'red-custom': '#E31A1C',
        'green-custom': '#33A02C',
        'yellow-custom': '#F4BE37',
        'dark-gray-custom': '#909090',
        'light-gray-custom': '#505050',
        'blue-custom': '#1F78B4',
        'light-green-custom': '#E5F5E5',
        'gempa-satu': '#D9D9D9',
        'gempa-satu-dua': '#BCCEFF',
        'gempa-dua-tiga': '#ABDBFF',
        'gempa-tiga-empat': '#ADDBFF',
        'gempa-empat': '#80FFF6',
        'gempa-empat-lima': '#7DFFCF',
        'gempa-lima': '#85FF86',
        'gempa-lima-enam': '#D2FF32',
        'gempa-enam': '#FFFB01',
        'gempa-enam-tujuh': '#FFD600',
        'gempa-tujuh': '#FFBB00',
        'gempa-tujuh-delapan': '#FF9F00',
        'gempa-delapan': '#FF7302',
        'gempa-delapan-sembilan': '#FF3401',
        'gempa-sembilan': '#F80000',
        'gempa-sembilan-sepuluh': '#DA0000',
        'gempa-sepuluh-plus': '#C80000',
        'gray-hover': '#505050',
        'gray-not-selected': '#AEAEAE'

        // 'brand-blue': '#1D4ED8',  // Menambahkan warna biru khusus
        // 'brand-green': '#10B981', // Menambahkan warna hijau khusus
        // 'dark-mode': '#1a202c',   // Warna custom untuk dark mode
        // 'soft-yellow': '#FBBF24', // Menambahkan warna kuning lembut
      },
      // animation: {
      //   marquee: "marquee 10s linear infinite",
      // },
      // keyframes: {
      //   marquee: {
      //     from: { transform: "translateX(3%)" },
      //     to: { transform: "translateX(-50%)" },
      //   },
      // },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Ganti default sans-serif jadi Poppins
      },
      screens: {
        xs: '360px',
        md_lg: '800px',
        customXL: '1280px',
        customTwoXL: '1536px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}


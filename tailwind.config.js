/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/**/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
      boxShadow:{
        'right': '10px 0 15px -3px rgba(0, 0, 0, 0.3)',  // Right shadow
        'left': '-10px 0 15px -3px rgba(0, 0, 0, 0.3)',  // Left shadow
        'top': '0 -10px 15px -3px rgba(0, 0, 0, 0.3)',  // Top shadow
        'bottom': '0 10px 15px -3px rgba(0, 0, 0, 0.3)', // Bottom shadow
        'top-left-right-md': 
          '2px -2px 6px -2px rgb(0 0 0 / 0.1), -2px -2px 4px -3px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


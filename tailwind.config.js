/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{jsx, js}'
  ],
  theme: {
    extend: {
        borderWidth: {
            3: '3px',
            5: '5px',
            6: '6px',
            7: '7px',
            10: '10px',
        },
        width: ({ theme }) => ({
            auto: 'auto',
            ...theme('spacing'),
            '1/2': '50%',
            '1/7': '14.2825%',
            '5/7': '71.435%'
        }),
        fontFamily: {
            'header': ['Roboto', 'sans-serif'],
            'Gochi': ['Gochi Hand', 'cursive']
            
        }

    },
  },
  plugins: [],
}


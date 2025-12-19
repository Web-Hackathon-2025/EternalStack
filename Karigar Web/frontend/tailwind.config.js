/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                karigar: {
                    900: '#4c4522',
                    800: '#978b44',
                    700: '#c7bd82',
                    100: '#e9e5ce',
                    50: '#eeebda',
                    25: '#f7f5ed',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

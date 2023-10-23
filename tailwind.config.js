/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        boxShadow: {
            'menu': 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
            'input': 'rgba(0, 0, 0, 0.16) 0.1px 0.3px, rgba(0, 0, 0, 0.23) 0.1px 0.3px'
        },
        colors: {
            primary: "#507DBC",
            light: "#808287",
            dark: "#0C090A",
            lighter: {
                200: "#CCD0D9",
                300: "#B9BFCA",
            }
        }
      }
    },
    plugins: []
};
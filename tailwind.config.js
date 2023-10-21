/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        boxShadow: {
            'menu': 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px'
        },
        colors: {
            primary: "#507DBC",
            light: "#808287",
            dark: "#0C090A"
        }
      }
    },
    plugins: []
};
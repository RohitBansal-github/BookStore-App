import daisyui from 'daisyui';

   /** @type {import('tailwindcss').Config} */
   export default {
     content: ["./index.html", "./src/**/*.{js,jsx}"],
     darkMode: 'class',
     theme: {
       extend: {
         colors: {
           primary: "#3B82F6",
           secondary: "#14B8A6",
         },
       },
     },
     plugins: [daisyui],
     daisyui: {
       themes: ["light", "dark"],
       darkTheme: "dark",
     },
   };
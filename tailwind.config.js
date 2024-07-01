// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Include JavaScript and TypeScript files
    './pages/**/*.{js,jsx,ts,tsx}', // Include Next.js pages
    './components/**/*.{js,jsx,ts,tsx}', // Include components
    './src/app/**/*.css', // Include CSS files in the app directory
  ],
  
  theme: {
    extend: {}, // Extend Tailwind CSS theme here
  },
  plugins: [
    require('@tailwindcss/forms'), // Include @tailwindcss/forms plugin for form styling
    // Add other plugins as needed
  ],
};

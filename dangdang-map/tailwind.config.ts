import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 400: '#FB923C', 500: '#F97316', 600: '#EA580C', 700: '#C2410C' },
        forest: { 500: '#22C55E', 600: '#16A34A' },
      }
    }
  },
  plugins: []
}
export default config

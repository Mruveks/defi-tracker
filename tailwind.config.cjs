/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: { max: "640px" },
			md: { min: "641px", max: "1023px" },
			lg: { min: "1024px", max: "1279px" },
			xl: { min: "1280px" },
		},
		extend: {
			colors: {
				"gray-850": "#151C2B",
			},
		},
	},
	plugins: [],
};

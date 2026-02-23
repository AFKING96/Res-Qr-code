import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#000000",
                "background-light": "#ffffff",
                "background-dark": "#191919",
            },
            fontFamily: {
                "display": ["var(--font-noto-serif)", "serif"],
                "sans": ["var(--font-noto-sans)", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0px",
                "lg": "0px",
                "md": "0px",
                "sm": "0px",
                "xl": "0px",
                "2xl": "0px",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}

export default config

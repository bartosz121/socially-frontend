module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "screen-3xl": "1920px"
      },
      colors: {
        like: "#FF69B4"
      },
      dropShadow: {
        "like": "0px 0px 5px rgb(248, 41, 144)"
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in",
        // as of right now you cant configure dismiss time of a toast, its hardcoded to 1s
        // thats why fadeOut must be 1s otherwise toast appears again after fade out
        // TODO change fadeOut time to less after they merge https://github.com/timolins/react-hot-toast/pull/89
        fadeOut: "fadeOut 1s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        }
      }
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [{
      socially: {
        "primary": "#3f45fc",
        "secondary": "#F2D7EE",
        "accent": "#bab1ef",
        "neutral": "#222D3F",
        "base-100": "#EDF0F3",
        "base-300": "#F7F7F7",
        "info": "#65A1DC",
        "success": "#5BECC5",
        "warning": "#F6A037",
        "error": "#FB4B54",
      },
    }, "halloween"],
  }
}

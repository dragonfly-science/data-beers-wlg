module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      maxHeight: {
        "6": "6rem",
      },
      maxWidth: {
        "6": "6rem",
        "12": "12rem",
      },
    },
    typography: theme => ({
      default: {
        css: [
          {
            color: theme("colors.black"),
            '[class~="lead"]': {
              color: theme("colors.black"),
              fontWeight: "bold",
            },
            a: {
              color: theme("colors.black"),
              fontStyle: "italic",
              fontWeight: "normal",
              "&:hover": {
                color: theme("colors.black"),
                textDecoration: "none",
              },
            },
          },
        ],
      },
    }),
  },
  plugins: [require("@tailwindcss/typography")],
}

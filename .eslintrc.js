module.exports = {
  env: {
    browser: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended", "prettier/react"],
  parser: "@babel/eslint-parser",
  plugins: ["babel"],
  rules: {
    "prettier/prettier": ["error"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "jsx-a11y/accessible-emoji": ["off"],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-static-element-interactions": "warn",
    "no-console": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": "off",
    "prefer-template": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
  },
};

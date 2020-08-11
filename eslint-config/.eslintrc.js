module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "plugin:react/recommended",
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:import/typescript'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 16,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
        "camelcase": "off",
        "import/no-cycle": "off",

        "no-unused-vars": [
          'error',
          {
            argsIgnorePattern: '_',
          },
        ],

        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '_',
          },
        ],

        "import/no-unresolved": "error",
        "import/extensions": ["error", {
          extensions: [".ts", ".tsx", ".js", ".jsx"]
        }]
    },
    "settings": {
      "import/resolver": {
        "typescript": {
          "project": "**/tsconfig.json"
        }
      }
    }
};

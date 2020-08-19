module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
        "plugin:import/typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
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
        "camelcase": "off",
        "import/no-cycle": "off",
        "no-param-reassign": "off",

        "no-unused-vars": [
          'error',
          {
            argsIgnorePattern: '_'
          }
        ],

        "@typescript-eslint/no-unused-vars": [
          'error',
          {
            argsIgnorePattern: '_'
          }
        ],

        "import/no-unresolved": "error",
        "import/extensions": ["error", {
          extensions: [".ts", ".tsx", ".js", ".jsx"]
        }]
    },
    "settings": {
      "import/resolver": {
        "typescript": {
          "project": [
            "./server/**/tsconfig.json",
            "./web/**/tsconfig.json",
            "./mobile/**/tsconfig.json"
          ]
        }
      }
    }
};

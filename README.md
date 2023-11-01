## author
NGUYEN MINH HUNG - 0379634246

## CREATE APP AND CONFIG PRETTIER AND ESLINT
DOCUMENT: https://topdev.vn/blog/setup-eslint-va-prettier-cho-du-an-react/

B1: Create app:
    npx create-react-app react-eslint-and-prettier-example-typescript --template typescript
B2: Create package for prettier & eslint
    npm i -–save-dev eslint eslint-config-airbnb @typescript-eslint/eslint-plugin @typescript-eslint/parser
B3: Create file .eslintrc & .eslintignore
B4: Content of the file  .eslintignore:
    build/*
B5: Content of the file .eslintrc:
    {
        "env": {
            "browser": true,
            "jest": true
        },
        "plugins": [
            "@typescript-eslint",
            "react"
        ],
        "settings": {
            "react": {
                "pragma": "React",
                "version": "18.0"
            },
            "import/resolver": {
                "node": {
                    "extensions": [
                        ".js",
                        ".jsx",
                        ".ts",
                        ".tsx"
                    ],
                    "moduleDirectory": [
                        "node_modules",
                        "./"
                    ]
                }
            }
        },
        "extends": [
            "airbnb",
            "airbnb/hooks"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "rules": {
            "no-console": "warn",
            "no-eval": "error",
            "react/react-in-jsx-scope": "off",
            "react/jsx-filename-extension": [
                2,
                {
                    "extensions": [
                        ".js",
                        ".jsx",
                        ".ts",
                        ".tsx"
                    ]
                }
            ],
            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    "js": "never",
                    "jsx": "never",
                    "ts": "never",
                    "tsx": "never"
                }
            ]
        }
    }

B6: Add script to package.json in script
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
    "lint:fix": "eslint --fix .  --ext .js,.jsx,.ts,.tsx"
B7: Test Eslint
    npm run lint


## ADD MaterialUI
document: https://mui.com/material-ui/getting-started/installation/

B1: Add material UI
    npm install @mui/material @emotion/react @emotion/styled
B2: Add font Roboto
    npm install @fontsource/roboto
B3: Import
    import '@fontsource/roboto/300.css';
    import '@fontsource/roboto/400.css';
    import '@fontsource/roboto/500.css';
    import '@fontsource/roboto/700.css';
B4: Add icon material
    npm install @mui/icons-material

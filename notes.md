# Project setup

1. Initialize project: `npm init`

## Install and setup Prettier
1. Install `Prettier` as a development time dependency:
    ```
    npm i -D prettier
    ```
1. Add a script to run prettier into `package.json` under the `scripts` object:
    ```js
    "format": "prettier \"src/**/*.{js, html}\" --write",
    ```
1. Install `Prettier` extension on Visual Studio Code, and restart Visual Studio Code.
1. Setup `Prettier` in Visual Studio Code:
    1. In `File` > `Preferences`, enable option `Editor: Format On Save`
    1. In `File` > `Preferences`, enable option `Prettier: Require Config`. This way, `Prettier` will only run on projects that use Prettier.
    1. In the root folder of the project, add a filed named `.prettierrc`. To use the default options from Prettier, enter `{}` (an empty object) as the file's content.

## Install and setup ESLint

So, what's the difference between ESLint and Prettier? The latter is only concerned with the files' formatting. It's not concerned at all with variable or method usage. ESLint on the other hand looks at methods and accessibility and such, and also some formatting issues. ESLint is not, however, as powerful as Prettier when it comes to formatting, so `eslint-config-prettier` comes in handy here. Basically, it turns off ESLint rules that might either be unnecessary or conflict with rules set in Prettier.

1. Install `ESLint`, `eslint-webpack-plugin`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` and `eslint-config-prettier` (maybe eslint-plugin-import):
(maybe also babel-eslint, or after babel8, babel-eslint-parser. both allow you to lint ALL valid Babel code with ESLint.)
    ```
    npm i -D eslint eslint-webpack-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier
    ```    
2. In the root folder of the project, create a file called `.eslintrc.json` and set its content to:
    ```js
    {
        "extends": [
            "eslint:recommended",
            // "plugin:import/errors",
            "plugin:react/recommended",
            // "plugin:jsx-a11y/recommended",
            "prettier" // prettier/react has been imported into prettier in eslint-config-prettier
        ],
        "plugins": ["react", "react-hooks"],
        // "plugins": ["react", "import", "jsx-a11y"]
        "rules": {
            "react/prop-types": 0, // Turn off checks for prop types
            "no-console": 1, // Give warnings instead of errors about console.log
            "react-hooks/rules-of-hooks": 2, // Give an error if hooks are created inside if statements
            "react-hooks/exhaustive-deps": 1, // Check effect dependencies
            "react/jsx-uses-vars": "error",
            "react/jsx-uses-react": "error"
            // See: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md 
            // and: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        },
        "parserOptions": {
            "ecmaVersion": 2018,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "env": {
            "es6": true,
            "browser": true,
            "node": true
        },
        "settings": {
            "react": {
                "version" : "detect" // Look into package.json to determine React version
            }
        }
    }
    ```
1. In `package.json`, add a script for linting the project:
    ```
    "lint": "eslint \"src/**/*.{js, jsx}\" --quiet",
    ```
1. In the root folder of the project, add the `.gitignore` file with the following contents:
    ```
    node_modules/
    .DS_Store
    .cache
    dist/
    coverage/
    .vscode/
    .env
    ```  
## Install React and React-DOM

```
npm i react react-dom
```

## Install and setup Babel

Babel handles transpilation from `.jsx` to JavaScript.

1. Install Babel, Babel-loader, Bable Command Line Interface and presets:
    ````
    npm install --save-dev @babel/core @babel/cli @babel/preset-react @babel/preset-env babel-loader
    npm install @babel/polyfill
    ```
1. In the root folder, create a file called `.babelrc`
    ```
    touch .babelrc
    ```
1. Add the following content to .babelrc:
    ```
    {
        "presets": [
            "@babel/preset-react",
            ["@babel/env", {
                "targets": {
                    "browsers": "last 2 versions"
                },
                "loose": false,
                "modules": false
            }]
        ]
    }
    ```

## Install and setup Webpack

At its core, `Webpack` is a packager. It can take, for example, five JavaScript files and package - combine and minify - them into a single file. And it does minifying only when you explicitly tell it to. 

`Babel` takes care of transforming `jsx` into ES5 JavaScript that most browsers understand.

1. Install webpack, webpack-cli and webpack-dev-server:
    ```
    npm i -D webpack webpack-cli webpack-dev-server
    ```
1. In the root folder, add a file called webpack.config.js:
    ```
    const path = require("path");
    const ESLintPlugin = require('eslint-webpack-plugin');

    module.exports = {
        mode: 'development',
        context: __dirname,  // run from root directory
        entry: "./src/index.js",
        devtool: "cheap-source-map",
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json']
        },
        stats: {
            colors: true,
            reasons: true,
            chunks: true
        },
        // Lint automatically
        plugins: [new ESLintPlugin({
            extensions: ['js', 'jsx'],
            exclude: '/node_modules/',
        })],
        module: {
            rules: [
                {
                    test: /\.jsx?$/, // Transpile .js and jsx files into javascript
                    loader: 'babel-loader'
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'), // serve from public
            historyApiFallback: true, // redirect 404s to index.html
        }
    }
    ```
1. In package.json, add scripts that handle development build, development server and production build:
    ```
    "build": "webpack",
    "dev": "webpack serve --mode=development",
    "prod": "webpack --mode=production",
    ```

## Add base files for the project

1. Under the root folder, add a folder called `public`, and under it a file named `index.html`:
    ```
    mkdir public
    touch index.html
    ```

    ```html
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Adopt Me App</title>
            <link rel="stylesheet" href="./style.css">
        </head>
        <body>
            <div id='root'>Not rendered.</div>
            <script src="./bundle.js"></script>
        </body>
    </html>
    ```
2. Under root, add a folder called `src` and under the folder, add files `index.js` and `App.js`.
    ```
    mkdir src
    touch index.js App.js
    ```
    ```js
    // index.js
    import React from 'react';
    import { render } from 'react-dom';
    import App from "./App";

    render( <App/>, document.getElementById('root') );
    ```

    ```js
    // App.js
    import React from 'react'

    export default function App() {
      return (
        <div>Hello World!</div>
      )
    }
    ```
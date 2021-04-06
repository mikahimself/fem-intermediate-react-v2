const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require('eslint-webpack-plugin');
// Use index.html in src as a template and add a index.html with references to prod folder.
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    context: __dirname,  // run from root directory
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'prod'),
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
    }),
        new webpack.ProvidePlugin({
            process: 'process/browser',  // @frontendmasters/pet depends on the process env variable that is no longer available in webpack5. To fix this, install process (npm -i process) and add this bit here.
          }),
          // index.html contains the entry point id, so use it as a template.
          new HtmlWebpackPlugin({
            title: 'Production',
            template: './src/index.html'
          }),
        ],
          
          
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Transpile .js and jsx files into javascript
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"], // css loader picks up import css and style loader injects it into DOM
            },
        ]
    },
}
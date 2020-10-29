const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const filemanagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",

    module: {
        rules: [
            //babel loader
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }]
            }
        ]
    },

    plugins: [
        new MinifyPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'src/img/', to: 'src/img' }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/dashboard_admin.html",
            filename: "dashboard.html",
            favicon: './src/img/logo/icon.png',
            base: '../',
        }),
        new filemanagerPlugin({
            onEnd: {
                copy: [{
                        source: path.win32.resolve(__dirname, 'dist/'),
                        destination: path.win32.resolve(__dirname, '../ci4-sismana/public/')
                    },
                    {
                        source: path.win32.resolve(__dirname, 'dist/index.html'),
                        destination: path.win32.resolve(__dirname, '../ci4-sismana/app/Views/lsn/index.php')
                    },
                    {
                        source: path.win32.resolve(__dirname, 'dist/dashboard.html'),
                        destination: path.win32.resolve(__dirname, '../ci4-sismana/app/Views/lsn/dashboard.php')
                    },
                ]
            }
        })
    ]
});
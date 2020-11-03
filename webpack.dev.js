const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost/0.1.kerjaan/01.sismana/ci4-sismana/public/',
            },
            '/src': {
                target: `http://localhost/0.1.kerjaan/01.sismana/ci4-sismana/public/`,
            }
        },
        historyApiFallback: {
            rewrites: [
                { from: /\/main\/dashboard/, to: '/dashboard.html' },
                { from: /\/main\/iframe/, to: '/iframe.html' }
            ]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/dashboard_admin.html",
            filename: "dashboard.html",
            favicon: './src/img/logo/icon.png',
            base: '../',
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/iframe.html",
            filename: "iframe.html",
            favicon: './src/img/logo/icon.png',
            base: '../',
        }),
    ]
});
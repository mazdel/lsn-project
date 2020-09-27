const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost/0.1.kerjaan/01.sismana/ci4-sismana/public/',
            }
        }
    },

});
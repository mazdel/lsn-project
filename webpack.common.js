const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "src/js/bundle.js"
    },
    /*	mode:"production",*/
    module: {
        rules: [{
                /**css dan style loader */
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('precss'),
                                    require('autoprefixer')
                                ]

                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|svg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'src/img/'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|otf|woff(2)?)([\?]?.*)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'src/font/'
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [{
                                tag: 'img',
                                attribute: 'src',
                                type: 'src'
                            }]
                        }
                    }
                }]
            }
        ]
    },
    /**plugin webpack */
    plugins: [
        /**html webpack plugin */
        new HtmlWebpackPlugin({
            template: "./src/pages/index.html",
            filename: "index.html",
            minify: {
                collapseWhitespace: false,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: false
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/dashboard_admin.html",
            filename: "dashboard.html",
            minify: {
                collapseWhitespace: false,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: false
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper', 'default']
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['id'],
        }),
        new FaviconsWebpackPlugin({
            logo: './src/img/logo/icon.png',
            outputPath: 'src/img/logo/',
            inject: true
        })
    ]
}
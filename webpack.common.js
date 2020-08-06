const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports ={
    devServer:{
        port:8081,
    },
	entry:"./src/index.js",
	output:{
		path: path.resolve(__dirname,"dist"),
		filename: "bundle.js"
	},
/*	mode:"production",*/
	module:{
		rules:[
			{
				/**css dan style loader */
				test:/\.css$/,
				use:[
					{
						loader: "style-loader"
					},
					{
						loader:"css-loader"
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function () {
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					},
					{
						loader:'sass-loader'
					}
				]
			},
			{
				test:/\.(jpg|svg|png|gif)$/,
				use:[
					{
						loader:'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/img/'
						}
					}
				]
			},
			{
				test:/\.(ttf|eot|otf|woff(2)?)([\?]?.*)$/,
				use:[
					{
						loader:'file-loader',
						options:{
							name:'[name].[ext]',
							outputPath:'assets/font/'
						}
					}
				]
			},
			{
				test:/\.(html)$/,
				use:[
					{
						loader:'html-loader',
						options:{
							attributes: {
								list:[
									{
									tag:'img',
									attribute:'src',
									type:'src'
									}
								]
							}
						}
					}
				]
			}
		]
	},
	/**plugin webpack */
	plugins:[
		/**html webpack plugin */
		new HtmlWebpackPlugin({
			template:"./src/pages/index.html",
			filename:"index.html"
		}),
		new HtmlWebpackPlugin({
			template:"./src/pages/dashboard_admin.html",
			filename:"dashboard.html"
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper', 'default']
		}),
		new MomentLocalesPlugin({
			localesToKeep:['id'],
		}),
		new FaviconsWebpackPlugin({
			logo:'./src/img/logo/icon.png',
			outputPath:'assets/img/icon/',
			inject:true
		})
	]
}
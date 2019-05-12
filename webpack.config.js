const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const theme = require('./src/app/theme/default');

const themeData = Object.entries(theme)
	.reduce((accum, [variable, value]) => accum + `$${variable}:${value};`, '');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/app/index.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	module: {
		rules: [{
			test: /\.(sa|sc|c)ss$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						data: themeData
					}
				}
			],
		},{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Development',
			template: './src/app/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};
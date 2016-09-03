'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rootDir = path.resolve(__dirname);

module.exports = {
	debug: true,
	devServer: {
		contentBase: path.resolve(rootDir, 'dist'),
		port: 9000
	},
	devtool: 'source-map',
	entry: {
		polyfills: [path.resolve(rootDir, 'src', 'polyfills')],
		vendor: [path.resolve(rootDir, 'src', 'vendor')],
		app: [path.resolve(rootDir, 'src', 'main')]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(rootDir, 'dist')
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	module: {
		loaders: [
			{
				loader: 'ts',
				test: /\.ts$/,
				exclude: /node_modules/
			},
			{
				loader: 'raw',
				test: /\.(css|html)$/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'body',
			template: path.resolve(rootDir, 'src', 'index.html')
		}),
		new ExtractTextPlugin('[name].css')
	],
	htmlLoader: {
		minimize: false // workaround for ng2
	},
};

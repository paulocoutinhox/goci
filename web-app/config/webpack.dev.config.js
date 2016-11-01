'use strict';

const path = require('path');
const rootDir = path.resolve(__dirname, '../');

const webpack = require('webpack');
const ngtools = require('@ngtools/webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = {
	devtool: 'source-map',
	cache: false,
	devServer: {
		contentBase: path.resolve(rootDir, 'src'),
		port: 9000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080/api',
				secure: false,
				pathRewrite: {'^/api': ''}
			}
		},
		historyApiFallback: true
	},
	entry: {
		polyfills: [path.resolve(rootDir, 'src', 'polyfills')],
		vendor: [path.resolve(rootDir, 'src', 'vendor')],
		bootstrap: [path.resolve(rootDir, 'src', 'bootstrap')]
	},
	output: {
		filename: '[name].bundle.js',
		publicPath: '/',
		path: path.resolve(rootDir, 'dist')
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		modules: [
			'node_modules',
			path.resolve(rootDir, 'src')
		]
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: '@ngtools/webpack'

			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/i,
				loader: 'file-loader?name=assets/[name].[ext]'
			},
			{
				test: /\.css$/,
				exclude: path.resolve(rootDir, 'src', 'app'),
				loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})
			},
			{
				test: /\.css$/,
				include: path.resolve(rootDir, 'src', 'app'),
				loader: 'raw-loader'
			}
		]
	},
	plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig.json',
			baseDir: path.resolve(rootDir, 'src'),
			entryModule: path.join(rootDir, 'src', 'app', 'modules', 'app.module') + '#AppModule'
		}),
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			path.resolve(rootDir, 'src')
		),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'body',
			template: path.resolve(rootDir, 'src', 'index.html')
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery',
			toastr: 'toastr'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			options: {
				htmlLoader: {
					minimize: false,
					ignoreCustomFragments: [/\{\{.*?}}/],
					root: path.resolve(rootDir, 'src'),
					attrs: ['img:src', 'link:href']
				}
			}
		}),
		new ExtractTextPlugin('styles/[name].css')
	]
};
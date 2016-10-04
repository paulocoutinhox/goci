'use strict';

const path = require('path');
const rootDir = path.resolve(__dirname);

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = {
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(rootDir, 'dist'),
		port: 9000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				secure: false
			}
		},
		historyApiFallback: true
	},
	entry: {
		polyfills: [path.resolve(rootDir, 'src', 'polyfills')],
		vendor: [path.resolve(rootDir, 'src', 'vendor')],
		app: [path.resolve(rootDir, 'src', 'main')]
	},
	output: {
		filename: '[name].bundle.js',
		publicPath: '/web-app/',
		path: path.resolve(rootDir, 'dist')
	},
	resolve: {		
		extensions: ['.ts', '.js', '.json'],
		modules: [path.resolve(rootDir, 'src'), 'node_modules']
	},
	module: {
		loaders: [
			{
				loaders: ['awesome-typescript-loader?tsconfig=tsconfig.json', 'angular2-template-loader'],
				test: /\.ts$/,
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/i,
				loader: 'file?name=dist/[name].[ext]'
			},
			{
				test: /\.css$/,
				exclude: path.resolve(rootDir, 'src', 'app'),
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
			},
			{
				test: /\.css$/,
				include: path.resolve(rootDir, 'src', 'app'),
				loader: 'raw'
			}
		]
	},
	plugins: [
		new CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills'],
			minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'body',
			template: path.resolve(rootDir, 'src', 'index.html')
		}),
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery',
			toastr: 'toastr'
		}),
		new FaviconsWebpackPlugin('../extras/icons/512x512.png'),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			options: {
				htmlLoader: {
					minimize: false, // workaround for ng2
					ignoreCustomFragments: [/\{\{.*?}}/],
					root: path.resolve(rootDir),
					attrs: ['img:src', 'link:href']
				}
			}
		})
	]
};

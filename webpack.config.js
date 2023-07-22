const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin')
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin')
const isProd = process.env.NODE_ENV === 'prod'
const isDev = !isProd
const hash = (name, ext) => (isProd ? `${name}.[contenthash:8].${ext}` : `${name}.${ext}`)

// HTML страницы
const pages = ['index']

// favicon & manifest.webmanifest
const pathToFavicon = './img/favicon/favicon.svg'
const outputPathToFavicon = 'img/favicon/' // Относительно dist, слэш в конце обязателен.
const appName = 'DJANET HAIR STUDIO' // name
const appShortName = 'DHAIR STUDIO' // short_name
const appDescription = 'DJANET HAIR STUDIO' // description
const appBackground = '#fde7ec' // background_color
const appThemeColor = '#83503a' // theme_color

// Группировка CSS медиа-запросов с помощью mqpacker
const isGroupingMediaQueries = true

module.exports = {
	mode: isProd ? 'production' : 'development',
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: ['./js/main.js']
	},
	output: {
		filename: hash('js/script', 'js'),
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		assetModuleFilename: '[path][name][ext]'
	},
	devServer: { port: 8888, hot: true, open: true },
	devtool: isDev ? 'inline-source-map' : false,
	plugins: [
		new MiniCssExtractPlugin({
			filename: hash('css/style', 'css')
		}),
		new FaviconsWebpackPlugin({
			logo: pathToFavicon,
			outputPath: outputPathToFavicon,
			prefix: outputPathToFavicon,
			mode: 'webapp',
			devMode: 'light',
			cache: true,
			favicons: {
				appName: appName,
				appShortName: appShortName,
				appDescription: appDescription,
				dir: 'ltr',
				lang: 'ru-RU',
				start_url: '/',
				background: appBackground,
				theme_color: appThemeColor,
				icons: {
					favicons: ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png'],
					appleIcon: [
						'apple-touch-icon-57x57.png',
						'apple-touch-icon-60x60.png',
						'apple-touch-icon-72x72.png',
						'apple-touch-icon-76x76.png',
						'apple-touch-icon-114x114.png',
						'apple-touch-icon-120x120.png',
						'apple-touch-icon-144x144.png',
						'apple-touch-icon-152x152.png',
						'apple-touch-icon-180x180.png'
					],
					android: ['android-chrome-192x192.png', 'android-chrome-512x512.png'],
					yandex: false,
					appleStartup: false,
					windows: false
				}
			}
		})
		// new FileManagerWebpackPlugin({
		// 	events: {
		// 		onEnd: {
		// 			copy: [{ source: './img/**', destination: path.resolve(__dirname, 'img') }]
		// 		}
		// 	}
		// })
	].concat(
		pages.map(
			page =>
				new HtmlWebpackPlugin({
					filename: `${page}.html`,
					template: `./${page}.html`,
					inject: 'body',
					minify: false
				})
		)
	),
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(s[ca]|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env'), isGroupingMediaQueries ? require('mqpacker') : undefined]
							}
						}
					},
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	optimization: {
		minimizer: [
			new ImageMinimizerWebpackPlugin({
				minimizer: {
					implementation: ImageMinimizerWebpackPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							[
								'svgo',
								{
									multipass: true,
									js2svg: {
										pretty: true,
										indent: 2
									},
									plugins: ['preset-default']
								}
							]
						]
					}
				}
			})
		]
	}
}

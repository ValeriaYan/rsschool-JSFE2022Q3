const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    context: path.resolve(__dirname),
    mode: 'development',
    entry: ['./movie-song/index.js'],
    output: {
        filename: '[name][contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'movie-song'),
        },
        port: 4200,
        hot: isDev,
        compress: true,
        open: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './movie-song/pages/quiz/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            "@": path.resolve(__dirname, "movie-song"),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true,
                },
            }
        ]
    }
}
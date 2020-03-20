const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const projectRoot = path.resolve(__dirname, '../');
const dirSrc = path.join(projectRoot, 'src');
const dirDist = path.join(projectRoot, 'dist');

const IS_DEV = (process.env.NODE_ENV === 'dev');
const imgPath = (IS_DEV === true) ? '/src/image/' : 'image/';

var version = new Date().getTime()/1000|0;
var enData = require(path.join(projectRoot, 'src/data/en.json'));
var chData = require(path.join(projectRoot, 'src/data/ch.json'));
if (IS_DEV !== true) {
    enData.imgPath = "image/";
    chData.imgPath = "image/";
}
// delete json cache
delete require.cache[require.resolve(path.join(projectRoot, 'src/data/en.json'))];
delete require.cache[require.resolve(path.join(projectRoot, 'src/data/ch.json'))];

module.exports = {
    entry: {
        bundle: path.join(dirSrc, 'js/main')
    },
    resolve: {
        alias: {
            assets: dirSrc
        },
        modules: [
            'node_modules',
            dirSrc,
            dirDist
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
            imgPath: imgPath
        }),
        new webpack.ProvidePlugin({
            _: 'underscore',
        }),
        //en
        new HtmlWebpackPlugin({
            template: path.join(projectRoot, 'src/index.twig'),
            filename: 'index.html',
            inject: 'head',
            data: enData
        }),
        //ch
        new HtmlWebpackPlugin({
            template: path.join(projectRoot, 'src/index.twig'),
            filename: 'index-ch.html',
            inject: 'head',
            data: chData
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(dirSrc, 'image'),
                to: path.join(dirDist, '/image')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: 'styles.css?v='+version
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&name=font/[hash].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use:  {
                    loader: "file-loader",
                    options: {
                        outputPath: 'image/',
                        name: '[name].[ext]',
                    }
                }
            },
            {
                test: /\.twig$/,
                use: 'twig-loader'
            }
        ]
    },
    node: {
        fs: "empty" // avoids error messages
    }
};

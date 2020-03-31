var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpackConfig = require('./webpack.config');
var version = new Date().getTime()/1000|0;

webpackConfig.devtool = 'cheap-module-source-map';
webpackConfig.plugins.push(
    new CleanWebpackPlugin(['dist'])
);

webpackConfig.output = {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js?v='+version,
};

module.exports = webpackConfig;

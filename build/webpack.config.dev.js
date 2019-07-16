const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: [paths.siteEntry],
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.siteTemplate
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    port: 4200,
    disableHostCheck: false,
    hot: true,
    hotOnly: false,
    overlay: true,
    quiet: true,
    inline: true,
    contentBase: paths.siteBase,
    watchContentBase: true,
    publicPath: '/',
    open: true,
    stats: {
      colors: true
    },
    clientLogLevel: 'none',
    historyApiFallback: true
  }
})

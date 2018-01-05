const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    HtmlWebpackPluginConfig
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

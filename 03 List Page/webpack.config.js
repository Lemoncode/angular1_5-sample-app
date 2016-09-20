var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: ['', '.js', '.ts']
  },

  entry: {
    app: './index.ts',
    styles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
      './css/site.css'
    ],
    vendor: [
      'bootstrap'
    ]
  },

  output: {
    path: path.join(basePath, "dist"),
    filename: '[name].js'
  },

  devServer: {
    contentBase: './dist', //Content base
    inline: true, //Enable watch and live reload
    host: 'localhost',
    port: 8080
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css')
      },
      //Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      {
        test: /\.png$/,
        loader: 'file?limit=0&name=[path][name].[hash].',
        exclude: /node_modules/
      }

    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}

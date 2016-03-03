'use strict';

// Depends
var path         = require('path');
var webpack      = require('webpack');
var Manifest     = require('manifest-revision-webpack-plugin');
var TextPlugin   = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var HtmlPlugin   = require('html-webpack-plugin');

// Local vars
var _path = __dirname;
var dependencies  = Object.keys(require(_path + '/package').dependencies);
var rootAssetPath = _path + 'app';

module.exports = {
  context: _path,
  debug: true,
  devtool: 'eval',
  devServer: {
    contentBase: './dist',
    info: true,
    hot: false,
    inline: true
  },
  entry: {
    application: _path + '/app/app.js',
    vendors: dependencies
  },
  output: {
    path: path.join(_path, 'dist'),
    filename: path.join('assets', 'js', '[name].bundle.[chunkhash].js'),
    chunkFilename: '[id].bundle.[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    alias: {
      _svg: path.join(_path, 'app', 'assets', 'svg'),
      _data: path.join(_path, 'app', 'data'),
      _fonts: path.join(_path, 'app', 'assets', 'fonts'),
      _modules: path.join(_path, 'app', 'modules'),
      _images: path.join(_path, 'app', 'assets', 'images'),
      _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
      _templates: path.join(_path, 'app', 'assets', 'templates')
    }
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: TextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader') },
      { test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i, loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]'] },
      { test: /\.(json)$/i, loaders: ['file?context=' + rootAssetPath + '&name=assets/[ext]/[name].[ext]'] },
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 5 versions'] })],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[chunkhash].js'),
    new TextPlugin('assets/css/[name].[chunkhash].css'),
    new Manifest(path.join(_path, 'manifest.json'), {
      rootAssetPath: rootAssetPath,
      ignorePaths: ['.DS_Store']
    }),
    new HtmlPlugin({
      title: 'Test case',
      chunks: ['application', 'vendors'],
      filename: 'index.html',
      template: path.join(_path, 'app', 'assets', 'templates', 'layouts', 'index.html')
    })
  ]
};

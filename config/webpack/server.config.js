const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir    = path.resolve(__dirname ) .replace('config/webpack', '');
const mainFile   = path.join(rootDir, 'src/client/main.js');
const outputPath = path.join(rootDir, 'build');

console.log('mainFile =>', mainFile);

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    mainFile
  ],
  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/server/public/assets',
        to:   'assets'
      }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/server/public/index.html',
      inject:   'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["es2015", "stage-0"]
      }
    }]
  }
};

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: 'mocha!./test',
  output: {
    path: path.join(__dirname),
    filename: 'test.compiled.js'
  },
  resolve: {
    extensions: ['.js'],
    root: path.join(__dirname, '../'),
    modulesDirectories: [path.join(__dirname, '../node_modules')]
  },
  stats: { colors: true },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};
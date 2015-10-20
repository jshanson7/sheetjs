const path = require('path');

module.exports = {
  entry: {
    sheetjs: ['./src/sheetjs'],
    StyleSheet: ['./src/StyleSheet']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: ['[name]'],
    libraryTarget: 'umd'
  },
  stats: { colors: true },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
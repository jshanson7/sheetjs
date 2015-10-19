const path = require('path');

module.exports = {
  entry: {
    sheet: ['./src/sheetjs'],
    StyleSheet: ['./src/StyleSheet']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: ['[name]'],
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
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
      }
    ]
  }
};
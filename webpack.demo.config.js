const path = require('path');

module.exports = {
  entry: path.join(__dirname, './demo/src/index'),
  output: {
    path: path.join(__dirname, '/demo/dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'StyleSheet': path.join(__dirname, './src/StyleSheet.js')
    },
    root: path.join(__dirname, './demo')
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
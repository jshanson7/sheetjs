const path = require('path');

module.exports = {
  entry: path.join(__dirname, './demo/src/index'),
  output: {
    path: path.join(__dirname, '/demo/dist'),
    filename: 'index.compiled.js'
  },
  stats: { colors: true },
  module: {
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
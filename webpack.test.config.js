const path = require('path');

module.exports = {
  entry: './test/test.js',
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'test.compiled.js'
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
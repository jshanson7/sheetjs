const path = require('path');

module.exports = {
  entry: 'mocha!./test/test',
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'test.compiled.js'
  },
  resolve: {
    extensions: ['.js']
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
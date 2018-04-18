var path = require('path');

module.exports = {
  entry: './lib/ansi_to_html',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'ansi_to_html.umd.js',
    libraryTarget: 'umd',
    library: 'AnsiToHtml'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};

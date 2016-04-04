module.exports = {
  entry: './src/js/index.js', // entry point
  devtool: 'inline-source-map', // source mapping
  output: {
    path: __dirname, // dist
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    ]
  }
}

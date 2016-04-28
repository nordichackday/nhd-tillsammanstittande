module.exports = {
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["es2015-node5", "stage-0"]
      }
    }]
  }
};

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: './build/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', 'index.jsx', 'index.js']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: '6to5' }
    ]
  }
};

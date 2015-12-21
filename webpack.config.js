var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: '/assets/js/', // doesn't matter, gulp.dest
    filename: '[name].js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ] 
  },
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
  // plugins: [commonsPlugin]
};


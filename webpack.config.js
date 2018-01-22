var webpack = require('webpack');
var path = require("path");
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  devtool: "source-map",
	entry: {
		home: "./src/components/home/index.js",
	},
	output: {
		path: path.join(__dirname, "public"),
		filename: "[name].bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({ 
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
  
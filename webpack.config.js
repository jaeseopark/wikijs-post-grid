const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'wikijs-post-grid.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'WikiJSPostGrid',
      type: 'umd',
    },
    globalObject: 'this',
  },
};
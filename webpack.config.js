/* eslint-disable */
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
  optimization: {
    concatenateModules: false,
  },
  target: 'node',
  externals: [nodeExternals({ modulesFromFile: true })],
  module: {
    rules: [
      {
        test: /\.(ts?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
}

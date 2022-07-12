const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {appStyleRules} = require('../rules/styleRules');
const {appFileRules} = require('../rules/fileRules');
const {appScriptRules} = require('../rules/scriptRules');

module.exports = {
  entry: path.resolve(process.cwd(), './src/index.ts'),
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(process.env.API_HOST),
      AUTO_CONNECT: JSON.stringify(process.env.AUTO_CONNECT),
      DEFAULT_USER: JSON.stringify(process.env.DEFAULT_USER),
      DEFAULT_PASSWORD: JSON.stringify(process.env.DEFAULT_PASSWORD),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin(), // TODO: FUI-294 - Investigate working directory error
    new MiniCssExtractPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [
        /\.js$/,
        /\.d\.ts$/,
      ],
    }),
  ],
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      appScriptRules.typescript(),

      // Files
      appFileRules.fonts(),
      appFileRules.html(),
      appFileRules.images(),

      // Styles
      appStyleRules.headCss(),
      appStyleRules.css(),
      appStyleRules.sass(),
    ],
  },
  experiments: {
    topLevelAwait: true,
    lazyCompilation: false,
    // outputModule: true,
  },
};

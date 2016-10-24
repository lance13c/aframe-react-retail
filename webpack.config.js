const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('babel-polyfill');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const ENTRY_POINTS = [
  './src/js/app'
];

const JS_LOADERS = [
  'babel?cacheDirectory&presets[]=react,presets[]=es2015,presets[]=stage-0'
];

const PLUGINS = [
  new CopyWebpackPlugin([
    
    // Copy directory contents to {output}/to/directory/
    { from: 'assets', to: 'assets' },
    
  ], {
    ignore: [],
    
    // By default, we only copy modified files during
    // a watch or webpack-dev-server build. Setting this
    // to `true` copies all files.
    copyUnmodified: true
  })
];

const PATHS = {
  images: './assets/images/'
};


if (IS_PRODUCTION) {
  // Uglify in production.
  PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          except: ['$super', '$', 'exports', 'require']
      },
      sourcemap: false
    })
  );
}

module.exports = {
  entry: ENTRY_POINTS,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: 'bundle.js',
    // Bundle will be built at ./src/media/js.
    path: './build',
    publicPath: '/',
  },
  module: {
    noParse: [
      /node_modules\/aframe\/dist\/aframe.js/,
    ],
    loaders: [
      {
        // JS.
        exclude: /(node_modules|bower_components)/,
        loaders: JS_LOADERS,
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]',
        include: PATHS.images
      }
    ],
  },
  plugins: PLUGINS,
  resolve: {
    extensions: ['', '.js', '.json'],
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: [
      'src/js',
      'node_modules',
    ]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  }
};

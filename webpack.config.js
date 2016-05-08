var path = require('path');
var util = require('util');
var opn = require('opn');
var autoprefixer = require('autoprefixer-core');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');

var ENV = process.env.NODE_ENV || 'development';
var DEBUG = ENV === 'development';
var TEST = ENV === 'test';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));
var cssBundle = path.join('css', util.format('[name].%s.css', pkg.version));

/**
 * Plugins
 */
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.ContextReplacementPlugin(/bindings$/, /^$/),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new webpack.ProvidePlugin({
    goog: 'google-closure-library/closure/goog/base'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_debugger: false,
      warnings: false
    }
  })
];

if (DEBUG) {
  /*
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
  */
} else if (!TEST) {
  plugins.push(
    new ExtractTextPlugin(cssBundle, {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  );
}

/**
 * Loaders
 */
var jsxLoader;
var sassLoader;
var cssLoader;
var fileLoader = 'file-loader?name=[path][name].[ext]';
var htmlLoader = [
  'file-loader?name=[path][name].[ext]',
  'template-html-loader?' + [
    'raw=true',
    'engine=lodash',
    'version=' + pkg.version,
    'title=' + pkg.name,
    'debug=' + DEBUG
  ].join('&')
].join('!');
var jsonLoader = ['json-loader'];

var sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../app/scss'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules')
];

if (DEBUG || TEST) {
  jsxLoader = [];
  if (!TEST) {
    // jsxLoader.push('react-hot');
  }
  jsxLoader.push('babel-loader?optional[]=runtime&stage=0&plugins=rewire');
  sassParams.push('sourceMap', 'sourceMapContents=true');
  cssLoader = [
    'style-loader',
    'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader'
  ].join('!');
  sassLoader = [
    cssLoader,
    'sass-loader?' + sassParams.join('&')
  ].join('!');
} else {
  jsxLoader = ['babel-loader?optional[]=runtime&stage=0&plugins=rewire'];
  sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader?modules&localIdentName=[hash:base64:5]',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!'));
  cssLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader?modules&localIdentName=[hash:base64:5]',
    'postcss-loader'
  ].join('!'));
}

var loaders = [
  {
    // set "COMPILED" global for closure-library
    test: /google-closure-library\/closure\/goog/,
    exclude: [/testing/],
    loaders: [
      'imports?COMPILED=>false'
    ]
  },
  {
    // set up "goog" global
    test: /google-closure-library\/closure\/goog\/(base|bootstrap)/,
    exclude: [/testing/],
    loaders: [
      'imports?this=>{goog:{}}&goog=>this.goog',
      'exports?goog'
    ]
  },
  {
    // Loader for closure library
    test: /google-closure-library\/closure\/goog\/.*\.js/,
    loaders: ['closure-loader'],
    exclude: [/base\.js$/, /bootstrap\/nodejs\.js$/]
  },
  {
    // loader for blockly closure code
    test: /blockly\/.*\.js/,
    loaders: ['closure-loader']
  },
  {
    // loader for entities json files
    test: /entities\/maps\/.+?.json/,
    exclude: [/stats.json/],
    loaders: jsonLoader
  },
  {
    test: /\.jsx?$/,
    exclude: [/node_modules/],
    loaders: jsxLoader
  },
  {
    test: /\.css$/,
    loader: cssLoader
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
    loader: fileLoader
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: jsonLoader
  },
  {
    test: /\.html$/,
    loader: htmlLoader
  },
  {
    test: /\.scss$/,
    loader: sassLoader
  },
  {
    test: /\.ejs$/,
    loader: 'ejs-compiled?htmlmin'
  }
];

/**
 * Main config
 */

var entry = {
  app: ['./app.jsx']
};

if (DEBUG) {
  // Set up dev-server entry points
  entry.app.push(
    util.format(
      'webpack-dev-server/client?http://%s:%d',
      pkg.config.devHost,
      pkg.config.devPort
    )
  );
  // entry.app.push('webpack/hot/dev-server');
}

var config = {
  context: path.join(__dirname, './app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG || TEST ? 'eval' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    alias: {
      // google-closure-library refers to promises_aplus_tests
      'promises_aplus_tests': 'promises-aplus-tests',
      'popupdatepicker.css$': 'popupdatepicker.css',
      'cssom_test_import_1.css$': 'cssom_test_import_1.css'
    }
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: false,
    noInfo: true,
    inline: true,
    stats: { colors: true }
  },
  closureLoader: {
    paths: [
      path.join(__dirname, 'app', 'blockly'),
      path.join(__dirname, 'node_modules', 'google-closure-library', 'closure', 'goog')
    ],
    es6mode: true,
    watch: false
  }
};

/**
 * Dev server
 */
// Run dev server if file is called from commandline with server argument
if (!module.parent && process.argv.length > 2 && process.argv[2] === 'server') {
  var server = new WebpackDevServer(
    webpack(config),
    config.devServer
  );

  var port = pkg.config.devPort;
  var host = pkg.config.devHost;

  server.listen(port, host, function (err) {
    if (err) throw err;
    var url = util.format('http://%s:%d', host, port);
    console.log('Listening at %s', url);
    opn(url);
  });
}

module.exports = config;

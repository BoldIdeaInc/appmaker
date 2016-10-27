var path = require('path');
var util = require('util');
var opn = require('opn');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
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
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_debugger: false,
      warnings: false
    }
  }),
  new webpack.DefinePlugin({
    ENV: JSON.stringify(require(process.env.APP_CONFIG || './config.dev.json')),
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new StatsPlugin('stats.json', {
    chunkModules: true
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
    new webpack.NoErrorsPlugin()
  );
}

/**
 * Loaders
 */
var jsxLoader;
var sassLoader;
var cssLoader;
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
var jsonLoader = ['json'];

var sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.join(__dirname, 'app/scss'),
  'includePaths[]=' + path.join(__dirname, 'node_modules')
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
    'css-loader?sourceMap&modules&localIdentName=[local]'
  ].join('!');
  sassLoader = [
    cssLoader,
    'sass-loader?' + sassParams.join('&')
  ].join('!');
} else {
  jsxLoader = ['babel-loader?optional[]=runtime&stage=0&plugins=rewire'];
  sassLoader = ExtractTextPlugin.extract('style', [
    'css-loader?modules&localIdentName=[hash:base64:5]',
    'sass-loader?' + sassParams.join('&')
  ].join('!'));
  cssLoader = ExtractTextPlugin.extract('style', [
    'css-loader?modules&localIdentName=[hash:base64:5]'
  ].join('!'));
}

// sassLoader = 'style-loader!css-loader!sass-loader';

var loaders = [
  {
    test: require.resolve('./app/applab/main.js'),
    loader: 'expose-loader?Applab'
  },
  {
    test: require.resolve('./app/scss/app.scss'),
    loader: 'expose-loader?Styles'
  },
  {
    // shim for quadtree.js which doesn't export anything
    test: require.resolve('droplet-editor/vendor/quadtree.js'),
    loader: 'exports-loader?init=QUAD.init'
  },
  {
    // loader for entities json files
    test: /entities\/maps\/.+?.json$/,
    exclude: [/stats.json/],
    loaders: jsonLoader
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$|\.mp3$/,
    loader: 'file-loader?name=./app/[path][name].[ext]'
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
    loader: 'ejs-compiled-loader?htmlmin'
  },
  {
    test: /\.coffee$/,
    loader: 'coffee-loader'
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
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.coffee'],
    alias: {
      'droplet-editor': path.join(__dirname, 'node_modules/droplet-editor/src/main.coffee')
    }
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir),
    profile: true,
    hot: false,
    noInfo: true,
    inline: true,
    stats: { colors: true }
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
    console.log('devserver running on %s', url);
    opn(url);
  });
}

module.exports = config;

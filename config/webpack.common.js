const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ngcWebpack = require('ngc-webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = function (options) {
  isProd = options.env === 'production';
  return {

    entry: {
      'ontimize-web-ngx-datatable': helpers.root('tmp/index.ts')
    },

    resolve: {
      extensions: ['.ts', '.js', '.html']
    },

    // rest of config here
    externals: [
      {
        'ontimize-web-ng2': {
          root: ['ontimize-web-ng2'],
          commonjs: 'ontimize-web-ng2',
          commonjs2: 'ontimize-web-ng2',
          amd: 'ontimize-web-ng2'
        }
      },
      /^\@angular\//,
      /^\@ngx-translate\//,
      /^\@rxjs\//
    ],

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader?configFileName=config/tsconfig.webpack.json',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        /* Embed files. */
        {
          test: /\.(html|css)$/,
          loader: 'raw-loader',
          exclude: /\.async\.(html|css)$/
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: ['styles.scss']
        },
        {
          test: /\.(ts|js)$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        }
        // , {
        //   test: /\.json$/,
        //   use: 'json-loader'
        // }, {
        //   test: /\.css$/,
        //   use: ['to-string-loader', 'css-loader'],
        //   include: [helpers.root('src')]
        // }, {
        //   test: /\.(jpg|png|gif)$/,
        //   use: 'file-loader'
        // }, {
        //   test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        //   use: 'file-loader'
        // }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('./ontimize')
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: false,
        tsConfig: helpers.root('tsconfig.ngc.json'),
        resourceOverride: helpers.root('config/resource-override.js')
      })

    ]
  };
}

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    scripttag: path.resolve(__dirname, '../src/script.js')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.archieml/,
        use: {loader: '@newsdev/archieml-loader'}
      },
      {
        test: /\.js$/,
        use: {loader: 'babel-loader',
          options:
          {
            cacheDirectory: true,
            presets: ['@babel/env'],
          }
        }
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'},
          {loader: 'css-loader?url=false'}]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  /*output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'application.js',
    devtoolModuleFilenameTemplate: '[resource-path]' // copied from Mathias, see: https://webpack.github.io/docs/configuration.html#output-devtoolmodulefilenametemplate
  },*/
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        }
      }
    },
    occurrenceOrder: true
  },
  resolve: {
    // had problems importing react in src/components with the following option, so I disabled it again.
    //root: 'src', // allows us to specify import paths as if they were from the root of the src directory. This makes it very easy to navigate to files regardless of how deeply nested your current file is. https://webpack.github.io/docs/configuration.html#resolve-root
    extensions: ['.js', '.css'] // '' is required for Webpack to work!?!
  },
  stats: {
    colors: true
  }
};

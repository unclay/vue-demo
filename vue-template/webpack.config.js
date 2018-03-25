var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  entry: {
    app: [
      './src/main.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js?[hash:8]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy: {
      '/': {
        // target: `http://${process.env}/dist`,
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
}

// if (process.env.NODE_ENV === 'development') {
  
// }

if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = '#source-map'
  // webpackConfig.devtool = '#eval'

  // http://vue-loader.vuejs.org/en/workflow/production.html
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      chunks: ['vendor', 'manifest', 'app']
    })
  ])
} else {
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject : true,
      chunks: ['vendor', 'manifest', 'app']
    })
  ])
}

module.exports = webpackConfig;

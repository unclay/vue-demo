var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  entry: {
    app: './src/main.js',
    vendor: ['vue', 'vue-router', 'vuex', 'axios', 'qs'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js?[hash:7]'
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
          name: '[name].[ext]?[hash:7]'
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  // webpackConfig.devtool = '#source-map'
  webpackConfig.devtool = false
  webpackConfig.output.publicPath = 'dist/';

  // http://vue-loader.vuejs.org/en/workflow/production.html
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      chunks: ['vendor', 'manifest', 'app'],
    })
  ])
} else {
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['vendor', 'manifest', 'app'],
    })
  ])
}

module.exports = webpackConfig;

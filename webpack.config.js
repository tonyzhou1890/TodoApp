const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin')
const clean = require('clean-webpack-plugin');


const config = {
  target: 'web',
  entry: path.join(__dirname,'src/index.js'),
  output:{
    filename:"bundle.[hash:8].js",
    path:path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'images/[name]-aaa.[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new clean(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

if (isDev){
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin
  )
}else{
  config.entry = {
    app:path.join(__dirname,'src/index.js'),
    vendor:['vue']
  }
  config.output.filename = 'js/[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback:'style-loader',
        use:[
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ],
        publicPath: '../'
      })
    },
  )
  config.plugins.push(
    new ExtractPlugin('css/styles.[hash:8].css'),
    // new webpack.optimize.SplitChunksPlugin({
    //   name:'vendor'
    // }),
    // new webpack.optimize.SplitChunksPlugin({
    //   name:'runtime'
    // }),
    new HTMLPlugin({
      chunks: ['vendor','app'],
      chunksSortMode: 'manual'
    })
  )
  config.optimization = {
    splitChunks:{
      cacheGroups:{
        commons:{
          name:'vendor',
          minChunks:2,
          chunks: 'initial'
        }
      }
    }
  }
}

module.exports = config;
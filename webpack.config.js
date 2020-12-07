const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env = {}) => {

  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ]
  };

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        buildTime: new Date().toLocaleDateString()
      }),
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css'
        })
      )
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',

    output: {
      path: path.resolve(process.cwd(), 'dist'),
    },

    module:  {
      rules: [
        // Loader Babel
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
              plugins: [
                [
                  "@babel/plugin-proposal-class-properties"
                ]
              ]
            }
          }
        },

        // Loader Images
        {
          test: /\.(png|jpg|jpeg|ico)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:hash:7].[ext]'
            }
          }]
        },

        // Loader Fonts
        {
          test: /\.(ttf|wof|eot|otf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }]
        },
        // Loader CSS
        {
          test: /\.css$/,
          use: getStyleLoaders()
        },

        // Loader SASS
        {
          test: /\.s[ac]ss$/,
          use: [ ...getStyleLoaders(), 'sass-loader']
        },
      ]
    },

    plugins: getPlugins(),

    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve('src'),
        '@components': path.resolve('src/components'),
      }
    },

    devServer: {
      overlay: true,
      open: true,
      hot: true,
    }
  }
};
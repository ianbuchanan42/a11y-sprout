const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// later maybe setup for production

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
  ],
  // devServer: {
  //   historyApiFallback: true,
  //   proxy: [
  //     {
  //       context: ['/api'], // Specify paths that should be proxied
  //       target: 'http://localhost:3000', // API server
  //       changeOrigin: true,
  //       logLevel: 'info', // Log level for debugging
  //     },
  //   ],
  //   hot: true,
  //   port: 8080,
  // },
  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dist'), // Match output path
    },
    hot: true, // Enable HMR
    historyApiFallback: true, // Fallback for routing
    headers: { 'Access-Control-Allow-Origin': '*' }, // CORS headers
    proxy: [
      {
        context: ['/api'], // Proxy any requests starting with /api
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug', // For debugging purposes
      },
      {
        context: ['/assets'], // Proxy any requests starting with /assets
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};

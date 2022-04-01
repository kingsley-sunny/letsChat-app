const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'LetsChat',
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html')
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                
            }
          },
        ],
    },
    
};

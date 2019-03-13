const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        filename: 'grove.js',
        path: path.resolve(__dirname, 'dist')
    }
};
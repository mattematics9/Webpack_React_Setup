const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', 
        assetModuleFilename: '[name][ext]',
        clean: true 
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},  
            {test: /\.(svg|ico|png|jpeg|jpg|gif|webp)$/, type: 'asset/resource'},
            {   test: /\.js$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Webpack Setup',
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/temp.html')
    })],
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve('__dirname', 'dist'),
        port: 5001, 
        open: true,
        hot: true  
    }
}
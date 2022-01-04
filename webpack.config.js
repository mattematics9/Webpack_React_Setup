const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  //this is a javascript function.  we can invoke it in the configuration.

module.exports = {
    //configurations allows us to just run './node_modules/.bin/webpack' instead of './node_modules/.bin/webpack ./src/index.js --mode=development'.  Mode can also be 'production' for the minified version.
    //development allows for source mapping, so I know where the errors are coming from.  With production, we want to minimize, compress, shrink.  2 different environements.  instead of minifying with a production value, you could also indicate a specific plugin for that (under the hood that is what 'mode: production' is doing).
    mode: 'development',
    //could add multiple entry points if we wanted.  thats why we include the key 'main'.  other key names would be copied over into dist as well.
    entry: {
        // if we didn't specify the main entry, it will look for ./src/index.js by default
        main: path.resolve(__dirname, './src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', //name will be main.  contenthash will be a unique hash.  that way, your browser will be able to cache the file, but it will cache that specific version.  its like version management for that file.  
        //this names the image.  name is whatever its name is when we imported it (logo), and whatever its extension is.
        assetModuleFilename: '[name][ext]',
        clean: true //empty the dist folder before rebuilding it
    },
    // loaders: a loader is a way to preprocess a file.  Bundlers are only prepared to handle JS files, so webpack needs to preprocess all the other files and assets before they get bundled. This is where Loaders come into the picture.  webpack by default understands json and javascript.  it doesn't know what an image file is, an svg file, html file, css file, sass file, etc... it doesn't know how to handle them.  that's what loaders are for.  you can have loaders for all different file types that will look inside the src folder, find them, and turn them into modules that can be imported by .js files and then copied into our dist folder. Loaders are transformations that are applied on the source code of a module.  Basically loaders allow you to do a number of things like transform files from a different language to javascript, or inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules. 
    // css loaders, for example, will inject css into the Html file that the html plugin has created.   
    module: {
        rules: [
            //css loader: if you ever come across a file that ends with css, use this loader, and provide the loader or array of loaders that we want to use.  same thing with javascript and babel.  and treating images like modules.  etc...  
            {test: /\.css$/, use: ['style-loader', 'css-loader']},  //they do need to go in this order, since they are read right to left.  the css-loader looks for the file, turns it into a module, and gives it over to the javascript.  style-loader will take the thing thats been imported by the javascript file and inject it into the html file.  the 'use' property allows you to add multiple loaders.  if it was just one loader then you can use write 'loader: css-loader'.  
            //image loader: in webpack 5 there is an asset/resource loader built in.  no need to install anything.  this is a built in loader for files that you want to copy into your distribution folder and also load it so it can be imported by app.js.  
            {test: /\.(svg|ico|png|jpeg|jpg|gif|webp)$/, type: 'asset/resource'},
            //babel (js) loader: to transpile ES6 to ES5 so browsers can read modern js syntax.  exclude node_modules because it will look in there since it has javascript files.  
            {   test: /\.js$/, 
                exclude: /node_modules/, 
                //@babel/core is the main part of babel (don't see it here but had to install anyway), @babel/preset-env is a preset defining which new JavaScript features to transpile, and babel-loader is a package to enable babel to work with webpack.
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    // plugins: allow us to do things that loaders cannot do.  Loaders are applied on a per file basis (it tests for a certain file extention and then applies it).  Plugins are applied to your bundle before it is outputed.  Its a transformation to your whole code.  you can tap into the webpack compiler directly using its plugin system.  you tap into the entire compilation lifecycle.  they do a bit of extra work.  htmlwebpack plugin allows us to dynamically create an html file.  we give it options.  template option allows you to start with custom html that you want (see ./src/temp.html). 
    plugins: [new HtmlWebpackPlugin({
        title: 'Webpack Setup',
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/temp.html')
    })],
    //source mapping keeps track of where all the content (everything--css, javascript, images, etc...--packaed inside of main.[contenthash].js) came from.  it lets the browser know where these things came from, so if there is an error in the browser, it can tell what file the error originated from.  
    devtool: 'inline-source-map',
    devServer: {
        //although things are being served from memory, it is also possible that there are some static files that are being referenced, and we need to say where those are being located.  
        static: path.resolve('__dirname', 'dist'),
        port: 5001, //default is 8080
        open: true,
        hot: true //hot reload: if I change some stuff inside of src and save it, it compiles it, puts it in memory, and then its served to the browser automatically.  
    }
}
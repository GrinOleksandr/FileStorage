let path = require('path');

let ExtractTextPlugin = require("extract-text-webpack-plugin");



let conf = {
    entry: {
        main: './src/index.js',
        shareFile: './src/shareFile.js',

    },
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: '[name].js',
        publicPath: 'public/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })

                // exclude: '/node_modules/'
            },

        ]
    },
    plugins: [
        new ExtractTextPlugin("css/style.css"),
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    console.log(options);

    conf.devtool = production
        ? false
        : 'eval-sourcemap';
    return conf;
};




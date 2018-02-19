/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

// ExtractTextPlugin moves all the required *.css modules in entry chunks into a separate CSS file.
// So your styles are no longer inlined into the JS bundle.
// But we have to import css in js file.  Just css in bundled.
// We can use without sass, with just css-loader.

// to autoprefix in webpack use postcss-loader and
// just add 'postcss-loader' in extratplugin use and
// create postcss.config.js, check below!
// https://github.com/postcss/autoprefixer#webpack

var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                    includePaths: ["./style.scss"]
                }
            }]
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: "file-loader",
            options: {
                name: "fonts/[name].[ext]",
            },
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: "images/[name].[ext]"
                    }
                }
            ]
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
    ]
};
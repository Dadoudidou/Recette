const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
require('es6-promise').polyfill();
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}


//Production ou developpement
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
console.log("Export en mode " + process.env.NODE_ENV.toUpperCase());


var extractCSS = new ExtractTextPlugin("css/styles.css");

const webpackConfig = {
	node: { fs: "empty" },
	entry: undefined,
	output: undefined,
	devtool: (production) ? false : "source-map",
	debug: !production,
	resolve: {
        root: path.resolve(__dirname),
		extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx']
	},
	module: {
	},
	plugins: [],
	cache: false
};

// **********************
// ENTRY
// **********************
webpackConfig.entry = [
    path.resolve(__dirname, "src/main.tsx")
];

// **********************
// OUTPUT
// **********************
webpackConfig.output = {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
	filename: "bundle.js",
};

// **********************
// PLUGINS
// **********************

//Environnement
webpackConfig.plugins.push(new webpack.DefinePlugin({
	PRODUCTION: JSON.stringify(production),
	'process.env': {
		NODE_ENV: JSON.stringify(process.env.NODE_ENV)
	}
}));


//template html files
webpackConfig.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src/application/index.html"),
    hash: false,
    //favicon: path.resolve(__dirname, ""),
    filename: "index.html",
    inject: "body",
    minify: {
        collapseWhitespace: (production) ? true : false
    }
}));

//webpackConfig.plugins.push(extractCSS);

//Compression
if (production) {
	webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		mangle: true,
		compress: {
			warnings: false, // suppression des warnings
		},
	}));
}


webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

// **********************
// MODULES
// **********************
webpackConfig.module.loaders = [];

//---- Loader typescript
webpackConfig.module.loaders.push({ test: /\.tsx?$/, loaders: ["react-hot-loader/webpack", "ts-loader"] });
//webpackConfig.module.loaders.push({ test: /\.tsx?$/, loaders: ["ts-loader"] });

//---- Loader sass
/*
 * set GYP_MSVS_VERSION=2013
 * npm config set msvs_version 2013 --global
 * npm install node-sass --dev
 */

webpackConfig.module.loaders.push({
    test: /\.scss$/,
    //loader: extractCSS.extract(["css", "sass"])
    loaders: ["style","css?sourceMap", "sass?sourceMap"]
});

//---- Loader css
webpackConfig.module.loaders.push({
    test: /\.css$/,
    loaders: ["style", "css?sourceMap"]
});

//---- Loader fonts
webpackConfig.module.loaders.push({
    test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file",
    query: {
        name: "fonts/[name].[ext]",
        limit: 10000
    }
});


//---- Loader file
webpackConfig.module.loaders.push({
    test: /\.(png|jpg|gif)$/,
    loader: "url",
    query: {
        name: "img/img-[hash:6].[ext]",
        limit: 10000
    }
});


// **********************
// EXTRACT TEXT PLUGIN FOR CSS
// **********************
webpackConfig.module.loaders.filter(function (loader) {
    if (loader.loaders === undefined) return false;
    return loader.loaders && loader.loaders.find(function (name) {
        return /css/.test(name.split('?')[0])
    })
}).forEach(function (loader) {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
})

webpackConfig.plugins.push(new ExtractTextPlugin('css/main.css', {
    allChunks: true
}))


webpackConfig.devServer = {};
webpackConfig.devServer.contentBase = path.resolve(__dirname, "dist");
webpackConfig.devServer.port = 10080;
//webpackConfig.devServer.hot = true;

module.exports = webpackConfig;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        app: [PATHS.src]
    },
    output: {
        path: PATHS.dist,
        filename: 'js/[name].js',
        publicPath: '/'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            styles: path.resolve(__dirname, '../src/styles'),
            utils: path.resolve(__dirname, '../src/utils')
        }
    },
    devtool: 'eval-sourcemap',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            camelCase: 'dashes',
                            localIdentName: '[path][name]__[local]'
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {minimize: true}
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {minimize: true}
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader'
            },
            // {
            //     test: /\.(woff2?|ttf|eot|svg|otf)(\?.*)?$/,
            //     use: 'url-loader'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../src/index.html',
            filename: 'app.html',
            chunks: ['app', 'vendors', 'runtime']
        }),

        new webpack.HotModuleReplacementPlugin(),  // 热更新插件
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.src, 'favicon.ico'),
                to: path.join(PATHS.dist, 'favicon.ico')
            },
            {
                from: path.join(PATHS.src, 'assets/'),
                to: path.join(PATHS.dist, 'assets/')
            }
        ]),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            VERSION: JSON.stringify('1.0.0'),
            DEBUG: true
        })
    ],
    devServer: {
        contentBase: PATHS.dist, //启动本地服务时访问的根目录
        index: 'app.html',
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8088, // 配置端口
        publicPath: 'http://localhost:8088/',
        hot: true,
        historyApiFallback: {
            index: 'app.html'
        }
    },
    stats: {
        children: false
    }
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: {
        app: [PATHS.src]
    },
    output: {
        path: PATHS.dist,
        filename: 'js/[name].[chunkhash].min.js',
        publicPath: './'
    },
    optimization: {
        minimizer: [
            // 自定义js优化配置，将会覆盖默认配置
            new UglifyJsPlugin(),
        ],
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    // test: /[\\/]node_modules[\\/]/,
                    test: /react|react-dom|react-router|prop-types|reformat-number/,
                    name: 'vendors',
                    enforce: true
                    // chunks: 'all'
                },
                antd: {
                    // test: /[\\/]node_modules[\\/]/,
                    test: /antd/,
                    name: 'antd'
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
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            camelCase: 'dashes',
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {minimize: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            modifyVars: {
                                "@icon-url": '/assets/fonts/iconfont'  // 已经没用了，新版本采用内联进js，等官方更新
                            }
                        }

                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {minimize: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader?limit=8192&name=global/img/[hash:8].[name].[ext]'
            },
            // {
            //     test: /\.(woff2?|ttf|eot|svg|otf)(\?.*)?$/,
            //     use: 'url-loader?limit=8192&name=global/fonts/[hash:8].[name].[ext]'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../src/index.html',
            inlineSource: '.(css)$',
            filename: 'app.html',
            favicon: '../src/favicon.ico',
            chunks: ['app', 'vendors', 'antd', 'runtime']
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new InlineManifestWebpackPlugin(),
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].min.css'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('1.0.0'),
            DEBUG: false
        })
    ]
};

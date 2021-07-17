const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

// USER CONFIGURATION
const SOURCE_FOLDER = resolve('src')
const TARGET_FOLDER_PRODUCTION = resolve('docs')
const TARGET_FOLDER_DEVELOPMENT = resolve('dev')
const ENTRY_FILE = 'index.tsx'
const HTML_TEMPLATE = 'index.html'
// const RANDOM_ASSET_URI = 'RANDOM_ASSET_FILE'

// PRODUCTION CONFIG SETTINGS
const production = {
    name: 'prod',
    mode: 'production',
    output_folder: TARGET_FOLDER_PRODUCTION,
    plugins: [
        // OPTIONAL way to copy arbitrary assets ('' is the bundle folder)
        // new CopyPlugin({
        //     patterns: [ { from: `${SOURCE_FOLDER}/${RANDOM_ASSET_URI}`, to: '' } ]
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Template',
            template: resolve(SOURCE_FOLDER, HTML_TEMPLATE)
        })
    ]
}

// DEVELOPMENT CONFIG SETTINGS
const development = {
    name: 'dev',
    mode: 'development',
    output_folder: TARGET_FOLDER_DEVELOPMENT,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Template',
            template: resolve(SOURCE_FOLDER, HTML_TEMPLATE)
        }),
        new HotModuleReplacementPlugin()
    ]
}

// Internal constants
const _DEVELOPMENT_MODE = 'development'

// MAP CONFIG SETTINGS TO FINISHED CONFIG
const Config = (config_settings) => ({
    // Merge options from data
    name: config_settings.name,
    mode: config_settings.mode,
    // Entry
    entry: resolve(SOURCE_FOLDER, ENTRY_FILE),
    // Module resolution
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json' ]
    },
    // Output
    output: {
        path: config_settings.output_folder,
        filename: '[name].js'
    },
    // Plugins
    plugins: config_settings.plugins,
    // Devtool
    devtool: config_settings.mode === _DEVELOPMENT_MODE ? 'source-map' : false,
    // Webpack dev server
    devServer: {
        port: 3000
    },
    // Module settings
    module: {
        rules: [
            // Javascript / Typescript
            {
                test: /\.m?(j|t)sx?$/,
                include: SOURCE_FOLDER,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Typescript and React babel presets
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            // CSS
            // 4 loaders: style-loader (development), MiniCssExtractPlugin (production), css-loader, postcss-loader (optional)
            {
                test: /\.css$/i,
                include: SOURCE_FOLDER,
                exclude: /(node_modules|bower_components)/,
                use: [
                    config_settings.mode === _DEVELOPMENT_MODE
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // Options
                                        }
                                    ]
                                ]
                            }
                        }
                    }
                ]
            },
            // Asset loading support (images or fonts)
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                type: 'asset'
            },
            // Resolve HTML imports (e.g. <img src="...">)
            {
                test: /\.(html)$/,
                use: [ 'html-loader' ]
            }
        ]
    },
    optimization: {
        minimizer: [
            // '...' enables Webpack 5 minimizers in addition to custom minimizers
            '...',
            new CssMinimizerPlugin()
        ]
    }
})

// Export mapped Webpack configs
module.exports = [ production, development ].map(Config)

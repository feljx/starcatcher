const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
// const { HotModuleReplacementPlugin } = require('webpack')

const options = {
    static: ['./dev'],
    host: 'localhost',
    port: '8000',
    open: false,
    progress: 'minimal',
    // liveReload: true,
}

const bundleName = 'index'
const jsPath = `${path.resolve('src')}/app.js`
const htmlPath = `${path.resolve('src')}/app.html`

module.exports = [
    // PRODUCTION
    {
        name: 'build',
        mode: 'production',
        entry: {
            [bundleName]: jsPath,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'starcatcher template',
                template: htmlPath,
            }),
        ],
        watch: false,
        output: {
            filename: '[name].js',
            path: path.resolve('.'),
            publicPath: '/',
        },
    },

    // DEVELOPMENT
    {
        name: 'serve',
        mode: 'development',
        entry: {
            [bundleName]: [jsPath, 'webpack-plugin-serve/client'],
        },
        watch: true,
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*', '!sanitize.css'],
            }),
            new HtmlWebpackPlugin({
                title: 'galerie template',
                template: htmlPath,
            }),
            // new HotModuleReplacementPlugin(),
            new Serve(options),
        ],
        output: {
            filename: '[name].dev.js',
            path: path.resolve('./dev'),
            publicPath: '/',
        },
        // devServer: {
        // 	contentBase: path.resolve('dev'),
        // 	compress: true,
        // 	port: 8000,
        // 	hot: true,
        // 	hotOnly: true,
        // },
    },
]

//"dev": "webpack-dev-server --config wp.config.js --config-name serve"

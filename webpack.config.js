const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')

const options = {
    static: [ './dev' ],
    host: 'localhost',
    port: '8000',
    open: false,
    progress: 'minimal',
    // liveReload: true,
}

const BUNDLE_NAME = 'main'
const TYPESCRIPT_ENTRY = `${path.resolve('src')}/app.ts`
const HTML_ENTRY = `${path.resolve('src')}/app.html`
const PUBLIC_PATH = ''

module.exports = [
    /* 
    PRODUCTION
     */
    {
        name: 'build',
        mode: 'production',
        entry: { [BUNDLE_NAME]: TYPESCRIPT_ENTRY },
        // typescript
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: [ /node_modules/, /dev/ ],
                },
            ],
        },
        resolve: { extensions: [ '.ts', '.js' ] },
        // plugins
        plugins: [
            new HtmlWebpackPlugin({
                title: 'starcatcher template',
                template: HTML_ENTRY,
            }),
        ],
        watch: false,
        output: {
            filename: '[name].js',
            path: path.resolve('.'),
            publicPath: PUBLIC_PATH,
        },
    },

    /* 
    DEVELOPMENT
     */
    {
        name: 'serve',
        mode: 'development',
        entry: {
            [BUNDLE_NAME]: [ TYPESCRIPT_ENTRY, 'webpack-plugin-serve/client' ],
        },
        // typescript
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                    exclude: [ /node_modules/, /dev/ ],
                },
            ],
        },
        resolve: { extensions: [ '.ts', '.js' ] },
        // plugins
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [ '**/*', '!sanitize.css' ],
            }),
            new HtmlWebpackPlugin({
                title: 'starcatcher template',
                template: HTML_ENTRY,
            }),
            new Serve(options),
        ],
        watch: true,
        output: {
            filename: '[name].dev.js',
            path: path.resolve('./dev'),
            publicPath: PUBLIC_PATH,
        },
    },
]

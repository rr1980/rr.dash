const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

process.env.NODE_ENV = 'development';


module.exports = (env) => {
  console.log("In '" + process.env.NODE_ENV + "' mode!");
  const clientBundleOutputDir = './wwwroot/dist';
  const isDevBuild = process.env.NODE_ENV === 'development';
  const clientBundleConfig = {
    mode: isDevBuild ? "development" : "production",
    // entry: ["webpack-hot-middleware/client", "./main"],
    entry: {
      // 'style': ['./src/assets/styles/style.scss'],
      // 'main': ['jquery', 'bootstrap', './src/main.ts'],
      'main': ['./src/main.ts'],
    },
    devtool: isDevBuild ? 'cheap-eval-source-map' : false,
    devServer: {
      hot: true,
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'wwwroot', 'dist'),
      // noInfo: true,
      overlay: {
        // warnings: true,
        errors: true
      },
      inline: true,
      watchOptions: {
        poll: true
      },
      host: 'localhost',
      port: 8080,
      publicPath: 'http://localhost:8080/',
      before: (app) => {
        app.get('/api/getInit', (req, res) => {
          console.log("get: /api/getInit");
          res.send({ name: "Rene" });
        });
        // app.post('/api/login', function(req, res, next) {
        //     res.json({success: true})
        // });
      }
    },
    node: {
      fs: "empty"
    },
    stats: { modules: false },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          include: path.join(path.join(__dirname, 'src/assets/styles')),
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          exclude: path.join(path.join(__dirname, 'src/assets/styles')),
          use: [
            'raw-loader',
            'sass-loader'
          ]
        },
        { test: /\.html$/, use: 'html-loader?minimize=false' },
        { test: /\.ts$/, use: isDevBuild ? ['awesome-typescript-loader?silent=true', 'angular2-template-loader', 'angular2-router-loader'] : '@ngtools/webpack' },
        // { test: /[\/]jquery\.js$/, use: 'expose-loader?$!expose?jQuery' }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.css', '.jsosn', '.sass', '.html'],
      plugins: [
        new TsConfigPathsPlugin()
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.join(__dirname, 'wwwroot', 'dist')]),
      new HtmlWebpackPlugin({
        title: 'Development',
        filename: 'index.html',
        template: 'src/index.html',
        chunksSortMode: 'none',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new AngularCompilerPlugin({
        tsConfigPath: './tsconfig.json',
        entryModule: './src/app/app.module#AppModule',
        sourceMap: true,
        mainPath: path.join(__dirname, 'src'),
        // skipCodeGeneration: true
      }),
      new webpack.ProvidePlugin({
        Popper: ['popper.js', 'default'],
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
      new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './src')), // Workaround for https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './src')), // Workaround for https://github.com/angular/angular/issues/14898
      new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.join(__dirname, './src')),
      new webpack.IgnorePlugin(/^vertx$/), // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
      // new BundleAnalyzerPlugin({
      //   analyzerMode: "static",
      //   reportFilename: "main.html",
      //   openAnalyzer: false,
      // }),
    ].concat(isDevBuild ? [
      // Plugins that apply in development builds only
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
      })
    ] : [
        new AngularCompilerPlugin({
          tsConfigPath: './tsconfig.json',
          entryModule: './src/app/app.module#AppModule',
          skipCodeGeneration: true,
          sourceMap: true
        }),
      ]),
    output: {
      path: path.join(__dirname, 'wwwroot', 'dist'),
      publicPath: '/',
      filename: '[name].js',
      library: '[name]_[hash]'
    },
    optimization: {
      namedModules: true,
      splitChunks: {
        cacheGroups: {
          polyfills: {
            name: 'polyfills',
            test: /polyfills.ts/,
            enforce: true,
            chunks: 'all'
          },
          styles: {
            name: 'style',
            test: /\.(css|sass|scss)$/,
            enforce: true,
            chunks: 'all'
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            enforce: true,
            chunks: 'all'
          },
        }
      },
      concatenateModules: true,
      // minimize: true
    },
    // watch: true
    
  }

  return clientBundleConfig;
};
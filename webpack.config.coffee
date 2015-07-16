webpack = require 'webpack'

module.exports =

  context: __dirname

  target: 'web'

  entry:
    background: './sources/javascript/background.js'
    content_script: './sources/javascript/content_script.js'
    index: './sources/javascript/index.js'
    web_accessible_resource: './sources/javascript/web_accessible_resource.js'

  output:
    path: './pageinfo'
    publicPath: '/'
    filename: '[name].js'
    chunkFilename: 'chunk-[id].js'

  module:
    loaders: [
      { test: /\.js$/,   exclude: /node_modules|bower_components/, loader: 'babel?stage=0' }
      { test: /\.json$/, exclude: /node_modules|bower_components/, loader: 'json'          }
      { test: /\.vue$/,  exclude: /node_modules|bower_components/, loader: 'vue'           }
      { test: /\.png$/,  exclude: /node_modules|bower_components/, loader: 'url'           }
    ]

  resolve:
    extensions: [
      ''
      '.js'
      '.json'
      '.vue'
    ]
    modulesDirectories: [
      'node_modules'
      'bower_components'
    ]

  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    )
    new webpack.NoErrorsPlugin
    new webpack.IgnorePlugin(/vertx/)
    new webpack.optimize.OccurenceOrderPlugin
    new webpack.optimize.DedupePlugin
    new webpack.optimize.AggressiveMergingPlugin
  ].concat(
    if process.argv.some (arg) ->
      /^(?:-p|--optimize-minimize)$/.test(arg)
    then [
      new webpack.optimize.UglifyJsPlugin(
        compress:
          pure_funcs: [
            'log'
          ]
        output:
          comments: require('uglify-save-license')
      )
    ]
    else [
      new webpack.DefinePlugin(
        log: ->
          if console?
            # for IE8 and IE9
            if typeof console.log is 'object'
              Function::apply.call(console.log, console, arguments)
            # for other browsers
            else
              console.log.apply(console, arguments)
          return
      )
    ]
  )

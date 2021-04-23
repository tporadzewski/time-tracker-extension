const mix = require('laravel-mix')
const webpack = require('webpack')

mix.webpackConfig({
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
})

mix
  .setPublicPath('./')
  .js('src/background.js', 'dist')
  .js('src/main.js', 'dist')
  .vue()
  .copy('src/assets/', 'dist/assets')
  .options({
    processCssUrls: false
  })

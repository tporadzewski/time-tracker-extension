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
  .js('src/background.js', 'public')
  .js('src/main.js', 'public')
  .vue()
  .copy('src/assets/', 'public/assets')
  .options({
    processCssUrls: false
  })

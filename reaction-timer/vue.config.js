const { defineConfig } = require('@vue/cli-service')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/reaction_timer_vuejs/" : "/",
  configureWebpack: {
    plugins: [new MiniCssExtractPlugin()],
  }
})

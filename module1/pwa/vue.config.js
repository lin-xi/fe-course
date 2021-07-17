module.exports = {
  pwa: {
    name: "pwa",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      cacheId: "vue-pwa", // 设置前缀
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
      swDest: "service-wroker.js", // 输出 Service worker 文件
      globPatterns: ["**/*.{js,css,png,jpg,jpeg,svg,gif}"], // 匹配的文件
      globIgnores: ["service-wroker.js"], // 忽略的文件
      runtimeCaching: [
        {
          urlPattern: /index\.html/,
          handler: "networkFirst",
        },
        // 配置路由请求缓存
        {
          urlPattern: /.*\.js/, // 匹配文件
          handler: "networkFirst", // 网络优先
        },
        {
          urlPattern: /.*\.css/, // 匹配文件
          handler: "staleWhileRevalidate", // 网络优先
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/, // 匹配文件
          handler: "cacheFirst", // 网络优先
        },
      ],
    },
  },
};

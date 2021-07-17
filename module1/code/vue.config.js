module.exports = {
  pwa: {
    name: "FeCourse",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./src/serviceworker.js",
      swDest: "sw.js",
      globDirectory: "./dist/",
      globPatterns: ["**/*.{js,css,png,jpg,jpeg,svg,gif}"],
      importWorkboxFrom: "local", //cdn,local
    },
  },
};

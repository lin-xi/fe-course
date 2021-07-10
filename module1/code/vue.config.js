module.exports = {
    // 扩展 webpack 配置，使用web worker
    chainWebpack: (config) => {
        config.module
            .rule("worker")
            .test(/\.worker\.js$/)
            .use("worker-loader")
            .loader("worker-loader")
            .options({
                inline: "fallback"
            });
        config.module.rule("js").exclude.add(/\.worker\.js$/);
    },
}
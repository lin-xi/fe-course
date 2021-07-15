<template>
  <div>
    <div class="head">模块一：前端基础</div>
    <div class="menu">
      <a href="/#/floatToBinary"><div class="item">浮点数转二进制</div></a>
      <a href="/#/arraySort"><div class="item">ArraySort</div></a>
      <a href="/#/clipboard"><div class="item">Clipboard</div></a>
      <a href="/#/geolocation"><div class="item">Geolocation</div></a>
      <a href="/#/keyboard"><div class="item">Keyboard</div></a>
      <a href="/#/webRTC"><div class="item">WebRTC</div></a>
      <a href="/#/webRTCScreenShot"><div class="item">WebRTC屏幕截图</div></a>
      <a href="/#/shortUrl"><div class="item">ShortURL短网址系统</div></a>
      <a href="/#/webWorker"><div class="item">Web Worker</div></a>
      <a href="/#/imageGrid"><div class="item">ImageGrid CSS grid</div></a>
      <a href="/#/lasyImage"><div class="item">LasyImage组件</div></a>
      <a href="/#/lessTheme"><div class="item">Less主题切换</div></a>
      <a href="/#/bitmask"><div class="item">BitMask位掩码</div></a>
      <a href="/#/fishTemplate"><div class="item">模板引擎实战</div></a>
      <a href="/#/catNode"><div class="item">虚拟dom原生编程</div></a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style lang="less" scoped>
.head {
  background-color: #5666f3;
  color: #fff;
  font-size: 30px;
  height: 50px;
  line-height: 50px;
}

.menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    display: flex;
    border: 1px #e0e0e0 solid;
    background: #f0f0f0;
    width: 200px;
    height: 100px;
    align-items: center;
    justify-content: center;
    margin: 10px;
    border-radius: 6px;
  }
}
</style>

<template>
  <div>
    <div class="screenShot">
      <video width="640px" height="480px" ref="myVideo"></video>
      <canvas width="640px" height="480px" ref="mycanvs"></canvas>
    </div>
    <div>
      <a @click="changeToCamera" class="btn">摄像头</a>
      <a @click="changeToDesktop" class="btn">桌面</a>
      <a @click="shot" class="btn">截图</a>
      <a @click="download" class="btn">下载</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "screenShot",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 开始捕捉屏幕
    async changeToDesktop() {
      let stream = await window.navigator.mediaDevices.getDisplayMedia();
      // 将MediaStream输出至video标签
      this.$refs.myVideo.srcObject = stream;
      this.$refs.myVideo.play();
    },

    changeToCamera() {
      window.navigator.getUserMedia(
        { video: true },
        (stream) => {
          this.$refs.myVideo.srcObject = stream;
          this.$refs.myVideo.play();
        },
        (err) => {
          throw "浏览器不支持webrtc" + err;
        }
      );
    },

    shot() {
      let context = this.$refs.mycanvs.getContext("2d");
      context.drawImage(this.$refs.myVideo, 0, 0, 640, 480, 0, 0, 640, 480);
    },

    download() {
      var dataImg = new Image();
      dataImg.src = this.$refs.mycanvs.toDataURL("image/png");
      document.body.appendChild(dataImg);
      var alink = document.createElement("a");
      alink.href = dataImg.src;
      alink.download = "screenshot";
      document.body.appendChild(alink);
      alink.click();
    },
  },
};
</script>

<style lang="less" scoped>
.screenShot {
  display: flex;
  position: relative;
  border: 1px #ccc solid;
  width: 650px;
  height: 540px;
}
</style>

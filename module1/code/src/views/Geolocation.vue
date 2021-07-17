<template>
  <div class="geolocation">
    Geolocation
    <hr />
    定位坐标： <br />
    ip: {{ ip }}<br />
    纬度：{{ position.lat }}<br />
    <hr />
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "geolocation",
  data() {
    return {
      position: {},
      msg: "",
    };
  },
  mounted() {
    this.timer = setTimeout(this.doTimeout, 5000);
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = position;
      if (this.timer) {
        clearTimeout(this.timer);
      }
    });
  },
  methods: {
    doTimeout() {
      this.msg = "定位超时";
      this.getIp();
    },
    getIp() {
      // jsonp get "https://www.taobao.com/help/getip.php"
      // baidu sdk get ip information
    },
  },
};
</script>

<style lang="less"></style>

<template>
  <div>
    <div class="counter">{{ sum }}</div>
    <a @click="doStop">暂停</a>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Lab",
  data() {
    return { sum: 0, stop: false };
  },
  mounted() {
    this.doSum();
  },
  methods: {
    doSum() {
      var arr = new Array();
      for (let i = 0; i < 600; i++) {
        arr.push(Math.random() * 10000000);
      }
      //   var arr = new Uint32Array(600);
      //   window.crypto.getRandomValues(arr);
      let result = arr.reduce((total, curVal) => {
        return total + curVal;
      }, 0);
      this.sum = result;
      if (!this.stop) {
        window.requestAnimationFrame(this.doSum);
      }
    },
    doStop() {
      this.stop = true;
    },
  },
};
</script>

<style lang="less" scoped>
.counter {
  font-size: 30px;
}
</style>

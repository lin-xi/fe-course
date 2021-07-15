<template>
  <div>
    <div style="font-size: 80px; color: blue">{{ time }}</div>
    <a class="btn" @click="start">开始计时</a>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from "./Clock.worker.js";

export default {
  name: "worker",
  data() {
    return { time: 0 };
  },
  mounted() {
    this.worker = new Clock();

    console.log(
      String("1234567890").replace(/(\d)(?=(\d{3})+$)/g, (s0, s1, s2) => {
        console.log(s1, s2);
        return s1 + ",";
      })
    );

    this.worker.onmessage = (e) => {
      console.log(e.data.time);
      this.time = e.data.time;
    };
  },
  methods: {
    start() {
      this.worker.postMessage({ start: true });
    },
  },
};
</script>

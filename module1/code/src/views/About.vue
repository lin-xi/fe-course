<template>
  <div class="about">
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paths: [
        {
          x: 100,
          y: 10,
        },
        {
          x: 120,
          y: 20,
        },
        {
          x: 140,
          y: 30,
        },
        {
          x: 160,
          y: 20,
        },
        {
          x: 180,
          y: 40,
        },
        {
          x: 200,
          y: 40,
        },
        {
          x: 220,
          y: 60,
        },
        {
          x: 200,
          y: 80,
        },
        {
          x: 240,
          y: 100,
        },
        {
          x: 260,
          y: 80,
        },
        {
          x: 240,
          y: 60,
        },
        {
          x: 220,
          y: 40,
        },
        {
          x: 200,
          y: 60,
        },
        {
          x: 180,
          y: 100,
        },
        {
          x: 200,
          y: 120,
        },
        {
          x: 220,
          y: 140,
        },
        {
          x: 240,
          y: 160,
        },
        {
          x: 260,
          y: 180,
        },
        {
          x: 280,
          y: 200,
        },
        {
          x: 300,
          y: 220,
        },
        {
          x: 320,
          y: 240,
        },
        {
          x: 340,
          y: 260,
        },
        {
          x: 300,
          y: 280,
        },
        {
          x: 260,
          y: 300,
        },
        {
          x: 240,
          y: 320,
        },
        {
          x: 200,
          y: 340,
        },
        {
          x: 180,
          y: 360,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    drawCanvas() {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");

      let start = this.paths[0];
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      for (let i = 1; i < this.paths.length - 1; i++) {
        let p = this.paths[i];
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    },
  },
};
</script>

<style lang="less">
.canvas {
  width: 400px;
  height: 300px;
}
</style>


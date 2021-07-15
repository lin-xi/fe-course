<template>
  <div>
    <div></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CatDomNode",
  data() {
    return {};
  },
  mounted() {
    console.log(this.getCords(2000, 2000));
    console.log(this.getCords(1000, 1000));
  },
  methods: {
    getCords(x, y) {
      let bigW = 3904;
      let smallW = 2338;

      let bigH = 3703;
      let smallH = 2207;

      let scaleW = bigW / smallW;
      let scaleH = bigH / smallH;

      let newX = (x - 2000) * scaleW + 2000;
      let newY = (y - 2000) * scaleH + 2000;
      return {
        x: newX,
        y: newY,
      };
    },
  },
};
</script>

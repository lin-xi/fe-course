<template>
  <div class="grid-box">
    <template v-for="(item, index) in imgs">
      <div
        v-if="index === current"
        :key="item"
        :class="bigItem"
        @click="toBig(index)"
      >
        <img :src="item" />
      </div>
      <div v-else :key="item" @click="toBig(index)">
        <img :src="item" />
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ImageGrid",
  data() {
    let temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push(`https://picsum.photos/200/200?t=${Math.random()}`);
    }
    return {
      imgs: temp,
      current: -1,
      bigItem: "big-item",
    };
  },
  mounted() {},
  methods: {
    toBig(index) {
      this.current = index;
      // this.bigItem = `big-item${(index % 4) + 1}`;
    },
  },
};
</script>

<style lang="less" scoped>
.grid-box {
  display: grid;
  grid-template-columns: 200px 200px 200px 200px;
  grid-template-rows: repeat(auto-fill, 200px);
  column-gap: 10px;
  row-gap: 10px;
  grid-auto-flow: row;

  .big-item {
    grid-column: span 2;
    grid-row: span 2;
    border: 2px red solid;
    background: red;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .big-item1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: span 2;
    border: 2px red solid;
    background: red;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .big-item2 {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: span 2;
    border: 2px red solid;
    background: red;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .big-item3 {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row: span 2;
    border: 2px red solid;
    background: red;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .big-item4 {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row: span 2;
    border: 2px red solid;
    background: red;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <div id="blog">
    <div class="head">
      <a class="theme" :style="`background: #${selected};`" @click="show = true"
        >主题</a
      >
    </div>
    <div class="left">left</div>
    <div class="body">body</div>
    <div class="footer">© 2021 all rights reserved</div>
    <div class="colorDialog" v-if="show">
      <div
        v-for="color in colors"
        :key="color"
        class="color"
        :style="`background: #${color};`"
        @click="doSelect(color)"
      ></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "LessTheme",
  data() {
    return {
      selected: "#c1cbd7",
      show: false,
      colors: [
        "c1cbd7",
        "afb0b2",
        "939391",
        "bfbfbf",
        "e0e5df",
        "b5c4b1",
        "8696a7",
        "9ca8b8",
        "ececea",
        "fffaf4",
        "96a48b",
        "7b8b6f",
        "dfd7d7",
        "656565",
        "d8caaf",
        "c5b8a5",
        "fdf9ee",
        "f0ebe5",
        "d3d4cc",
        "e0cdcf",
        "b7b1a5",
        "a29988",
        "dadad8",
        "f8ebda",
      ],
    };
  },
  methods: {
    doSelect(color) {
      this.show = false;
      this.selected = `#${color}`;
      window.less
        .modifyVars({
          "@themeColor": this.selected,
        })
        .then(() => {
          console.log("修改成功");
        });
    },
  },
};
</script>

<style lang="less">
.head {
  display: flex;
  text-align: right;
  justify-content: flex-end;

  .theme {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #ccc;
    text-align: center;
    cursor: pointer;
    color: #fff;
  }
}
.colorDialog {
  display: grid;
  width: 320px;
  height: 120px;
  grid-template-columns: repeat(8, 40px);
  grid-template-rows: repeat(auto-fill, 40px);
  cursor: pointer;
  border: 1px solid #ccc;
  position: fixed;
  top: 30px;
  right: 10px;

  .color {
    &:hover {
      border: 1px #000 solid;
    }
  }
}
</style>

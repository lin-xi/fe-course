<template>
  <div class="menu">
    <div class="item"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menu {
  .item {
    border: 1px #e0e0e0 solid;
  }
}
</style>

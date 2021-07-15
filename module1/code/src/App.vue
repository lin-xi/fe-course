<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

  .btn {
    display: inline-block;
    border-radius: 6px;
    width: 200px;
    height: 60px;
    line-height: 60px;
    margin-left: 10px;
    background-color: #f5a87c;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }

  .card {
    padding: 20px;
  }

  .text {
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    min-width: 300px;
  }
}
</style>

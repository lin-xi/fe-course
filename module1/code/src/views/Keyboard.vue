<template>
  <div>
    当前按钮:{{ currentKey }}
    <div>
      <button @click="doFullScreen">全屏</button>
      <button @click="doLock">lock()</button>
      <button @click="unLock">unlock()</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Keyborad",
  data() {
    return {
      currentKey: "",
    };
  },
  mounted() {
    document.addEventListener("keydown", (evt) => {
      let keys = [];
      if (evt.altKey) {
        keys.push("alt");
      }
      if (evt.ctrlKey) {
        keys.push("ctrl");
      }
      if (evt.metaKey) {
        keys.push("meta");
      }
      keys.push(evt.key);
      this.currentKey = keys.join(" + ");
      return false;
    });
  },
  methods: {
    doLock() {
      if (navigator.keyboard) {
        navigator.keyboard.lock().then(() => {
          console.log("locked>>>");
        });
      }
    },
    unLock() {
      navigator.keyboard.unlock();
    },
    doFullScreen() {
      document.documentElement.requestFullscreen();
    },
  },
};
</script>

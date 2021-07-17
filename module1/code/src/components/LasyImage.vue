<template>
  <div ref="el" : class="['lazy-image', classVal, {bordered}]">
    <div class="lazy-image-placeholder">
      <svg
        t="1509443043258"
        class="icon"
        style=""
        viewBox="0 0 1260 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3114"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="246.09375"
        height="200"
      >
        <path
          d="M1141.949282 0H118.262145A118.262145 118.262145 0 0 0 0 118.262145v787.47571a118.262145 118.262145 0 0 0 118.262145 118.262145H1141.949282a118.262145 118.262145 0 0 0 118.262145-118.262145V118.262145A118.262145 118.262145 0 0 0 1141.949282 0z m19.710357 785.285671l-247.161625-329.444547s-14.39169-26.593339-64.762603-26.593339c-57.253896 0-74.46135 25.967614-74.461351 25.967614l-216.501069 333.824625a46.61656 46.61656 0 0 1-40.672166 22.526123 54.750993 54.750993 0 0 1-44.739383-22.526123l-113.882065-130.150931a99.177513 99.177513 0 0 0-66.952643-38.482127 105.434769 105.434769 0 0 0-69.142683 42.862206l-125.145126 156.431409V139.223954a39.420715 39.420715 0 0 1 39.733577-39.420715h984.266423a39.420715 39.420715 0 0 1 39.420714 39.420715V785.285671zM570.974641 354.473572a139.536816 139.536816 0 1 1-139.536816-139.536817 139.536816 139.536816 0 0 1 139.536816 139.536817z"
          fill="#EEEEEE"
          p-id="3115"
        ></path>
      </svg>
    </div>
    <div class="lazy-image-content" :style="styleVal"></div>
  </div>
</template>

<script>
const concurrency = 4; // 最多同时加载的图片数量
let loaded = {};
const pendingQueue = [];
setTimeout(() => {
  // 在发生拖动事件以及每秒钟，都会进行可见图片计算
  let debounceTimeout;
  const debouncedCalcShouldLoad = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      debounceTimeout = null;
      calcShouldLoad();
    }, 100);
  };
  window.addEventListener("scroll", debouncedCalcShouldLoad);
  setInterval(debouncedCalcShouldLoad, 1000);
  // 计算可见区域内未加载的图片
  let shouldLoadQueue = [];
  function calcShouldLoad() {
    const winHeight = window.innerHeight;
    const minY = 0;
    const maxY = winHeight * 2;
    const shouldLoads = [];
    pendingQueue.forEach((item) => {
      const rc = item.rect();
      if (rc.bottom > minY && rc.top < maxY) {
        shouldLoads.push([item, rc.top * 2000 + rc.left]);
      }
    });
    shouldLoads.sort((a, b) => b[1] - a[1]);
    shouldLoadQueue = shouldLoads.map((v) => v[0]);
  }
  let loadingCount = 0;
  // 优先加载视野范围内的图片，同时加载concurrency数量个图片
  setInterval(() => {
    if (loadingCount < concurrency && shouldLoadQueue.length > 0) {
      loadingCount++;
      shouldLoadQueue.pop().load(() => {
        loadingCount--;
      });
    }
  }, 30);

  // 视野内图片都加载完的时候，缓慢加载其他图片
  setInterval(() => {
    if (loadingCount === 0 && pendingQueue.length > 0) {
      loadingCount++;
      for (let i = 0; i < pendingQueue.length; i++) {
        if (pendingQueue[i].rect().height > 0) {
          pendingQueue[i].load(() => {
            loadingCount--;
          });
          return;
        }
      }
    }
  }, 1000);
}, 100);

export default {
  name: "w-lazyimage",
  props: {
    src: {
      type: String,
      default: "",
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      styleVal: {},
      classVal: "",
      loaded: false,
    };
  },
  watch: {
    src(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.styleVal = {};
        this.classVal = "";
        this.loaded = false;
        if (loaded[newVal]) {
          this.loadImmediate();
        } else {
          pendingQueue.push(this);
        }
      }
    },
  },
  methods: {
    rect() {
      return this.$refs.el.getBoundingClientRect();
    },
    // 加载图片，并在加载成功后渐变展示，回调通知
    load(done) {
      this.loaded = true;
      const pos = pendingQueue.indexOf(this);
      pos > -1 && pendingQueue.splice(pos, 1);
      const loader = new Image();
      loader.onload = () => {
        loaded[this.src] = true;
        this.classVal = ["lazy-image-fade-in-pre"];
        setTimeout(() => {
          this.classVal = ["lazy-image-fade-in"];
        }, 10);
        setTimeout(() => {
          this.classVal = [];
        }, 300);
        this.styleVal = {
          backgroundImage: `url(${this.src})`,
        };
        done();
      };
      loader.onerror = () => {
        done();
      };
      loader.src = this.src;
    },
    loadImmediate() {
      this.styleVal = {
        backgroundImage: `url(${this.src})`,
      };
      this.classVal = ["lazy-image-fade-in"];
    },
  },
  mounted() {
    if (loaded[this.src]) {
      this.loadImmediate();
    } else {
      pendingQueue.push(this);
    }
  },
  destroyed() {
    if (!this.loaded) {
      const pos = pendingQueue.indexOf(this);
      pos > -1 && pendingQueue.splice(pos, 1);
    }
  },
};
</script>

<style lang="less" scoped>
.lazy-image {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  &-placeholder,
  &-content {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    svg {
      width: 30%;
    }
  }
  &-fade-in-pre &-content {
    opacity: 0;
  }
  &-fade-in &-content {
    opacity: 1;
    transition: opacity 0.6s;
  }
  &.bordered {
    &::after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      border: 1px solid #d8d4d4;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      [data-dpr="1"] & {
        border-color: #d8d4d4 * 0.4 + #ffffff * 0.6;
      }
      [data-dpr="2"] & {
        border-color: #d8d4d4 * 0.6 + #ffffff * 0.4;
      }
      [data-dpr="3"] & {
        border-color: #d8d4d4 * 0.8 + #ffffff * 0.2;
      }
    }
  }
}
</style>

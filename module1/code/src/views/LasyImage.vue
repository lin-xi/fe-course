<template>
  <div class="out-scroll">
    <div class="middle-scroll">
      <div class="place-holder"></div>
      <img class="lasy-image" ref="img" :src="src" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: `https://picsum.photos/200/200?t=${Math.random()}`,
      src: "",
    };
  },

  mounted() {
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.innerHTML = "哈哈哈哈哈哈哈哈哈";

    fragment.appendChild(div);
    console.log("fragment>>>", div.offsetHeight);

    window.addEventListener("scroll", () => {
      this.shouldLoad();
    });

    console.log(this.$refs.img.parentNode);
    this.$refs.img.parentNode.addEventListener("scroll", () => {
      this.shouldLoad();
    });

    var intersectionObserver = new IntersectionObserver((entries) => {
      // If intersectionRatio is 0, the target is out of view
      // and we do not need to do anything.
      if (entries[0].intersectionRatio <= 0) {
        this.src = "";
        return;
      }
      // 进入视野;
      // console.log("//进入视野");
      // console.log(this.$refs.img.getBoundingClientRect());
      // this.src = this.imgSrc;
    });
    // start observing
    intersectionObserver.observe(document.querySelector(".lasy-image"));
  },

  methods: {
    shouldLoad() {
      let img = this.$refs.img;
      let parent = img.parentNode;
      if (parent.scrollHeight - parent.scrollTop <= parent.offsetHeight) {
        console.log("//进入视野");
        this.src = this.imgSrc;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.out-scroll {
  overflow: auto;
  width: 400px;
  border: 1px red solid;
  margin-left: 200px;
  height: 600px;
  background: #ccc;
  .middle-scroll {
    margin-top: 1000px;
    height: 1000px;
    overflow: auto;
    background: #999;

    .place-holder {
      height: 3000px;
      background: #444;
    }
  }
}
</style>

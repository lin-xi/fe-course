<template>
  <div class="page">
    浮点数转二进制：
    <hr />
    <div class="card">
      <input
        class="text"
        type="number"
        placeholder="输入浮点数"
        v-model="floatVal"
      />
    </div>
    <div class="card">toString(2): {{ toStringVal }}</div>
    <div class="card">计算二进制：{{ result }}</div>
  </div>
</template>

<script>
export default {
  name: "floatToBinary",
  data() {
    return {
      floatVal: 0,
    };
  },
  computed: {
    toStringVal() {
      if (this.floatVal) {
        return parseFloat(this.floatVal).toString(2);
      }
      return "";
    },
    result() {
      if (this.floatVal) {
        let [integer, fraction] = this.floatVal.split(".");
        let i = this.intToBinary(integer);
        if (fraction) {
          return [
            i,
            ".",
            this.fractionToBinary(parseFloat("0." + fraction)),
          ].join("");
        }
        return i;
      }
      return "";
    },
  },
  mounted() {
    this.fractionToBinary(0.2);
  },
  methods: {
    intToBinary(num) {
      let result = [];
      while (num) {
        result.push(num % 2);
        num = parseInt(num / 2);
      }
      return result.reverse().join("");
    },

    fractionToBinary(num) {
      if (!num) return "0";
      let result = [];
      let count = 0;
      while (num && count < 13) {
        let temp = num * 2;
        let i = Math.floor(temp);
        result.push(i);
        num = temp - i;
        count++;
      }
      return result.join("");
    },
  },
};
</script>

<style lang="less"></style>

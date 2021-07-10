<template>
  <div class="arraySort">
    ArraySort
    <hr />
    <a class="btn" @click="createArray">生成数组</a>
    <a class="btn" @click="startSort">开始排序</a>

    <div>{{ array.toString() }}</div>

    <div>快速排序：{{ quickSortTime }}</div>
    <div>sort：{{ sortTime }}</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ArraySort",
  data() {
    return {
      array: [],
      quickSortTime: 0,
      sortTime: 0,
    };
  },
  methods: {
    startSort() {
      let start = performance.now();
      console.log(this.array.sort((a, b) => a - b));
      this.sortTime = performance.now() - start;

      start = performance.now();
      console.log(this.quickSort(this.array, 0, this.array.length));
      this.quickSortTime = performance.now() - start;
    },
    createArray() {
      const c = 5000;
      for (let i = 0; i < c; i++) {
        this.array.push(Math.round(Math.random() * c));
      }
    },
    quickSort(arr, left, right) {
      let partitionIndex;
      if (left < right) {
        partitionIndex = this.partition(arr, left, right);
        this.quickSort(arr, left, partitionIndex - 1);
        this.quickSort(arr, partitionIndex + 1, right);
      }
      return arr;
    },

    partition(arr, left, right) {
      // 分区操作
      var pivot = left, // 设定基准值（pivot）
        index = pivot + 1;

      for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
          [arr[i], arr[index]] = [arr[index], arr[i]];
          index++;
        }
      }
      [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]];
      return index - 1;
    },
  },
};
</script>

<style lang="less">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  background: lightgreen;
  margin: 10px;
  cursor: pointer;
}
</style>

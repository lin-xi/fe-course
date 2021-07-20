<template>
  <div>
    <div class="w-tree-item" v-for="(item, index) in data" :key="type + '_' + index" :data-type="type" :data-index="index">
      <div class="node-title">{{item.name}}</div>
      <div class="node-body">
        <w-tree-node :data="item.children" type="sub"></w-tree-node>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'w-tree-node',
  props: {
    change: Function,
    data: {
      type: Array
    },
    type: {
      type: String,
      default: 'root'
    }
  },
  methods: {
    centerItem(node) {
      this.$slots.default.map((child, index) => {
        if (child.elm === node) {
          node.classList.add('active')
          this.currentIndex = index
        } else {
          child.elm.classList.remove('active')
        }
      })
      if (!this.centerActivedItem) {
        return
      }
      let rectParent = this.$el.getBoundingClientRect()
      let rect = node.getBoundingClientRect()
      if (this.direction == 'h') {
        let left = rect.left - rectParent.left
        let curx = this.getCurrentX()
        let offset = 0
        if (left > this.ww / 2) {
          offset = curx - (left - this.ww / 2 + rect.width / 2)
          offset < this.minsw && (offset = this.minsw)
          offset > this.maxsw && (offset = this.maxsw)
        } else {
          offset = curx + (this.ww / 2 - left - rect.width / 2)
          offset > this.maxsw && (offset = this.maxsw)
          offset < this.minsw && (offset = this.minsw)
        }
        this.translateTo(offset, 0, 600)
        this.$emit('change', this.currentIndex)
      } else {
        let top = rect.top - rectParent.top
        let cury = this.getCurrentY()
        let offset = 0
        if (top > this.hh / 2) {
          offset = cury - (top - this.hh / 2 + rect.height / 2)
          offset < this.minsh && (offset = this.minsh)
          offset > this.maxsh && (offset = this.maxsh)
        } else {
          offset = cury + (this.hh / 2 - top - rect.height / 2)
          offset > this.maxsh && (offset = this.maxsh)
          offset < this.minsh && (offset = this.minsh)
        }
        this.translateTo(0, offset, 600)
        this.$emit('change', this.currentIndex)
      }
    },
    translateTo(x, y, t, immediately) {
      let time = t || 300
      t < 300 && (t = 300)
      t > 1200 && (t = 1200)

      if (immediately) {
        this.$refs.box.style.transition = 'none'
      } else {
        this.$refs.box.style.transition = `${time}ms all cubic-bezier(0.1, 0.57, 0.1, 1)`
      }
      this.$refs.box.style.transform = `translate3d(${x}px, ${y}px, 0)`
    },
    setCurrent(index) {
      if (index >= 0 && index < this.total) {
        this.currentX = index
        this.centerItem(this.$slots.default[index].elm)
      }
    }
  }
}
</script>

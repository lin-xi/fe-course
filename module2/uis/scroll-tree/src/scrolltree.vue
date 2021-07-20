<template>
  <div class="wui-scroll-tree">
    <div class="wui-scroll-tree-nav" ref="nav">
      <div class="wui-scroll-tree-container" ref="box" @touchstart="touchstart" @mousedown="touchstart">
        <w-tree-node :data="data"></w-tree-node>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { hasClass, removeClass, addClass } from '../../../src/utils'
import TreeNode from './treenode.vue'
export default {
  name: 'w-scroll-tree',
  components: {
    'w-tree-node': TreeNode
  },
  data() {
    return {
      drag: false,
      startY: 0,
      startTime: 0,
      currentY: 0,
      currentIndex: 0,
      currentSubIndex: 0,
      offsetH: 0,
      lastTime: 0,
      timer: null,
      total: 0,
      ww: 0
    }
  },
  props: {
    data: {
      type: Array
    },
    centerActivedItem: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    touchstart(e) {
      this.drag = true
      let tar = e.targetTouches || [e]
      tar = tar[0]
      this.startY = tar.pageY
      this.startTime = Date.now()
      this.offsetH = 0

      this.currentY = this.getCurrentY()
      let height = this.$refs.box.offsetHeight
      this.hh = this.$el.offsetHeight
      this.maxsh = 0 //max scroll width
      this.minsh = this.hh - height //max scroll width
      if (this.minsh > 0) {
        this.minsh = 0
      }
      e.preventDefault()
    },
    touchmove(e) {
      if (this.drag) {
        // let now = Date.now();
        // if(this.lastTime){
        //   let remaining = 50 - now + this.lastTime;
        //   if(remaining <= 0){
        //     this.lastTime = now;
        //     clearInterval(this.timer);
        //     this.move(e);
        //   } else {
        //     clearInterval(this.timer);
        //     this.timer = setTimeout(this.move.bind(this, e), remaining);
        //   }
        // } else {
        //   this.lastTime = now;
        //   this.move(e);
        // }
        this.move(e)
        e.preventDefault()
      }
    },
    touchend(e) {
      if (this.drag) {
        this.drag = false
        let cury = this.getCurrentY()
        if (cury > this.maxsh) {
          this.bounceBack(0, this.maxsh)
        } else if (cury < this.minsh) {
          this.bounceBack(0, this.minsh)
        } else {
          this.momentumMove(e)
        }
      }
    },
    move(e) {
      if (this.drag) {
        let tar = e.targetTouches || [e]
        tar = tar[0]
        let offsetY = tar.pageY - this.startY
        this.offsetH = offsetY
        let lasty = this.currentY + offsetY
        lasty = this.getDamping(lasty)
        this.translateTo(0, lasty, 0, true)
      }
    },
    bounceBack(x, y, t) {
      let ti = t || 500
      this.translateTo(x, y, ti)
    },
    getDamping(s) {
      let max = 0
      let min = this.minsw
      if (this.direction == 'v') {
        min = this.minsh
      }
      if (s > max) {
        return Math.round(s / 4)
      } else if (s < min) {
        return Math.round(min - (min - s) / 4)
      } else {
        return s
      }
    },
    momentumMove(e) {
      let difft = Date.now() - this.startTime
      let cury = this.getCurrentY()
      if (difft > 500 || Math.abs(this.offsetH) < 10) {
        this.slotClick(e)
        return
      } else {
        let v = Math.abs(this.offsetH) / difft
        const a = 0.0002
        let s = v * v / (2 * a) * (this.offsetH < 0 ? -1 : 1)
        let last = Math.round(cury + s)
        let t = Math.round(s / v)

        if (last < this.minsh) {
          last = Math.round(this.minsh - this.hh / 2 * (v / 8))
        } else if (last > 0) {
          // 向右
          last = Math.round(this.hh / 2 * (v / 8))
        }
        t < 300 && (t = 300)
        t > 1200 && (t = 1200)
        this.translateTo(0, last, t)

        setTimeout(() => {
          cury = this.getCurrentY()
          if (cury > this.maxsh) {
            this.bounceBack(0, this.maxsh)
          } else if (cury < this.minsh) {
            this.bounceBack(0, this.minsh)
          }
        }, t)
      }
    },
    getCurrentY() {
      let cy = '0'
      let trans = this.$refs.box.style.transform
      if (trans) {
        let mats = trans
          .replace(/\s/g, '')
          .match(/translate3d\((?:.*?),(.*?),(?:.*?)\)/)
        if (mats && mats.length > 1) {
          cy = mats[1].replace('px', '')
        }
      }
      return Number.isNaN(cy) ? 0 : parseInt(cy)
    },
    slotClick(e) {
      let cur = e.target
      let pnode = cur
      if (!pnode) return
      if (!hasClass(cur, 'w-tree-item')) {
        while (pnode && !hasClass(pnode, 'w-tree-item')) {
          pnode = pnode.parentNode
        }
      }
      if (pnode) {
        this.centerItem(pnode)
      }

      let height = this.$refs.box.offsetHeight
      this.hh = this.$el.offsetHeight
      this.maxsh = 0 //max scroll width
      this.minsh = this.hh - height //max scroll width
      if (this.minsh > 0) {
        this.minsh = 0
      }

      let cury = this.getCurrentY()
      if (cury > this.maxsh) {
        this.bounceBack(0, this.maxsh)
      } else if (cury < this.minsh) {
        this.bounceBack(0, this.minsh)
      }
    },
    centerItem(node, stopEmit) {
      let nodeList = this.$el.querySelectorAll('.w-tree-item')
      for (let i = 0; i < nodeList.length; i++) {
        let item = nodeList[i]
        if (item === node) {
          addClass(item, 'active')
          if (item.getAttribute('data-type') === 'root') {
            this.currentIndex = parseInt(item.getAttribute('data-index'))
          } else if (item.getAttribute('data-type') === 'sub') {
            let pn = node
            while (pn && pn !== this.$el) {
              pn = pn.parentNode
              if (hasClass(pn, 'w-tree-item')) {
                addClass(pn, 'active')
                this.currentIndex = parseInt(pn.getAttribute('data-index'))
                this.currentSubIndex = parseInt(item.getAttribute('data-index'))
              }
            }
          }
        } else {
          removeClass(item, 'active')
        }
      }

      if (!this.centerActivedItem) {
        if (!stopEmit) {
          this.$emit('change', this.currentIndex, this.currentSubIndex)
        }
        return
      }
      let rectParent = this.$el.getBoundingClientRect()
      let rect = node.getBoundingClientRect()
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
      if (!stopEmit) {
        this.$emit('change', this.currentIndex, this.currentSubIndex)
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
        this.$refs.box.style.webkitTransition = `${time}ms all cubic-bezier(0.1, 0.57, 0.1, 1)`
      }
      this.$refs.box.style.transform = `translate3d(${x}px, ${y}px, 0)`
      this.$refs.box.style.webkitTransform = `translate3d(${x}px, ${y}px, 0)`
    },
    setCurrent(index, subIndex) {
      console.log('setCurrent', index, subIndex)
      let itms = this.$el.querySelectorAll(
        '.wui-scroll-tree-container> div> .w-tree-item'
      )
      if (index >= 0 && index < this.total && itms) {
        let pn = itms[index]
        if (subIndex !== undefined) {
          let children = pn.querySelectorAll('.w-tree-item')
          if (subIndex >= 0 && subIndex < this.data[index].children.length) {
            this.currentX = index
            this.centerItem(children[subIndex], true)
          }
        } else {
          this.currentX = index
          this.centerItem(pn, true)
        }
      }
    }
  },

  mounted() {
    this.total = this.data.length

    let height = this.$refs.box.offsetHeight
    this.hh = this.$el.offsetHeight
    this.maxsh = 0 //max scroll width
    this.minsh = this.hh - height //max scroll width
    if (this.minsh > 0) {
      this.minsh = 0
    }

    this.$refs.box.addEventListener('touchmove', this.touchmove, false)
    this.$refs.box.addEventListener('mousemove', this.touchmove, false)
    this.$refs.box.addEventListener('mouseup', this.touchend, false)
    this.$refs.box.addEventListener('touchend', this.touchend, false)
  },
  destroyed() {
    // window.removeEventListener('touchend', this.touchend, false);
    // window.removeEventListener('mouseup', this.touchend, false);
  }
}
</script>

<style lang="less">
@import './scrolltree.less';
</style>

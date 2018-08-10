<template>
  <div class="scroll" ref="scroll">
    <div ref="scrollInner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  data () {
    return {
    }
  },
  props: ['stop', 'init'],
  watch: {
    init () {
      this.bScroll()
    }
  },
  mounted () {
    this.bScroll()
  },
  methods: {
    getRect (el) {
      if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      } else {
        return {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        }
      }
    },
    bScroll () {
      this.$nextTick(() => {
        this.$refs.scrollInner.style.minHeight = `${this.getRect(this.$refs.scroll).height + 1}px`
        let stop = this.stop || 0
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            probeType: 3,
            click: true,
            scrollY: true,
            pullUpLoad: {
              threshold: 0
            },
            pullDownRefresh: {
              threshold: 50,
              stop: stop
            },
            mouseWheel: {
              speed: 20,
              invert: false
            },
            useTransition: false
          })
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
            this.scroll.finishPullUp()
            this.scroll.refresh()
          })
          this.scroll.on('pullingDown', () => {
            setTimeout(() => {
              this.$emit('pullingDown')
              this.scroll.finishPullDown()
              this.scroll.refresh()
            }, 0)
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll{height:100%;}
  .scroll>div{position:relative;}
</style>

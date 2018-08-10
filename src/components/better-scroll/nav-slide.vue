<template>
  <div class="navslide" ref="navslide">
    <div ref="navslideInner" :class="className">
      <ul ref="tabList">
        <li :key="item.id" v-for="(item, index) in subnavs" :class="item.active ? 'active' : ''" @click="setActive(index, item)">
          <span>{{item.zh_name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  props: ['className', 'subnavs'],
  data () {
    return {
    }
  },
  watch: {
    subnavs () {
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
        const tabList = this.$refs.tabList
        const items = tabList.children
        let width = 0
        for (let i = 0; i < items.length; i++) {
          width += items[i].clientWidth
        }
        tabList.style.width = (width + 1) + 'px'
        this.$refs.navslideInner.style.minWidth = `${this.getRect(this.$refs.navslide).width + 1}px`
        this.$refs.navslideInner.style.width = `${width + 1}px`
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.navslide, {
            probeType: 3,
            click: true,
            // direction: 'horizontal',
            scrollX: true,
            pullUpLoad: {
              threshold: 0
            },
            pullDownRefresh: {
              threshold: 0,
              stop: 0
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
            }, 1500)
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    setActive (index, item) {
      for (let key of this.subnavs) {
        this.$set(key, 'active', false)
      }
      this.$set(this.subnavs[index], 'active', true)
      this.$emit('select', item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navslide{min-width:100%;}
  .navslide>div{position:relative;}
  .navslide-ul-vslist{font-size:0;}
  .navslide-ul-vslist li{height:.8rem;display:inline-block;line-height:.76rem;padding:0 .2rem;border-bottom:.04rem solid transparent;font-size:.24rem;}
  .navslide-ul-vslist li.active{color:#17a84b;border-color:#17a84b;}

  .navslide-ul-matchs{font-size:0;padding:.14rem 0;}
  .navslide-ul-matchs li{display:inline-block;padding:0 .4rem;height:.5rem;line-height:.5rem;white-space:nowrap;font-size:.24rem;}
  .navslide-ul-matchs li.active{background-color:#ffe400;border-radius:.3rem;box-shadow:inset 0 2px 4px rgba(0,0,0,.3);position:relative;}
  .navslide-ul-matchs li.active:after{content:"";position:absolute;top:0;bottom:0;margin:auto;left:.2rem;border-radius:50%;height:.1rem;width:.1rem;background:#17a84b;}
</style>

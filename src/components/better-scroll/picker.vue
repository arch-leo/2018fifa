<template>
  <transition name="picker-fade">
    <div class="picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>
          <div class="picker-choose border-bottom-1px">
            <span class="cancel" @click="cancel">{{cancelTxt}}</span>
            <span class="confirm" @click="confirm">{{confirmTxt}}</span>
            <h3 class="picker-title">{{title}}</h3>
          </div>
          <div class="picker-content">
            <div class="mask-top border-bottom-1px"></div>
            <div class="mask-bot border-top-1px"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel" :key="data.id" v-for="data in pickerData">
                <ul class="wheel-scroll">
                  <li :key="item.id" v-for="item in data" class="wheel-item">{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="picker-footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'picker',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    title: {
      type: String
    },
    cancelTxt: {
      type: String,
      default: 'cancel'
    },
    confirmTxt: {
      type: String,
      default: 'confirm'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      state: 0,
      pickerData: this.data.data.slice(),
      pickerSelectedIndex: this.data.selectedIndex,
      pickerSelectedVal: [],
      pickerSelectedText: []
    }
  },
  created () {
    if (!this.pickerSelectedIndex.length) {
      this.pickerSelectedIndex = []
      for (let i = 0; i < this.pickerData.length; i++) {
        this.pickerSelectedIndex[i] = 0
      }
    }
  },
  methods: {
    confirm () {
      if (!this._canConfirm()) {
        return
      }
      this.hide()
      let changed = false
      for (let i = 0; i < this.pickerData.length; i++) {
        let index = this.wheels[i].getSelectedIndex()
        this.pickerSelectedIndex[i] = index
        let value = null
        if (this.pickerData[i].length) {
          value = this.pickerData[i][index].value
        }
        if (this.pickerSelectedVal[i] !== value) {
          changed = true
        }
        this.pickerSelectedText[i] = this.pickerData[i][index]
      }
      this.$emit('select', this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)

      if (changed) {
        this.$emit('valuechange', this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
      }
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    show () {
      if (this.state === 1) {
        return
      }
      this.state = 1

      if (!this.wheels || this.dirty) {
        this.$nextTick(() => {
          this.wheels = []
          let wheelWrapper = this.$refs.wheelWrapper
          for (let i = 0; i < this.pickerData.length; i++) {
            this._createWheel(wheelWrapper, i)
          }
          this.dirty = false
        })
      } else {
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].enable()
          this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
        }
      }
    },
    hide () {
      this.state = 0
      for (let i = 0; i < this.pickerData.length; i++) {
        this.wheels[i].disable()
      }
    },
    setData (data) {
      this.pickerData = data.data.slice()
      this.dirty = true
    },
    setSelectedIndex (index) {
      this.pickerSelectedIndex = index
    },
    refill (datas) {
      let ret = []
      if (!datas.length) {
        return ret
      }
      datas.forEach((data, index) => {
        ret[index] = this.refillColumn(index, data)
      })
      return ret
    },
    refillColumn (index, data) {
      if (this.state !== 1) {
        console.error('can not use refillColumn when picker is not show')
        return
      }
      const wheelWrapper = this.$refs.wheelWrapper
      let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
      let wheel = this.wheels[index]
      if (scroll && wheel) {
        let oldData = this.pickerData[index]
        this.$set(this.pickerData, index, data)
        let selectedIndex = wheel.getSelectedIndex()
        let dist = 0
        if (oldData.length) {
          let oldValue = oldData[selectedIndex].value
          for (let i = 0; i < data.length; i++) {
            if (data[i].value === oldValue) {
              dist = i
              break
            }
          }
        }
        this.pickerSelectedIndex[index] = dist
        this.$nextTick(() => {
          // recreate wheel so that the wrapperHeight will be correct.
          wheel = this._createWheel(wheelWrapper, index)
          wheel.wheelTo(dist)
        })
        return dist
      }
    },
    scrollTo (index, dist) {
      const wheel = this.wheels[index]
      this.pickerSelectedIndex[index] = dist
      wheel.wheelTo(dist)
    },
    refresh () {
      this.$nextTick(() => {
        this.wheels.forEach((wheel, index) => {
          wheel.refresh()
        })
      })
    },
    _createWheel (wheelWrapper, i) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wheelWrapper.children[i], {
          wheel: {
            selectedIndex: this.pickerSelectedIndex[i],
            /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item'
          },
          probeType: 3
        })

        this.wheels[i].on('scrollEnd', () => {
          this.$emit('change', i, this.wheels[i].getSelectedIndex())
        })
      } else {
        this.wheels[i].refresh()
      }

      return this.wheels[i]
    },
    _canConfirm () {
      return this.wheels.every((wheel) => {
        return !wheel.isInTransition
      })
    }
  },
  watch: {
    data (newData) {
      this.setData(newData)
    }
  }
}
</script>

<style scoped>
.picker{position:fixed;top:0;z-index:100;width:100%;height:100%;background-color:rgba(37,38,45,.4);max-width:6.4rem;z-index:15;}
.picker.picker-fade-enter,.picker.picker-fade-leave-active{opacity:0}
.picker.picker-fade-enter-active,.picker.picker-fade-leave-active{transition:all .3s ease-in-out}
.picker .picker-panel{position:absolute;bottom:0;width:100%;height:5.2rem;background:#fff;text-align:center;}
.picker .picker-panel.picker-move-enter,.picker .picker-panel.picker-move-leave-active{transform:translate3d(0,273px,0)}
.picker .picker-panel.picker-move-enter-active,.picker .picker-panel.picker-move-leave-active{transition:all .3s ease-in-out}
.picker .picker-panel .picker-choose{position:relative;height:.88rem;color:#999;line-height:.88rem;border-bottom:.02rem solid #eaeaea;}
.picker .picker-panel .picker-choose .picker-title{color:#333}
.picker .picker-panel .picker-choose .cancel,.picker .picker-panel .picker-choose .confirm{position:absolute;top:0;width:1.2rem;height:.88rem;}
.picker .picker-panel .picker-choose .confirm{right:0;color:#007bff}
.picker .picker-panel .picker-choose .confirm:active{color:#5aaaff}
.picker .picker-panel .picker-choose .cancel{left:0}
.picker .picker-panel .picker-choose .cancel:active{color:#c2c2c2}
.picker .picker-panel .picker-content{position:relative;top:.2rem}
.picker .picker-panel .picker-content .mask-bot,.picker .picker-panel .picker-content .mask-top{z-index:10;width:100%;height:1.4rem;pointer-events:none;transform:translateZ(0)}
.picker .picker-panel .picker-content .mask-top{position:absolute;top:0;background:linear-gradient(0deg,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));border-bottom:.02rem solid #eaeaea;}
.picker .picker-panel .picker-content .mask-bot{position:absolute;bottom:0;background:linear-gradient(180deg,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));border-top:.02rem solid #eaeaea;}
.picker .picker-panel .wheel-wrapper{display:flex;padding:0 .32rem}
.picker .picker-panel .wheel-wrapper .wheel{flex:1;flex-basis:1e-9px;width:1%;height:3.6rem;overflow:hidden;font-size:.36rem;}
.picker .picker-panel .wheel-wrapper .wheel .wheel-scroll{padding:0;margin-top:1.44rem;line-height:.72rem;list-style:none}
.picker .picker-panel .wheel-wrapper .wheel .wheel-scroll .wheel-item{list-style:none;height:.72rem;overflow:hidden;white-space:nowrap;color:#333}
.picker .picker-footer{height:.4rem}
</style>

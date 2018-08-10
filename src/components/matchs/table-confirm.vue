<template>
  <div class="parlay-confirm">
    <div class="head-back">
      <div class="back-head">
        <i class="iconfont icon-arrow-left" @click="clearParlay"></i>
        <h3>串关订单详情</h3>
        <em @click="refreshOdds">{{timerCount}}</em>
      </div>
    </div>
    <div class="parlay-cont">
      <h3>
        <button class="add" @click="addParlay"><i class="iconfont icon-add-circle"></i>添加赛事</button>
        <button class="clear" @click="clearParlay"><i class="iconfont icon-trash-can-o"></i>清空重选</button>
      </h3>
      <h4></h4>
      <div>
        <ul>
          <li :key="item.id" v-for="(item, index) in parlay">
            <h5 class="title">
              <i class="iconfont icon-medal"></i>{{item.matchname}}
              <span class="type">{{item.playtypename}}</span>
            </h5>
            <p>{{item.homename}} vs {{item.guestname}}</p>
            <p>{{item.betinfostring}}@<span class="color-red">{{item.odds}}</span><i class="iconfont icon-trash-can"
              @click="delParlay(index)"></i></p>
          </li>
        </ul>
        <h4 class="on"></h4>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {apiParlay} from '@/config/api'
export default {
  name: 'table-form',
  props: ['init', 'post', 'sportid', 'eventtype'],
  data () {
    return {
      parlay: [],
      initPost: [],
      timerCount: 10,
      refreshOddsFlag: false,

      timeCountFn: null
    }
  },
  computed: {
    finalPost () {
      return {
        gameinfo: JSON.stringify(this.initPost),
        sportid: this.sportid,
        eventtype: this.eventtype
      }
    }
  },
  created () {
    this.parlay = this.init
    this.initPost = this.post
    this.timeCountFn = setInterval(() => {
      this.timerCount--
      if (this.timerCount === 0) {
        this.timerCount = 10
        this.popLoadToggle(true)
        this.getParlay()
      }
    }, 1000)
  },
  methods: {
    ...mapMutations(['popLoadToggle', 'popMsgToggle']),
    clearParlay () {
      this.$emit('parlay-destory')
      if (this.timeCountFn) {
        clearInterval(this.timeCountFn)
        this.timeCountFn = null
      }
    },
    addParlay () {
      this.$emit('parlay-additem', -2)
      if (this.timeCountFn) {
        clearInterval(this.timeCountFn)
        this.timeCountFn = null
      }
    },
    delParlay (index) {
      if (this.refreshOddsFlag) {
        this.parlay.splice(index, 1)
      }
      this.$emit('parlay-delitem', index)
    },
    getParlay () {
      apiParlay(this.finalPost)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          this.refreshOddsFlag = true
          if (jsonState === 0 || jsonState === 1) {
            this.$set(this.$data, 'parlay', jsonData)
            this.$emit('parlay-confirm', jsonData)
          } else {
            this.popMsgToggle(jsonDesc)
          }
          this.popLoadToggle(false)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    refreshOdds () {
      this.getParlay()
    }
  },
  destroyed () {
    if (this.timeCountFn) {
      clearInterval(this.timeCountFn)
      this.timeCountFn = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back-head em{position:absolute;right:.1rem;top:0;color:#fff;font-size:.28rem;}
.parlay-confirm{height:100%;padding-top:.8rem;position:fixed;top:0;width:100%;max-width:6.4rem;z-index:14;background:#fff;}
.parlay-cont{height:100%;padding-top:1.44rem;position:relative;}
.parlay-cont h3{height:.96rem;margin-top:-1.44rem;padding:.2rem .7rem;}
.parlay-cont h3 button{width:2.48rem;border:.02rem solid #d1d1d1;text-align:center;background:#fff;color:#666;font-size:.28rem;}
.parlay-cont h3 button:first-child{float:left;}
.parlay-cont h3 button:last-child{float:right;}
.parlay-cont h4{height:.48rem;width:100%;background-image:url(../../assets/parlay_top.png);background-size:100% .48rem;}
.parlay-cont h4.on{background-image:url(../../assets/parlay_bot.png);margin-bottom:-.48rem;}
.parlay-cont div{height:100%;padding-bottom:2.1rem;}
.parlay-cont ul{height:100%;overflow-y:auto;padding:0 .4rem;background-image:url(../../assets/parlay_mid.png);line-height:.45rem;background-size:100% .48rem;}
.parlay-cont li{position:relative;border-bottom:.02rem dashed #999;margin-bottom:.3rem; padding:.2rem;}
.parlay-cont h5 i{color:#ff8400;}
.parlay-cont h5 span{float:right;}
.parlay-cont p i{float:right;color:#ddd;}
</style>

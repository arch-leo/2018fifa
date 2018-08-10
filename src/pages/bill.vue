<template>
  <div class="bill">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
    </div>
    <div class="bill-cont">
      <template v-if="hasData === 1">
        <scroll v-if="bill.betnum === 1">
          <h3>
            {{bill.homename}}
            <i>vs</i>
            {{bill.guestname}}
          </h3>
          <h4>
            注单号{{bill.order}}
            <span :data-clipboard-text="bill.order" class="copyText" @click="copyText"><i class="iconfont icon-rule2"></i></span>
          </h4>
          <ul :key="item.id" v-for="item in bill.betinfo">
            <li class="clearfix">
              <em>联赛</em>
              <span>{{item.matchname}}</span>
            </li>
            <li class="clearfix">
              <em>球队</em>
              <span>{{item.homename}} vs {{item.guestname}}</span>
            </li>
            <li class="clearfix">
              <em>玩法</em>
              <span>{{item.playtype}}</span>
            </li>
            <li class="clearfix">
              <em>投注</em>
              <span>{{item.info}} <b class="color-red">@{{item.odds}}</b></span>
            </li>
            <li class="clearfix">
              <em>结算结果</em>
              <span>{{bill.bonus}}</span>
            </li>
            <li class="clearfix">
              <em>实际盈亏</em>
              <span>{{bill.output}}</span>
            </li>
            <li class="clearfix">
              <em>下注金额</em>
              <span>{{bill.input}}</span>
            </li>
            <li class="clearfix">
              <em>半场结果</em>
              <span>{{bill.hresult}}</span>
            </li>
            <li class="clearfix">
              <em>全场结果</em>
              <span>{{bill.fresult}}</span>
            </li>
            <li class="clearfix">
              <em>投注时间</em>
              <span>{{bill.ordertime}}</span>
            </li>
          </ul>
          <router-link :to="'/matchs/' + bill.sportid">去投注</router-link>
        </scroll>

        <scroll v-else>
          <h3 v-if="bill.guestname === ''">{{bill.homename}}</h3>
          <h3 v-else>
            {{bill.homename}}
            <i>vs</i>
            {{bill.guestname}}
          </h3>
          <h4>
            注单号{{bill.order}}
            <span :data-clipboard-text="bill.order" class="copyText" @click="copyText"><i class="iconfont icon-rule2"></i></span>
          </h4>
          <ul>
            <li class="clearfix">
              <em>下注金额</em>
              <span>{{bill.input}}</span>
            </li>
            <li class="clearfix">
              <em>综合赔率</em>
              <span>{{bill.odds}}</span>
            </li>
            <li class="clearfix">
              <em>结算结果</em>
              <span>{{bill.bonus}}</span>
            </li>
            <li class="clearfix">
              <em>结算盈亏</em>
              <span>{{bill.output}}</span>
            </li>
            <li class="clearfix">
              <em>下注时间</em>
              <span>{{bill.ordertime}}</span>
            </li>
          </ul>
          <ul :key="item.id" v-for="item in bill.betinfo">
            <li class="clearfix">
              <em>{{item.playtype}}</em>
              <span>&nbsp;</span>
            </li>
            <li class="clearfix">
              <em>{{item.matchname}}</em>
              <span>&nbsp;</span>
            </li>
            <li class="clearfix">
              <em>{{item.homename}}VS{{item.guestname}}</em>
              <span>&nbsp;</span>
            </li>
            <li class="clearfix">
              <em>{{item.info}}@<strong class="color-red">{{item.odds}}</strong></em>
              <span>{{item.result}}</span>
            </li>
            <li class="clearfix">
              <em>开赛时间{{item.begintime}}</em>
              <span>&nbsp;</span>
            </li>
          </ul>
          <router-link :to="'/matchs/' + bill.sportid">去投注</router-link>
        </scroll>
      </template>
      <template v-else-if="hasData === 0">
        <nodata></nodata>
      </template>
      <template v-else>
      </template>
    </div>
  </div>
</template>

<script>
import scroll from '@/components/better-scroll/scroll'
import Clipboard from 'clipboard'
import {apiMybetinfo} from '@/config/api'
import {mapMutations} from 'vuex'
export default {
  name: 'my',
  data () {
    return {
      hasData: 2,
      order: this.$route.params.id,
      canCopy: false,
      bill: {}
    }
  },
  components: {
    scroll
  },
  watch: {
    $route (newVal, oldVal) {
      this.order = newVal.params.id
    }
  },
  created () {
    this.popLoadToggle(true)
    this.getDatas()
  },
  methods: {
    ...mapMutations(['popMsgToggle', 'popLoadToggle']),
    getDatas () {
      apiMybetinfo({order: this.order})
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            this.bill = jsonData[0]
            this.hasData = 1
          } else if (jsonData && jsonData.length === 0) {
            this.hasData = 0
          } else {
            this.hasData = 2
          }
          this.popLoadToggle(false)
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    copyText () {
      let clipboard = new Clipboard('.copyText')
      clipboard.on('success', e => {
        e.clearSelection()
        this.popMsgToggle('复制成功')
      })
      clipboard.on('error', (e) => {
        this.popMsgToggle('复制失败，请长按复制')
      })
    },
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bill{height:100%;}
.bill .back-head{background:none;}
.bill-cont{background:url(../assets/bill_detail_bg.png) no-repeat center 0;height:100%;background-size:100%;padding:.88rem .2rem .4rem;height:100%;}
.bill-cont h3{text-align:center;color:#fff;font-size:.28rem;margin-bottom:.3rem;}
.bill-cont h3 i{display:inline-block;height:.5rem;width:.5rem;line-height:.5rem;border-radius:50%;font-weight:700;background:#fff;text-align:center;color:#17a84b;}
.bill-cont h4{width:5rem;height:.6rem;line-height:.6rem;background:#17a84b;text-align:center;border-radius:.2rem;color:#fff;margin:0 auto;position:relative;top:.1rem;font-size:.28rem;}
.bill-cont ul{width:100%;background:#fff;border-radius:.2rem;line-height:.56rem;padding-top:.4rem;margin-bottom:.4rem;overflow:hidden;}
.bill-cont ul li{padding:0 .3rem;}
.bill-cont ul li:nth-child(odd){background:#f7f7f7;}
.bill-cont ul li span{float:right;display:inline-block;max-width:5rem;}
.bill-cont a{width:100%;height:.7rem;line-height:.7rem;text-align:center;display:block;border-radius:.1rem;background:#ffe400;color:#734217;font-weight:700;}
</style>

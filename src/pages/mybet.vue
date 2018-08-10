<template>
  <div class="bill">
    <div class="headbar">
      <headbar v-if="sports.length > 0" :pops="sports" @select="popSelect">
        <!-- <i class="iconfont icon-calendar2 bill-calendar" slot="right"></i> -->
        <div class="bill-navs" slot="bot">
          <ul class="bill-type">
            <li :key="item.id" v-for="item in navs" :class="{'active': item.active}" @click="navSelect(item)">{{item.title}}</li>
          </ul>
          <!--<div>
            <span class="fl">
              <b>投注量:</b>
              <em>{{input}}</em>
            </span>
            <span class="fr">
              <b>盈亏量:</b>
              <em>{{bonus}}</em>
            </span>
          </div>-->
        </div>
      </headbar>
    </div>
    <template v-if="hasData === 1">
      <div class="bill-wrap">
        <scroll @pullingDown="pullingDown" @pullingUp="pullingUp" :init="page">
          <div class="pulling-down">松开刷新</div>
          <router-link :to="'/bill/' + item.order" class="bill-item" :key="item.id" v-for="item in bets" :class="item.stat === 'quit' ? 'quit' :''">
            <i class="iconfont icon-medal"></i>
            <div>
              <h3>{{item.playtype}}</h3>
              <p v-if="item.guestname !== ''">{{item.homename}} VS {{item.guestname}}</p>
              <p v-else>{{item.homename}}</p>
              <p>{{item.info}}<em class="color-red">@{{item.odds}}</em></p>
              <p v-if="item.output !== ''">实际盈亏:{{item.output}}</p>
            </div>
            <h4>
              <em>下注:{{item.input}}</em>
              <b v-if="item.stat === 'win'"></b>
              <strong v-if="item.dangerous !== 'not'">{{item.dangerous === 'wait' ? '危险球-待确认' : '危险球-已确认' }}</strong>
              <span :class="item.stat">{{item.status}}</span>
            </h4>
          </router-link>
          <div class="pulling-up">{{pullUpDesc}}</div>
        </scroll>
      </div>
    </template>
    <template v-else-if="hasData === 0">
     <nodata></nodata>
    </template>
    <template v-else-if="hasData === 3">
     <repair :time="repairTime"></repair>
    </template>
    <template v-else>
    </template>
    <footbar></footbar>
  </div>
</template>

<script>
import headbar from '@/components/common/headbar'
import footbar from '@/components/common/footbar'
import scroll from '@/components/better-scroll/scroll'
import nodata from '@/components/common/nodata'
import repair from '@/components/common/repair'
import {delItem} from '@/utils/localstorage'
import {apiSports, apiMybet} from '@/config/api'
import {mapMutations} from 'vuex'
export default {
  name: 'result',
  data () {
    return {
      hasData: 2,
      sports: [],
      navs: [
        {title: '全部订单', type: 'all', active: true},
        {title: '已中奖', type: 'win', active: false},
        {title: '待开奖', type: 'wait', active: false},
        {title: '注单无效', type: 'quit', active: false}
      ],
      // input: 0.000,
      // bonus: 0.000,
      bets: [],
      sportid: 0,
      type: 'all',
      page: 1,
      pageAll: 1,
      dirty: false,
      pullUpDesc: '松开加载更多',
      repairTime: ''
    }
  },
  computed: {
    post () {
      return {
        sportid: this.sportid,
        status: this.type,
        page: this.page
      }
    }
  },
  components: {
    headbar,
    footbar,
    scroll,
    nodata,
    repair
  },
  created () {
    this.popLoadToggle(true)
    this.getSports()
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popRepairToggle', 'popMsgToggle', 'popAffirmToggle', 'popLoadToggle']),
    getSports () {
      apiSports()
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            for (let key of jsonData) {
              key.active = false
            }
            jsonData.unshift({zh_name: '全部比赛', sportid: 0, active: true})
            this.sports = jsonData
          }
          apiMybet(this.post)
            .then(json => {
              let jsonState = json.data.state
              let jsonDesc = json.data.desc
              let jsonData = json.data.data.result
              this.popLoadToggle(false)
              if (jsonState === -1) {
                this.hasData = 3
                this.repairTime = jsonData[0]
              } else if (jsonState === 0) {
                delItem('userInfo')
                this.setUserInfo(null)
                this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
              } else if (jsonState === 1) {
                this.pageAll = json.data.data.pages
                if (jsonData && jsonData.length > 0) {
                  this.page = 2
                  this.bets = jsonData
                  this.hasData = 1
                } else if (jsonData && jsonData.length === 0) {
                  this.hasData = 0
                } else {
                  this.hasData = 2
                }
                this.dirty = true
              } else {
                this.popMsgToggle(jsonDesc)
              }
            })
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    getMyBets () {
      apiMybet(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          if (jsonState === -1) {
            this.hasData = 3
            this.repairTime = jsonData[0]
          } else if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.pageAll = json.data.data.pages
            if (this.dirty === false) {
              this.$set(this.$data, 'bets', [])
              if (jsonData && jsonData.length > 0) {
                this.page = 2
                this.bets = this.bets.concat(jsonData)
                this.hasData = 1
              } else if (jsonData && jsonData.length === 0) {
                this.hasData = 0
              } else {
                this.hasData = 2
              }
            } else {
              this.page++
              this.bets = this.bets.concat(jsonData)
            }
            this.dirty = true
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
    popSelect (index, id) {
      for (let key of this.sports) {
        this.$set(key, 'active', false)
      }
      this.$set(this.sports[index], 'active', true)
      this.sportid = id
      this.page = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getMyBets()
    },
    navSelect (item) {
      for (let key of this.navs) {
        this.$set(key, 'active', false)
      }
      this.$set(item, 'active', true)
      this.type = item.type
      this.page = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getMyBets()
    },
    pullingDown () {
      this.page = 1
      this.pageAll = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getMyBets()
    },
    pullingUp () {
      if (this.pageAll === this.page - 1) {
        this.pullUpDesc = '没有更多了'
        return false
      }
      this.popLoadToggle(true)
      this.getMyBets()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bill{height:100%;padding:0.8rem 0 1rem;}
/* headbar */
.bill-calendar{position:absolute;right:.1rem;top:.24rem;color:#fff;width:.32rem;height:.34rem;line-height:.34rem;}
/* bill-navs */
.bill-navs{padding:.2rem .1rem 0;background:#f5f5f9;}
.bill-navs ul{height:.56rem;width:100%;border-radius:.28rem;overflow:hidden;background:#fff;margin-bottom:.2rem}
.bill-navs li{height:100%;width:25%;text-align:center;float:left;line-height:.56rem;border-radius:.28rem;}
.bill-navs li.active{background:#17a84b;color:#fff}
.bill-navs div{height:.56rem;width:100%;border-radius:.1rem;overflow:hidden;background:#fff;line-height:.56rem;margin-bottom:.2rem;}
.bill-navs div span:first-child{float:left;margin-left:.2rem;}
.bill-navs div span:last-child{float:right;margin-right:.2rem;}
.bill-navs b{}
.bill-navs em{color:#17a84b;}
/* bill-wrap */
.bill-wrap{padding:.96rem .1rem .1rem;height:100%;}
.bill-item{background-color:#fff;border-radius:.06rem;margin:0 auto .2rem;line-height:.5rem;position: relative;padding:0 .2rem;display:block;}

.bill-item .icon-medal{position:absolute;width:.34rem;height:.4rem;top:.16rem;left:.2rem;text-indent:0;line-height:.4rem;text-align:center;color: #f7b518;}
.bill-item div{padding:.1rem .2rem 0 .4rem;position:relative;}
.bill-item h3{font-size:.24rem;}
.bill-item p{line-height:.48rem;}
.bill-item p span{line-height:.48rem;}
.bill-item h4{border-top:.02rem solid #ddd;height:.64rem;padding:.12rem 0 .12rem .4rem;position:relative;}
.bill-item h4 em{float:left;line-height:.4rem;}
.bill-item h4 span{float:right;font-size:.2rem;height:.36rem;line-height:.36rem;padding:0 .18rem;border-radius:.18rem;border:.02rem solid #ddd;}
.bill-item h4 span.wait{border-color:#bbb;color:#fff;background:#bbb;}
.bill-item h4 span.lose{border-color:#bfbfbf;color:#666;}
.bill-item h4 span.win{border:none;color:#f54343;font-size:.28rem;height:.4rem;line-height:.4rem;}
.bill-item h4 span.quit{border-color:#bfbfbf;color:#666;}
.bill-item h4 span.back{border-color:#bbb;color:#666;background:#ddd;}
.bill-item h4 b{height:1.23rem;width:1.1rem;background:url(../assets/bet_suc.png) no-repeat;background-size:100%;position:absolute;right:0;top:-1.4rem;}
.bill-item h4 strong{position:absolute;right:0;top:-.48rem;color:#f80;font-size:.24rem;}
.bill-item.quit{background-color:#ddd;}
.bill-item.quit h4 span{border-color:#bbb;}
</style>

<template>
  <div class="matchs">
    <div class="headbar">
      <headbar v-if="events.length > 0" :sidebar="sidebarFlag" :pops="events" :matchs-flag="true" @select="popSelect" @sidebar="sidebarFlagInit">
        <i slot="left" class="iconfont icon-arrow-left matchs-back" @click="goindex"></i>
        <template slot="right">
          <span class="matchs-timer" @click="refreshMatchs">{{timerCount}}</span>
          <i class="iconfont icon-better matchs-menu" @click="sidebarToggle"></i>
        </template>
        <div class="matchs-subnavs" slot="bot" v-if="!sidebarFlag">
          <nav-slide v-if="plays.length > 0" class-name="navslide-ul-matchs" :subnavs="plays" @select="navSelect"></nav-slide>
        </div>
      </headbar>
    </div>
    <table-sidebar :flag="sidebarFlag" @filter-show="filterShow" @sidebar-hide="sidebarHide"></table-sidebar>
    <table-filter v-if="filterFlag" @filter-close="filterClose" @filter-confirm="filterConfirm"
      :sport="sport" :event="event" :play="play"></table-filter>
    <template v-if="hasData === 1">
      <div class="matchs-wrap" :class="inputFlag ? 'pannel': ''">
        <scroll :init="inputFlag && page" @pullingDown="pullingDown" @pullingUp="pullingUp">
          <div class="pulling-down">松开刷新</div>
          <template v-if="matchsAndPlayUpdated">
            <table1 :init="betInitFlag" :matchs="matchs" :bet-selected="selectedState" @bet-info="betInfo" @bet-input="betInput"
              :parlay="parlayFlag" :parlay-reduce="parlayReduce" :parlay-reduce-flag="parlayReduceFlag" v-if="play === '1x2-handicap-ou-oe'"></table1>
            <table2 :init="betInitFlag" :matchs="matchs" :bet-selected="selectedState" @bet-info="betInfo" @bet-input="betInput" v-else-if="play === 'ft_correct_score'"></table2>
            <table3 :init="betInitFlag" :matchs="matchs" :bet-selected="selectedState" @bet-info="betInfo" @bet-input="betInput" v-else-if="play === '1h_correct_score'"></table3>
            <table4 :init="betInitFlag" :matchs="matchs" :bet-selected="selectedState" @bet-info="betInfo" @bet-input="betInput" v-else-if="play === 'ht_ft'"></table4>
            <table5 :init="betInitFlag" :matchs="matchs" :bet-selected="selectedState" @bet-info="betInfo" @bet-input="betInput" v-else-if="play === 'total_goals'"></table5>
            <table6 :init="betInitFlag" :matchs="matchs" :bet-selected="selectedState" @bet-info="betInfo" @bet-input="betInput" v-else-if="play === 'outright'"></table6>
          </template>
          <div class="pulling-up">{{pullUpDesc}}</div>
        </scroll>
        <table-form :flag="inputFlag" :desc="inputDesc" :parlay="parlayFlag" :parlay-count="parlayCount" :ratio="inputRotio" :calc-ratio="inputRotioFlag"
          :parlay-confirm-init="parlayConfirmInit" :keyboard-show="keyboardShow" @panel-show="panelShow" @panel-affirm="panelAffrim "  @panel-hide="panelHide" @panel-confirm="panelConfirm"></table-form>
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
    <table-confirm :init="tableConfirmInitData" :sportid="sport" :eventtype="event" :post="betinfoObj" v-if="tableConfirmFlag"
      @parlay-delitem="parlayDelitem" @parlay-additem="parlayAdditem" @parlay-confirm="parlayConfirm" @parlay-destory="parlayDestory"></table-confirm>
  </div>
</template>

<script>
import headbar from '@/components/common/headbar'
import nodata from '@/components/common/nodata'
import repair from '@/components/common/repair'
import table1 from '@/components/matchs/table1'
import table2 from '@/components/matchs/table2'
import table3 from '@/components/matchs/table3'
import table4 from '@/components/matchs/table4'
import table5 from '@/components/matchs/table5'
import table6 from '@/components/matchs/table6'
import TableConfirm from '@/components/matchs/table-confirm'
import scroll from '@/components/better-scroll/scroll'
import NavSlide from '@/components/better-scroll/nav-slide.vue'
import TableForm from '@/components/matchs/table-form'
import TableSidebar from '@/components/matchs/table-sidebar'
import TableFilter from '@/components/matchs/table-filter'
import {apiEvents, apiPlays, apiMatch, apiBillbet} from '@/config/api'
import {delItem} from '@/utils/localstorage'
import {mapMutations} from 'vuex'
export default {
  name: 'matchs',
  data () {
    return {
      hasData: 2,
      navFlag: true,
      events: [],
      playIndex: 0,
      plays: [],
      matchs: [],
      inputFlag: false,
      keyboardShow: false,
      inputRotio: 0,
      inputRotioFlag: true,
      inputDesc: '',
      selectedState: false,
      sidebarFlag: false,
      pullUpDesc: '松开加载更多',
      dirty: false,
      repairTime: '',
      parlayFlag: false,
      parlayCount: 0,
      parlayReduce: -1,
      parlayReduceFlag: false,
      parlayConfirmInit: false,

      sport: this.$route.params.id,
      event: '',
      play: '',
      page: 1,
      pageAll: 1,
      pagesize: 10,

      autoodds: 'yes',
      betamount: 10,
      betinfo: '',
      betinfoObj: [],

      betInitFlag: false,
      playChanged: false,
      matchsAndPlayUpdated: false,
      tableConfirmFlag: false,
      tableConfirmInitData: [],

      timerCount: 180,
      timeCountFn: null,
      filterFlag: false,
      matchsFilters: ''
    }
  },
  computed: {
    loading () {
      if (this.sportsLoading && this.vslistsLoading) {
        return this.popLoadToggle(false)
      }
    },
    post () {
      if (this.matchsFilters !== '') {
        return {
          sportid: this.sport,
          eventtype: this.event,
          playtype: this.play,
          page: this.page,
          pagesize: this.pagesize,
          matches: this.matchsFilters
        }
      } else {
        return {
          sportid: this.sport,
          eventtype: this.event,
          playtype: this.play,
          page: this.page,
          pagesize: this.pagesize
        }
      }
    },
    billbet () {
      return {
        sportid: this.sport,
        eventtype: this.event,
        autoodds: this.autoodds,
        betamount: this.betamount,
        betinfo: this.betinfo
      }
    }
  },
  watch: {
    $route (newVal) {
      this.sport = newVal.params.id
      this.getEvents()
    },
    loading () {},
    play (newVal, oldVal) {
      this.playChanged = true
    }
  },
  components: {
    headbar,
    nodata,
    repair,
    table1,
    table2,
    table3,
    table4,
    table5,
    table6,
    scroll,
    NavSlide,
    TableForm,
    TableSidebar,
    TableConfirm,
    TableFilter
  },
  created () {
    this.popLoadToggle(true)
    this.getEvents()
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle', 'popAffirmToggle']),
    getEvents () {
      apiEvents({sport: this.sport})
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            jsonData[0].active = true
            this.event = jsonData[0].en_name
            this.events = jsonData
          }
          apiPlays({eventtype: this.event})
            .then(json => {
              let jsonData = json.data.data.result
              if (jsonData && jsonData.length > 0) {
                for (let key of jsonData) {
                  key.active = false
                }
                jsonData[0].active = true
                this.play = jsonData[0].en_name
                if (this.event === 'isplaying') {
                  this.timerCount = 30
                } else {
                  this.timerCount = 180
                }
                this.plays = jsonData
              }
              apiMatch(this.post)
                .then(json => {
                  this.getMatchsFun(json)
                })
            })
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    getPlays () {
      apiPlays({eventtype: this.event})
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            for (let key of jsonData) {
              key.active = false
            }
            jsonData[0].active = true
            this.play = jsonData[0].en_name
            this.plays = jsonData
          }
          apiMatch(this.post)
            .then(json => {
              this.getMatchsFun(json)
            })
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    getMatchs () {
      apiMatch(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          if (jsonState === -1) {
            this.hasData = 3
            this.repairTime = jsonData[0]
          } else if (jsonState === 0 || jsonState === 1) {
            this.pageAll = json.data.data.pages
            if (this.dirty === false) {
              if (jsonData && jsonData.length > 0) {
                this.page = 2
                this.$set(this.$data, 'matchs', jsonData)
                this.matchsAndPlayUpdated = true
                this.hasData = 1
                this.timerCountFun()
              } else if (jsonData && jsonData.length === 0) {
                this.hasData = 0
              } else {
                this.hasData = 2
              }
              this.dirty = true
            } else {
              this.page++
              this.matchs = this.matchs.concat(jsonData)
            }
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
    getRefreshs (post) {
      apiMatch(post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          if (jsonState === -1) {
            this.hasData = 3
            this.repairTime = jsonData[0]
          } else if (jsonState === 0 || jsonState === 1) {
            if (jsonData && jsonData.length > 0) {
              this.$set(this.$data, 'matchs', jsonData)
              this.matchsAndPlayUpdated = true
              this.hasData = 1
              if (this.event === 'isplaying') {
                this.timerCount = 30
              } else {
                this.timerCount = 180
              }
            } else if (jsonData && jsonData.length === 0) {
              this.hasData = 0
            } else {
              this.hasData = 2
            }
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
    getMatchsFun (json) {
      let jsonState = json.data.state
      let jsonDesc = json.data.desc
      let jsonData = json.data.data.result
      if (jsonState === -1) {
        this.hasData = 3
        this.repairTime = jsonData[0]
      } else if (jsonState === 0 || jsonState === 1) {
        this.pageAll = json.data.data.pages
        if (jsonData && jsonData.length > 0) {
          this.page = 2
          this.$set(this.$data, 'matchs', jsonData)
          this.matchsAndPlayUpdated = true
          this.hasData = 1
          this.timerCountFun()
        } else if (jsonData && jsonData.length === 0) {
          this.hasData = 0
          if (this.timeCountFn) {
            clearInterval(this.timeCountFn)
          }
        } else {
          this.hasData = 2
        }
        this.dirty = true
      } else {
        this.popMsgToggle(jsonDesc)
      }
      this.popLoadToggle(false)
    },
    initMatchesPost () {
      if (this.matchsFilters !== '') {
        return {
          sportid: this.sport,
          eventtype: this.event,
          playtype: this.play,
          page: 1,
          pagesize: (this.post.page - 1) * 10 > 0 ? (this.post.page - 1) * 10 : 10,
          matches: this.matchsFilters
        }
      } else {
        return {
          sportid: this.sport,
          eventtype: this.event,
          playtype: this.play,
          page: 1,
          pagesize: (this.post.page - 1) * 10 > 0 ? (this.post.page - 1) * 10 : 10
        }
      }
    },
    timerCountFun () {
      if (this.event === 'isplaying') {
        this.timerCount = 30
      } else {
        this.timerCount = 180
      }
      if (this.timeCountFn) {
        return false
      }
      this.timeCountFn = setInterval(() => {
        this.timerCount--
        if (this.timerCount === 0) {
          if (this.event === 'isplaying') {
            this.timerCount = 30
          } else {
            this.timerCount = 180
          }
          this.popLoadToggle(true)
          let post = this.initMatchesPost()
          this.getRefreshs(post)
        }
      }, 1000)
    },
    popSelect (index, name, event) {
      if (event === 'isplaying') {
        this.timerCount = 30
      } else {
        this.timerCount = 180
      }
      if (event === 'parlay') {
        this.parlayFlag = true
      } else {
        this.parlayFlag = false
      }
      for (let key of this.events) {
        this.$set(key, 'active', false)
      }
      this.$set(this.events[index], 'active', true)
      this.page = 1
      this.dirty = false
      this.event = event
      this.inputFlag = false
      this.matchsFilters = ''
      this.matchsAndPlayUpdated = false
      this.popLoadToggle(true)
      this.getPlays()
    },
    navSelect (item) {
      if (this.event === 'isplaying') {
        this.timerCount = 30
      } else {
        this.timerCount = 180
      }
      this.play = item.en_name
      this.page = 1
      this.dirty = false
      this.inputFlag = false
      this.matchsAndPlayUpdated = false
      this.matchsFilters = ''
      this.popLoadToggle(true)
      this.getMatchs(this.post)
    },
    goindex () {
      this.$router.push({path: '/index'})
    },
    parlayDestory () {
      this.parlayReduceFlag = !this.parlayReduceFlag
      this.parlayReduce = -1
    },
    parlayAdditem () {
      this.parlayReduceFlag = !this.parlayReduceFlag
      this.parlayReduce = -2
      this.tableConfirmFlag = false
    },
    parlayDelitem (index) {
      this.parlayReduceFlag = !this.parlayReduceFlag
      this.parlayReduce = index
    },
    calcNum (args) {
      let res = '1.00'
      let reg = /([0-9]+.[0-9]{2})[0-9]*/
      for (let i = 0; i < args.length; i++) {
        let m = 0
        let s1 = res.toString().replace(reg, '$1')
        let s2 = args[i].toString()
        try {
          m += s1.split('.')[1].length
        } catch (e) {
        }
        try {
          m += s2.split('.')[1].length
        } catch (e) {
        }
        res = Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
        res = res.toString().replace(reg, '$1')
      }
      return res
    },
    betInfo (args) {
      if (this.parlayFlag) {
        this.$set(this.$data, 'tableConfirmInitData', args[3])
        this.parlayCount = args[0].length
        if (this.parlayCount) {
          this.parlayConfirmInit = false
        }
        this.inputRotio = this.calcNum(args[2])
        this.inputDesc = args[1]
        this.betinfoObj = args[0]
        this.betinfo = JSON.stringify(args[0])
        this.inputRotioFlag = false
      } else {
        switch (args[0].playtype) {
          case 'ft1x2':
            this.inputRotioFlag = false
            break
          case 'fthandicap':
            this.inputRotioFlag = true
            break
          case 'ftou':
            this.inputRotioFlag = true
            break
          case 'ftoe':
            this.inputRotioFlag = false
            break
          case '1h1x2':
            this.inputRotioFlag = false
            break
          case '1hhandicap':
            this.inputRotioFlag = true
            break
          case '1hou':
            this.inputRotioFlag = true
            break
          case '1hoe':
            this.inputRotioFlag = false
            break
          case 'ft_correct_score':
            this.inputRotioFlag = false
            break
          case '1h_correct_score':
            this.inputRotioFlag = false
            break
          case 'ht_ft':
            this.inputRotioFlag = false
            break
          case 'fttotalgoals':
            this.inputRotioFlag = false
            break
          case 'outright':
            this.inputRotioFlag = false
            break
          default:
            break
        }
        this.inputRotio = args[0].odds
        this.inputDesc = args[1].desc
        this.betinfo = JSON.stringify([args[0]])
      }
    },
    betInput (flag, parlay) {
      this.inputFlag = flag
      this.tableConfirmFlag = false
      if (flag) {
        this.selectedState = true
      }
    },
    panelHide () {
      this.selectedState = false
      this.inputFlag = false
      this.keyboardShow = false
      this.tableConfirmFlag = false
    },
    panelShow () {
      this.keyboardShow = true
    },
    panelAffrim () {
      this.tableConfirmFlag = true
      this.parlayConfirmInit = true
    },
    parlayConfirm (args) {
      let oddsTemp = []
      for (let i = 0; i < this.betinfoObj.length; i++) {
        this.$set(this.betinfoObj[i], 'odds', args[i].odds)
        oddsTemp.push(args[i].odds)
      }
      this.inputRotio = this.calcNum(oddsTemp)
      this.betinfo = JSON.stringify(this.betinfoObj)
    },
    panelConfirm (data) {
      this.betamount = data.betAmount
      this.autoodds = data.autoOdds
      if (this.parlayFlag === true) {
        if (this.parlayConfirmInit) {
          this.popLoadToggle(true)
          setTimeout(() => {
            this.doBet()
          }, 1000)
        } else {
          this.parlayConfirmInit = true
        }
      } else {
        this.popLoadToggle(true)
        setTimeout(() => {
          this.doBet()
        }, 1000)
      }
    },
    doBet () {
      this.betInitFlag = false
      apiBillbet(this.billbet)
        .then(json => {
          this.popLoadToggle(false)
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '登录已过期，请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.popMsgToggle('下注成功')
            this.inputFlag = false
            this.betInitFlag = true
            if (this.parlayFlag === true) {
              this.parlayConfirmInit = false
              this.tableConfirmFlag = false
            }
            if (this.keyboardShow) {
              this.keyboardShow = false
              setTimeout(() => {
                this.panelHide()
              }, 100)
            } else {
              this.panelHide()
            }
          } else if (jsonState === 4) {
            this.popAffirmToggle({flag: true, title: jsonDesc, path: '/recharge', redirect: this.$route.fullPath})
          } else {
            this.popMsgToggle(jsonDesc)
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    sidebarFlagInit () {
      this.sidebarFlag = false
    },
    sidebarHide () {
      this.sidebarFlag = false
    },
    refreshMatchs () {
      this.popLoadToggle(true)
      let post = this.initMatchesPost()
      if (this.event === 'isplaying') {
        this.timerCount = 30
      } else {
        this.timerCount = 180
      }
      this.getRefreshs(post)
    },
    sidebarToggle () {
      this.sidebarFlag = !this.sidebarFlag
    },
    pullingDown () {
      this.page = 1
      this.pageAll = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getMatchs()
    },
    pullingUp () {
      if (this.pageAll === this.page - 1) {
        this.pullUpDesc = '没有更多了'
        return false
      }
      this.popLoadToggle(true)
      this.getMatchs()
    },
    filterClose () {
      this.filterFlag = false
    },
    filterShow () {
      this.sidebarFlag = false
      this.filterFlag = true
    },
    filterConfirm (args) {
      this.matchsFilters = args
      this.filterFlag = false
      this.dirty = false
      this.page = 1
      this.pageAll = 1
      this.popLoadToggle(true)
      this.getMatchs()
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
/* result */
.matchs{height:100%;padding-top:.8rem;}

/* headbar */
.matchs-back{position:absolute;left:.1rem;top:.16rem;color:#fff;width:.5rem;height:.54rem;line-height:.54rem;font-size:.44rem;}
.matchs-menu{position:absolute;right:.1rem;top:.16rem;color:#fff;width:.48rem;height:.5rem;line-height:.5rem;font-size:.44rem;}
.matchs-timer{position:absolute;right:.72rem;top:.24rem;color:#fff;width:.64rem;height:.4rem;line-height:.4rem;text-align:center;font-size:.28rem;}
.matchs-subnavs{border-bottom:.06rem solid #eaeaea;background:#fff;height:.84rem;overflow:hidden;}

.matchs-wrap{padding-top:.84rem;height:100%;}
.matchs-wrap.pannel{padding-bottom:1.8rem;}
</style>

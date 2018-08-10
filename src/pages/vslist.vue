<template>
  <div class="vslist">
    <div class="headbar">
      <div class="vslist-title">
        <div>
          <ul>
            <li :class="navFlag ? 'on' : ''">联赛</li>
            <!--<li :class="navFlag ? '' : 'on'" @click="navToggle">冠军</li>-->
          </ul>
        </div>
        <!-- <i class="iconfont icon-search right"></i> -->
      </div>
      <div class="vslist-filter">
        <div class="vslist-slider">
          <nav-slide v-if="sports.length > 0" class-name="navslide-ul-vslist" :subnavs="sports" @select="navSelect"></nav-slide>
        </div>
        <div class="vslist-date">
          <i class="iconfont icon-arrow-left" @click="theDayBefore"></i>
          <p>
            <i class="iconfont icon-calendar2" @click="showPicker"></i>
            <em>{{ selectedDate.selectedText }}</em>
            <span>{{selectedDate.selectedWeek | dateWeek}}</span>
          </p>
          <i class="iconfont icon-arrow-right" @click="theDayAfter"></i>
        </div>
      </div>
    </div>
    <template v-if="hasData === 1">
      <div class="vslist-wrap">
        <scroll @pullingDown="pullingDown" @pullingUp="pullingUp" :init="page">
          <div class="pulling-down">松开刷新</div>
          <div class="vslist-item" :key="item.id" v-for="(item, index) in vslists" :class="!close[index] ? '' : 'close'">
            <h3 @click="showToggle(index)">
              <em></em>
              <b>{{item.matchname}}</b>
              <i class="iconfont icon-arrow-down"></i>
              <i class="iconfont icon-arrow-up"></i>
              <span>全场</span>
              <span>上半场</span>
            </h3>
            <div class="clearfix">
              <h4>
                <span>{{item.begintime | dateMD}}</span>
                <span>{{item.begintime | dateHM}}</span>
              </h4>
              <h5>
                <em>{{item.gametype}}</em>
                <p>
                  <b>{{item.homename}}</b>
                  <span>{{item.homescore}}</span>
                  <span>{{item.homescore1h}}</span>
                </p>
                <p>
                  <b>{{item.guestname}}</b>
                  <span>{{item.guestscore}}</span>
                  <span>{{item.guestscore1h}}</span>
                </p>
              </h5>
              <!--<router-link :to="'/vs?gameid='+item.matchid">全部</router-link>-->
            </div>
          </div>
          <div class="pulling-up">{{pullUpDesc}}</div>
        </scroll>
      </div>
    </template>
    <template v-else-if="hasData === 0">
     <nodata></nodata>
    </template>
    <template v-else>
    </template>
    <date-picker @select="handleSelect(arguments)" ref="picker"></date-picker>
    <footbar></footbar>
  </div>
</template>

<script>
import headbar from '@/components/common/headbar'
import footbar from '@/components/common/footbar'
import nodata from '@/components/common/nodata'
import scroll from '@/components/better-scroll/scroll'
import DatePicker from '@/components/better-scroll/date-picker'
import NavSlide from '@/components/better-scroll/nav-slide'
import {apiSports, apiVslists} from '@/config/api'
import {formatDate, formatWeek} from '@/utils/date'
import {mapMutations} from 'vuex'
export default {
  name: 'vslist',
  data () {
    return {
      hasData: 2,
      navFlag: true,
      type: 'match',
      sports: [],
      vslists: [],
      close: [],

      selectedDate: {},
      sportid: 1,
      page: 1,
      pagesize: 10,
      pageAll: 1,
      dirty: false,
      pullUpDesc: '松开加载更多'
    }
  },
  computed: {
    loading () {
      if (this.sportsLoading && this.vslistsLoading) {
        return this.popLoadToggle(false)
      }
    },
    post () {
      return {
        sportid: this.sportid,
        date: this.selectedDate.selectedText,
        page: this.page,
        pagesize: this.pagesize
      }
    }
  },
  watch: {
    loading () {},
    selectedDate () {}
  },
  components: {
    headbar,
    footbar,
    nodata,
    scroll,
    DatePicker,
    NavSlide
  },

  created () {
    this.popLoadToggle(true)
    this.getDatas()
  },
  methods: {
    ...mapMutations(['popLoadToggle']),
    selectDate (date) {
      this.selectedDate = {
        selectedText: date.getFullYear() + '-' +
          ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' +
          (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
        selectedWeek: date.getDay()
      }
      this.date = this.selectedDate.selectedText
      this.page = 1
      this.pageAll = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getVslists()
    },
    getDatas () {
      apiSports()
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            jsonData[0].active = true
            this.sports = jsonData
            this.sportid = jsonData[0].sportid
          }
          let date = new Date()
          this.selectDate(date)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    getVslists () {
      apiVslists(this.post)
        .then(json => {
          let jsonData = json.data.data.result
          this.pageAll = json.data.data.pages
          if (this.dirty === false) {
            this.$set(this.$data, 'vslists', [])
            if (jsonData && jsonData.length > 0) {
              this.page = 2
              this.vslists = this.vslists.concat(jsonData)
              this.hasData = 1
            } else if (jsonData && jsonData.length === 0) {
              this.hasData = 0
            } else {
              this.hasData = 2
            }
          } else {
            this.page++
            this.vslists = this.vslists.concat(jsonData)
          }
          this.dirty = true
          this.popLoadToggle(false)
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    navToggle () {
      this.navFlag = !this.navFlag
      this.type = 'final'
      this.page = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getVslists()
    },
    navSelect (item) {
      this.sportid = item.sportid
      this.dirty = false
      this.popLoadToggle(true)
      this.getVslists()
    },
    showToggle (index) {
      this.$set(this.close, index, !this.close[index])
    },
    showPicker (index) {
      let picker = this.$refs['picker']
      picker.show()
    },
    handleSelect (args) {
      this.selectedDate.selectedText = args[2].join('-')
      this.selectedDate.selectedWeek = new Date(this.selectedDate.selectedText).getDay()
      this.date = this.selectedDate.selectedText
      this.dirty = false
      this.popLoadToggle(true)
      this.getVslists()
    },
    theDayBefore () {
      let date = new Date(new Date(this.selectedDate.selectedText) - 24 * 60 * 60 * 1000)
      this.selectDate(date)
    },
    theDayAfter () {
      let date = new Date(new Date(this.selectedDate.selectedText) - (-24 * 60 * 60 * 1000))
      this.selectDate(date)
    },
    pullingDown () {
      this.page = 1
      this.pageAll = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getVslists()
    },
    pullingUp () {
      if (this.pageAll === this.page - 1) {
        this.pullUpDesc = '没有更多了'
        return false
      }
      this.popLoadToggle(true)
      this.getVslists()
    }
  },
  filters: {
    dateMD (time) {
      let date = new Date(time.replace(/-/g, '/'))
      return formatDate(date, 'MM-dd')
    },
    dateHM (time) {
      let date = new Date(time.replace(/-/g, '/'))
      return formatDate(date, 'hh:mm')
    },
    dateWeek (num) {
      return formatWeek(num)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vslist{height:100%;padding:0.8rem 0 1rem;}
/* vslist-title */
.vslist-title{width:100%;text-align:center;}
.vslist-title div{width:2.4rem;padding:.16rem 0;height:100%;line-height:.44rem;margin:0 auto;}
.vslist-title ul{width:100%;height:100%;overflow:hidden;}
/*
.vslist-title li{width:50%;height:100%;background:transparent;float:left;color:#fff;border:.02rem solid #fff;}
.vslist-title li.on{background:#fff;color:#17a84b;}
.vslist-title li:first-child{border-radius:.1rem 0 0 .1rem;}
.vslist-title li:last-child{border-radius:0 .1rem .1rem 0;}
*/
.vslist-title li{width:100%;height:100%;background:transparent;color:#fff;border:.02rem solid #fff;border-radius:.1rem;}
.vslist-title i.right{position:absolute;right:.1rem;top:.24rem;color:#fff;width:.32rem;height:.34rem;line-height:.34rem;}
/* vslist-filter */
.vslist-filter{height:1.58rem;background:#f5f5f9;}
.vslist-slider{height:.8rem;}
.vslist-date{margin:0 auto;font-size:.24rem;display:flex;justify-content:center;height:.78rem;line-height:.74rem;border:.02rem solid #e8e8e8;background:#fff;}
.vslist-date .icon-arrow-left{margin-right:.1rem;width:.4rem;}
.vslist-date .icon-arrow-right{margin-left:.1rem;width:.4rem;}
.vslist-date em{margin:0 .1rem;}
/* vslist-wrap */
.vslist-wrap{padding-top:1.58rem;height:100%;}
.vslist-item{background:#fff;border-top:0.2rem solid #f5f5f9;}
.vslist-item:first-child{border-top:none;}
.vslist-item h3{height:0.64rem;line-height:0.64rem;font-size:0.24rem;}
.vslist-item h3 em{float:left;width:.26rem;height:.32rem;background:url(../assets/award.png) no-repeat;background-size:100%;margin:.22rem .08rem 0 .22rem;}
.vslist-item h3 b{font-weight:700;max-width:3.2rem;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block}
.vslist-item h3 span{float:right;color:#999;width:1rem;text-align:center;}
.vslist-item h3 i{float:right;color:#999;width:.38rem;text-align:center;margin-right:.1rem;}
.vslist-item h3 i.icon-arrow-up{display:none;}
.vslist-item.close h3 i.icon-arrow-down{display:none;}
.vslist-item.close h3 i.icon-arrow-up{display:block;}
.vslist-item div{border-top:0.02rem solid #eaeaea;position:relative;}
.vslist-item.close div{display:none;}
.vslist-item h4{width:.98rem;height:100%;border-right:.02rem solid #eaeaea;text-align:center;font-size:.24rem;color:#999;}
.vslist-item h4{display:flex;justify-content:center;flex-direction:column;position:absolute;}
.vslist-item h5{width:100%;padding:0 .5rem 0 1.08rem;}
.vslist-item h5 em{display:block;color:#004ba3;line-height:.6rem;}
.vslist-item h5 p{line-height:.56rem;height:.56rem;}
.vslist-item h5 b{float:left;}
.vslist-item h5 span{float:right;width:1rem;text-align:center;}
.vslist-item a{text-align:center;border:.02rem solid #eaeaea;border-radius:.2rem;width:.4rem;height:.92rem;font-size:.24rem;}
.vslist-item a{position:absolute;right:.1rem;top:50%;line-height:.36rem;padding:.1rem 0;margin-top:-.46rem;color:#999;}
</style>

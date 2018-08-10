<template>
  <div class="index">
    <slider :sliders="sliders"></slider>
    <div class="marquee">
      <i class="iconfont icon-loud-speaker2"></i>
      <marquee direction v-html="marquee"  v-if="marquee"></marquee>
      <div v-else>彩民之家，财富梦想</div>
      <span class="iconfont icon-more" @click="jumpTo('/notice')"></span>
    </div>
    <div class="sub-menu">
      <span class="sub-menu1" @click="jumpTo('/recharge')">充值</span>
      <span class="sub-menu2" @click="jumpTo('/try')">试玩</span>
      <span class="sub-menu3" @click="jumpTo('/other')">优惠</span>
      <span class="sub-menu4" @click="jumpTo('/services')">客服</span>
    </div>
    <div>{{loading}}</div>
    <div class="game-list">
      <div class="title"><i class="vs">vs</i>体育赛事</div>
      <div class="list clearfix">
        <template v-for="item in sports">
          <div class="list-item" :key="item.id" @click="sportSelect(item.sportid, item.onuse)">
            <img :src="item.icon" :alt="item.zh_name">
            <p>{{item.zh_name}}</p>
            <span v-if="item.onuse">有<i class="color-red">{{item.size}}</i>可投</span>
            <span v-else>暂未开放</span>
          </div>
        </template>
      </div>
    </div>
    <router-view></router-view>
    <footbar></footbar>
  </div>
</template>

<script>
import slider from '@/components/common/slider'
import footbar from '@/components/common/footbar'
import {apiActivities, apiNotices, apiSports} from '@/config/api'
import {delHtmlTag} from '@/utils/delHtmlTag'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      sliders: [],
      sports: [],
      activitiesLoading: false,
      noticesLoading: false,
      sportsLoading: false,
      marquee: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    loading () {
      if (this.activitiesLoading && this.noticesLoading && this.sportsLoading) {
        return this.popLoadToggle(false)
      }
    }
  },
  watch: {
    loading () {}
  },
  components: {
    slider,
    footbar
  },
  created () {
    this.popLoadToggle(true)
    this.getDatas()
  },
  methods: {
    ...mapMutations(['popMsgToggle', 'popLoadToggle', 'popAffirmToggle']),
    getDatas () {
      apiActivities()
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            this.sliders = jsonData
          }
          this.activitiesLoading = true
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.activitiesLoading = true
        })
      apiNotices()
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            this.marquee = jsonData.reduce((res, val) => {
              return res + delHtmlTag(val.title) + ' '
            }, '')
          }
          this.noticesLoading = true
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.noticesLoading = true
        })
      apiSports()
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            this.sports = jsonData
          }
          this.sportsLoading = true
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.sportsLoading = true
        })
    },
    jumpTo (path) {
      if (path === '/try') {
        this.popMsgToggle('暂未开放')
        return false
      }
      this.$router.push({path: path})
    },
    sportSelect (type, status) {
      if (status) {
        this.$router.push({path: '/matchs/' + type})
      } else {
        this.popMsgToggle('暂未开放，敬请期待')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{height:100%;padding-bottom:1rem;overflow-y:auto;}
.marquee{height:.7rem;width:100%;background-color:#fff;top:-.2rem;margin-top:-.15rem;position:relative;border-radius:.5rem;line-height:.7rem;color:#333;padding:0 0.6rem;z-index:5;}
.marquee marquee{display:block;margin:0 auto;width:100%;height:.7rem;}
.marquee p{display:inline;padding-right:1rem}
.marquee div{text-align:center}
.marquee .iconfont{position:absolute;top:0;bottom:0;margin:auto}
.marquee .icon-loud-speaker2{left:.1rem;font-size:.4rem;color:#17a84b}
.marquee .icon-more{right:.1rem;color:#bbb;font-size:.3rem}
.sub-menu{background:#fff;width:100%;height:2rem;}
.sub-menu span{height:100%;width:25%;padding-top:1.3rem;float:left;background:url() no-repeat center .3rem;background-size:.9rem .9rem;text-align:center;}
.sub-menu span.sub-menu1{background-image:url(../assets/recharge.png)}
.sub-menu span.sub-menu2{background-image:url(../assets/demo.png)}
.sub-menu span.sub-menu3{background-image:url(../assets/favorable.png)}
.sub-menu span.sub-menu4{background-image:url(../assets/service.png)}
.game-list{background-color:#fff;margin-top:.2rem;overflow-y:auto;}
.game-list .title{padding:0 .2rem;height:.7rem;line-height:.7rem;color:#999;border-bottom:1px solid #eaeaea}
.game-list .title i.vs{background-color:#17a84b;color:#fff;margin-right:.1rem;border-radius:50%;font-size:.26rem;display:inline-block;height:.3rem;width:.3rem;text-align:center;line-height:.3rem}
.game-list .list-item{display:block;height:1.9rem;width:50%;float:left;background:no-repeat .2rem;border-bottom:1px solid #eaeaea;padding-left:1.3rem;padding-top:.45rem;position:relative}
.game-list .list-item img{display:block;position:absolute;width:.9rem;left:.2rem}
.game-list .list-item p{line-height:.6rem;font-size:.26rem;color:#000}
.game-list .list-item span{color:#999}
.dialog{width:6.5rem;height:6.24rem;text-align:center;border-radius:.1rem}
.dialog .title{height:1.7rem;font-size:.46rem;line-height:1.7rem;color:#fff;background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);border-top-left-radius:.1rem;border-top-right-radius:.1rem}
.dialog .content{width:5.55rem;height:1.8rem;font-size:.28rem;margin:.57rem auto;text-align:left;line-height:.6rem}
.dialog .content .green{color:#17a84b}
.dialog .content .red{color:red}
.dialog button{width:4.7rem;height:.7rem;margin:0 auto;font-size:.28rem;background:#17a84b;color:#fff;border-radius:.1rem}
</style>

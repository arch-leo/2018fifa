<template>
  <div class="filters">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>筛选联赛</h3>
    </div>
    <div class="filters-cont">
      <h3>
        <span :key="item.id" v-for="(item, index) in navs" :class="item.active ? 'active' : ''" @click="navToggle(index)">{{item.title}}</span>
      </h3>
      <div :class="hotTitleFlag ? 'open' : ''">
        <h4 @click="hotTitle">
          <img src="../../assets/league_hot.png"/>
          <span>热门赛事</span>
          <i class="iconfont icon-arrow-down" v-if="hotTitleFlag"></i>
          <i class="iconfont icon-arrow-up" v-else></i>
        </h4>
        <ul>
          <li :key=item.id v-for="item in hotMatchs" v-if="item.ishot === '1'" @click="select(item, 'hot')" :class="item.active ? 'active' : ''">
            <i class="iconfont icon-select-selected" v-if="item.active"></i>
            <i class="iconfont icon-select-empty" v-else></i>
            <span>{{item.matchname}}</span>
            <em>{{item.eventnum}}</em>
          </li>
        </ul>
      </div>
      <div :class="otherTitleFlag ? 'open' : ''">
        <h4 @click="otherTitle">
          <img src="../../assets/league_other.png"/>
          <span>其他</span>
          <i class="iconfont icon-arrow-down" v-if="otherTitleFlag"></i>
          <i class="iconfont icon-arrow-up" v-else></i>
        </h4>
        <ul>
          <li :key=item.id v-for="item in otherMatchs" v-if="item.ishot === '0'" @click="select(item, 'other')" :class="item.active ? 'active' : ''">
            <i class="iconfont icon-select-selected" v-if="item.active"></i>
            <i class="iconfont icon-select-empty" v-else></i>
            <span>{{item.matchname}}</span>
            <em>{{item.eventnum}}</em>
          </li>
        </ul>
      </div>
      <h5>
        <button type="button" @click="goback">取消</button>
        <button type="button" @click="send">送出</button>
      </h5>
    </div>
  </div>
</template>

<script>
import {apiLeague} from '@/config/api'
import {mapMutations} from 'vuex'
export default {
  name: 'table-filter',
  props: ['sport', 'event', 'play'],
  data () {
    return {
      navs: [
        {title: '全部', active: false},
        {title: '仅热门赛事', active: false},
        {title: '仅其他', active: false}
      ],
      typeMatchs: -1,
      hotMatchs: [],
      otherMatchs: [],
      hotMatchesTemp: '',
      otherMatchesTemp: '',
      hotMatches: '',
      otherMatches: '',
      hotTitleFlag: true,
      otherTitleFlag: true
    }
  },
  computed: {
    post () {
      return {
        sportid: this.sport,
        eventtype: this.event,
        playtype: this.play
      }
    },
    matches () {
      let matches = this.hotMatches + this.otherMatches
      matches = matches.substring(0, matches.length - 1)
      return matches
    }
  },
  created () {
    this.popLoadToggle(true)
    this.getLeagues()
  },
  methods: {
    ...mapMutations(['popLoadToggle']),
    goback () {
      this.$emit('filter-close')
    },
    navToggle (index) {
      for (let key of this.navs) {
        this.$set(key, 'active', false)
      }
      if (this.typeMatchs === index) {
        if (this.typeMatchs === 0) {
          for (let key of this.hotMatchs) {
            this.$set(key, 'active', false)
          }
          for (let key of this.otherMatchs) {
            this.$set(key, 'active', false)
          }
          this.matches = ''
        } else if (this.typeMatchs === 1) {
          for (let key of this.hotMatchs) {
            this.$set(key, 'active', false)
          }
          this.hotMatches = ''
        } else {
          for (let key of this.otherMatchs) {
            this.$set(key, 'active', false)
          }
          this.otherMatches = ''
        }
        this.typeMatchs = -1
      } else {
        this.$set(this.navs[index], 'active', true)
        this.typeMatchs = index
        if (this.typeMatchs === 0) {
          for (let key of this.hotMatchs) {
            this.$set(key, 'active', true)
          }
          this.hotMatches = this.hotMatchesTemp
          for (let key of this.otherMatchs) {
            this.$set(key, 'active', true)
          }
          this.otherMatches = this.otherMatchesTemp
        } else if (this.typeMatchs === 1) {
          for (let key of this.hotMatchs) {
            this.$set(key, 'active', true)
          }
          this.hotMatches = this.hotMatchesTemp
          for (let key of this.otherMatchs) {
            this.$set(key, 'active', false)
          }
          this.otherMatches = ''
        } else {
          for (let key of this.hotMatchs) {
            this.$set(key, 'active', false)
          }
          this.hotMatches = ''
          for (let key of this.otherMatchs) {
            this.$set(key, 'active', true)
          }
          this.otherMatches = this.otherMatchesTemp
        }
      }
    },
    send () {
      if (this.matches === '') {
        this.goback()
      } else {
        this.$emit('filter-confirm', this.matches)
      }
    },
    getLeagues () {
      apiLeague(this.post)
        .then(json => {
          let jsonData = json.data.data.result
          let hotMatchs = jsonData.filter((item) => {
            if (item.ishot === '1') {
              this.hotMatchesTemp += item.matchid + ','
              item.active = false
            }
            return item.ishot === '1'
          })
          let otherMatchs = jsonData.filter((item) => {
            if (item.ishot === '0') {
              this.otherMatchesTemp += item.matchid + ','
              item.active = false
            }
            return item.ishot === '0'
          })
          this.$set(this.$data, 'hotMatchs', hotMatchs)
          this.$set(this.$data, 'otherMatchs', otherMatchs)
          this.popLoadToggle(false)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    hotTitle () {
      this.hotTitleFlag = !this.hotTitleFlag
    },
    otherTitle () {
      this.otherTitleFlag = !this.otherTitleFlag
    },
    select (item, type) {
      if (item.active === false) {
        this.$set(item, 'active', true)
        let str = item.matchid + ','
        if (type === 'hot') {
          this.hotMatches += str
        } else {
          this.otherMatches += str
        }
      } else {
        this.$set(item, 'active', false)
        let str = item.matchid + ','
        if (type === 'hot') {
          this.hotMatches = this.hotMatches.replace(str, '')
        } else {
          this.otherMatches = this.otherMatches.replace(str, '')
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filters{position:fixed;top:0;height:100%;width:100%;max-width:6.4rem;padding-top:.8rem;overflow-y:auto;z-index:12;background:#f5f5f5;z-index:90;}
.filters-cont{padding:.2rem .2rem .68rem}
.filters-cont h3{height:.6rem;line-height:.6rem;background:#fff;border-radius:.3rem;margin-bottom:.2rem;}
.filters-cont h3 span{float:left;width:33.3%;text-align:center;font-size:.28rem;border-radius:.3rem;}
.filters-cont h3 span:nth-child(2){width:33.4%;}
.filters-cont h3 span.active{background:#17a84b;color:#fff;}
.filters-cont div{background:#fff;margin-bottom:.2rem;}
.filters-cont div h4{height:.68rem;line-height:.68rem;text-align:center;border:.02rem solid #b6b6b6;}
.filters-cont div.open h4{border-bottom:none;}
.filters-cont div h4 img{width:.3rem;margin-right:.1rem;vertical-align:middle;}
.filters-cont div h4 i{float:right;margin-right:.2rem;color:#ddd;}
.filters-cont div ul{border:.02rem solid #b6b6b6;border-top:none;display:none;}
.filters-cont div.open ul{display:block;}
.filters-cont div li{border-top:.02rem solid #eaeaea;height:.68rem;line-height:.68rem;padding:0 .2rem;}
.filters-cont div li.active{color:#17a84b;}
.filters-cont div li em{float:right;margin-right:.1rem;color:#666;}
.filters-cont h5{position:fixed;bottom:0;width:100%;max-width:6.4rem;margin-left:-.2rem;}
.filters-cont h5 button{width:50%;height:.68rem;float:left;font-size:.28rem;}
.filters-cont h5 button:first-child{background:#fff;}
.filters-cont h5 button:last-child{background:#17a84b;color:#fff;}
</style>

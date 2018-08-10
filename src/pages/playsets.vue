<template>
  <div class="plays">
    <div class="headbar">
      <headbar v-if="sports.length > 0" :pops="sports" :sidebar="false" sub-title="详细设定" @select="popSelect">
        <i class="iconfont icon-arrow-left plays-back" slot="left" @click="goback"></i>
      </headbar>
    </div>
    <div class="plays-wrap">
      <h3>
        <span>{{title}}</span>
        <i class="line"></i>
      </h3>
      <div class="play-table">
        <template v-if="sets.length > 0">
          <table>
            <tr>
              <th>投注类型</th>
              <th>单场最高</th>
              <th>单注最高</th>
            </tr>
            <tr :key="item.id" v-for="item in sets">
              <td>{{item.name}}</td>
              <td>{{item.singleMatchLimitMax}}</td>
              <td>{{item.singleBetLimitMax}}</td>
            </tr>
          </table>
        </template>
        <template v-else>
          <nodata></nodata>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import headbar from '@/components/common/headbar'
import nodata from '@/components/common/nodata'
import {apiSports} from '@/config/api'
import Plays from '@/config/playsets/index'
import {mapMutations} from 'vuex'
export default {
  name: 'playsets',
  data () {
    return {
      title: '足球',
      sports: [],
      sets: Plays.football
    }
  },
  components: {
    headbar,
    nodata
  },
  created () {
    this.popLoadToggle(true)
    this.getSports()
  },
  methods: {
    ...mapMutations(['popLoadToggle']),
    goback () {
      this.$router.go(-1)
    },
    getSports () {
      apiSports()
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            for (let key of jsonData) {
              key.active = false
            }
            jsonData[0].active = true
            this.sports = jsonData
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
    popSelect (index, id) {
      for (let key of this.sports) {
        this.$set(key, 'active', false)
      }
      this.selectTitle(id)
      this.$set(this.sports[index], 'active', true)
    },
    selectTitle (id) {
      switch (id) {
        case '1':
          this.title = '足球'
          this.sets = Plays.football
          break
        case '2':
          this.title = '篮球'
          this.sets = Plays.basketball
          break
        case '3':
          this.title = '网球'
          this.sets = Plays.tennis
          break
        case '4':
          this.title = '排球'
          this.sets = Plays.volleyball
          break
        case '5':
          this.title = '羽毛球'
          this.sets = Plays.badminton
          break
        case '6':
          this.title = '乒乓球'
          this.sets = Plays.pong
          break
        case '7':
          this.title = '棒球'
          this.sets = Plays.baseball
          break
        default:
          break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.play-table{min-height:6rem;background:#fff;border-radius:.1rem;margin:.3rem auto;overflow:hidden;}
.play-table table{width:100%;text-align:left;}
.play-table table tr{border-bottom:.02rem solid #e5e5e5;line-height:.8rem;}
.play-table table th,.play-table table td{text-indent:.3rem;}
</style>

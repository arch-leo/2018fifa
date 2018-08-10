<template>
  <div class="plays">
    <div class="headbar">
      <headbar v-if="sports.length > 0" :pops="sports" :sidebar="false" sub-title="玩法规则" @select="popSelect">
        <i class="iconfont icon-arrow-left plays-back" slot="left" @click="goback"></i>
      </headbar>
    </div>
    <div class="plays-wrap">
      <h3>
        <span>{{title}}</span>
        <i class="line"></i>
      </h3>
      <h4 v-if="rules[0].name">
        <span :class="typeId === index ? 'active' : ''" :key="rule.id" v-for="(rule, index) in rules" @click="navToggle(index)">{{rule.name}}</span>
      </h4>
      <div :key="content.id" v-for="(content, index) in rules[typeId].content">
        <h5>{{content.title}}</h5>
        <div :key="second.id" v-for="(second, $index) in content.second" class="play-content">
          <p @click="contToggle(typeId, index, $index)">
            {{second.secondTitile}}
            <span><i class="iconfont" :class="(typeId + '+' + index + '+' + $index) === contFlag ? 'icon-arrow-up': 'icon-arrow-down'"></i></span>
          </p>
          <div :key="list.id" v-for="(list, listIndex) in second.list"
            :class="(typeId + '+' + index + '+' + $index) === contFlag ? '': 'close'">{{listIndex + 1}}.{{list.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headbar from '@/components/common/headbar'
import {apiSports} from '@/config/api'
import Plays from '@/config/playrules/index'
import {mapMutations} from 'vuex'
export default {
  name: 'playrules',
  data () {
    return {
      title: '足球',
      sports: [],
      navs: [],
      rules: Plays.football,
      typeId: 0,
      contFlag: ''
    }
  },
  components: {
    headbar
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
      this.typeId = 0
      this.contFlag = ''
      this.selectTitle(id)
      this.$set(this.sports[index], 'active', true)
    },
    selectTitle (id) {
      switch (id) {
        case '1':
          this.title = '足球'
          this.rules = Plays.football
          break
        case '2':
          this.title = '篮球'
          this.rules = Plays.basketball
          break
        case '3':
          this.title = '网球'
          this.rules = Plays.tennis
          break
        case '4':
          this.title = '排球'
          this.rules = Plays.volleyball
          break
        case '5':
          this.title = '羽毛球'
          this.rules = Plays.badminton
          break
        case '6':
          this.title = '乒乓球'
          this.rules = Plays.pong
          break
        case '7':
          this.title = '棒球'
          this.rules = Plays.baseball
          break
        default:
          break
      }
    },
    navToggle (index) {
      this.typeId = index
    },
    contToggle (id, index, $index) {
      if (this.contFlag === id + '+' + index + '+' + $index) {
        this.contFlag = ''
      } else {
        this.contFlag = id + '+' + index + '+' + $index
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.play-content{background:#fff;padding:.2rem;border-radius:.1rem;margin:.2rem auto;line-height:.4rem;color:#666;}
.play-content p{margin-bottom:.1rem;color:#17a84b;}
.play-content p i{float:right;transition:all .5s;}
.play-content div.close{display:none;}
</style>

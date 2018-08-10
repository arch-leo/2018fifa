<template>
  <div>
    <div class="table-wrap" :key="item.id" v-for="(item, index) in matchs"  :class="!close[index] ? '' : 'close'">
      <h3 class="table-title" @click="titleClick(index)">
        <span>{{item.matchname}}</span>
        <em>{{item.begintime}}</em>
        <i class="iconfont icon-arrow-down"></i>
        <i class="iconfont icon-arrow-up"></i>
      </h3>
      <div class="table6-table" :key="schedule.id" v-for="schedule in item.schedule">
        <h4>{{schedule.gametype}}</h4>
        <ul class="clearfix">
          <li :class="selected === schedule.scheduleid + '+' + schedule.gameid + key ? 'selected' : ''"
            v-for="(fs, key) in schedule.odds['outright'][0]" :key="fs.id"
            @click="selectBet(key, {
              scheduleid: schedule.scheduleid,
              gameid: schedule.gameid,
              odds: fs.odds,
              playtype: 'outright',
              oddskey: key
            }, {
              desc: fs.team
            })"
          >
            <span><i class="ellipsis">{{fs.team}}</i></span>
            <em>{{fs.odds}}</em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'table6',
  props: ['init', 'matchs', 'bet-selected'],
  data () {
    return {
      close: [],
      toggle: {},
      selected: '',
      flag: false
    }
  },
  watch: {
    betSelected (newVal, oldVal) {
      if (newVal === false) {
        this.selected = ''
      }
    },
    matchs (newVal, oldVal) {
      for (let keys of newVal) {
        for (let key of keys.schedule) {
          let obj = {
            flag: false,
            id: key.scheduleid
          }
          this.$set(this.toggle, key.scheduleid, obj)
        }
      }
    },
    init (newVal, oldVal) {
      if (newVal === true) {
        this.selected = ''
      }
    }
  },
  methods: {
    ...mapMutations(['popMsgToggle']),
    titleClick (index) {
      this.$set(this.close, index, !this.close[index])
    },
    selectBet (exist, post, type) {
      if (exist) {
        if (this.selected === post.scheduleid + '+' + post.gameid + post.oddskey) {
          if (this.flag) {
            this.flag = false
            this.selected = ''
            this.$emit('bet-input', this.flag)
          } else {
            this.flag = true
            this.selected = post.scheduleid + '+' + post.gameid + post.oddskey
            this.$emit('bet-info', [post, type])
            this.$emit('bet-input', this.flag)
          }
        } else {
          this.flag = true
          this.selected = post.scheduleid + '+' + post.gameid + post.oddskey
          this.$emit('bet-info', [post, type])
          this.$emit('bet-input', this.flag)
        }
      }
    },
    morePlay (scheduleid) {
      this.popMsgToggle('暂无更多玩法')
      // this.$router.push({path: '/plays?scheduleid=' + scheduleid})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table6-table{position:relative;padding-top:.2rem;}
.table6-table h4{height:.7rem;color:#666;padding-left:.3rem;}
.table6-table h4 span i{display:block;height:.34rem;line-height:.34rem;}
.table6-table h4 span em{display:block;line-height:.26rem;font-size:.24rem;}
.table6-table h4 b{display:block;height:.86rem;line-height:.86rem;}
.table6-table ul{margin:0 .1rem;border:.02rem solid #cacaca;}
.table6-table li{float:left;width:50%;border-top:.02rem solid #eaeaea;padding:0 .2rem;height:.64rem;line-height:.6rem;position:relative;background:#fff}
.table6-table li:nth-child(1){border-top:none;}
.table6-table li:nth-child(2){border-top:none;}
.table6-table li:nth-child(odd){border-right:.02rem solid #eaeaea;}
.table6-table li.selected{background:#17a84b;color:#fff;}
.table6-table li span{width:100%;padding-right:.4rem;display:block;}
.table6-table li em{position:absolute;right:.2rem;top:0;}
.table6-table li span i{display:block;}

</style>

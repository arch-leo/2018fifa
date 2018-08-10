<template>
  <div>
    <div class="table-wrap" :key="item.id" v-for="(item, index) in matchs"  :class="!close[index] ? '' : 'close'">
      <h3 class="table-title" @click="titleClick(index)">
        <span>{{item.matchname}}</span>
        <i class="iconfont icon-arrow-down"></i>
        <i class="iconfont icon-arrow-up"></i>
      </h3>
      <div class="table5-table" :key="schedule.id" v-for="schedule in item.schedule">
        <h4>
          <span>
            <i class="iconfont icon-football"></i>
            <em>{{schedule.begintime | getMD}}</em>
            <em>{{schedule.begintime | getHM}}</em>
          </span>
          <b>{{schedule.homename}} VS {{schedule.guestname}}</b>
        </h4>
        <ul>
          <li>全场</li>
          <li>半场</li>
        </ul>
        <div>
          <table>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iort01' ? 'selected' : ''"
                @click="selectBet(schedule.odds['fttotalgoals'][0].iort01, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['fttotalgoals'][0].iort01,
                    playtype: 'fttotalgoals',
                    oddskey:'iort01'
                  }, {
                    desc: '0-1'
                  })"
                >
                <span>0-1</span>
                <em>{{schedule.odds['fttotalgoals'][0].iort01 ? schedule.odds['fttotalgoals'][0].iort01 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iort23' ? 'selected' : ''"
                @click="selectBet(schedule.odds['fttotalgoals'][0].iort23, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['fttotalgoals'][0].iort23,
                    playtype: 'fttotalgoals',
                    oddskey:'iort23'
                  }, {
                    desc: '2-3'
                  })"
                >
                <span>2-3</span>
                <em>{{schedule.odds['fttotalgoals'][0].iort23 ? schedule.odds['fttotalgoals'][0].iort23 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iort46' ? 'selected' : ''"
                @click="selectBet(schedule.odds['fttotalgoals'][0].iort46, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['fttotalgoals'][0].iort46,
                    playtype: 'fttotalgoals',
                    oddskey:'iort46'
                  }, {
                    desc: '4-6'
                  })"
                >
                <span>4-6</span>
                <em>{{schedule.odds['fttotalgoals'][0].iort46 ? schedule.odds['fttotalgoals'][0].iort46 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorover' ? 'selected' : ''"
                @click="selectBet(schedule.odds['fttotalgoals'][0].iorover, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['fttotalgoals'][0].iorover,
                    playtype: 'fttotalgoals',
                    oddskey:'iorover'
                  }, {
                    desc: '7+'
                  })"
                >
                <span>7+</span>
                <em>{{schedule.odds['fttotalgoals'][0].iorover ? schedule.odds['fttotalgoals'][0].iorover : '/'}}</em>
              </td>
              <td>/</td>
            </tr>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorht0' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1htotalgoals'][0].iorht0, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1htotalgoals'][0].iorht0,
                    playtype: '1htotalgoals',
                    oddskey:'iorht0'
                  }, {
                    desc: '0'
                  })"
                >
                <span>0</span>
                <em>{{schedule.odds['1htotalgoals'][0].iorht0 ? schedule.odds['1htotalgoals'][0].iorht0 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorht1' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1htotalgoals'][0].iorht1, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1htotalgoals'][0].iorht1,
                    playtype: '1htotalgoals',
                    oddskey:'iorht1'
                  }, {
                    desc: '1'
                  })"
                >
                <span>1</span>
                <em>{{schedule.odds['1htotalgoals'][0].iorht1 ? schedule.odds['1htotalgoals'][0].iorht1 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorht2' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1htotalgoals'][0].iorht2, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1htotalgoals'][0].iorht2,
                    playtype: '1htotalgoals',
                    oddskey:'iorht2'
                  }, {
                    desc: '2'
                  })"
                >
                <span>2</span>
                <em>{{schedule.odds['1htotalgoals'][0].iorht2 ? schedule.odds['1htotalgoals'][0].iorht2 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorhtov' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1htotalgoals'][0].iorhtov, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1htotalgoals'][0].iorhtov,
                    playtype: '1htotalgoals',
                    oddskey:'iorhtov'
                  }, {
                    desc: '3+'
                  })"
                >
                <span>3+</span>
                <em>{{schedule.odds['1htotalgoals'][0].iorhtov ? schedule.odds['1htotalgoals'][0].iorhtov : '/'}}</em>
              </td>
              <td @click="morePlay(schedule.scheduleid)">
                <span class="more">更多<br>玩法</span>
              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'table5',
  props: ['init', 'matchs', 'bet-selected'],
  data () {
    return {
      close: [],
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
  filters: {
    getMD (str) {
      return str.substring(5, 10)
    },
    getHM (str) {
      return str.substring(11, 16)
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
.table5-table{position:relative;padding-top:.2rem;}
.table5-table h4{height:.86rem;padding-left:.9rem;position:relative;}
.table5-table h4 span{position:absolute;left:.1rem;top:0;text-align:center;color:#17a84b;}
.table5-table h4 span i{display:block;height:.34rem;line-height:.34rem;}
.table5-table h4 span em{display:block;line-height:.26rem;font-size:.24rem;}
.table5-table h4 b{display:block;height:.86rem;line-height:.86rem;}
.table5-table ul{width:.8rem;text-align:center;position:absolute;left:0;top:.96rem;}
.table5-table li{height:.9rem;line-height:.4rem;display:flex;justify-content:center;flex-direction:column;color:#666;}
.table5-table li.rowspan{height:1.8rem;}
.table5-table div{width:100%;padding:0 .1rem 0 .8rem;}
.table5-table table{width:100%;background:#fff;}
.table5-table td{border-top:.02rem solid #eaeaea;border-left:.02rem solid #eaeaea;text-align:center;line-height:.4rem;height:.9rem;}
.table5-table tr td:first-child{border-left:.02rem solid #cacaca;}
.table5-table tr:first-child td{border-top:.02rem solid #cacaca;}
.table5-table tr td:last-child{border-right:.02rem solid #cacaca;}
.table5-table tr:last-child td{border-bottom:.02rem solid #cacaca;}

.table5-table td.selected{background:#17a84b;color:#fff;}
.table5-table td.selected span{color:#fff;}
.table5-table td em{display:block;}
.table5-table td span{display:block;color:#999;}
.table5-table td span.more{color:#17a84b;font-size:.24rem;}

</style>

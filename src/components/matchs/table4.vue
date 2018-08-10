<template>
  <div>
    <div class="table-wrap" :key="item.id" v-for="(item, index) in matchs"  :class="!close[index] ? '' : 'close'">
      <h3 class="table-title" @click="titleClick(index)">
        <span>{{item.matchname}}</span>
        <i class="iconfont icon-arrow-down"></i>
        <i class="iconfont icon-arrow-up"></i>
      </h3>
      <div class="table4-table" :key="schedule.id" v-for="schedule in item.schedule">
        <h4>
          <span>
            <i class="iconfont icon-football"></i>
            <em>{{schedule.begintime | getMD}}</em>
            <em>{{schedule.begintime | getHM}}</em>
          </span>
          <b>{{schedule.homename}} VS {{schedule.guestname}}</b>
        </h4>
        <div>
          <table>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfhh' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfhh, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfhh,
                    playtype: 'ht_ft',
                    oddskey:'iorfhh'
                  }, {
                    desc: '主/主'
                  })"
                >
                <span>主/主</span>
                <em>{{schedule.odds['ht_ft'][0].iorfhh ? schedule.odds['ht_ft'][0].iorfhh : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfhn' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfhn, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfhn,
                    playtype: 'ht_ft',
                    oddskey:'iorfhn'
                  }, {
                    desc: '主/和'
                  })"
                >
                <span>主/和</span>
                <em>{{schedule.odds['ht_ft'][0].iorfhn ? schedule.odds['ht_ft'][0].iorfhn : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfnh' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfnh, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfnh,
                    playtype: 'ht_ft',
                    oddskey:'iorfnh'
                  }, {
                    desc: '和/主'
                  })"
                >
                <span>和/主</span>
                <em>{{schedule.odds['ht_ft'][0].iorfnh ? schedule.odds['ht_ft'][0].iorfnh : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfnn' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfnn, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfnn,
                    playtype: 'ht_ft',
                    oddskey:'iorfnn'
                  }, {
                    desc: '和/和'
                  })"
                >
                <span>和/和</span>
                <em>{{schedule.odds['ht_ft'][0].iorfnn ? schedule.odds['ht_ft'][0].iorfnn : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfhc' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfhc, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfhc,
                    playtype: 'ht_ft',
                    oddskey:'iorfhc'
                  }, {
                    desc: '主/客'
                  })"
                >
                <span>主/客</span>
                <em>{{schedule.odds['ht_ft'][0].iorfhc ? schedule.odds['ht_ft'][0].iorfhc : '/'}}</em>
              </td>
            </tr>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfch' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfch, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfch,
                    playtype: 'ht_ft',
                    oddskey:'iorfch'
                  }, {
                    desc: '客/主'
                  })"
                >
                <span>客/主</span>
                <em>{{schedule.odds['ht_ft'][0].iorfch ? schedule.odds['ht_ft'][0].iorfch : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfcn' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfcn, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfcn,
                    playtype: 'ht_ft',
                    oddskey:'iorfcn'
                  }, {
                    desc: '客/和'
                  })"
                >
                <span>客/和</span>
                <em>{{schedule.odds['ht_ft'][0].iorfcn ? schedule.odds['ht_ft'][0].iorfcn : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfcc' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfcc, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfcc,
                    playtype: 'ht_ft',
                    oddskey:'iorfcc'
                  }, {
                    desc: '客/客'
                  })"
                >
                <span>客/客</span>
                <em>{{schedule.odds['ht_ft'][0].iorfcc ? schedule.odds['ht_ft'][0].iorfcc : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorfnc' ? 'selected' : ''"
                @click="selectBet(schedule.odds['ht_ft'][0].iorfnc, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['ht_ft'][0].iorfnc,
                    playtype: 'ht_ft',
                    oddskey:'iorfnc'
                  }, {
                    desc: '和/客'
                  })"
                >
                <span>和/客</span>
                <em>{{schedule.odds['ht_ft'][0].iorfnc ? schedule.odds['ht_ft'][0].iorfnc : '/'}}</em>
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
  name: 'table4',
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
.table4-table{position:relative;padding-top:.2rem;}
.table4-table h4{height:.86rem;padding-left:.9rem;position:relative;}
.table4-table h4 span{position:absolute;left:.1rem;top:0;text-align:center;color:#17a84b;}
.table4-table h4 span i{display:block;height:.34rem;line-height:.34rem;}
.table4-table h4 span em{display:block;line-height:.26rem;font-size:.24rem;}
.table4-table h4 b{display:block;height:.86rem;line-height:.86rem;}
.table4-table div{width:100%;padding:0 .1rem;}
.table4-table table{width:100%;background:#fff;}
.table4-table td{border-top:.02rem solid #eaeaea;border-left:.02rem solid #eaeaea;text-align:center;line-height:.4rem;height:.9rem;}
.table4-table tr td:first-child{border-left:.02rem solid #cacaca;}
.table4-table tr:first-child td{border-top:.02rem solid #cacaca;}
.table4-table tr td:last-child{border-right:.02rem solid #cacaca;}
.table4-table tr:last-child td{border-bottom:.02rem solid #cacaca;}

.table4-table td.selected{background:#17a84b;color:#fff;}
.table4-table td.selected span{color:#fff;}
.table4-table td em{display:block;}
.table4-table td span{display:block;color:#999;}
.table4-table td span.more{color:#17a84b;font-size:.24rem;}

</style>

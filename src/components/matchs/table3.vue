<template>
  <div>
    <div class="table-wrap" :key="item.id" v-for="(item, index) in matchs"  :class="!close[index] ? '' : 'close'">
      <h3 class="table-title" @click="titleClick(index)">
        <span>{{item.matchname}}</span>
        <i class="iconfont icon-arrow-down"></i>
        <i class="iconfont icon-arrow-up"></i>
      </h3>
      <div class="table3-table" :key="schedule.id" v-for="schedule in item.schedule">
        <h4>
          <i class="iconfont icon-football"></i>
          <span>{{schedule.begintime}}</span>
        </h4>
        <ul>
          <li class="rowspan">{{schedule.homename}}</li>
          <li class="rowspan">{{schedule.guestname}}</li>
          <li>和局</li>
          <li>其他</li>
        </ul>
        <div>
          <table>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh1c0' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh1c0, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh1c0,
                    playtype: '1h_correct_score',
                    oddskey:'iorh1c0'
                  }, {
                    desc: '1-0'
                  })"
                >
                <span>1-0</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh1c0 ? schedule.odds['1h_correct_score'][0].iorh1c0 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh2c0' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh2c0, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh2c0,
                    playtype: '1h_correct_score',
                    oddskey:'iorh2c0'
                  }, {
                    desc: '2-0'
                  })"
                >
                <span>2-0</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh2c0 ? schedule.odds['1h_correct_score'][0].iorh2c0 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh2c1' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh2c1, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh2c1,
                    playtype: '1h_correct_score',
                    oddskey:'iorh2c1'
                  }, {
                    desc: '2-1'
                  })"
                >
                <span>2-1</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh2c1 ? schedule.odds['1h_correct_score'][0].iorh2c1 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh3c0' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh3c0, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh3c0,
                    playtype: '1h_correct_score',
                    oddskey:'iorh3c0'
                  }, {
                    desc: '3-0'
                  })"
                >
                <span>3-0</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh3c0 ? schedule.odds['1h_correct_score'][0].iorh3c0 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh3c1' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh3c1, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh3c1,
                    playtype: '1h_correct_score',
                    oddskey:'iorh3c1'
                  }, {
                    desc: '3-1'
                  })"
                >
                <span>3-1</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh3c1 ? schedule.odds['1h_correct_score'][0].iorh3c1 : '/'}}</em>
              </td>
            </tr>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh3c2' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh3c2, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh3c2,
                    playtype: '1h_correct_score',
                    oddskey:'iorh3c2'
                  }, {
                    desc: '3-2'
                  })"
                >
                <span>3-2</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh3c2 ? schedule.odds['1h_correct_score'][0].iorh3c2 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh4c0' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh4c0, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh4c0,
                    playtype: '1h_correct_score',
                    oddskey:'iorh4c0'
                  }, {
                    desc: '4-0'
                  })"
                >
                <span>4-0</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh4c0 ? schedule.odds['1h_correct_score'][0].iorh4c0 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh4c1' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh4c1, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh4c1,
                    playtype: '1h_correct_score',
                    oddskey:'iorh4c1'
                  }, {
                    desc: '4-1'
                  })"
                >
                <span>4-1</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh4c1 ? schedule.odds['1h_correct_score'][0].iorh4c1 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh4c2' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh4c2, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh4c2,
                    playtype: '1h_correct_score',
                    oddskey:'iorh4c2'
                  }, {
                    desc: '4-2'
                  })"
                >
                <span>4-2</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh4c2 ? schedule.odds['1h_correct_score'][0].iorh4c2 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh4c3' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh4c3, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh4c3,
                    playtype: '1h_correct_score',
                    oddskey:'iorh4c3'
                  }, {
                    desc: '4-3'
                  })"
                >
                <span>4-3</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh4c3 ? schedule.odds['1h_correct_score'][0].iorh4c3 : '/'}}</em>
              </td>
            </tr>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh0c1' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh0c1, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh0c1,
                    playtype: '1h_correct_score',
                    oddskey:'iorh0c1'
                  }, {
                    desc: '0-1'
                  })"
                >
                <span>0-1</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh0c1 ? schedule.odds['1h_correct_score'][0].iorh0c1 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh0c2' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh0c2, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh0c2,
                    playtype: '1h_correct_score',
                    oddskey:'iorh0c2'
                  }, {
                    desc: '0-2'
                  })"
                >
                <span>0-2</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh0c2 ? schedule.odds['1h_correct_score'][0].iorh0c2 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh1c2' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh1c2, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh1c2,
                    playtype: '1h_correct_score',
                    oddskey:'iorh1c2'
                  }, {
                    desc: '1-2'
                  })"
                >
                <span>1-2</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh1c2 ? schedule.odds['1h_correct_score'][0].iorh1c2 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh0c3' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh0c3, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh0c3,
                    playtype: '1h_correct_score',
                    oddskey:'iorh0c3'
                  }, {
                    desc: '0-3'
                  })"
                >
                <span>0-3</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh0c3 ? schedule.odds['1h_correct_score'][0].iorh0c3 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh1c3' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh1c3, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh1c3,
                    playtype: '1h_correct_score',
                    oddskey:'iorh1c3'
                  }, {
                    desc: '1-3'
                  })"
                >
                <span>1-3</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh1c3 ? schedule.odds['1h_correct_score'][0].iorh1c3 : '/'}}</em>
              </td>
            </tr>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh2c3' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh2c3, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh2c3,
                    playtype: '1h_correct_score',
                    oddskey:'iorh2c3'
                  }, {
                    desc: '2-3'
                  })"
                >
                <span>2-3</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh2c3 ? schedule.odds['1h_correct_score'][0].iorh2c3 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh0c4' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh0c4, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh0c4,
                    playtype: '1h_correct_score',
                    oddskey:'iorh0c4'
                  }, {
                    desc: '0-4'
                  })"
                >
                <span>0-4</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh0c4 ? schedule.odds['1h_correct_score'][0].iorh0c4 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh1c4' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh1c4, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh1c4,
                    playtype: '1h_correct_score',
                    oddskey:'iorh1c4'
                  }, {
                    desc: '1-4'
                  })"
                >
                <span>1-4</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh1c4 ? schedule.odds['1h_correct_score'][0].iorh1c4 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh2c4' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh2c4, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh2c4,
                    playtype: '1h_correct_score',
                    oddskey:'iorh2c4'
                  }, {
                    desc: '2-4'
                  })"
                >
                <span>2-4</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh2c4 ? schedule.odds['1h_correct_score'][0].iorh2c4 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh3c4' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh3c4, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh3c4,
                    playtype: '1h_correct_score',
                    oddskey:'iorh3c4'
                  }, {
                    desc: '3-4'
                  })"
                >
                <span>3-4</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh3c4 ? schedule.odds['1h_correct_score'][0].iorh3c4 : '/'}}</em>
              </td>
            </tr>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh0c0' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh0c0, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh0c0,
                    playtype: '1h_correct_score',
                    oddskey:'iorh0c0'
                  }, {
                    desc: '0-0'
                  })"
                >
                <span>0-0</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh0c0 ? schedule.odds['1h_correct_score'][0].iorh0c0 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh1c1' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh1c1, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh1c1,
                    playtype: '1h_correct_score',
                    oddskey:'iorh1c1'
                  }, {
                    desc: '1-1'
                  })"
                >
                <span>1-1</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh1c1 ? schedule.odds['1h_correct_score'][0].iorh1c1 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh2c2' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh2c2, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh2c2,
                    playtype: '1h_correct_score',
                    oddskey:'iorh2c2'
                  }, {
                    desc: '2-2'
                  })"
                >
                <span>2-2</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh2c2 ? schedule.odds['1h_correct_score'][0].iorh2c2 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh3c3' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh3c3, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh3c3,
                    playtype: '1h_correct_score',
                    oddskey:'iorh3c3'
                  }, {
                    desc: '3-3'
                  })"
                >
                <span>3-3</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh3c3 ? schedule.odds['1h_correct_score'][0].iorh3c3 : '/'}}</em>
              </td>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorh4c4' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorh4c4, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorh4c4,
                    playtype: '1h_correct_score',
                    oddskey:'iorh4c4'
                  }, {
                    desc: '4-4'
                  })"
                >
                <span>4-4</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorh4c4 ? schedule.odds['1h_correct_score'][0].iorh4c4 : '/'}}</em>
              </td>
            </tr>
            <tr>
              <td
                :class="selected === schedule.scheduleid + '+' + schedule.gameid + 'iorovc' ? 'selected' : ''"
                @click="selectBet(schedule.odds['1h_correct_score'][0].iorovc, {
                    scheduleid: schedule.scheduleid,
                    gameid: schedule.gameid,
                    odds: schedule.odds['1h_correct_score'][0].iorovc,
                    playtype: '1h_correct_score',
                    oddskey:'iorovc'
                  }, {
                    desc: '其他'
                  })"
                >
                <span>其他</span>
                <em>{{schedule.odds['1h_correct_score'][0].iorovc ? schedule.odds['1h_correct_score'][0].iorovc : '/'}}</em>
              </td>
              <td style="color:#17a84b">半</td>
              <td colspan="3"></td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'table3',
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
  methods: {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table3-table{position:relative;padding-top:.2rem;}
.table3-table h4{height:.5rem;line-height:.5rem;color:#17a84b;text-indent:.1rem;}
.table3-table ul{width:.8rem;text-align:center;position:absolute;left:0;top:.7rem;}
.table3-table li{height:.9rem;line-height:.4rem;display:flex;justify-content:center;flex-direction:column;color:#666;}
.table3-table li.rowspan{height:1.8rem;}
.table3-table div{width:100%;padding:0 .1rem 0 .8rem;}
.table3-table table{width:100%;background:#fff;}
.table3-table td{border-top:.02rem solid #eaeaea;border-left:.02rem solid #eaeaea;text-align:center;line-height:.4rem;height:.9rem;}
.table3-table tr td:first-child{border-left:.02rem solid #cacaca;}
.table3-table tr:first-child td{border-top:.02rem solid #cacaca;}
.table3-table tr td:last-child{border-right:.02rem solid #cacaca;}
.table3-table tr:last-child td{border-bottom:.02rem solid #cacaca;}

.table3-table td.selected{background:#17a84b;color:#fff;}
.table3-table td.selected span{color:#fff;}
.table3-table td em{display:block;}
.table3-table td span{display:block;color:#999;}

</style>

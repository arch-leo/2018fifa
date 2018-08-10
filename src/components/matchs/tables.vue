<template>
  <div>
    <div class="table-wrap" :key="item.id" v-for="(item, index) in matchs"  :class="!close[index] ? '' : 'close'">
      <h3 class="table-title" @click="titleClick(index)">
        <span>{{item.matchname}}</span>
        <i class="iconfont icon-arrow-down"></i>
        <i class="iconfont icon-arrow-up"></i>
      </h3>
      <div :key="schedule.id" v-for="(schedule, $index) in item.schedule" class="padding-top-bot">
        <div class="table1-item table1-timer padding-top-bot">
          <h4>
            <i>{{schedule.timer}}</i>
            <i>{{schedule.homescore}}-{{schedule.guestscore}}</i>
          </h4>
          <div class="team">
            <div>
              <em class="team">
                <b>{{schedule.neutral !== '0' ? '中' : ''}}</b><br>
                <i v-if="schedule.gametype !== ''">{{schedule.gametype}}</i>
              </em>
              <span class="team">{{schedule.homename}}<strong v-if="schedule.homered !== '0'" class="left">schedule.homered</strong></span>
              <span class="team">{{schedule.guestname}}<strong v-if="schedule.homered !== '0'" class="right">schedule.guestred</strong></span>
            </div>
          </div>
          <h5 class="absolute-right">
            <span>和局</span>
          </h5>
        </div>
        <div class="table1-item table1-1x2">
          <h4>
            <em>独赢</em>
          </h4>
          <div>
            <template v-if="toggle[schedule.scheduleid].flag && schedule.scheduleid === toggle[schedule.scheduleid].id">
              <div class="border-left-top-right" :key="hcn.id"
                v-for="hcn in (schedule.odds['1h1x2'].length === 0 ? [{}] : schedule.odds['1h1x2'])">
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (hcn.gameid ? hcn.gameid : '') + 'iorhmh' ? 'selected' : ''"
                  @click="selectBet(hcn.iorhmh, {
                    scheduleid: schedule.scheduleid,
                    gameid: hcn.gameid,
                    odds: hcn.iorhmh,
                    playtype: '1h1x2',
                    oddskey:'iorhmh'
                  }, {
                    desc: schedule.homename
                  })"
                >{{hcn.iorhmh ? hcn.iorhmh : '/'}}</span>
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (hcn.gameid ? hcn.gameid : '') + 'iorhmc' ? 'selected' : ''"
                  @click="selectBet(hcn.iorhmc, {
                    scheduleid: schedule.scheduleid,
                    gameid: hcn.gameid,
                    odds: hcn.iorhmc,
                    playtype: '1h1x2',
                    oddskey:'iorhmc'
                  }, {
                    desc: schedule.guestname
                  })"
                >{{hcn.iorhmc ? hcn.iorhmc : '/'}}</span>
                <p class="border-bot absolute-right">
                  <span
                    :class="selected === schedule.scheduleid + (hcn.gameid ? hcn.gameid : '') + 'iorhmn' ? 'selected' : ''"
                    @click="selectBet(hcn.iorhmn, {
                      scheduleid: schedule.scheduleid,
                      gameid: hcn.gameid,
                      odds: hcn.iorhmn,
                      playtype: '1h1x2',
                      oddskey:'iorhmn'
                    }, {
                      desc: '和局'
                    })"
                  >{{hcn.iorhmn ? hcn.iorhmn : '/'}}</span>
                </p>
              </div>
            </template>
            <template v-else>
              <div class="border-left-top-right" :key="hcn.id"
                v-for="hcn in (schedule.odds['ft1x2'].length === 0 ? [{}] : schedule.odds['ft1x2'])">
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (hcn.gameid ? hcn.gameid : '') + 'iormh' ? 'selected' : ''"
                  @click="selectBet(hcn.iormh, {
                    scheduleid: schedule.scheduleid,
                    gameid: hcn.gameid,
                    odds: hcn.iormh,
                    playtype: 'ft1x2',
                    oddskey:'iormh'
                  }, {
                    desc: schedule.homename
                  })"
                >{{hcn.iormh ? hcn.iormh : '/'}}</span>
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (hcn.gameid ? hcn.gameid : '') + 'iormc' ? 'selected' : ''"
                  @click="selectBet(hcn.iormc, {
                    scheduleid: schedule.scheduleid,
                    gameid: hcn.gameid,
                    odds: hcn.iormc,
                    playtype: 'ft1x2',
                    oddskey:'iormc'
                  }, {
                    desc: schedule.guestname
                  })"
                >{{hcn.iormc ? hcn.iormc : '/'}}</span>
                <p class="border-bot absolute-right">
                  <span
                    :class="selected === schedule.scheduleid + (hcn.gameid ? hcn.gameid : '') + 'iormn' ? 'selected' : ''"
                    @click="selectBet(hcn.iormn, {
                      scheduleid: schedule.scheduleid,
                      gameid: hcn.gameid,
                      odds: hcn.iormn,
                      playtype: 'ft1x2',
                      oddskey:'iormn'
                    }, {
                      desc: '和局'
                    })"
                  >{{hcn.iormn ? hcn.iormn : '/'}}</span>
                </p>
              </div>
            </template>
          </div>
        </div>
        <div class="table1-item table1-handicap" :class="schedule.odds.fthandicap.show ? 'open' : ''">
          <h4>让球</h4>
          <div>
            <template v-if="toggle[schedule.scheduleid].flag && schedule.scheduleid === toggle[schedule.scheduleid].id">
              <div class="border-left-right" :key="handicap.id"
                v-for="handicap in (schedule.odds['1hhandicap'].length ===0 ? [{}] : schedule.odds['1hhandicap'])">
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (handicap.gameid ? handicap.gameid : '') + 'iorhrh' ? 'selected' : ''"
                  @click="selectBet(handicap.iorhrh, {
                    scheduleid: schedule.scheduleid,
                    gameid: handicap.gameid,
                    odds: handicap.iorhrh,
                    playtype: '1hhandicap',
                    oddskey:'iorhrh',
                    ratio: handicap.hratio,
                    ratiokey: 'hratio',
                    strong: handicap.hstrong
                  }, {
                    desc: schedule.homename + (handicap.hstrong === 'h' ? handicap.hratio : '' )
                  })"
                >
                  <em v-if="handicap.hstrong === 'h'">{{handicap.hratio}}</em>
                  <b>{{handicap.iorhrh ? handicap.iorhrh : '/'}}</b>
                </span>
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (handicap.gameid ? handicap.gameid : '') + 'iorhrc' ? 'selected' : ''"
                  @click="selectBet(handicap.iorhrc, {
                    scheduleid: schedule.scheduleid,
                    gameid: handicap.gameid,
                    odds: handicap.iorhrc,
                    playtype: '1hhandicap',
                    oddskey:'iorhrc',
                    ratio: handicap.hratio,
                    ratiokey: 'hratio',
                    strong: handicap.hstrong
                  }, {
                    desc: schedule.guestname + (handicap.hstrong === 'c' ? handicap.hratio : '' )
                  })"
                >
                  <em v-if="handicap.hstrong === 'c'">{{handicap.hratio}}</em>
                  <b>{{handicap.iorhrc ? handicap.iorhrc : '/'}}</b>
                </span>
              </div>
            </template>
            <template v-else>
              <div class="border-left-right" :key="handicap.id"
                v-for="handicap in (schedule.odds['fthandicap'].length === 0 ? [{}] : schedule.odds['fthandicap'])">
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (handicap.gameid ? handicap.gameid : '') + 'iorrh' ? 'selected' : ''"
                  @click="selectBet(handicap.iorrh, {
                    scheduleid: schedule.scheduleid,
                    gameid: handicap.gameid,
                    odds: handicap.iorrh,
                    playtype: 'fthandicap',
                    oddskey:'iorrh',
                    ratio: handicap.ratio,
                    ratiokey: 'ratio',
                    strong: 'h'
                  }, {
                    desc: schedule.homename + ' ' + handicap.ratio
                  })"
                >
                  <em v-if="handicap.strong === 'h'">{{handicap.ratio ? handicap.ratio : ''}}</em>
                  <b>{{handicap.iorrh ? handicap.iorrh : '/'}}</b>
                </span>
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (handicap.gameid ? handicap.gameid : '') + 'iorrc' ? 'selected' : ''"
                  @click="selectBet(handicap.iorrc, {
                    scheduleid: schedule.scheduleid,
                    gameid: handicap.gameid,
                    odds: handicap.iorrc,
                    playtype: 'fthandicap',
                    oddskey:'iorrc',
                    ratio: handicap.ratio,
                    ratiokey: 'ratio',
                    strong: 'c'
                  }, {
                    desc: schedule.guestname + ' ' + handicap.ratio
                  })"
                >
                  <em v-if="handicap.strong === 'c'">{{handicap.ratio ? handicap.ratio : ''}}</em>
                  <b>{{handicap.iorrc ? handicap.iorrc : '/'}}</b>
                </span>
              </div>
            </template>
          </div>
          <h5 class="border-bot absolute-right" @click="handicapClick(index, $index)">
            <span>
              <strong class="arrow-down">收起</strong>
              <i class="iconfont icon-arrow-down"></i>
              <strong class="arrow-up">展开</strong>
              <i class="iconfont icon-arrow-up"></i>
            </span>
          </h5>
        </div>
        <div class="table1-item table1-ou" :class="schedule.odds.ftou.show ? 'open' : ''">
          <h4>大小</h4>
          <div>
            <template v-if="toggle[schedule.scheduleid].flag && schedule.scheduleid === toggle[schedule.scheduleid].id">
              <div class="border-left-right" :key="ou.id"
                v-for="ou in (schedule.odds['1hou'].length ===0 ? [{}] : schedule.odds['1hou'])">
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (ou.gameid ? ou.gameid : '') + 'iorhouh' ? 'selected' : ''"
                  @click="selectBet(ou.iorhouh, {
                    scheduleid: schedule.scheduleid,
                    gameid: ou.gameid,
                    odds: ou.iorhouh,
                    playtype: '1hou',
                    oddskey:'iorhouh',
                    ratio: ou.hratioo,
                    ratiokey: 'hratioo'
                  }, {
                    desc: '大 ' + ou.hratioo
                  })"
                >
                  <em v-if="ou.iorhouh">大{{ou.hratioo}}</em>
                  <b>{{ou.iorhouh ? ou.iorhouh : '/'}}</b>
                </span>
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (ou.gameid ? ou.gameid : '') + 'iorhouc' ? 'selected' : ''"
                  @click="selectBet(ou.iorhouc, {
                    scheduleid: schedule.scheduleid,
                    gameid: ou.gameid,
                    odds: ou.iorhouc,
                    playtype: '1hou',
                    oddskey:'iorhouc',
                    ratio: ou.hratiou,
                    ratiokey: 'hratiou'
                  }, {
                    desc: '小 ' + ou.hratiou
                  })"
                >
                  <em v-if="ou.iorhouc">小{{ou.hratiou}}</em>
                  <b>{{ou.iorhouc ? ou.iorhouc : '/'}}</b>
                </span>
              </div>
            </template>
            <template v-else>
              <div class="border-left-right" :key="ou.id"
                v-for="ou in (schedule.odds['ftou'].length === 0 ? [{}] : schedule.odds['ftou'])">
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (ou.gameid ? ou.gameid : '') + 'iorouh' ? 'selected' : ''"
                  @click="selectBet(ou.iorouh, {
                    scheduleid: schedule.scheduleid,
                    gameid: ou.gameid,
                    odds: ou.iorouh,
                    playtype: 'ftou',
                    oddskey:'iorouh',
                    ratio: ou.ratioo,
                    ratiokey: 'ratioo'
                  }, {
                    desc: '大 ' + ou.ratioo
                  })"
                >
                  <em v-if="ou.iorouh">大{{ou.ratioo}}</em>
                  <b>{{ou.iorouh ? ou.iorouh : '/'}}</b>
                </span>
                <span class="border-right-bot"
                  :class="selected === schedule.scheduleid + (ou.gameid ? ou.gameid : '') + 'iorouc' ? 'selected' : ''"
                  @click="selectBet(ou.iorouc, {
                    scheduleid: schedule.scheduleid,
                    gameid: ou.gameid,
                    odds: ou.iorouc,
                    playtype: 'ftou',
                    oddskey:'iorouc',
                    ratio: ou.ratiou,
                    ratiokey: 'ratiou'
                  }, {
                    desc: '小 ' + ou.ratiou
                  })"
                >
                  <em v-if="ou.iorouc">小{{ou.ratiou}}</em>
                  <b>{{ou.iorouc ? ou.iorouc : '/'}}</b>
                </span>
              </div>
            </template>
          </div>
          <h5 class="border-bot absolute-right" @click="ouClick(index, $index)">
            <span>
              <strong class="arrow-down">收起</strong>
              <i class="iconfont icon-arrow-down"></i>
              <strong class="arrow-up">展开</strong>
              <i class="iconfont icon-arrow-up"></i>
            </span>
          </h5>
        </div>
        <div class="table1-item table1-ou">
          <h4>单双</h4>
          <div>
            <template v-if="toggle[schedule.scheduleid].flag && schedule.scheduleid === toggle[schedule.scheduleid].id">
              <div class="border-left-bot-right" :key="oe.id"
                v-for="oe in (schedule.odds['1hoe'].length === 0 ? [{}] : schedule.odds['1hoe'])">
                <span class="border-right"
                  :class="selected === schedule.scheduleid + (oe.gameid ? oe.gameid : '') + 'ioreoo' ? 'selected' : ''"
                  @click="selectBet(oe.ioreoo, {
                    scheduleid: schedule.scheduleid,
                    gameid: oe.gameid,
                    odds: oe.iorouc,
                    playtype: '1hoe',
                    oddskey:'ioreoo'
                  }, {
                    desc: '单'
                  })"
                >
                  <em>{{oe.ioreoo ? '单' : '/'}}</em>
                  <b>{{oe.ioreoo}}</b>
                </span>
                <span class="border-right"
                  :class="selected === schedule.scheduleid + (oe.gameid ? oe.gameid : '') + 'ioreoe' ? 'selected' : ''"
                  @click="selectBet(oe.ioreoe, {
                    scheduleid: schedule.scheduleid,
                    gameid: oe.gameid,
                    odds: oe.iorouc,
                    playtype: '1hoe',
                    oddskey:'ioreoe'
                  }, {
                    desc: '双'
                  })"
                >
                  <em>{{oe.ioreoe ? '双' : '/'}}</em>
                  <b>{{oe.ioreoe}}</b>
                </span>
              </div>
            </template>
            <template v-else>
              <div class="border-left-bot-right" :key="oe.id"
                v-for="oe in (schedule.odds['ftoe'].length === 0 ? [{}] : schedule.odds['ftoe'])">
                <span class="border-right"
                  :class="selected === schedule.scheduleid + (oe.gameid ? oe.gameid : '') + 'ioreoo' ? 'selected' : ''"
                  @click="selectBet(oe.ioreoo, {
                    scheduleid: schedule.scheduleid,
                    gameid: oe.gameid,
                    odds: oe.ioreoo,
                    playtype: 'ftoe',
                    oddskey:'ioreoo'
                  }, {
                    desc: '单'
                  })"
                >
                  <em>{{oe.ioreoo ? '单' : '/'}}</em>
                  <b>{{oe.ioreoo}}</b>
                </span>
                <span class="border-right"
                  :class="selected === schedule.scheduleid + (oe.gameid ? oe.gameid : '') + 'ioreoe' ? 'selected' : ''"
                  @click="selectBet(oe.ioreoe, {
                    scheduleid: schedule.scheduleid,
                    gameid: oe.gameid,
                    odds: oe.ioreoe,
                    playtype: 'ftoe',
                    oddskey:'ioreoe'
                  }, {
                    desc: '双'
                  })"
                >
                  <em>{{oe.ioreoe ? '双' : '/'}}</em>
                  <b>{{oe.ioreoe}}</b>
                </span>
              </div>
            </template>
          </div>
          <h5 class="border-transparent absolute-right" @click="oeClick(schedule.scheduleid)">
            <template v-if="toggle[schedule.scheduleid].flag && schedule.scheduleid === toggle[schedule.scheduleid].id">
              <span>
                <b>全</b>
                <em></em>
                <b class="on">半</b>
              </span>
            </template>
            <template v-else>
              <span>
                <b class="on">全</b>
                <em></em>
                <b>半</b>
              </span>
            </template>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table1',
  props: ['matchs', 'bet-selected'],
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
    }
  },
  created () {
    console.log(this.matchs)
    for (let keys of this.matchs) {
      for (let key of keys.schedule) {
        let obj = {
          flag: false,
          id: key.scheduleid
        }
        this.$set(this.toggle, key.scheduleid, obj)
      }
    }
  },
  methods: {
    titleClick (index) {
      this.$set(this.close, index, !this.close[index])
    },
    handicapClick (index, $index) {
      this.$set(this.matchs[index].schedule[$index].odds.fthandicap, 'show', !this.matchs[index].schedule[$index].odds.fthandicap.show)
    },
    ouClick (index, $index) {
      this.$set(this.matchs[index].schedule[$index].odds.ftou, 'show', !this.matchs[index].schedule[$index].odds.ftou.show)
    },
    oeClick (id) {
      this.$set(this.toggle[id], 'flag', !this.toggle[id].flag)
    },
    selectBet (exist, post, type) {
      if (exist) {
        if (this.selected === post.scheduleid + (post.gameid ? post.gameid : '') + post.oddskey) {
          if (this.flag) {
            this.flag = false
            this.selected = ''
            this.$emit('bet-input', this.flag)
          } else {
            this.flag = true
            this.selected = post.scheduleid + (post.gameid ? post.gameid : '') + post.oddskey
            this.$emit('bet-info', [post, type])
            this.$emit('bet-input', this.flag)
          }
        } else {
          this.flag = true
          this.selected = post.scheduleid + (post.gameid ? post.gameid : '') + post.oddskey
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
.table1-item{position:relative;padding:0 .1rem 0 .9rem;}
.table1-item h4{width:.8rem;font-size:.24rem;text-align:center;position:absolute;left:0;top:.1rem;color:#666;}
.table1-item h4 i{display:block;line-height:.28rem;color:#17a84b;}
.table1-item>div{width:100%;height:auto;overflow:hidden;}
.table1-item>div.team{overflow:initial;}
.table1-item>div>div{width:100%;height:.6rem;line-height:.54rem;padding-right:1.2rem;background:#fff;position:relative;}

.table1-item>div>div em.team{position:absolute;left:0;bottom:0;width:100%;height:.64rem;padding-right:1.2rem;line-height:.32rem;text-align:center;font-size:0;}
.table1-item>div>div em.team i{background:#b452c8;border-radius:.04rem;font-size:.24rem;color:#fff;padding:0 .04rem;display:inline-block;}
.table1-item>div>div em.team b{background:#004ba3;border-radius:.04rem;font-size:.24rem;color:#fff;padding:0 .04rem;display:inline-block;}
.table1-item>div>div span{width:50%;float:left;text-align:center;height:100%;}
.table1-item>div>div span.team{padding:0 .3rem;line-height:.3rem;font-size:.24rem;position:relative;}
.table1-item>div>div span.team strong{position:absolute;top:0;width:.3rem;height:.3rem;background:red;color:#fff;border-radius:50%;line-height:.3rem;text-align:center;}
.table1-item>div>div span.team strong.left{left:0;}
.table1-item>div>div span.team strong.right{right:0;}
.table1-item>div>div span.selected{background:#17a84b;color:#fff;}
.table1-item>div>div span em{color:#999;}
.table1-item>div>div span.selected em{color:#fff;}
.table1-item h5{width:1.2rem;color:#666;height:100%;font-size:.24rem;}
.table1-item h5 span{position:absolute;left:0;top:0;right:0;bottom:0;height:.54rem;width:100%;line-height:.54rem;margin:auto;text-align:center;color:#17a84b;}
.table1-item h5 span i{color:#bbb;font-size:.28rem;}
.table1-item h5 span i.icon-arrow-down{display:inline;}
.table1-item h5 span i.icon-arrow-up{display:none;}
.table1-item h5 span strong.arrow-down{display:inline;}
.table1-item h5 span strong.arrow-up{display:none;}
.table1-item h5 span em{display:inline-block;width:.24rem;height:.18rem;background:url(../../assets/double.png) no-repeat 0 0;background-size:100%;}

.table1-item h5 span b.on{color:#17a84b;}

.table1-timer>div>div{background:none;}

.table1-item h5 b{color:#bbb;font-size:.28rem;}
.table1-item p{width:1.2rem;height:100%;right:0;}
.table1-item p span{position:absolute;left:0;top:0;right:0;bottom:0;height:.54rem;width:100%!important;line-height:.54rem;margin:auto;text-align:center;}
.table1-item p span.selected{background:#17a84b;color:#fff;}
.absolute-right{position:absolute;right:.12rem;top:0;width:1.2rem;height:100%;}
.padding-top-bot{padding-top:.2rem;padding-bottom:.1rem;}
.border-left-top-right{border-top:.02rem solid #cacaca;border-left:.02rem solid #cacaca;border-right:.02rem solid #cacaca;}
.border-left-bot-right{border-bottom:.02rem solid #cacaca;border-left:.02rem solid #cacaca;border-right:.02rem solid #cacaca;}
.border-left-right{border-left:.02rem solid #cacaca;border-right:.02rem solid #cacaca;}
.border-right-bot{border-right:.02rem solid #eaeaea;border-bottom:.02rem solid #eaeaea;}
.border-bot{border-bottom:.02rem solid #eaeaea;}
.border-right{border-right:.02rem solid #eaeaea;}
.border-transparent{border-bottom:.02rem solid transparent;}

.table1-item.open>div{height:.6rem;}
.table1-item.open h5 span i.icon-arrow-down{display:none;}
.table1-item.open h5 span i.icon-arrow-up{display:inline;}
.table1-item.open h5 span strong.arrow-down{display:none;}
.table1-item.open h5 span strong.arrow-up{display:inline;}

</style>

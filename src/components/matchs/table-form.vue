<template>
  <transition name="betArea">
    <div class="bet-area" :class="keyboardShow && panelBlock ? 'bet-board-show' : ''"  v-if="flag">
      <div class="info">
        <div class="team">
          {{desc}}<span> @ {{ratio}}</span> {{parlay ? '（最少2串）' : ''}}
        </div>
        <label>
          <span @click="autoOddsFuc">
            <i class="iconfont" :class="autoOdds === 'yes' ? 'icon-select-selected' : 'icon-select-empty'"></i>自动接收较佳赔率
          </span>
        </label>
      </div>
      <div class="bet">
        <div class="input" @click="panelShow()">{{amountBet}}</div>，最高可赢<span>{{amountBonus === 0 ? '0.00' : amountBonus}}</span>
        <button @click="panelConfirm">{{parlay ? (parlayConfirmInit ? '下注' : '确定') : '下注'}}</button>
      </div>
      <div class="panel table" :class="panelBlock ? 'show' : ''">
        <table>
          <tr>
            <td @click="panelInput('1')">1</td>
            <td @click="panelInput('2')">2</td>
            <td @click="panelInput('3')">3</td>
            <td rowspan="2" class="backspace" @click="panelDel"></td>
          </tr>
          <tr>
            <td @click="panelInput('4')">4</td>
            <td @click="panelInput('5')">5</td>
            <td @click="panelInput('6')">6</td>
          </tr>
          <tr>
            <td @click="panelInput('7')">7</td>
            <td @click="panelInput('8')">8</td>
            <td @click="panelInput('9')">9</td>
            <td rowspan="2" class="confirm" @click="panelConfirm">确认</td>
          </tr>
          <tr>
            <td @click="panelInput('10')">.</td>
            <td @click="panelInput('0')">0</td>
            <td class="close" @click="panelClose"></td>
          </tr>
        </table>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'table-form',
  props: ['flag', 'keyboard-show', 'desc', 'ratio', 'calc-ratio', 'parlay', 'parlay-count', 'parlay-confirm-init'],
  data () {
    return {
      // keyboardShow: false,
      autoOdds: 'yes',
      amountVal: [],
      amountBet: '10',
      panelBlock: this.keyboardShow
    }
  },
  computed: {
    ...mapState(['userInfo']),
    amountBonus () {
      return this.calcNum(this.ratio, this.amountBet, this.calcRatio)
    }
  },
  watch: {
    keyboardShow (val) {
      this.panelBlock = val
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setUserProp', 'popMsgToggle', 'popAffirmToggle']),
    calcNum (num1, num2, flag) {
      let m = 0
      let n = 0
      let s1 = num1.toString()
      let s2 = num2.toString()
      try {
        m += s1.split('.')[1].length
        n += s1.split('.')[1].length
      } catch (e) {
      }
      try {
        m += s2.split('.')[1].length
      } catch (e) {
      }
      let res = 0
      if (flag) {
        res += Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
      } else {
        res += ((Number(s1.replace('.', '')) - Math.pow(10, n))) * Number(s2.replace('.', '')) / Math.pow(10, n)
      }
      return res > 0 ? res : 0
    },
    autoOddsFuc () {
      if (this.autoOdds === 'yes') {
        this.autoOdds = 'no'
      } else {
        this.autoOdds = 'yes'
      }
    },
    panelShow () {
      this.amountBet = ''
      this.$set(this.$data, 'amountVal', [])
      this.panelBlock = true
      this.$emit('panel-show')
    },
    panelDel () {
      if (this.amountVal.pop()) {
        let amountVal = this.amountVal
        this.amountBet = amountVal.join('')
      } else {
        return false
      }
    },
    panelConfirm () {
      if (this.parlay) {
        if (this.parlayCount < 2) {
          this.popMsgToggle('最少2串')
          return false
        } else {
          if (!this.parlayConfirmInit) {
            this.$emit('panel-affirm')
            return false
          }
        }
      }
      if (this.userInfo) {
      } else {
        this.popAffirmToggle({flag: true, title: '请先登录', path: '/log', redirect: this.$route.fullPath})
        return false
      }
      if (this.amountBet === '') {
        this.popMsgToggle('请输入正确的下注金额')
        return false
      }
      this.$emit('panel-confirm', {betAmount: this.amountBet, autoOdds: this.autoOdds})
    },
    panelClose () {
      // this.keyboardShow = false
      this.amountBet = '10'
      this.panelBlock = false
    },
    panelInput (num) {
      if (num === '10') {
        num = '.'
        if (this.amountVal.indexOf('.') < 0) {
          this.amountVal.push(num)
        } else {
          return false
        }
      } else {
        this.amountVal.push(num)
      }
      let amountVal = this.amountVal
      this.amountBet = amountVal.join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bet-area{position:fixed;bottom:0;width:100%;height:1.6rem;max-width:6.4rem;transition:bottom .3s;z-index:80}
.bet-area .table{border:1px solid #fff}
.bet-area.bet-board-show{bottom:3.26rem}
.bet-area.parlay .info{display:none}
.bet-area .info{background-color:#e2e2e2;height:.6rem;padding:0 .1rem;line-height:.6rem;border-top:1px solid #b6b6b6;color:#666;font-size:.26rem;overflow:hidden}
.bet-area .info .team{float:left}
.bet-area .info .team span{color:red}
.bet-area .info label{float:right}
.bet-area .info label input{vertical-align:middle;margin:0}
.bet-area .bet{background-color:#565957;height:1rem;position:relative;padding:0 .1rem;color:#fff;line-height:1rem}
.bet-area .bet span{color:#ffe400}
.bet-area .bet .input{background-color:#fff;display:inline-block;height:.6rem;width:2.1rem;line-height:.6rem;color:#333;border-radius:.1rem;border:none;text-indent:.1rem;vertical-align:middle}
.bet-area .bet button{position:absolute;right:.1rem;top:.2rem;width:1.36rem;background-color:#17a84b;color:#fff;border:none;border-radius:.1rem;height:.6rem;font-size:.28rem;}
.bet-area.parlay{height:1rem;line-height:1rem}
.betArea-enter-active,.betArea-leave-active{transition:all .4s}
.betArea-enter,.betArea-leave-to{bottom:-1.3rem}
.panel{position:fixed;z-index:100;bottom:-3.5rem;margin:auto;transition:bottom .3s;width:100%;max-width:6.4rem;}
.panel.show{bottom:0}
.panel table{border:none;width:100%;background-color:#fff;border-collapse:collapse}
.panel table tr{border-top:1px solid #efefef}
.panel table tr td{color:#666;width:27%;text-align:center;height:.8rem;line-height:.8rem;font-size:.34rem;border:1px solid #efefef;border-collapse:collapse}
.panel table tr td.backspace{width:19%;background-image:url(../../assets/backspace.png);background-repeat:no-repeat;background-position:50%;background-size:.48rem auto}
.panel table tr td.confirm{width:19%;background-color:#0284d8;color:#fff}
.panel table tr td.close{background-image:url(../../assets/keyboard.png);background-position:50%;background-repeat:no-repeat;background-size:.64rem auto}
.panel table td:first-child{border-left:none}
</style>

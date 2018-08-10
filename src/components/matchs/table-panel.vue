<template>
  <div class="panel table" :class="keyboardShow ? 'show' : ''">
    <table>
      <tr>
        <td @click="panelInput(1)">1</td>
        <td @click="panelInput(2)">2</td>
        <td @click="panelInput(3)">3</td>
        <td rowspan="2" class="backspace" @click="panelDel"></td>
      </tr>
      <tr>
        <td @click="panelInput(4)">4</td>
        <td @click="panelInput(5)">5</td>
        <td @click="panelInput(6)">6</td>
      </tr>
      <tr>
        <td @click="panelInput(7)">7</td>
        <td @click="panelInput(8)">8</td>
        <td @click="panelInput(9)">9</td>
        <td rowspan="2" class="confirm" @click="panelConfirm">确认</td>
      </tr>
      <tr>
        <td @click="panelInput(10)">.</td>
        <td @click="panelInput(0)">0</td>
        <td class="close" @click="panelClose"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'table-form',
  props: ['flag', 'desc', 'ratio'],
  data () {
    return {
      keyboardShow: false,
      autoOdds: 'yes',
      amountVal: [],
      amountBet: '10'
    }
  },
  computed: {
    ...mapState(['isLogin']),
    amountBonus () {
      return this.calcNum(this.ratio, this.amountBet)
    }
  },
  methods: {
    ...mapMutations(['popMsgToggle', 'popAffirmToggle']),
    calcNum (num1, num2) {
      let m = 0
      let s1 = num1.toString()
      let s2 = num2.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {
      }
      try {
        m += s2.split('.')[1].length
      } catch (e) {
      }
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
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
      this.keyboardShow = true
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
      if (!this.isLogin) {
        this.popAffirmToggle({flag: true, title: '请先登录', path: '/log', redirect: this.$route.fullPath})
        return false
      }
      if (this.amountBet === '') {
        this.popMsgToggle('请输入正确的下注金额')
        return false
      }
      this.$emit('panel-confirm', {betAmount: this.amountBet, autoOdds: this.autoOdds})
      if (this.keyboardShow) {
        this.keyboardShow = false
        setTimeout(() => {
          this.$emit('panel-hide')
        }, 100)
      } else {
        this.$emit('panel-hide')
      }
      this.amountBet = '10'
    },
    panelClose () {
      this.keyboardShow = false
      this.amountBet = '10'
    },
    panelInput (num) {
      if (num === 10) {
        num = '.'
      }
      this.amountVal.push(num)
      let amountVal = this.amountVal
      this.amountBet = amountVal.join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel{position:fixed;left:0;z-index:100;bottom:-3.5rem;margin:auto;transition:bottom .3s;width:100%}
.panel.show{bottom:0}
.panel table{border:none;width:100%;background-color:#fff;border-collapse:collapse}
.panel table tr{border-top:1px solid #efefef}
.panel table tr td{color:#666;width:27%;text-align:center;height:.8rem;line-height:.8rem;font-size:.34rem;border:1px solid #efefef;border-collapse:collapse}
.panel table tr td.backspace{width:19%;background-image:url(../../assets/backspace.png);background-repeat:no-repeat;background-position:50%;background-size:.48rem auto}
.panel table tr td.confirm{width:19%;background-color:#0284d8;color:#fff}
.panel table tr td.close{background-image:url(../../assets/keyboard.png);background-position:50%;background-repeat:no-repeat;background-size:.64rem auto}
.panel table td:first-child{border-left:none}
</style>

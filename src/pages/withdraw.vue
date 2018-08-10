<template>
  <div class="withdraw">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>兑换</h3>
    </div>
    <div class="withdraw-cont">
      <h4>{{userInfo.username}}余额：<i class="color-red">{{userInfo.accountbalance}}</i></h4>
      <p>
        <img :src="userInfo.bankimg" />
        <span>{{userInfo.bankname}}</span>
        <span class="gray">{{userInfo.accountnumber}}</span>
      </p>
      <div>
        <h5>兑换金额</h5>
        <h6 @click="panelToggle">
          <em>￥</em>
          <b :class="withdrawNum > 0 ? '' : 'disabled'">{{withdrawNum > 0 ? withdrawStr : '0.00'}}</b>
        </h6>
        <strong>可兑换金额：{{userInfo.accountbalance}}</strong>
      </div>
      <button type="button" @click="withdraw">兑换</button>
      <h3>说明：单笔提款金额最低为100。</h3>
    </div>
    <div class="panel table" :class="keyboardFlag ? 'show' : ''">
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
    <div class="confirmbox" :class="confirmFlag ? 'show' : ''">
      <div>
        <h4>请输入资金密码<i @click="confirmClose"></i></h4>
        <p><em>{{userInfo.bankname}}</em> ({{userInfo.accountnumber}})</p>
        <h5>￥{{withdrawStr}}</h5>
        <div @click="panelToggle">
          <span :key="item.id" v-for="item in confirmVal">{{item === '' ? '' : '&bull;'}}</span>
        </div>
        <button type="button" :class="confirmOk ? '' : 'disabled'" @click="submit">确认兑换</button>
      </div>
    </div>
  </div>
</template>

<script>
import {delItem} from '@/utils/localstorage'
import {mapState, mapMutations} from 'vuex'
import {apiCash} from '@/config/api'
export default {
  name: 'my',
  data () {
    return {
      keyboardFlag: false,
      withdrawVal: [],
      withdrawNum: 0,
      withdrawStr: '0',
      confirmFlag: false,
      confirmVal: ['', '', '', '', '', ''],
      confirmCount: 0,
      confirmStr: '',
      confirmOk: false,
      panelFlag: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    post () {
      return {
        cashpassword: this.confirmStr,
        amount: this.withdrawStr,
        type: this.userInfo.accounttype
      }
    }
  },

  methods: {
    ...mapMutations(['popMsgToggle', 'popLoadToggle']),
    goback () {
      this.$router.go(-1)
    },
    panelToggle () {
      this.keyboardFlag = true
    },
    panelConfirm () {
      this.keyboardFlag = false
    },
    panelClose () {
      this.keyboardFlag = false
    },
    panelDel () {
      if (this.confirmFlag) {
        this.confirmVal.splice(this.confirmCount, 1, '')
        let confirmVal = this.confirmVal
        this.confirmStr = confirmVal.join('')
        this.confirmOk = false
        if (this.confirmCount === 0) {
          this.panelFlag = false
          return false
        } else {
          this.panelFlag = true
          this.confirmCount--
        }
      } else {
        if (this.withdrawVal.pop()) {
          let withdrawVal = this.withdrawVal
          this.withdrawStr = withdrawVal.join('')
          this.withdrawNum = Number(withdrawVal.join(''))
        } else {
          return false
        }
      }
    },
    panelInput (num) {
      if (this.confirmFlag) {
        if (num === '10') {
          return false
        }
        if (this.panelFlag) {
          this.confirmCount++
          this.panelFlag = false
        }
        this.confirmVal.splice(this.confirmCount, 1, num)
        let confirmVal = this.confirmVal
        this.confirmStr = confirmVal.join('')
        if (this.confirmCount === 5) {
          this.confirmOk = true
          return false
        } else {
          this.confirmCount++
        }
      } else {
        if (num === '10') {
          num = '.'
          if (this.withdrawVal.indexOf('.') < 0) {
            this.withdrawVal.push(num)
          } else {
            return false
          }
        } else {
          this.withdrawVal.push(num)
        }
        let withdrawVal = this.withdrawVal
        this.withdrawStr = withdrawVal.join('')
        this.withdrawNum = Number(withdrawVal.join(''))
      }
    },
    withdraw () {
      if (this.withdrawNum === 0) {
        this.popMsgToggle('请先输入兑换金额')
        this.keyboardFlag = false
      } else if (this.withdrawNum < 100) {
        this.popMsgToggle('兑换金额不能少于100')
        this.keyboardFlag = false
      } else if (this.withdrawNum > Number(this.userInfo.accountbalance)) {
        this.popMsgToggle('兑换金额不能超过余额')
        this.keyboardFlag = false
      } else {
        this.confirmFlag = true
      }
    },
    submit () {
      if (this.confirmOk === true) {
        this.popLoadToggle(true)
        this.doCash()
      } else {
        return false
      }
    },
    confirmClose () {
      this.confirmFlag = false
      this.confirmVal = ['', '', '', '', '', '']
      this.confirmCount = 0
      this.confirmStr = ''
      this.confirmOk = false
      this.panelFlag = false
    },
    doCash () {
      apiCash(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          this.popLoadToggle(false)
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.popMsgToggle('兑换申请成功，预计30s内到账')
            setTimeout(() => {
              this.$router.push({path: '/userlist/mywithdraw'})
            }, 1500)
          } else {
            this.popMsgToggle(jsonDesc)
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.withdraw{height:100%;padding-top:.8rem;overflow-y:auto;}
.back-head{background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);}
.withdraw-cont h3{text-align:center;color:#999;font-size:.24rem;}
.withdraw-cont h4{line-height:.8rem;padding-left:.2rem;}
.withdraw-cont p{height:1.24rem;background:#fff;border-top:.02rem solid #e5e5e5;border-bottom:.02rem solid #e5e5e5;}
.withdraw-cont img{float:left;height:.8rem;margin:.2rem .4rem .2rem .2rem;}
.withdraw-cont span{display:block;line-height:.6rem;}
.withdraw-cont span.gray{color:#999;}
.withdraw-cont div{background:#fff;padding:.1rem .2rem;color:#999;}
.withdraw-cont h5{line-height:.44rem;font-size:.24rem;}
.withdraw-cont h6{line-height:.64rem;font-size:.40rem;color:#1a1a1a;}
.withdraw-cont h6 em{color:#999;}
.withdraw-cont h6 b.disabled{color:#999;}
.withdraw-cont button{font-size:.26rem;width:90%;height:.7rem;border:none;margin:.4rem auto;display:block;border-radius:.1rem;background:#17a84b;color:#fff;font-weight:700;}
.withdraw-cont button.disabled{background:#dfdfe9;color:#9898a8;}

.panel{position:fixed;z-index:15;bottom:-3.5rem;transition:bottom .3s;width:100%;max-width:6.4rem;}
.panel.show{bottom:0}
.panel table{border:none;width:100%;background-color:#fff;border-collapse:collapse}
.panel table tr{border-top:1px solid #efefef}
.panel table tr td{color:#666;width:27%;text-align:center;height:.8rem;line-height:.8rem;font-size:.34rem;border:1px solid #efefef;border-collapse:collapse}
.panel table tr td.backspace{width:19%;background-image:url(../assets/backspace.png);background-repeat:no-repeat;background-position:50%;background-size:.48rem auto}
.panel table tr td.confirm{width:19%;background-color:#0284d8;color:#fff}
.panel table tr td.close{background-image:url(../assets/keyboard.png);background-position:50%;background-repeat:no-repeat;background-size:.64rem auto}
.panel table td:first-child{border-left:none}

.confirmbox{position:fixed;top:0;width:100%;height:100%;background:rgba(0,0,0,.5);max-width:6.4rem;z-index:12;display:none;}
.confirmbox.show{display:block;}
.confirmbox>div{width:80%;padding-bottom:.3rem;background:#fff;margin:1rem auto 0;border-radius:.1rem;text-align:center;}
.confirmbox>div h4{line-height:.6rem;font-size:.26rem;border-bottom:.02rem solid #eaeaea;position:relative;}
.confirmbox>div h4 i{position:absolute;right:.1rem;top:.1rem;height:.4rem;width:.4rem;background:url(../assets/close.png) no-repeat;background-size:100%;}
.confirmbox>div p{line-height:.6rem;font-size:.28rem;color:#666;padding-top:.2rem;}
.confirmbox>div p em{font-size:.28rem;color:#1a1a1a;}
.confirmbox>div h5{line-height:.6rem;font-size:.48rem;}
.confirmbox>div div{height:1.2rem;padding:.3rem;display:flex;justify-content:center;}
.confirmbox>div div span{width:.6rem;height:.6rem;line-height:.6rem;text-align:center;display:inline-block;border:.02rem solid #eaeaea;font-size:.48rem;margin:0 .04rem;}
.confirmbox>div button{width:80%;height:.6rem;background:#0284d8;color:#fff;border-radius:.1rem;font-size:.28rem;}
.confirmbox>div button.disabled{opacity:.5;}
</style>

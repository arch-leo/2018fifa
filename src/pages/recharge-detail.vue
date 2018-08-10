<template>
  <div class="recharge">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>充值</h3>
      <router-link class="list-link" to="/userlist/recharge">充值记录</router-link>
    </div>
    <div class="recharge-cont">
      <h4 @click="keyboardToggle">充值金额：<span :class="amountPay === '' ? '' : 'on'">{{amountPay === '' ? '请输入充值金额' : amountPay}}</span></h4>
      <h6>
        <button @click="paySelect(index, item.money)" :class="item.active ? 'on' : ''" type="button" :key="item.id" v-for="(item, index) in payNum">{{item.money}}</button>
      </h6>
      <p>选择充值方式（如有问题，请联系 <router-link to="/services">在线客服</router-link>）</p>
      <ul>
        <li :key="item.id" v-for="item in payType.merchant" @click="launchPay(item.actiontype, item.minamount, item.maxamount)">
          <img :src="item.image" alt="sports">
          <span>
            <b>{{item.name}} ￥{{item.minamount}} 起</b>
            <em>{{item.description}}</em>
          </span>
        </li>
      </ul>
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
    <div class="pop-box pop-affirm" v-if="actionTypeOk">
      <div>
        <h4>提示</h4>
        <h3>极速前往充值页面</h3>
        <ul>
          <li @click="actionConfirm(false)">取消</li>
          <li @click="actionConfirm(true)">确定</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {setItem, delItem, getItem} from '@/utils/localstorage'
import {apiUserinfo, apiLaunchPay} from '@/config/api'
export default {
  name: 'recharge-detail',
  data () {
    return {
      userInfo: {},
      payTypeIndex: this.$route.params.id,
      keyboardFlag: false,
      amountPay: '',
      amountVal: [],
      amountFlag: false,
      actionType: '',
      actionTypeOk: false,
      actionTypeUrl: ''
    }
  },
  watch: {
    $route (newVal) {
      this.payTypeIndex = newVal.params.id
    },
    amountFlag (newVal) {
      if (newVal) {
        for (let key of this.payNum) {
          this.$set(key, 'active', false)
        }
      }
    }
  },
  computed: {
    groupid () {
      return getItem('payType')[this.payTypeIndex].groupid
    },
    payType () {
      return getItem('payType')[this.payTypeIndex]
    },
    payNum () {
      return getItem('payType')[this.payTypeIndex].paynum
    },
    post () {
      return {
        groupid: this.groupid,
        actiontype: this.actionType,
        amount: this.amountPay
      }
    }
  },
  created () {
    this.popLoadToggle(true)
    this.getDatas()
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle', 'popAffirmToggle']),
    getDatas () {
      apiUserinfo()
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result[0]
          this.popLoadToggle(false)
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '请先登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.userInfo = jsonData
            this.setUserInfo(jsonData)
            setItem('userInfo', jsonData)
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
    },
    launchPayAjax () {
      this.popLoadToggle(true)
      apiLaunchPay(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result.pay_url
          this.popLoadToggle(false)
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '请先登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.actionTypeOk = true
            this.actionTypeUrl = jsonData
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
    },
    goback () {
      this.$router.go(-1)
    },
    paySelect (index, money) {
      for (let key of this.payNum) {
        this.$set(key, 'active', false)
      }
      this.$set(this.payNum[index], 'active', true)
      this.amountPay = money.toString()
      this.$set(this.$data, 'amountVal', money.toString().split(''))
    },
    keyboardToggle () {
      this.keyboardFlag = !this.keyboardFlag
      this.amountFlag = false
    },
    panelDel () {
      if (this.amountVal.pop()) {
        let amountVal = this.amountVal
        this.amountPay = amountVal.join('')
      } else {
        return false
      }
    },
    panelConfirm () {
      this.keyboardFlag = false
      this.amountFlag = false
    },
    panelClose () {
      this.keyboardFlag = false
      this.amountFlag = false
    },
    panelInput (num) {
      if (!this.amountFlag) {
        this.amountFlag = true
      }
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
      this.amountPay = amountVal.join('')
    },
    launchPay (type, min, max) {
      if (this.amountPay === '') {
        this.popMsgToggle('请输入充值金额')
      } else if (Number(this.amountPay) < min) {
        this.popMsgToggle('单笔充值最少为' + min)
      } else if (Number(this.amountPay) > max) {
        this.popMsgToggle('单笔充值最多为' + max)
      } else {
        this.actionType = type
        this.launchPayAjax()
      }
    },
    actionConfirm (bool) {
      if (bool) {
        this.$router.push({path: '/recharge/' + this.payTypeIndex + '/' + this.actionType + '?money=' + this.amountPay})
        setTimeout(() => {
          window.open(this.actionTypeUrl)
        }, 0)
      }
      this.actionTypeOk = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-link{position:absolute;right:.2rem;top:0;color:#fff;}
.recharge{height:100%;padding-top:.8rem;overflow-y:auto;}
.recharge-cont h4{line-height:.8rem;font-size:.24rem;padding:0 .2rem;background:#fff;border-bottom:.02rem solid #eaeaea;}
.recharge-cont h4 span{color:#999;}
.recharge-cont h4 span.on{color:#666;}
.recharge-cont h6{display:flex;justify-content:center;flex-wrap:wrap;padding:.2rem 0;background:#fff;}
.recharge-cont h6 button{color:#666;width:1.2rem;margin:.16rem;height:.5rem;font-size:.26rem;background:#fff;border-radius:.1rem;border:.02rem solid #ebebeb}
.recharge-cont h6 button.on{color:#17a84b;border:.02rem solid #17a84b}
.recharge-cont p{padding:0 .2rem;line-height:.64rem;color:#666;}
.recharge-cont p a{color:#18a1f5;text-decoration:underline;}
.recharge-cont p span{display:block;line-height:.6rem;}
.recharge-cont h5{padding:.2rem;color:#666;font-size:.24rem;}
.recharge-cont ul{background:#fff;}
.recharge-cont ul li{display:flex;align-items:center;padding:0 .2rem;border-bottom:0.02rem solid #cccccc42;height:1.02rem;}
.recharge-cont ul span{display:flex;flex-direction:column;line-height:.4rem;}
.recharge-cont ul em{font-size:.2rem;color:#999;}
.recharge-cont ul img{width:.45rem;height:.45rem;margin:0 .2rem;}
.recharge-cont ul i{color:#cfcfcf;}

.panel{position:fixed;z-index:15;bottom:-3.5rem;transition:bottom .3s;width:100%;max-width:6.4rem;}
.panel.show{bottom:0}
.panel table{border:none;width:100%;background-color:#fff;border-collapse:collapse}
.panel table tr{border-top:1px solid #efefef}
.panel table tr td{color:#666;width:27%;text-align:center;height:.8rem;line-height:.8rem;font-size:.34rem;border:1px solid #efefef;border-collapse:collapse}
.panel table tr td.backspace{width:19%;background-image:url(../assets/backspace.png);background-repeat:no-repeat;background-position:50%;background-size:.48rem auto}
.panel table tr td.confirm{width:19%;background-color:#0284d8;color:#fff}
.panel table tr td.close{background-image:url(../assets/keyboard.png);background-position:50%;background-repeat:no-repeat;background-size:.64rem auto}
.panel table td:first-child{border-left:none}

.pop-affirm h4{line-height:.4rem;padding-top:.2rem;}
.pop-affirm h3{line-height:.8rem}

</style>

<template>
  <div class="userbind">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>设置资金账户</h3>
    </div>
    <div>
      <h4>为您账户安全，账户类型要与账户账号一致</h4>
      <div class="form-area">
        <div class="form-item">
          <div>
            <span>姓名</span>
            <b>{{realname}}</b>
          </div>
        </div>
        <div class="form-item">
          <div @click="popToggle(false)">
            <span>账户类型</span>
            <strong v-if="bankname === ''">请选择账户类型</strong>
            <b>{{bankname}}</b>
          </div>
        </div>
        <div class="form-item">
          <div>
            <span>账户账号</span>
            <input type="text" placeholder="请输入对应账户账号"
              v-model="banknum"
              @input="inputInput('banknum')"
            />
          </div>
        </div>
      </div>
      <p>请认真核实账户信息</p>
      <button type="button" :class="submitFlag ? '' : 'disabled'" @click="submit">确认</button>
    </div>
    <div class="banks" :class="popFlag ? 'in' : 'out'">
      <div @click="popToggle(false)"></div>
      <ul>
        <li @click="popToggle(true, '微信', 0)">
          <img src="../assets/pay_icon0.png"/>
          <span>微信</span>
        </li>
        <li @click="popToggle(true, '支付宝', 1)">
          <img src="../assets/pay_icon1.png"/>
          <span>支付宝</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {apiSetbank} from '@/config/api'
import {setItem, getItem, delItem} from '@/utils/localstorage'
export default {
  name: 'my',
  data () {
    return {
      realname: getItem('userInfo').truename,
      bankname: '',
      bankid: 3,
      banknameOk: '',
      banknum: '',
      banknumOk: false,
      popFlag: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    submitFlag () {
      return this.banknameOk && this.banknumOk
    },
    post () {
      return {
        truename: this.realname,
        accounttype: this.bankid,
        accountnumber: this.banknum
      }
    }
  },
  created () {
    console.log(this.userInfo)
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle', 'popAffirmToggle']),
    goback () {
      this.$router.go(-1)
    },
    submit () {
      if (this.submitFlag) {
        this.setBank()
      } else {
        this.popMsgToggle('请先完善绑定信息')
        return false
      }
    },
    setBank () {
      this.popLoadToggle(true)
      apiSetbank(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            let userInfo = getItem('userInfo')
            userInfo.isbindbank = true
            this.setUserInfo(userInfo)
            setItem('userInfo', userInfo)
            this.popMsgToggle(jsonDesc)
            setTimeout(() => {
              this.$router.push({path: '/user', query: {stat: true}})
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
    },
    inputInput (name) {
      switch (name) {
        case 'banknum':
          if (this.banknum.length === 0) {
            this.banknumOk = false
          } else {
            this.banknumOk = true
          }
          break
        default:
          break
      }
    },
    popToggle (flag, type, id) {
      if (flag) {
        this.bankid = id
        this.bankname = type
        this.banknameOk = true
      }
      this.popFlag = !this.popFlag
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userbind{height:100%;padding-top:.8rem;overflow-y:auto;}
.userbind h4{color:#999;text-indent:.2rem;font-size:.26rem;padding:.1rem 0}
.userbind p{color:#666;text-align:center;text-indent:0;font-size:.28rem;padding-top:.2rem}
.userbind .form-area{border-top:.02rem solid #e5e5e5;border-bottom:.02rem solid #e5e5e5;}
.userbind .form-item{background-color:#fff;padding:0 .2rem;line-height:.88rem;}
.userbind .form-item div{height:.9rem;border-top:.02rem solid #eaeaea;position:relative;}
.userbind .form-item:first-child div{height:.88rem;border-top:none;}
.userbind .form-item span{height:100%;width:1.8rem;text-align:justify;text-align-last:justify;position:absolute;z-index:1;}
.userbind .form-item input{width:100%;height:.88rem;text-indent:2.2rem;font-size:.24rem;line-height:.86rem;display:block;}
.userbind .form-item strong{position:absolute;right:0;top:0;color:#999;}
.userbind .form-item b{position:absolute;left:2.2rem;color:#1a1a1a;}
.userbind button{font-size:.26rem;width:90%;height:.7rem;border:none;margin:.8rem auto;display:block;border-radius:.1rem;background:#17a84b;color:#fff;font-weight:700;}
.userbind button.disabled{background:#dfdfe9;color:#9898a8;}

.banks{position:fixed;top:0;z-index:15;width:100%;height:100%;max-width:6.4rem;overflow:hidden;display:none;}
.banks div{height:100%;width:100%;background:rgba(0,0,0,.5);opacity:0;}
.banks ul{height:3.6rem;background:#fff;position:absolute;bottom:-100%;width:100%;padding:0 .2rem;}
.banks li{border-bottom:.02rem solid #eaeaea;height:.82rem;line-height:.8rem;text-align:center;position:relative;}
.banks img{height:.48rem;width:.48rem;position:absolute;top:.14rem;left:.6rem;}

.banks.in{display:block;}
.banks.in div{animation:fadeIn .2s ease-in-out forwards;}
.banks.in ul{animation:moveIn .2s ease-in-out forwards;}
@keyframes moveIn {
  form{bottom:-100%;}
  to{bottom:0;}
}
@keyframes fadeIn {
  form{opacity:0;}
  to{opacity:1;}
}
</style>

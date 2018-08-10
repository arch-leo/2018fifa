<template>
  <div class="userbind">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>设置资金密码</h3>
    </div>
    <div>
      <h4>为您账户安全，真实姓名要与绑定账户姓名一致</h4>
      <div class="form-area">
        <div class="form-item">
          <div>
            <span>真实姓名</span>
            <input type="text" placeholder="请输入真实姓名"
              v-model="realname"
              @input="inputInput('realname')"
            />
          </div>
        </div>
        <div class="form-item">
          <div>
            <span>资金密码</span>
            <input type="password" placeholder="请输入6位数的数字密码"
              v-model="bankpwd"
              @input="inputInput('bankpwd')"
            />
          </div>
        </div>
        <div class="form-item">
          <div>
            <span>确认资金密码</span>
            <input type="password" placeholder="请再次输入6位数的数字密码"
              v-model="pconfirm"
              @input="inputInput('pconfirm')"
            />
          </div>
        </div>
      </div>
      <p>密码规则：资金密码须为<span class="color-red">6位数字</span></p>
      <button type="button" :class="submitFlag ? '' : 'disabled'" @click="submit">确认</button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {apiSetcash} from '@/config/api'
import {setItem, getItem, delItem} from '@/utils/localstorage'
import {realnameReg, bankpwdReg} from '@/config/formReg'
export default {
  name: 'my',
  data () {
    return {
      realname: '',
      realnameOk: false,
      bankpwd: '',
      bankpwdOk: false,
      pconfirm: '',
      pconfirmOk: false
    }
  },
  computed: {
    submitFlag () {
      return this.realnameOk && this.bankpwdOk && this.pconfirmOk
    },
    post () {
      return {
        truename: this.realname,
        cashpassword: this.bankpwd
      }
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle', 'popAffirmToggle']),
    goback () {
      this.$router.go(-1)
    },
    submit () {
      if (this.submitFlag) {
        this.setCash()
      } else {
        this.popMsgToggle('请先完善绑定信息')
        return false
      }
    },
    setCash () {
      this.popLoadToggle(true)
      apiSetcash(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          this.popLoadToggle(false)
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            let userInfo = getItem('userInfo')
            userInfo.issetcashpassword = true
            userInfo.truename = this.realname
            this.setUserInfo(userInfo)
            setItem('userInfo', userInfo)
            this.popAffirmToggle({flag: true, title: '资金密码设置成功，火速绑定银行卡', path: '/bindbank'})
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
        case 'realname':
          if (this.realname.length === 0) {
            this.realnameOk = false
          } else {
            if (realnameReg.test(this.username)) {
              this.realnameOk = true
            } else {
              this.realnameOk = false
            }
          }
          break
        case 'bankpwd':
          if (this.bankpwd.length === 0) {
            this.bankpwdOk = false
          } else {
            if (bankpwdReg.test(this.bankpwd)) {
              this.bankpwdOk = true
            } else {
              this.bankpwdOk = false
            }
          }
          break
        case 'pconfirm':
          if (this.pconfirm.length === 0) {
            this.pconfirmOk = false
          } else {
            if (bankpwdReg.test(this.pconfirm)) {
              this.pconfirmOk = true
            } else {
              this.pconfirmOk = false
            }
          }
          break
        default:
          break
      }
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
.userbind .form-item input{width:100%;height:.88rem;text-indent:2rem;font-size:.24rem;line-height:.86rem;display:block;}
.userbind button{font-size:.26rem;width:90%;height:.7rem;border:none;margin:.8rem auto;display:block;border-radius:.1rem;background:#17a84b;color:#fff;font-weight:700;}
.userbind button.disabled{background:#dfdfe9;color:#9898a8;}
</style>

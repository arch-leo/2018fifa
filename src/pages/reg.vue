<template>
  <logreg>
    <h3 slot="title">注册</h3>
    <div slot="cont" class="logform">
      <ul>
        <li>
          <label :class="usernameOk ? 'valid' : ''"><i class="iconfont icon-user-avatar"></i></label>
          <input type="text" placeholder="用户名可包含6-16位字母数字下划线"
            v-model="username"
            @focus="inputFocusBlur('username')"
            @input="inputInput('username')"
            @blur="inputFocusBlur('username')"
          />
          <span>
            <i class="iconfont icon-error-circle" v-if="username.length > 0" @click="clear('username')"></i>
          </span>
          <em v-if="usernameErr">用户名可包含6-16位字母数字下划线</em>
        </li>
        <li>
          <label :class="passwordOk ? 'valid' : ''"><i class="iconfont icon-lock enable"></i></label>
          <input :type="eyeCanSee ? 'text' : 'password'" placeholder="6-12个字符字母及数字"
            v-model="password"
            @focus="inputFocusBlur('password')"
            @input="inputInput('password')"
            @blur="inputFocusBlur('password')"
          />
          <span>
            <i class="iconfont" :class="eyeCanSee ? 'icon-eye-open' : 'icon-eye-close'" @click="eyeToggle"></i>
            <i class="iconfont icon-error-circle" v-if="password.length > 0" @click="clear('password')"></i>
          </span>
          <em v-if="passwordErr">6-12个字符字母及数字</em>
        </li>
        <li class="imgcode">
          <label :class="imgcodeOk ? 'valid' : ''"><i class="iconfont icon-user-avatar"></i></label>
          <input type="text" placeholder="验证码"
            v-model="imgcode"
            @focus="inputFocusBlur('imgcode')"
            @input="inputInput('imgcode')"
            @blur="inputFocusBlur('imgcode')"
          />
          <span>
            <i class="iconfont icon-error-circle" v-if="imgcode.length > 0" @click="clear('imgcode')"></i>
          </span>
          <img :src="imgcodeUrl + '/authimg?time=' + time" @click="getTime"/>
          <em v-if="imgcodeErr">请输入正确的验证码</em>
        </li>
      </ul>
      <p>
        <router-link to="/log">立即登陆</router-link>
      </p>
      <h6 :class="agreeFlag ? 'agree' : ''">
        <i class="iconfont icon-checked" @click="agreeToggle"></i>我已经满合法年龄,且同意各项开户条约,<b @click="popupToggle(true)">"开户协议"</b>
      </h6>
      <button type="button" @click="submit(submitFlag)" :class="submitFlag ? '' : 'disabled'">注册</button>
    </div>
    <div slot="popup" v-show="popupFlag" class="agreement">
      <h3>
        <i class="iconfont icon-arrow-left" @click="popupToggle(false)"></i>开户协议
      </h3>
      <div>
        <p>
          <b>本应用</b>严禁会员有重复申请账号行为，每位玩家、每一住址 、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，及共享计算机环境(例如网吧、其他公共用计算机等)只能拥有一个帐户数据。
        </p>
        <p>
          <b>本应用</b>是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在不被允许的地区，如有会员在<b>本应用</b>注册、下注，为会员个人行为，<b>本应用</b>不负责、承担任何相关责任。
        </p>
        <p>
          玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，<b>本应用</b>保留权利要求客户向我们提供充足有效的档，并以各种方式辨别客户是否符合资格享有我们的任何优惠。
        </p>
        <p>
          无论是个人或是团体，如有任何威胁、滥用<b>本应用</b>义的行为，<b>本应用</b>保留杈利取消、收回玩家账号。
        </p>
      </div>
    </div>
  </logreg>
</template>

<script>
import logreg from '@/components/common/logreg'
import {setItem} from '@/utils/localstorage'
import {usernameReg, passwordReg, imgcodeReg} from '@/config/formReg'
import {apiReg} from '@/config/api'
import {mapMutations} from 'vuex'
export default {
  name: 'my',
  data () {
    return {
      username: '',
      password: '',
      imgcode: '',
      usernameOk: false,
      passwordOk: false,
      imgcodeOk: false,
      usernameErr: false,
      passwordErr: false,
      imgcodeErr: false,
      eyeCanSee: false,
      agreeFlag: true,
      popupFlag: false,
      imgcodeUrl: process.env.NODE_ENV === 'development' ? '' : '/service',
      time: ''
    }
  },
  computed: {
    submitFlag () {
      return this.usernameOk && this.passwordOk && this.imgcodeOk && this.agreeFlag
    },
    post () {
      return {
        username: this.username,
        password: this.password,
        imgcode: this.imgcode
      }
    }
  },
  components: {
    logreg
  },
  created () {
    this.getTime()
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle']),
    getTime () {
      let time = new Date().getTime()
      this.time = time
    },
    eyeToggle () {
      this.eyeCanSee = !this.eyeCanSee
    },
    agreeToggle () {
      this.agreeFlag = !this.agreeFlag
    },
    clear (name) {
      switch (name) {
        case 'username':
          this.usernameOk = false
          this.usernameErr = false
          this.username = ''
          break
        case 'password':
          this.passwordOk = false
          this.passwordErr = false
          this.password = ''
          break
        case 'imgcode':
          this.imgcodeOk = false
          this.imgcodeErr = false
          this.imgcode = ''
          break
        default:
          break
      }
    },
    inputFocusBlur (name) {
      switch (name) {
        case 'username':
          if (this.username.length === 0) {
            this.usernameOk = false
            this.usernameErr = false
          } else {
            if (usernameReg.test(this.username)) {
              this.usernameOk = true
              this.usernameErr = false
            } else {
              this.usernameOk = false
              this.usernameErr = true
            }
          }
          break
        case 'password':
          if (this.password.length === 0) {
            this.passwordOk = false
            this.passwordErr = false
          } else {
            if (passwordReg.test(this.password)) {
              this.passwordOk = true
              this.passwordErr = false
            } else {
              this.passwordOk = false
              this.passwordErr = true
            }
          }
          break
        case 'imgcode':
          if (this.imgcode.length === 0) {
            this.imgcodeOk = false
            this.imgcodeErr = false
          } else {
            if (imgcodeReg.test(this.imgcode)) {
              this.imgcodeOk = true
              this.imgcodeErr = false
            } else {
              this.imgcodeOk = false
              this.imgcodeErr = true
            }
          }
          break
        default:
          break
      }
    },
    inputInput (name) {
      switch (name) {
        case 'username':
          if (this.username.length === 0) {
            this.usernameOk = false
            this.usernameErr = false
          } else {
            if (usernameReg.test(this.username)) {
              this.usernameOk = true
              this.usernameErr = false
            } else {
              this.usernameOk = false
              this.usernameErr = true
            }
          }
          break
        case 'password':
          if (this.password.length === 0) {
            this.passwordOk = false
            this.passwordErr = false
          } else {
            if (passwordReg.test(this.password)) {
              this.passwordOk = true
              this.passwordErr = false
            } else {
              this.passwordOk = false
              this.passwordErr = true
            }
          }
          break
        case 'imgcode':
          if (this.imgcode.length === 0) {
            this.imgcodeOk = false
            this.imgcodeErr = false
          } else {
            if (imgcodeReg.test(this.imgcode)) {
              this.imgcodeOk = true
              this.imgcodeErr = false
            } else {
              this.imgcodeOk = false
              this.imgcodeErr = true
            }
          }
          break
        default:
          break
      }
    },
    submit () {
      if (!this.agreeFlag) {
        return false
      }
      if (this.submitFlag) {
        this.doLog()
      } else {
        return false
      }
    },
    doLog () {
      this.popLoadToggle(true)
      this.register()
    },
    register () {
      let redirect = decodeURIComponent(this.$route.query.redirect || '/user')
      apiReg(this.post)
        .then(json => {
          this.popLoadToggle(false)
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          this.popLoadToggle(false)
          if (jsonState === 1) {
            let userInfo = {username: this.username}
            this.setUserInfo(userInfo)
            setItem('userInfo', userInfo)
            this.popMsgToggle(jsonDesc)
            setTimeout(() => {
              if (redirect === '/user') {
                this.$router.push({path: redirect, query: {stat: true}})
              } else {
                this.$router.push({path: redirect})
              }
            }, 1500)
          } else {
            this.popMsgToggle(jsonDesc)
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    popupToggle (stat) {
      this.popupFlag = stat
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agreement{position:fixed;top:0;width:100%;height:100%;z-index:15;max-width:6.4rem;background:#fff;overflow-y:auto;}
.agreement h3{height:.88rem;background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);line-height:.88rem;color:#fff;text-align:center;}
.agreement h3{position:fixed;width:100%;max-width:6.4rem;}
.agreement i{position:absolute;left:.1rem;top:.16rem;color:#fff;width:.5rem;height:.54rem;line-height:.54rem;font-size:.44rem;}
.agreement div{padding:4.48rem .2rem .2rem;background:url(../assets/agree.png) no-repeat center .88rem;background-size:100%;}
.agreement p{text-indent:.6rem;line-height:.6rem;}
.agreement p b{font-weight:bold;}
</style>

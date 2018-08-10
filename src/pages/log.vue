<template>
  <logreg>
    <h3 slot="title">登陆</h3>
    <div slot="cont" class="logform">
      <ul>
        <li>
          <label :class="usernameOk ? 'valid' : ''"><i class="iconfont icon-user-avatar"></i></label>
          <input type="text" placeholder="请输入用户名"
            v-model="username"
            @focus="inputFocusBlur('username')"
            @input="inputInput('username')"
            @blur="inputFocusBlur('username')"
          />
          <span>
            <i class="iconfont icon-error-circle" v-if="username.length > 0" @click="clear('username')"></i>
          </span>
          <em v-if="usernameErr">用户名不能为空</em>
        </li>
        <li>
          <label :class="passwordOk ? 'valid' : ''"><i class="iconfont icon-lock enable"></i></label>
          <input :type="eyeCanSee ? 'text' : 'password'" placeholder="请输入密码"
            v-model="password"
            @focus="inputFocusBlur('password')"
            @input="inputInput('password')"
            @blur="inputFocusBlur('password')"
          />
          <span>
            <i class="iconfont" :class="eyeCanSee ? 'icon-eye-open' : 'icon-eye-close'" @click="eyeToggle"></i>
            <i class="iconfont icon-error-circle" v-if="password.length > 0" @click="clear('password')"></i>
          </span>
          <em v-if="passwordErr">密码不能为空</em>
        </li>
      </ul>
      <p>
        <strong @click="forgetPwd">忘记密码？</strong>
        <router-link to="/reg">立即注册</router-link>
      </p>
      <button type="button" @click="submit(submitFlag)" :class="submitFlag ? '' : 'disabled'">登陆</button>
    </div>
  </logreg>
</template>

<script>
import logreg from '@/components/common/logreg'
import {apiLog} from '@/config/api'
import {setItem} from '@/utils/localstorage'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'my',
  data () {
    return {
      username: '',
      password: '',
      usernameOk: false,
      passwordOk: false,
      usernameErr: false,
      passwordErr: false,
      eyeCanSee: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    submitFlag () {
      return this.usernameOk && this.passwordOk
    },
    post () {
      return {
        username: this.username,
        password: this.password
      }
    }
  },
  components: {
    logreg
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle']),
    eyeToggle () {
      this.eyeCanSee = !this.eyeCanSee
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
            this.usernameOk = true
            this.usernameErr = false
          }
          break
        case 'password':
          if (this.password.length === 0) {
            this.passwordOk = false
            this.passwordErr = false
          } else {
            this.passwordOk = true
            this.passwordErr = false
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
            this.usernameOk = true
            this.usernameErr = false
          }
          break
        case 'password':
          if (this.password.length === 0) {
            this.passwordOk = false
            this.passwordErr = false
          } else {
            this.passwordOk = true
            this.passwordErr = false
          }
          break
        default:
          break
      }
    },
    submit () {
      if (this.submitFlag) {
        this.doLog()
      } else {
        return false
      }
    },
    doLog () {
      this.popLoadToggle(true)
      this.login()
    },
    login () {
      let redirect = decodeURIComponent(this.$route.query.redirect || '/user')
      apiLog(this.post)
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
    forgetPwd () {
      this.popMsgToggle('联系客服找回密码')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

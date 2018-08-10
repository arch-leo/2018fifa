<template>
  <div class="setnewpwd">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>设置资金密码</h3>
    </div>
    <div>
      <div class="form-area">
        <div class="form-item">
          <div>
            <span>旧密码</span>
            <input type="password" placeholder="请输入旧密码"
              v-model="password0"
            />
          </div>
        </div>
        <div class="form-item">
          <div>
            <span>新密码</span>
            <input type="password" placeholder="请输入新密码"
              v-model="password1"
            />
          </div>
        </div>
        <div class="form-item">
          <div>
            <span>确认新密码</span>
            <input type="password" placeholder="请再次输入新密码"
              v-model="password2"
            />
          </div>
        </div>
      </div>
      <p>密码规则：须为<span class="color-red">6位数字</span></p>
      <button type="button" @click="submit">确认</button>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import {setItem, delItem} from '@/utils/localstorage'
import {passwordReg} from '@/config/formReg'
import {apiChangeCash} from '@/config/api'
export default {
  name: 'resetcash',
  data () {
    return {
      password0: '',
      password1: '',
      password2: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    post () {
      return {
        true: this.userInfo.truename,
        cashpassword: this.password0,
        newpassword: this.password1
      }
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle', 'popAffirmToggle']),
    goback () {
      this.$router.go(-1)
    },
    submit () {
      if (!passwordReg.test(this.password0)) {
        this.popMsgToggle('旧密码格式有误')
        return false
      } else if (!passwordReg.test(this.password1)) {
        this.popMsgToggle('新密码格式有误')
        return false
      } else if (this.password1 !== this.password2) {
        this.popMsgToggle('确认新密码与新密码不一致')
        return false
      } else if (this.password0 === this.password1) {
        this.popMsgToggle('新密码与旧密码相同')
        return false
      } else {
        this.setPwd()
      }
    },
    setPwd () {
      this.popLoadToggle(true)
      apiChangeCash(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result[0]
          this.popLoadToggle(false)
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.setUserInfo(jsonData)
            setItem('userInfo', jsonData)
            this.popMsgToggle('资金密码修改成功')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setnewpwd{height:100%;padding-top:.8rem;overflow-y:auto;}
.setnewpwd p{color:#666;text-align:center;text-indent:0;font-size:.28rem;padding-top:.2rem}
.setnewpwd .form-area{border-top:.02rem solid #e5e5e5;border-bottom:.02rem solid #e5e5e5;}
.setnewpwd .form-item{background-color:#fff;padding:0 .2rem;line-height:.88rem;}
.setnewpwd .form-item div{height:.9rem;border-top:.02rem solid #eaeaea;position:relative;}
.setnewpwd .form-item:first-child div{height:.88rem;border-top:none;}
.setnewpwd .form-item span{height:100%;width:1.8rem;text-align:justify;text-align-last:justify;position:absolute;z-index:1;}
.setnewpwd .form-item input{width:100%;height:.88rem;text-indent:2rem;font-size:.24rem;line-height:.86rem;display:block;}
.setnewpwd button{font-size:.26rem;width:90%;height:.7rem;border:none;margin:.8rem auto;display:block;border-radius:.1rem;background:#ffe400;color:#734217;font-weight:700;}
</style>

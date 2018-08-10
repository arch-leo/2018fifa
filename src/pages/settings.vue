<template>
  <div class="settings">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>设置</h3>
    </div>
    <div>
      <ul>
        <li @click="jumpTo('/advice')">帮助与反馈 <span><i class="iconfont icon-arrow-right"></i></span></li>
        <li @click="jumpTo('/resetpwd')">登录密码 <span><i class="iconfont icon-arrow-right"></i></span></li>
        <li @click="jumpTo('/resetcash')">资金密码 <span><i class="iconfont icon-arrow-right"></i></span></li>
        <!-- <li @click="clearCache">清除缓存 <span><i class="iconfont icon-arrow-right"></i></span></li>
        <li>关于我们<span><i class="iconfont icon-arrow-right"></i></span></li> -->
        <li>版本监测 <span>当前版本为V.1.0版本</span></li>
      </ul>
      <button :class="userInfo ? '' : 'disabled'" @click="logout">退出</button>
    </div>
  </div>
</template>

<script>
import {delItem} from '@/utils/localstorage'
import {mapState, mapMutations} from 'vuex'
import {apiLogout} from '@/config/api'
export default {
  name: 'my',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle']),
    goback () {
      this.$router.go(-1)
    },
    logout () {
      if (this.userInfo) {
        this.popLoadToggle(true)
        apiLogout()
          .then(json => {
            let jsonState = json.data.state
            let jsonDesc = json.data.desc
            this.popLoadToggle(false)
            this.popMsgToggle(jsonDesc)
            if (jsonState === 0) {
              this.popMsgToggle('您还没有登陆')
              setTimeout(() => {
                this.$router.push({path: '/user'})
              }, 1500)
            } else if (jsonState === 1) {
              delItem('userInfo')
              this.setUserInfo(null)
              setTimeout(() => {
                this.$router.push({path: '/user'})
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
      } else {
        this.popMsgToggle('您还没有登陆')
        return false
      }
    },
    jumpTo (path) {
      this.$router.push({path: path})
    },
    clearCache () {
      this.popMsgToggle('清除成功')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.settings{height:100%;padding-top:.8rem;overflow-y:auto;}
.settings li{line-height:.9rem;height:.9rem;border-top:.02rem solid #e5e5e5;background:#fff;text-indent:.2rem;overflow:hidden;}
.settings span{float:right;margin-right:.2rem;color:#999;}
.settings button{font-size:.26rem;width:90%;height:.7rem;border:none;margin:.8rem auto;display:block;border-radius:.1rem;background:#17a84b;color:#fff;font-weight:700;}
.settings button.disabled{background:#dfdfe9;color:#9898a8;}
</style>

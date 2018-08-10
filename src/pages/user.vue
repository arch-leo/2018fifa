<template>
  <div class="my">
    <div class="my-head">
      <template v-if="userInfo">
        <div>
          <img src="../assets/default.png"/>
          <span>{{userInfo.username}}</span>
          <i class="iconfont icon-config" @click="toSetting"></i>
        </div>
        <p>余额</p>
        <h3>
          <em>{{userInfo.accountbalance}}</em>
          <i class="iconfont icon-refresh2" :class="refreshing" @click="refresh"></i>
        </h3>
      </template>
      <template v-else>
        <div>
          <img src="../assets/default.png"/>
          <span>&nbsp;</span>
          <i class="iconfont icon-config" @click="toSetting"></i>
        </div>
        <h4>
          <router-link to="/log" class="fl">登陆</router-link>
          <router-link to="/reg" class="fr">注册</router-link>
        </h4>
      </template>
    </div>
    <div class="my-btns">
      <span @click="isLoginCheck('/withdraw')">
        <i class="iconfont icon-credit-card"></i>
        <b>兑换</b>
      </span>
      <span @click="isLoginCheck('/recharge')">
        <i class="iconfont icon-recharge"></i>
        <b>充值</b>
      </span>
    </div>
    <div class="my-items">
      <h3>我的注单</h3>
      <ul>
        <li @click="isLoginCheck('/mybet')">
          <i class="iconfont icon-money-o"></i>
          <span>注单记录</span>
        </li>
        <li @click="isLoginCheck('/userlist/account')">
          <i class="iconfont icon-bill"></i>
          <span>账户明细</span>
        </li>
        <li @click="isLoginCheck('/userlist/recharge')">
          <i class="iconfont icon-recharge-o"></i>
          <span>充值记录</span>
        </li>
        <li @click="isLoginCheck('/userlist/withdraw')">
          <i class="iconfont icon-withdraw"></i>
          <span>兑换记录</span>
        </li>
      </ul>
    </div>
    <div class="my-items">
      <h3>帮助中心</h3>
      <ul>
        <li @click="isLoginCheck('/playrules')">
          <i class="iconfont icon-rule"></i>
          <span>玩法规则</span>
        </li>
        <li @click="isLoginCheck('/playsets')">
          <i class="iconfont icon-order-detail"></i>
          <span>详细设定</span>
        </li>
        <li @click="isLoginCheck('/playdeclar')">
          <i class="iconfont icon-order-o"></i>
          <span>规则与条款</span>
        </li>
        <li @click="isLoginCheck('/services')">
          <i class="iconfont icon-message-o"></i>
          <span>在线客服</span>
        </li>
      </ul>
    </div>
    <div class="my-items">
      <h3>必备工具</h3>
      <ul>
        <!-- <li>
          <i class="iconfont icon-agent"></i>
          <span>加入代理</span>
        </li> -->
        <li @click="isLoginCheck('/safecenter')">
          <i class="iconfont icon-security"></i>
          <span>安全中心</span>
        </li>
        <!-- <li>
          <i class="iconfont icon-email"></i>
          <span>站内信</span>
        </li>
        <li>
          <i class="iconfont icon-recharge-o"></i>
          <span>信息公告</span>
        </li> -->
      </ul>
    </div>
    <footbar></footbar>
  </div>
</template>

<script>
import footbar from '@/components/common/footbar'
import {apiUserinfo} from '@/config/api'
import {setItem, delItem} from '@/utils/localstorage'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'my',
  data () {
    return {
      refreshing: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components: {
    footbar
  },
  created () {
    if (this.$route.query.stat) {
      this.popLoadToggle(true)
      this.getUserinfo()
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popMsgToggle', 'popAffirmToggle']),
    getUserinfo () {
      apiUserinfo()
        .then(json => {
          let jsonState = json.data.state
          let jsonData = json.data.data.result[0]
          this.popLoadToggle(false)
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.setUserInfo(jsonData)
            setItem('userInfo', jsonData)
          }
          if (this.refreshing === 'refreshing') {
            this.refreshing = ''
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
          if (this.refreshing === 'refreshing') {
            this.refreshing = ''
          }
        })
    },
    refresh () {
      this.refreshing = 'refreshing'
      this.popLoadToggle(true)
      this.getUserinfo()
    },
    isLoginCheck (path) {
      if (path === 'withdraw') {
        console.log(this.userInfo)
        if (this.userInfo.issetcashpassword === true) {
          if (this.userInfo.isbindbank) {
            this.$router.push({path: path})
          } else {
            this.popAffirmToggle({flag: true, title: '请先设置绑定账户', path: '/bindbank'})
          }
        } else {
          this.popAffirmToggle({flag: true, title: '请先设置资金密码', path: '/bindcash'})
        }
      } else {
        this.$router.push({path: path})
      }
    },
    toSetting () {
      this.$router.push({path: '/settings'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my{height:100%;padding:0 0 1rem;overflow-y:auto;}
.my-head{line-height:.88rem;background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);color:#fff;padding:.3rem .3rem 0;}
.my-head div{height:.52rem;line-height:.52rem;font-size:.26rem;}
.my-head div img{float:left;height:.48rem;padding:.02rem 0;margin-right:.28rem;}
.my-head div span{float:left;font-size:.28rem;}
.my-head div i{float:right;font-size:.4rem;}
.my-head p{line-height:.48rem;}
.my-head h3{line-height:.64rem;font-size:.4rem;height:.64rem;}
.my-head h3 em{float:left;}
.my-head h3 i{float:right;font-size:.48rem;}
.my-head h3 i.refreshing{transition:all 1s;transform:rotate(1turn);}
.my-head h4{height:1.44rem;padding:.4rem 0;}
.my-head h4 a{width:40%;height:.64rem;border:.02rem solid #fff;border-radius:.1rem;line-height:.64rem;color:#fff;text-align:center;}
.my-head h4 a.fl{float:left;}
.my-head h4 a.fr{float:right;}
.my-btns{height:.8rem;border-top:.02rem solid #ddd;display:flex;align-items:center;background:#fff;}
.my-btns span{flex:1;display:flex;align-items:center;justify-content:center;}
.my-btns span:first-child{color:#548eff;}
.my-btns span:last-child{color:#46bd4d;}
.my-btns span i{font-size:.44rem;margin-right:.2rem;}
.my-items{background:#fff;margin-top:.2rem;}
.my-items h3{height:.76rem;line-height:.74rem;color:#333;border-bottom:.02rem solid #dcdcdc;font-size:.26rem;padding-left:.2rem;font-weight:700;}
.my-items ul{display:flex;align-items:center;}
.my-items li{text-align:center;width:25%;height:1.76rem;display:flex;justify-content:center;flex-direction:column;}
.my-items li i{color:#17a84b;font-size:.42rem;margin-bottom:.2rem;}
</style>

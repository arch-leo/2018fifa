<template>
  <div class="recharge">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>充值中心</h3>
      <router-link class="list-link" to="/userlist/recharge">充值记录</router-link>
    </div>
    <div class="recharge-cont">
      <h4>
        <i class="iconfont icon-info"></i>
        <span>充值时,部分支付渠道充值金额随机1位小数,请您在付款时确认</span>
      </h4>
      <p>
        <img src="../assets/default.png" />
        <span>{{userInfo.username}}</span>
        <span>余额：<em class="color-red">{{userInfo.accountbalance}}</em></span>
      </p>
      <h5>选择支付方式</h5>
      <div>
        <router-link :to="'/recharge/' + index" :key="item.id" v-for="(item, index) in paytype">{{item.groupName}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {setItem, delItem} from '@/utils/localstorage'
import {apiUserinfo, apiPaytype} from '@/config/api'
export default {
  name: 'my',
  data () {
    return {
      userInfo: {},
      paytype: []
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
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
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
      apiPaytype()
        .then(json => {
          let jsonData = json.data.data
          setItem('payType', jsonData)
          this.paytype = jsonData
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
        })
    },
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-link{position:absolute;right:.2rem;top:0;color:#fff;}
.recharge{height:100%;padding-top:.8rem;overflow-y:auto;}
.recharge-cont h4{background:#ffdfbf;height:.55rem;font-size:.24rem;color:#d66900;padding:0 .1rem;}
.recharge-cont h4 span{line-height:.55rem;font-size:.2rem}
.recharge-cont p{background:#fff;height:1.6rem;padding:.2rem 0;}
.recharge-cont p img{width:1rem;height:1rem;margin:.1rem .3rem;float:left;}
.recharge-cont p span{display:block;line-height:.6rem;}
.recharge-cont h5{padding:.2rem;color:#666;font-size:.24rem;}
.recharge-cont div img{display:block;width:100%;}
.recharge-cont div span{display:block;line-height:.8rem;color:#999;}
</style>

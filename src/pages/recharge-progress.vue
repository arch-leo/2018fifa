<template>
  <div class="recharge">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>充值中心</h3>
      <!-- <router-link class="list-link" to="/userlist/recharge">充值记录</router-link> -->
    </div>
    <div class="recharge-cont">
      <div>
        <i class="recharge-icon1"></i>
        <span></span>
        <i class="recharge-icon2"></i>
        <span></span>
        <i class="recharge-icon3"></i>
      </div>
      <ul>
        <li>
          <h3>充值完成，已经提交成功</h3>
          <h5>充值金额：{{money}}</h5>
        </li>
        <li>
          <h3>努力充值中</h3>
          <h5>如果您已支付，预计1分钟到账，如未到账请联系客服</h5>
        </li>
        <li>
          <h3>充值成功</h3>
        </li>
      </ul>
      <router-link to="/userlist/recharge">查看充值结果</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recharge-progress',
  data () {
    return {
      userInfo: {},
      money: this.$route.query.money
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .list-link{position:absolute;right:.2rem;top:0;color:#fff;} */
.recharge{height:100%;padding-top:.8rem;overflow-y:auto;position:relative;}
.recharge-cont div{position:absolute;left:.4rem;top:1.8rem;width:.68rem;}
.recharge-cont div span{height:1rem;width:.08rem;background:#f5a623;margin:0 auto;display:block;}
.recharge-cont div i{height:.68rem;width:.68rem;display:block;background:url() no-repeat;background-size:100%;}
.recharge-cont div i.recharge-icon1{background-image:url(../assets/progress0.png);}
.recharge-cont div i.recharge-icon2{background-image:url(../assets/progress1.png);}
.recharge-cont div i.recharge-icon3{background-image:url(../assets/progress2.png);}
.recharge-cont ul{padding:1rem .4rem .3rem 1.48rem}
.recharge-cont li{margin-top:.9rem;height:.8rem;color:#666;}
.recharge-cont li:first-child{margin-top:0;}
.recharge-cont li h3{font-weight:bold;}
.recharge-cont a{display:block;width:90%;height:.72rem;line-height:.72rem;background:#17a84b;text-align:center;color:#fff;margin:0 auto;border-radius:.1rem;font-size:.28rem;}
</style>

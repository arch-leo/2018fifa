<template>
  <div class="safecenter">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>安全中心</h3>
    </div>
    <div>
      <ul>
        <li @click="jumpTo('/resetpwd')">登录密码 <span><i class="iconfont icon-arrow-right"></i></span></li>
        <li @click="jumpTo('/resetcash')">资金密码 <span><i class="iconfont icon-arrow-right"></i></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'safecenter',
  data () {
    return {
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    jumpTo (path) {
      this.$router.push({path: path})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.safecenter{height:100%;padding-top:.8rem;overflow-y:auto;}
.safecenter li{line-height:.9rem;height:.9rem;border-top:.02rem solid #e5e5e5;background:#fff;text-indent:.2rem;overflow:hidden;}
.safecenter span{float:right;margin-right:.2rem;color:#999;}
</style>

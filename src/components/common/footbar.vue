<template>
  <div class="foot-nav">
    <router-link :to="item.href" :key="item.id" v-for="(item, $index) in footnavs" :class="'nav'+($index+1)">{{item.title}}</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footnavs: [
        {href: '/index', title: '首页'},
        {href: '/vslist', title: '比赛结果'},
        {href: '/mybet', title: '我的注单'},
        {href: '/user', title: '会员中心'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* footer */
  .foot-nav{position:fixed;bottom:0;width:100%;height:1rem;border-top:.02rem solid #eee;background:#fafcff;font-size:.28rem;text-align:center;z-index:10;max-width:6.4rem;}
  .foot-nav a{width:25%;height:100%;display:block;float:left;padding-top:.54rem;background:url() no-repeat center .12rem;background-size:.36rem .36rem;line-height:.44rem;font-size:.24rem}
  .foot-nav a.is-active{color:#17a84b;}
  .foot-nav a.nav1{background-image:url(../../assets/nav_icon11.png)}
  .foot-nav a.nav1.is-active{background-image:url(../../assets/nav_icon21.png);}
  .foot-nav a.nav2{background-image:url(../../assets/nav_icon12.png)}
  .foot-nav a.nav2.is-active{background-image:url(../../assets/nav_icon22.png);}
  .foot-nav a.nav3{background-image:url(../../assets/nav_icon13.png)}
  .foot-nav a.nav3.is-active{background-image:url(../../assets/nav_icon23.png);}
  .foot-nav a.nav4{background-image:url(../../assets/nav_icon14.png)}
  .foot-nav a.nav4.is-active{background-image:url(../../assets/nav_icon24.png);}
</style>

<template>
  <transition name="fade">
    <div class="table-sidebar" v-if="flag">
      <em @click="sidebarHide"></em>
      <div>
        <span @click="filterShow"><i class="iconfont icon-filter"></i> 筛选联赛</span>
        <span @click="jumpTo('playrules')"><i class="iconfont icon-rule"></i> 体育规则</span>
        <span @click="jumpTo('mybet')"><i class="iconfont icon-money-o"></i> 我的注单 </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'table-sidebar',
  props: ['flag'],
  methods: {
    filterShow () {
      this.$emit('filter-show')
    },
    jumpTo (args) {
      this.$router.push({path: '/' + args})
    },
    sidebarHide () {
      this.$emit('sidebar-hide')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-sidebar{position:fixed;top:0;width:100%;height:100%;padding-top:.8rem;z-index:5;max-width:6.4rem;}
  .table-sidebar em{background-color:rgba(0,0,0,.5);position:absolute;height:100%;width:100%;z-index:-1;}
  .table-sidebar div{float:right;width:40%;height:100%;background:#fff;}
  .table-sidebar span{font-size:.26rem;height:.9rem;line-height:.9rem;padding-left:.5rem;border-bottom:.02rem solid #eaeaea;display:block;}
  .table-sidebar span i{font-size:.36rem;}
  /* transition */
  .fade-enter-active, .fade-leave-active{transition:opacity .5s;}
  .fade-enter, .fade-leave-to{opacity: 0;}
</style>

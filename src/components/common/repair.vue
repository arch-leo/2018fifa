<template>
  <div class="repair">
    <img src="../../assets/repair.png" alt="维护中"/>
    <h3>抱歉！系统正在维护！请联系客服。</h3>
    <h3>服务预计中断时间:</h3>
    <p>{{time}}</p>
  </div>
</template>

<script>
export default {
  name: 'repair',
  props: ['time'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.repair{margin:20% auto 0;}
.repair img{display:block;margin:0 auto .6rem;width:3.6rem;}
.repair h3{color:#adadad;text-align:left;padding:0 .48rem;font-size:.24rem;margin:.1rem 0 .1rem;}
.repair p{padding:0 .48rem;text-align:left;font-size:.24rem;}
</style>

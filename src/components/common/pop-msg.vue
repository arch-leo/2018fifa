<template>
  <div class="pop-msg">{{desc}}用户名可包含6-16位字母数字下划线</div>
</template>

<script>
export default {
  name: 'mini-info',
  props: ['desc']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* footer */
  .pop-msg{position:fixed;left:50%;top:50%;transform:translate(-50%, -50%);background:rgba(0,0,0,.7);border-radius:.1rem;padding:.1rem .3rem;color:#fff;text-align:center;}
</style>

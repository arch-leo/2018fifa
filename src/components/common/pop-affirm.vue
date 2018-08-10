<template>
  <div class="pop-affirm">
    <div>
      <h3>{{title}}</h3>
      <div>
        <span>取消</span>
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mini-load',
  props: ['title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* footer */
  .pop-affirm{position:fixed;left:50%;top:50%;width:1.28rem;height:1.28rem;transform:translate(-50%, -50%);background:rgba(0,0,0,.7);border-radius:.1rem;padding:.3rem;}

</style>

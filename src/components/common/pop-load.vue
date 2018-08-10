<template>
  <div class="mini-load">
  <span></span>
  </div>
</template>

<script>
export default {
  name: 'mini-load'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* footer */
  .mini-load{position:fixed;left:50%;top:50%;width:1.28rem;height:1.28rem;transform:translate(-50%, -50%);background:rgba(0,0,0,.7);border-radius:.1rem;padding:.3rem;}
  .mini-load span{display:block;width:100%;height:100%;border:.1rem solid rgb(204, 204, 204);border-right-color:transparent;border-radius:50%;}
  .mini-load span{animation:rotate .8s infinite linear;}
  @keyframes rotate {
    from{transform:rotate(0deg);}
    to{transform:rotate(360deg)}
  }
</style>

<template>
  <div class="nodata">
    <img src="../../assets/empty.png" alt="暂无数据"/>
    <p>暂无数据</p>
  </div>
</template>

<script>
export default {
  name: 'nodata',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nodata{position:absolute;top:20%;width:100%;max-width:6.4rem;}
</style>

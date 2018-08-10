<template>
  <div class="activity">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>更多玩法</h3>
    </div>
    <div class="advice-cont">
      blablabla
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'activity',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['popLoadToggle', 'popMsgToggle']),
    toggle (index) {
      let active = !this.problems[index].active
      for (let key of this.problems) {
        this.$set(key, 'active', false)
      }
      this.$set(this.problems[index], 'active', active)
    },
    goback () {
      this.$router.go(-1)
    },
    submit () {
      this.popLoadToggle(true)
      setTimeout(() => {
        this.popLoadToggle(false)
        this.popMsgToggle('谢谢您的反馈！')
      }, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.acitivity{height:100%;padding-top:.8rem;overflow-y:auto;}

</style>

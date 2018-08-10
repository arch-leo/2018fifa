<template>
  <div class="activity">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>{{title}}</h3>
    </div>
    <div class="activity-cont">
      <template v-if="hasData === 1">
      <div class="activity-text" v-html="content"></div>
      </template>
      <template v-else-if="hasData === 0">
      <nodata></nodata>
      </template>
      <template v-else>
      </template>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {apiActivityinfo} from '@/config/api'
import nodata from '@/components/common/nodata'
export default {
  name: 'activity',
  data () {
    return {
      hasData: 2,
      id: this.$route.query.id,
      title: '',
      content: ''
    }
  },
  watch: {
    $route (newVal, oldVal) {
      this.id = newVal.query.id
      this.getActivity()
    }
  },
  created () {
    this.popLoadToggle(true)
    this.getActivity()
  },
  components: {
    nodata
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
    getActivity () {
      apiActivityinfo({id: this.id})
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          this.content = json.data.data.result
          this.popLoadToggle(false)
          if (jsonState === 1) {
            if (jsonData && jsonData.length > 0) {
              this.title = jsonData[0].title
              this.content = jsonData[0].content
              this.hasData = 1
            } else if (jsonData && jsonData.length === 0) {
              this.hasData = 0
            } else {
              this.hasData = 2
            }
          } else {
            this.popMsgToggle(jsonDesc)
          }
        })
        .catch(err => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity{height:100%;padding-top:.8rem;}
.activity-cont{height:100%;overflow-y:auto;padding:0 .2rem;}
.activity-text{font-size:.28rem;line-height:.6rem;}
</style>

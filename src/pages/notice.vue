<template>
  <div class="notice">
    <div class="notice-head">
      <router-link to="/index"><i class="iconfont icon-arrow-left"></i></router-link>
      <h3>活动公告</h3>
    </div>
    <div class="notice-line"></div>
    <template v-if="hasData === 1">
      <div class="notice-list">
        <scroll>
          <div class="notice-item" :key="item.id" v-for="item in notices">
            <div class="icon">
              <i class="iconfont icon-message"></i>
            </div>
            <p class="date"><span>{{item.create_time}}</span></p>
            <div class="content">
              <div class="title">{{item.title}}</div>
              <div class="info">
                <p>{{item.content | delHtmlTag}}</p>
              </div>
              <div class="time">{{item.create_time}}</div>
            </div>
          </div>
        </scroll>
      </div>
    </template>
    <template v-else-if="hasData === 0">
     <nodata></nodata>
    </template>
    <template v-else>
    </template>
  </div>
</template>

<script>
import scroll from '@/components/better-scroll/scroll'
import {apiNotices} from '@/config/api'
import {mapMutations} from 'vuex'
export default {
  name: 'my',
  data () {
    return {
      hasData: 1,
      notices: []
    }
  },
  components: {
    scroll
  },
  created () {
    this.popLoadToggle(true)
    this.getNotice()
  },
  methods: {
    ...mapMutations(['popLoadToggle']),
    getNotice () {
      apiNotices()
        .then(json => {
          let jsonData = json.data.data.result
          if (jsonData && jsonData.length > 0) {
            this.notices = jsonData
            this.hasData = 1
          } else if (jsonData && jsonData.length === 0) {
            this.hasData = 0
          } else {
            this.hasData = 2
          }
          this.popLoadToggle(false)
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.popLoadToggle(false)
        })
    }
  },
  filters: {
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notice{height:100%;padding:.8rem 0 .2rem;background:#f5f5f5;}
.notice-head{height:.8rem;width:100%;position:fixed;top:0;max-width:6.4rem;line-height:.8rem;text-align:center;background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);z-index: 10;}
.notice-head a{position:absolute;left:.1rem;top:0;color:#fff;}
.notice-head a i{font-size:.44rem;}
.notice-head h3{font-size:.28rem;color:#fff;}
.notice-line{position:absolute;top:0;width:.02rem;height:100%;background:#e5e5e5;margin-left:.32rem;}
.notice-list{height:100%;}
.notice-item{width:100%;position:relative;padding:.2rem .2rem 0 .8rem}
.notice-item .icon{height:.54rem;width:.54rem;border:1px solid #e5e5e5;border-radius:50%;background:#fff;line-height:.54rem;text-align:center;color:#e5e5e5;position:absolute;top:1rem;left:.05rem}
.notice-item .icon i{font-size:.2rem}.notice-item .date{text-align:center;padding:.2rem}
.notice-item .date span{display:inline-block;background-color:#ddd;border:1px solid #ccc;padding:0 .1rem;color:#fff;border-radius:.1rem}
.notice-item .content{background-color:#fff;border:1px solid #e5e5e5;border-radius:.1rem;padding-top:.2rem}
.notice-item .content:after{content:"";height:.22rem;width:.18rem;position:absolute;top:1.2rem;left:.64rem;background-image:url(../assets/arrow.png);background-size:100%;}
.notice-item .content img{height:.8rem;width:.8rem;float:left;margin:.1rem}
.notice-item .content .title{color:#000;font-size:.26rem;padding:.2rem;font-weight:700}
.notice-item .content .time{color:gray;border-top:1px solid #e5e5e5;padding:.2rem}
.notice-item .content .info{padding:.2rem;padding-top:0;line-height:.4rem;font-size:.28rem}
</style>

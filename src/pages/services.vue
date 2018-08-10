<template>
  <div class="services">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>客服中心</h3>
    </div>
    <div class="services-cont">
      <img src="../assets/service_bg.png" />
      <p>可以选择以下方式联系客服</p>
      <ul>
        <li class="service-online" @click="toLink">
          <i class="iconfont icon-customer-service"></i>
          <span>在线客服</span>
        </li>
        <li class="service-qq" @click="toPop(true, 'QQ')">
          <i class="iconfont icon-qq"></i>
          <span>QQ客服</span>
        </li>
        <li class="service-weixin" @click="toPop(true, '微信')">
          <i class="iconfont icon-weixin"></i>
          <span>微信客服</span>
        </li>
      </ul>
    </div>
    <div class="pop-service" v-if="serviceType">
      <div>
        <i @click="toPop(false, '')"></i>
        <h3>
          <img :src="serviceImg"/>
          <span>{{serviceType}}客服号码：</span>
          <em >{{serviceNum}}</em>
        </h3>
        <p>
          <button type="button" class="copy-text" :data-clipboard-text="serviceNum" @click="copyText">复制客服号码</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import serviceQq from '@/assets/service_qq.png'
import serviceWeixin from '@/assets/service_weixin.png'
import Clipboard from 'clipboard'
export default {
  name: 'services',
  data () {
    return {
      serviceType: null,
      serviceNum: '',
      serviceImg: ''
    }
  },
  methods: {
    ...mapMutations(['popMsgToggle']),
    goback () {
      this.$router.go(-1)
    },
    toLink () {
      this.popMsgToggle('正在连接在线客服')
    },
    toPop (flag, type) {
      if (flag) {
        if (type === 'QQ') {
          this.serviceType = type
          this.serviceNum = '120823540675'
          this.serviceImg = serviceQq
        } else if (type === '微信') {
          this.serviceType = type
          this.serviceNum = 'www540675_|'
          this.serviceImg = serviceWeixin
        }
      } else {
        this.serviceType = null
      }
    },
    copyText () {
      let clipboard = new Clipboard('.copy-text')
      clipboard.on('success', e => {
        e.clearSelection()
        this.serviceType = null
        this.popMsgToggle('复制成功')
      })
      clipboard.on('error', (e) => {
        this.popMsgToggle('复制失败，请长按复制')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.services{height:100%;padding-top:.8rem;overflow-y:auto;}
.services-cont img{display:block;margin:.6rem auto;width:3.6rem;}
.services-cont p{text-align:center;position:relative;color:#999;height:.6rem;line-height:.6rem;font-size:.28rem;}
.services-cont ul{text-align:center;height:2rem;padding:.3rem 0;font-size:0;}
.services-cont li{display:inline-block;font-size:.28rem;margin:0 .4rem;}
.services-cont li i{font-size:.8rem;height:.96rem;}
.services-cont li.service-online i{font-size:.9rem;color:#fed150;}
.services-cont li.service-qq i{color:#5fa9f0;}
.services-cont li.service-weixin i{color:#3fca37;}
.services-cont li span{display:block;margin-top:-.2rem;}

.pop-service{position:fixed;top:0;width:100%;height:100%;max-width:6.4rem;z-index:15;background:rgba(0,0,0,.7);}
.pop-service>div{width:80%;height:6.82rem;padding-bottom:.2rem;background:#fff;border-radius:.1rem;overflow:hidden;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;}
.pop-service h3{padding:.4rem .4rem 0;margin-bottom:.2rem;}
.pop-service img{height:3.6rem;display:block;margin:0 auto .2rem;}
.pop-service span{display:block;height:.4rem;line-height:.4rem;font-size:.26rem;color:#adadad;margin-bottom:.2rem;}
.pop-service em{display:block;font-size:.4rem;text-align:center;line-height:.6rem;padding-bottom:.2rem;border-bottom:.02rem solid #eaeaea;}
.pop-service p{padding:0 .6rem;}
.pop-service button{display:block;width:100%;height:.8rem;background:#17a84b;color:#fff;font-size:.26rem;}
.pop-service i{position:absolute;right:.1rem;top:.1rem;height:.4rem;width:.4rem;background:url(../assets/close.png) no-repeat;background-size:100%;}
</style>

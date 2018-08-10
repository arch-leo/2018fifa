<template>
  <div id="app">
    <router-view></router-view>
    <template v-if="popLoadFlag">
      <div class="pop-box pop-load">
        <div>
          <span></span>
        </div>
      </div>
    </template>
    <template v-if="popMsgFlag">
      <div class="pop-msg">{{popMsgDesc}}</div>
    </template>
    <template v-if="popAffirmFlag">
      <div class="pop-box pop-affirm">
        <div>
          <h3>{{popAffirmDesc.title}}</h3>
          <ul>
            <li @click="popAffirm('cancel')">取消</li>
            <li @click="popAffirm(popAffirmDesc.path)">确定</li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {setItem, getItem} from '@/utils/localstorage'
import {mapState, mapMutations} from 'vuex'
import {apiUserinfo} from '@/config/api'
export default {
  name: 'App',
  computed: {
    ...mapState(['userInfo', 'popLoadFlag', 'popMsgFlag', 'popMsgDesc', 'popAffirmFlag', 'popAffirmDesc'])
  },
  created () {
    if (getItem('userInfo')) {
      this.setUserInfo(getItem('userInfo'))
    } else {
      this.setUserInfo()
    }
    this.getUserinfo()
  },
  methods: {
    ...mapMutations(['setUserInfo', 'popLoadToggle', 'popAffirmToggle']),
    popAffirm (path) {
      if (path !== 'cancel') {
        if (this.popAffirmDesc.redirect) {
          this.$router.push({path: path, query: {redirect: decodeURIComponent(this.popAffirmDesc.redirect)}})
        } else {
          this.$router.push({path: path})
        }
      }
      this.popAffirmToggle({flag: false})
    },
    getUserinfo () {
      apiUserinfo()
        .then(json => {
          let jsonState = json.data.state
          let jsonData = json.data.data.result[0]
          this.popLoadToggle(false)
          if (jsonState === 1) {
            this.setUserInfo(jsonData)
            setItem('userInfo', jsonData)
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    }
  }
}
</script>

<style>
* {-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;}
html,body,div,p,a,span,b,em,i,strong,h1,h2,h3,h4,h5,h6,img,ul,li,button,textarea,input,form,iframe,table,tr,td{margin:0;padding:0;border:0;box-sizing:border-box;}
header,footer,nav,section,article,main,aside,summary,details,figcaption,figure,menu{display:block;margin:0;padding:0;}
a,a:active,a:hover {text-decoration:none;outline:0;}
img{border:0;max-width:100%;}
table{border-collapse:collapse;border-spacing:0;}
i,em,b,strong{font-style:normal;font-weight:normal;}
button{-webkit-appearance:button;cursor:pointer;border:none;background:none;outline:none;}
input,textarea{font-family:Helvetica,sans-serif;outline:none;}
ol,ul,li{list-style:none;}
:focus{outline:none}
button,input,textarea{border:none;outline:none;padding:0;-webkit-appearance:none;-moz-appearance:none;-webkit-tap-highlight-color:transparent}
button::-moz-focus-inner,input::-moz-focus-inner{border:0}
input::-webkit-input-placeholder{color:#cecece}
input:-ms-input-placeholder{color:#cecece}
input::placeholder{color:#cecece}
blockquote,q{quotes:none}
blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}
a{text-decoration:none;color:#1a1a1a}
h1,h2,h3,h4,h5,h6{font-weight:normal;}
html{font-family:Helvetica,san-serif;-webkit-text-size-adjust:none;min-height:100%;height:100%;}
body{-webkit-font-smoothing:antialiased;word-wrap:break-word;-webkit-hyphens:auto;hyphens:auto;position:relative}
body{color:#1a1a1a;font-weight:400;font-size:0.24rem;line-height:1.6;height:100%;background:#f5f5f9;}
/* float */
.clearfix:after{content:"200B";display:block;height:0;clear:both;overflow:hidden;}
/* ellipsis */
.ellipsis{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
/* app */
#app{margin:0 auto;background:#f5f5f9;height:100%;max-width:6.4rem;overflow:hidden;font-size:.24rem;}
/* slider */
.slider .swiper-pagination-bullet{width:.16rem;height:.16rem;background:#fff}
.slider .swiper-pagination-bullet-active{background:#17a84b;}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{bottom:0.32rem;}
/* color-red */
.color-red{color:#f54343;}
/* headbar */
.headbar{height:.8rem;width:100%;position: fixed;top:0;background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);z-index:10;max-width:6.4rem;}
/* nodata */
.nodata img{display:block;margin:0 auto;width:3.6rem;}
.nodata p{text-align:center;line-height:0.8rem;color:#aaa;}
/* mini-pop */
.pop-box{position:fixed;top:0;text-align:center;max-width:6.4rem;z-index:15;width:100%;height:100%;}
.pop-load{background:transparent;}
.pop-load div{background:rgba(0,0,0,.7);border-radius:.1rem;padding:.3rem;position:absolute;left:50%;top:50%;width:1.28rem;height:1.28rem;transform:translate(-50%, -50%);}
.pop-load span{display:block;width:100%;height:100%;border:.1rem solid rgb(204, 204, 204);border-right-color:transparent;border-radius:50%;}
.pop-load span{animation:rotate .8s infinite linear;}
@keyframes rotate {
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg)}
}
.pop-msg{position:fixed;left:50%;top:50%;transform:translate(-50%, -50%);background:rgba(0,0,0,.7);border-radius:.1rem;padding:.1rem .3rem;color:#fff;z-index:150;}
.pop-affirm{top:0;width:100%;height:100%;background:rgba(0,0,0,.7);z-index:150;}
.pop-affirm div{position:absolute;left:50%;top:50%;width:76%;background:#fff;border-radius:.1rem;margin:-.5rem 0 0 -38%;}
.pop-affirm h3{line-height:1.2rem;border-bottom:.02rem solid #ddd;color:#999;}
.pop-affirm ul{height:.8rem;line-height:.8rem;}
.pop-affirm li{float:left;width:50%;}
.pop-affirm li:last-child{border-left:.02rem solid #ddd;color:#26a2ff;}
/* head-pop-navs */
.head-pop-navs{width:100%;height:.88rem;position:relative;text-align:center;z-index:15;}
.head-pop-navs div{width:2.4rem;padding-top:.16rem;height:.66rem;line-height:.48rem;margin:0 auto;}
.head-pop-navs span{width:100%;height:100%;border:.02rem solid #fff;color:#fff;display:block;border-radius:.1rem;}
.head-pop-navs span em{height:100%;display:inline-block;}
.head-pop-navs span i{height:100%;display:inline-block;margin:0 -.1rem 0 .1rem;}
.head-pop-navs i.right{position:absolute;right:.1rem;top:.24rem;color:#fff;width:.32rem;height:.34rem;line-height:.34rem;}
/* back-head */
.back-head{position:fixed;top:0;width:100%;max-width:6.4rem;height:.8rem;line-height:.8rem;z-index:10;background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);}
.back-head i{font-size:.44rem;position:absolute;left:.1rem;color:#fff;}
.back-head h3{text-align:center;font-size:.28rem;color:#fff;}
.back-head span{font-size:.28rem;position:absolute;top:0;right:.1rem;color:#fff;}
/* userlist-item */
.userlist-item{border-bottom:.02rem solid #e5e5e5;padding:0 .2rem;background:#fff;position:relative;}
.userlist-item:first-child{border-top:.02rem solid #e5e5e5;}
.userlist-item p{font-size:.26rem;line-height:.6rem;}
.userlist-item span{color:#999;}
.userlist-item em{position:absolute;top:0;right:.2rem;line-height:.6rem;width: 1.8rem;text-align:right;}
.userlist-item i{position:absolute;top:.6rem;right:.2rem;line-height:.3rem;width: 1.8rem;text-align:right;color:#999;}
.userlist-detail{position:fixed;width:100%;height:100%;top:0;max-width:6.4rem;}
.userlist-detail b{background:rgba(0,0,0,.5);width:100%;height:100%;display:block;}
.userlist-detail div{position:absolute;left:10%;top:1.8rem;width:80%;}
.userlist-detail h3{height:1.2rem;line-height:1.2rem;font-size:.36rem;background:linear-gradient(50deg,#b4ed50,#17a84b 500px);text-align:center;color:#fff;border-radius:.12rem .12rem 0 0;}
.userlist-detail h3 span{font-size:.24rem}
.userlist-detail ul{background:#fff;line-height:1rem;padding:.2rem .2rem 1.2rem;border-radius:0 0 .12rem .12rem;color:#666;}
.userlist-detail ul em{float:right;}
/* scroll-event */
.pulling-down{position:absolute;top:-.9rem;width:100%;height:.36rem;text-align:center;color:#999;}
.pulling-up{position:absolute;bottom:-.9rem;width:100%;height:.36rem;text-align:center;color:#999;}
/* plays */
.plays{height:100%;padding-top:0.88rem;overflow-y:auto;background:#45c24c;}
.plays-back{position:absolute;left:.1rem;top:.16rem;color:#fff;width:.5rem;height:.54rem;line-height:.54rem;font-size:.44rem;}
.plays-wrap{padding:0 .2rem;}
.plays-wrap h3{height:.54rem;line-height:.54rem;text-align:center;color:#fff;position:relative;margin-top:.2rem;}
.plays-wrap h3 span{display:inline-block;height:.54rem;width:3.1rem;background-image:url(./assets/title_bg.png);background-size:100% 100%;position:relative;z-index:2;}
.plays-wrap h3 i{display:block;height:.02rem;width:100%;position:absolute;background:#34b33a;top:.27rem;}
.plays-wrap h4{background:#33b339;width:100%;margin:.1rem auto;border-radius:.1rem;box-shadow:inset .04rem .04rem 0 #2f9b33,.04rem .04rem 0 #84e588;padding:.2rem .15rem;}
.plays-wrap h4 span{width:23%;height:.5rem;background:url() no-repeat;background-size:100% 100%;text-align:center;line-height:.43rem;margin:0 1%;display:inline-block;color:#ffeb34;}
.plays-wrap h4 span.active{background-image:url(./assets/rule_nav_bg.png);color:#986000;}
.plays-wrap h5{padding:.1rem .2rem 0;color:#fff;font-size:.28rem;}

/*table-wrap*/
.table-wrap{padding-bottom:.2rem;}
.table-wrap.close{height:.88rem;overflow:hidden;}
.table-wrap.close .table-title i.icon-arrow-down{display:none;}
.table-wrap.close .table-title i.icon-arrow-up{display:block;}

.table-title{height:.68rem;background:#fff;font-size:.24rem;line-height:.68rem;padding:0 .2rem;}
.table-title span{float:left;}
.table-title i{float:right;color:#bbb;}
.table-title i.icon-arrow-down{display:block;}
.table-title i.icon-arrow-up{display:none;}
</style>

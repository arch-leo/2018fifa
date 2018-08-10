<template>
  <div>
    <div class="headbar-title">
      <slot name="left"></slot>
      <div class="headbar-cont">
        <span @click="fade">
          <em>{{subTitle ? subTitle : title}}</em>
          <template v-if="pops">
            <i class="iconfont icon-arrow-up" v-if="flag"></i>
            <i class="iconfont icon-arrow-down" v-else></i>
          </template>
        </span>
      </div>
      <slot name="right"></slot>
    </div>
    <transition name="fade">
      <div class="headbar-pops" v-if="flag && !sidebar">
        <div @click="fade(false)"></div>
        <ul class="clearfix">
          <li :key="item.id" v-for="(item, index) in pops" :class="item.active ? 'active' : ''"
            @click="select(index, item.sportid, item.zh_name, item.en_name)">{{item.zh_name }}
              <span v-if="matchsFlag" class="color-red">{{item.size ? item.size : ''}}</span></li>
        </ul>
      </div>
    </transition>
    <slot name="bot"></slot>
  </div>
</template>

<script>
export default {
  name: 'headbar',
  props: ['pops', 'sidebar', 'sub-title', 'matchs-flag'],
  data () {
    return {
      title: this.pops ? this.pops[0].zh_name : '',
      flag: false
    }
  },
  methods: {
    fade () {
      if (this.pops) {
        this.flag = !this.flag
        this.$emit('sidebar')
      }
    },
    select (index, id, name, event) {
      this.title = name
      this.flag = !this.flag
      this.$emit('select', index, id, event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* headbar */
  .headbar-title{width:100%;height:.8rem;position:relative;text-align:center;z-index:15;}
  .headbar-cont{width:2.4rem;padding:.16rem;height:100%;margin:0 auto;}
  .headbar-cont span{width:100%;height:100%;border:.02rem solid #fff;color:#fff;display:block;border-radius:.1rem;line-height:.44rem;font-size:0;}
  .headbar-cont span em{height:100%;display:inline-block;font-size:.24rem;}
  .headbar-cont span i{height:100%;display:inline-block;margin:0 -.1rem 0 .1rem;font-size:.24rem;}
  .headbar-pops{position:fixed;top:0;width:100%;height:100%;padding:.8rem 0 1rem;z-index:5;max-width:6.4rem;}
  .headbar-pops div{background-color:rgba(0,0,0,.5);position:absolute;height:100%;width:100%;z-index:-1;}
  .headbar-pops ul{text-align:center;padding:.3rem 0 0;background:#fff;font-size:0;}
  .headbar-pops li{border-radius:.1rem;width:26%;height:.56rem;line-height:.52rem;border:.02rem solid silver;color:#666;position:relative;float:left;font-size:.24rem;}
  .headbar-pops li{background:url() no-repeat right bottom;background-size:.3rem .3rem;margin:0 0 .3rem;}
  .headbar-pops li.active{border-color:#17a84b;color:#17a84b;background-image:url(../../assets/corner.png);}
  .headbar-pops li:nth-child(3n+1){margin-left:4%;margin-right:7%;}
  .headbar-pops li:nth-child(3n+2){margin-left:0;margin-right:0;}
  .headbar-pops li:nth-child(3n+3){margin-left:7%;margin-right:4%;}
  /* transition */
  .fade-enter-active, .fade-leave-active{transition:opacity .5s;}
  .fade-enter, .fade-leave-to{opacity: 0;}
</style>

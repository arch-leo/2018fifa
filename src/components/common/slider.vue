<template>
  <swiper :options="swiperOption" class="slider">
    <swiper-slide :key="item.id" v-for="item in sliders">
      <!-- <router-link :to="item.url">
        <img :src="item.image" :alt="item.activityName">
      </router-link> -->
      <a :href="item.url">
        <img :src="item.image" :alt="item.activityName">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>
</template>

<script>
export default {
  name: 'slider',
  props: ['sliders'],
  data () {
    return {
      swiperOption: {
        // 初始化index
        initialSlide: 0,
        // 轮播方向 horizontal vertical
        direction: 'horizontal',
        autoplay: {
          // 触碰后是否停止轮播
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          // 分页器
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slider{height:3rem;overflow:hidden;}
.slider img{height:100%;width:100%;display:block;}
</style>

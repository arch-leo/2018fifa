<template>
  <div class="logreg">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <slot name="title"></slot>
    </div>
    <div class="circles">
      <span class="c1" style="left: 6rem; top: 1.2rem;"></span>
      <span class="c2" style="left: 1.5rem; top: 3.8rem;"></span>
      <span class="c3" style="left: 5.5rem; top: 4.3rem;"></span>
      <span class="c4" style="left: -0.5rem; top: 7rem;"></span>
    </div>
    <slot name="cont"></slot>
    <slot name="popup"></slot>
  </div>
</template>

<script>
export default {
  name: 'logreg',
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* headbar */
.logreg{height:100%;padding-top:.8rem;background:#17a84b linear-gradient(50deg,#b4ed50,#17a84b 10rem);}
.logreg .back-head{background-image:none;}
.circles{position:absolute;width:100%;height:100%;top:0;overflow:hidden;max-width:6.4rem;}
.circles span{position:absolute;border-radius:50%;display:block;opacity:.15;background:#feff86;}
.circles span.c1{height:.5rem;width:.5rem;}
.circles span.c2{ height:1.2rem;width:1.2rem;}
.circles span.c3{height:2.8rem;width:2.8rem;}
.circles span.c4{height:4rem;width:4rem;}
.logform{position:relative;z-index:10;margin:1.4rem .2rem 0;}
.logform ul{background:#fff;border-radius:.1rem;padding:0 .2rem;}
.logform li{border-bottom:.02rem solid #ddd;padding:.2rem .6rem;position:relative;}
.logform label{position:absolute;left:0;top:.2rem;color:#bbb;}
.logform label.valid{color:#1a1a1a;}
.logform input{width:100%;height:.6rem;line-height:.6rem;font-size:.28rem;}
.logform input.imgcode{padding-right:2.4rem;}
.logform em{color:red;font-size:.24rem;line-height:.4rem;display:block;}
.logform img{height:.8rem;width:2.4rem;position:absolute;right:0;top:.1rem;}
.logform span{position:absolute;right:0;top:.2rem;color:#bbb;}
.logform span i.icon-error-circle{margin-left:.1rem;}
.logform p{line-height:1rem;color:#fff;height:1rem;padding:0 .2rem;}
.logform p a{color:#fff;float:right;}
.logform button{width:100%;height:.76rem;color:#734318;background:#ffe400;border-radius:.2rem;font-size:.28rem;}
.logform button.disabled{background:#007b27;color:#fff;}
.logform h6{font-size:.24rem;color:#fff;padding-bottom:.3rem;}
.logform h6 i{font-size:.24rem;color:#ebebeb;margin-right:.1rem;}
.logform h6.agree i{color:red;}
.logform h6 b{font-size:.28rem;text-decoration:underline;}

.logform li.imgcode{padding-right:2.3rem;}
.logform li.imgcode span{right:2.8rem;}

</style>

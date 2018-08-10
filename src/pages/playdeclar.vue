<template>
  <div class="plays">
    <div class="headbar">
      <headbar :sidebar="false" sub-title="规则与条款" @select="popSelect">
        <i class="iconfont icon-arrow-left plays-back" slot="left" @click="goback"></i>
      </headbar>
    </div>
    <div class="plays-wrap">

      <ul class="play-uls">
        <li>
          <h6>使用条款</h6>
          <div>
            <p>享用本公司提供的服务是客户本人的意愿，其风险应由客户本人承担。参与我们服务的同时就说明客户认同本公司所提供的服务是正常、合理、公正、公平的。</p>
            <p>某些法律规则在贵国居住的司法管辖区, 并未明文规定在线和非在线博彩是否允许，客户有责任确保任何时候您的博彩行为在您所属地是属合法行为。</p>
          </div>
        </li>
        <li>
          <h6>投注接受条件</h6>
          <div>
            <p>如果阁下的投注信息正确，阁下是唯一对此投注承担责任的人。一旦本司确认您的注单，该注单不得取消，撤回或更改，并且该注单会视为您投注的有效证据。</p>
            <p>所有在本公司客户账户交易记录显示确认信息的注单，本司都视为有效注单。每笔交易完成后请查您的交易记录，若有任何问题请联系上线核查否则您接受您的注单是正确的。</p>
            <p>如果客户有欺诈，合谋，非法或其它不当行为我们有权(唯一决定人)取消投注单或任何彩金。我们保留权利以任何理由拒绝任何交易或注单。</p>
          </div>
        </li>
        <li>
          <h6>免责声明</h6>
          <div>
            <p>对于任何情况下由于卫星收讯不良或延误，网路中断，或个人使用网站服务时的失误，疏忽，或对网站内容的误解所产生的任何损失，本公司概不负责。</p>
            <p>公司不赋予任何责任对于公司的网站，服务器或网络中断，公司的服务器丢失信息或信息遭受破坏，不法分子攻击网站，服务器或网络供应商进入网站时候由于网络供应商原因造成的网络缓慢。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headbar from '@/components/common/headbar'
export default {
  name: 'playdeclar',
  data () {
    return {
    }
  },
  components: {
    headbar
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    popSelect () {
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.play-uls{padding-bottom:.3rem;}
.play-uls li{background:#fff;margin:.6rem auto 0;padding:.2rem;border-radius:.2rem;color:#666;line-height:.45rem;font-size:.26rem;}
.play-uls h6{color:#b07a00;font-weight:700;height:.7rem;line-height:.7rem;text-align:center;width:3.5rem;margin:0 auto;margin-top:-.2rem;font-size:.28rem;}
.play-uls h6{position:relative;top: -.4rem;background-image:url(../assets/declar.png);background-size: 100% 100%;}
.play-uls div{font-size:.28rem;}
.play-uls p{text-indent:.54rem;}

</style>

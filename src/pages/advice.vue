<template>
  <div class="advice">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>设置</h3>
    </div>
    <div class="advice-cont">
      <p class="title">常见问题</p>
      <ul>
        <li :class="item.active ? 'active' : ''" :key="item.id" v-for="(item, index) in problems" @click="toggle(index)">
          <p class="sub-title">{{item.title}} <i class="iconfont icon-arrow-right"></i></p>
          <p class="content" v-html="item.content"></p>
        </li>
      </ul>
      <p class="title">主人何事如此烦心</p>
      <textarea placeholder="请简单描述情况，微臣好尽快为您分忧～"></textarea>
      <p class="title">主人，请留下联系方式</p>
      <input type="text" placeholder="邮箱／手机号／QQ">
      <button class="btn-yellow" @click="submit">一键反馈</button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'my',
  data () {
    return {
      problems: [
        {
          title: '提款需要手续费吗？',
          content: '· 达到提款条件才能取款。<br>· 提款不限次数，手续费根据网站设定。<br>· 提款时所产生的银行手续费将全部由本网站为您承担。',
          active: true
        },
        {
          title: '提款次数有没有限制？',
          content: '本公司不限制提款次数。',
          active: false
        },
        {
          title: '提款时需要注意哪些事项？',
          content: '· 确认提款时提交的的银行信息的正确性。<br>· 为了防止少数用户利用信用卡套现和洗钱的行为，保护正常用户的资金安全，本站针对提款做出如下规定：<br>1、用户需要达到一定的打码量，才能正常办理提款。<br>2、发现异常的提款，要经过审核。',
          active: false
        },
        {
          title: '提款不成功怎么办？',
          content: '提款不成功分两种情况：<br>· 提款申请未成功：<br>1、提款金额大于账户实有金额。<br>2、提款时填写的提款密码与用账户信息设置的密码不一致。<br>3、银行卡信息不符合规定格式。<br>· 申请提款成功，但款项没有到达指定账户：<br>1、银行卡卡号填写错误，与用户姓名不符，银行退单。<br>一旦发生上述现象，请及时联系客服，由客服人员为您服务。',
          active: false
        },
        {
          title: '对于用户使用本站投注服务的约定',
          content: '· 用户根据自愿的原则，使用本站投注业务，并自己对自己提供的注册信息的真实性负责；<br>· 国家明令禁止一切洗钱行为，本站积极响应国家政策，严格控制。',
          active: false
        },
        // {
        //   title: '在本公司投注安全吗？',
        //   content: '· 威廉希尔是欧洲最负盛名的博彩公司(haobc)，是世界博彩业中的旗帜性公司<br>· 威廉希尔律属于英国最大投注公司，强势入驻亚洲市场，拥有多年业界经验的管理团队及雄厚的实力背景<br>· 威廉希尔亚洲版是英属维京群岛合法注册的博彩公司并持有菲律宾政府卡格扬经济特区 &nbsp;First Cagayan leisure and Resort Corporation颁发的体育博彩与线上赌场执照并受其监督',
        //   active: false
        // },
        {
          title: '如何对网站服务进行投诉？',
          content: '· 如有需要及时处理的事务，请联系在线客服。<br>· 工作时间：7X24，永不间断',
          active: false
        }
      ]
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
.advice{height:100%;padding-top:.8rem;overflow-y:auto;}
.advice .title{padding:.2rem;}
.advice ul{padding:0 .2rem;background-color:#fff;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5}
.advice ul li{height:1rem;overflow:hidden;padding-bottom:.2rem}
.advice ul li .sub-title{height:1rem;line-height:1rem;border-bottom:1px solid #e5e5e5}
.advice ul li .sub-title i{float:right;color:#999}
.advice ul li .content{line-height:.4rem;padding:.1rem 0;color:#999}
.advice ul li:last-child .sub-title{border-bottom:none}
.advice ul li:last-child.active .sub-title{border-bottom:1px solid #e5e5e5}
.advice ul li.active{height:auto;border-bottom:1px solid #e5e5e5}
.advice ul li.active .sub-title{color:#17a84b!important;}
.advice ul li.active .sub-title i{color:#17a84b;transform:rotate(270deg);}
.advice textarea{height:2rem;padding:.2rem 0;}
.advice input,.advice textarea{width:100%;text-indent:.2rem;border:none;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;font-size:.28rem;}
.advice input{height:.7rem;padding:0;}
.advice button{width:90%;height:.7rem;border:none;margin:.2rem auto;display:block;border-radius:.1rem;background:#ffe400;color:#734217;font-weight:700;font-size:.28rem;}
</style>

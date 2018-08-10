<template>
  <div class="userlist">
    <div class="back-head">
      <i class="iconfont icon-arrow-left" @click="goback"></i>
      <h3>{{title}}</h3>
    </div>
    <template v-if="hasData === 1">
      <div class="userlist-list">
        <scroll @pullingDown="pullingDown" @pullingUp="pullingUp" :init="page">
          <div class="pulling-down">松开刷新</div>
          <records :lists="lists" @selectRecord="selectRecord"></records>
          <div class="pulling-up">{{pullUpDesc}}</div>
        </scroll>
      </div>
      <div class="userlist-detail" v-if="recordFlag">
        <b @click="hideRecordItem"></b>
        <div>
          <h3>+{{recordItem.amount}} <span>({{recordItem.typename}})</span></h3>
          <ul>
            <li>
              <span>交易单号</span>
              <em>{{recordItem.no}}</em>
            </li>
            <li>
              <span>交易状态</span>
              <em>{{recordItem.status}}</em>
            </li>
            <li>
              <span>备注</span>
              <em>{{recordItem.remark}}</em>
            </li>
          </ul>
        </div>
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
import nodata from '@/components/common/nodata'
import records from '@/components/common/records'
import {delItem} from '@/utils/localstorage'
import {apiMyrecharge, apiMyaccount, apiMywithdraw} from '@/config/api'
import {mapMutations} from 'vuex'
export default {
  name: 'result',
  data () {
    return {
      hasData: 2,
      type: this.$route.params.id,
      title: '',
      lists: [],
      listsTemp: [],
      pageAll: 1,
      page: 1,
      detailtype: -100,
      dirty: false,
      pullUpDesc: '松开加载更多',
      recordItem: {},
      recordFlag: false
    }
  },
  computed: {
    post () {
      return {
        detailtype: this.detailtype,
        page: this.page
      }
    }
  },
  components: {
    scroll,
    nodata,
    records
  },
  created () {
    this.popLoadToggle(true)
    this.getDatas()
  },
  methods: {
    ...mapMutations(['popLoadToggle', 'popMsgToggle']),
    getDatas () {
      switch (this.type) {
        case 'account':
          this.title = '账户明细'
          this.getAccount()
          break
        case 'recharge':
          this.title = '充值记录'
          this.getRecharge()
          break
        case 'withdraw':
          this.title = '兑换记录'
          this.getWithdraw()
          break
        default:
          break
      }
    },
    getAccount () {
      apiMyaccount(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popLoadToggle(false)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.pageAll = json.data.data.pages
            if (jsonData && jsonData.length > 0) {
              if (this.page === 1) {
                this.$set(this.$data, 'lists', [])
              }
              this.page++
              this.lists = this.lists.concat(jsonData)
              this.hasData = 1
            } else if (jsonData && jsonData.length === 0) {
              this.hasData = 0
            } else {
              this.hasData = 2
            }
            this.dirty = true
            this.popLoadToggle(false)
          } else {
            this.popMsgToggle(jsonDesc)
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    getRecharge () {
      apiMyrecharge(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popLoadToggle(false)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.pageAll = json.data.data.pages
            if (jsonData && jsonData.length > 0) {
              if (this.page === 1) {
                this.$set(this.$data, 'lists', [])
              }
              this.page++
              this.lists = this.lists.concat(jsonData)
              this.hasData = 1
            } else if (jsonData && jsonData.length === 0) {
              this.hasData = 0
            } else {
              this.hasData = 2
            }
            this.dirty = true
            this.popLoadToggle(false)
          } else {
            this.popMsgToggle(jsonDesc)
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    getWithdraw () {
      apiMywithdraw(this.post)
        .then(json => {
          let jsonState = json.data.state
          let jsonDesc = json.data.desc
          let jsonData = json.data.data.result
          if (jsonState === 0) {
            delItem('userInfo')
            this.setUserInfo(null)
            this.popLoadToggle(false)
            this.popAffirmToggle({flag: true, title: '登录已过期,请重新登录', path: '/log', redirect: this.$route.fullPath})
          } else if (jsonState === 1) {
            this.pageAll = json.data.data.pages
            if (jsonData && jsonData.length > 0) {
              if (this.page === 1) {
                this.$set(this.$data, 'lists', [])
              }
              this.page++
              this.lists = this.lists.concat(jsonData)
              this.hasData = 1
            } else if (jsonData && jsonData.length === 0) {
              this.hasData = 0
            } else {
              this.hasData = 2
            }
            this.dirty = true
            this.popLoadToggle(false)
          } else {
            this.popMsgToggle(jsonDesc)
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
          }
          this.popLoadToggle(false)
        })
    },
    goback () {
      this.$router.go(-1)
    },
    pullingDown () {
      this.page = 1
      this.pageAll = 1
      this.dirty = false
      this.popLoadToggle(true)
      this.getDatas()
    },
    pullingUp () {
      if (this.pageAll === this.page - 1) {
        this.pullUpDesc = '没有更多了'
        return false
      }
      this.popLoadToggle(true)
      this.getDatas()
    },
    selectRecord (data) {
      this.$set(this.$data, 'recordItem', data)
      this.recordFlag = true
    },
    hideRecordItem () {
      this.recordFlag = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userlist{height:100%;padding:0.8rem 0 0;}
.back-head{background:#17a84b linear-gradient(90deg,#b4ed50,#17a84b);}
/* userlist-list */
.userlist-list{height:100%;}

</style>

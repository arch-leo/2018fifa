<template>
  <picker @select="handleSelect(arguments)" :data="data" ref="picker" :title="title" @change="handleChange" :cancelTxt="cancelTxt" :confirmTxt="confirmTxt"></picker>
</template>

<script>
import Picker from '@/components/better-scroll/picker'
export default {
  name: 'date-picker',
  data () {
    return {
      tempIndex: [0, 0, 0],
      title: '请选择日期',
      cancelTxt: '取消',
      confirmTxt: '确定'
    }
  },
  components: {
    Picker
  },
  computed: {
    data () {
      const date = new Date()
      const curYear = date.getFullYear()
      let years = []
      for (let i = (curYear - 10); i < (curYear + 11); i++) {
        years.push(i.toString())
      }
      let yearIndex = years.indexOf(curYear.toString())
      const curMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString()
      let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      let monthIndex = months.indexOf(curMonth)

      const curDay = (date.getDate() + 1) < 10 ? '0' + date.getDate() : date.getDate().toString()
      const newDate = new Date(curYear, curMonth, 0)
      const curDayNum = newDate.getDate()
      let days = []
      for (let i = 1; i < (curDayNum + 1); i++) {
        days.push(i < 10 ? '0' + i.toString() : i.toString())
      }
      let dayIndex = days.indexOf(curDay)
      return {
        data: [years, months, days],
        selectedIndex: [yearIndex, monthIndex, dayIndex]
      }
    }
  },
  watch: {
    data () {
      this.$refs.picker.refresh()
    }
  },
  methods: {
    show () {
      this.$refs.picker.setData(this.data)
      this.$refs.picker.show()
    },
    handleSelect (args) {
      this.$emit('select', ...args)
    },
    handleChange (i, newIndex) {
      if (newIndex !== this.tempIndex[i]) {
        for (let j = 2; j > i; j--) {
          this.tempIndex.splice(j, 1, 0)
          this.$refs.picker.scrollTo(j, 0)
        }
        this.tempIndex.splice(i, 1, newIndex)
      }
    }
  }
}
</script>

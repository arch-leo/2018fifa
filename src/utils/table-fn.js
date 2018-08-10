export function titleClick (index) {
  this.$set(this.close, index, !this.close[index])
}
export function handicapClick (index, $index) {
  this.$set(this.matchs[index].schedule[$index].odds.fthandicap, 'show', !this.matchs[index].schedule[$index].odds.fthandicap.show)
}
export function ouClick (index, $index) {
  this.$set(this.matchs[index].schedule[$index].odds.ftou, 'show', !this.matchs[index].schedule[$index].odds.ftou.show)
}
export function oeClick (id) {
  this.$set(this.toggle[id], 'flag', !this.toggle[id].flag)
}
export function selectBet (exist, post, type) {
  if (exist) {
    if (this.selected === post.scheduleid + post.gameid + post.oddskey) {
      if (this.flag) {
        this.flag = false
        this.selected = ''
        this.$emit('bet-input', this.flag)
      } else {
        this.flag = true
        this.selected = post.scheduleid + post.gameid + post.oddskey
        this.$emit('bet-info', [post, type])
        this.$emit('bet-input', this.flag)
      }
    } else {
      this.flag = true
      this.selected = post.scheduleid + post.gameid + post.oddskey
      this.$emit('bet-info', [post, type])
      this.$emit('bet-input', this.flag)
    }
  }
}

webpackJsonp([15],{Fu3L:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("BO1k"),o=e.n(a),s=e("Dd8w"),n=e.n(s),c=e("NYxO"),r={name:"activity",data:function(){return{}},methods:n()({},Object(c.b)(["popLoadToggle","popMsgToggle"]),{toggle:function(t){var i=!this.problems[t].active,e=!0,a=!1,s=void 0;try{for(var n,c=o()(this.problems);!(e=(n=c.next()).done);e=!0){var r=n.value;this.$set(r,"active",!1)}}catch(t){a=!0,s=t}finally{try{!e&&c.return&&c.return()}finally{if(a)throw s}}this.$set(this.problems[t],"active",i)},goback:function(){this.$router.go(-1)},submit:function(){var t=this;this.popLoadToggle(!0),setTimeout(function(){t.popLoadToggle(!1),t.popMsgToggle("谢谢您的反馈！")},1500)}})},l={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"activity"},[i("div",{staticClass:"back-head"},[i("i",{staticClass:"iconfont icon-arrow-left",on:{click:this.goback}}),this._v(" "),i("h3",[this._v("更多玩法")])]),this._v(" "),i("div",{staticClass:"advice-cont"},[this._v("\n    blablabla\n  ")])])},staticRenderFns:[]};var v=e("VU/8")(r,l,!1,function(t){e("awF8")},"data-v-c5b79c86",null);i.default=v.exports},awF8:function(t,i){}});
webpackJsonp([12],{HYu2:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("Dd8w"),a=e.n(o),r=e("NYxO"),i=e("4kMR"),p=e("EiM3"),n=e("2hMI"),d={name:"resetcash",data:function(){return{password0:"",password1:"",password2:""}},computed:a()({},Object(r.c)(["userInfo"]),{post:function(){return{true:this.userInfo.truename,cashpassword:this.password0,newpassword:this.password1}}}),methods:a()({},Object(r.b)(["setUserInfo","popLoadToggle","popMsgToggle","popAffirmToggle"]),{goback:function(){this.$router.go(-1)},submit:function(){return p.c.test(this.password0)?p.c.test(this.password1)?this.password1!==this.password2?(this.popMsgToggle("确认新密码与新密码不一致"),!1):this.password0===this.password1?(this.popMsgToggle("新密码与旧密码相同"),!1):void this.setPwd():(this.popMsgToggle("新密码格式有误"),!1):(this.popMsgToggle("旧密码格式有误"),!1)},setPwd:function(){var s=this;this.popLoadToggle(!0),Object(n.e)(this.post).then(function(t){var e=t.data.state,o=t.data.desc,a=t.data.data.result[0];s.popLoadToggle(!1),0===e?(Object(i.a)("userInfo"),s.setUserInfo(null),s.popAffirmToggle({flag:!0,title:"登录已过期,请重新登录",path:"/log",redirect:s.$route.fullPath})):1===e?(s.setUserInfo(a),Object(i.c)("userInfo",a),s.popMsgToggle("资金密码修改成功"),setTimeout(function(){s.$router.push({path:"/user",query:{stat:!0}})},1500)):s.popMsgToggle(o)}).catch(function(t){s.popLoadToggle(!1)})}})},c={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"setnewpwd"},[e("div",{staticClass:"back-head"},[e("i",{staticClass:"iconfont icon-arrow-left",on:{click:s.goback}}),s._v(" "),e("h3",[s._v("设置资金密码")])]),s._v(" "),e("div",[e("div",{staticClass:"form-area"},[e("div",{staticClass:"form-item"},[e("div",[e("span",[s._v("旧密码")]),s._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:s.password0,expression:"password0"}],attrs:{type:"password",placeholder:"请输入旧密码"},domProps:{value:s.password0},on:{input:function(t){t.target.composing||(s.password0=t.target.value)}}})])]),s._v(" "),e("div",{staticClass:"form-item"},[e("div",[e("span",[s._v("新密码")]),s._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:s.password1,expression:"password1"}],attrs:{type:"password",placeholder:"请输入新密码"},domProps:{value:s.password1},on:{input:function(t){t.target.composing||(s.password1=t.target.value)}}})])]),s._v(" "),e("div",{staticClass:"form-item"},[e("div",[e("span",[s._v("确认新密码")]),s._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:s.password2,expression:"password2"}],attrs:{type:"password",placeholder:"请再次输入新密码"},domProps:{value:s.password2},on:{input:function(t){t.target.composing||(s.password2=t.target.value)}}})])])]),s._v(" "),s._m(0),s._v(" "),e("button",{attrs:{type:"button"},on:{click:s.submit}},[s._v("确认")])])])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("密码规则：须为"),t("span",{staticClass:"color-red"},[this._v("6位数字")])])}]};var l=e("VU/8")(d,c,!1,function(s){e("YEYm")},"data-v-e176c7fc",null);t.default=l.exports},YEYm:function(s,t){}});
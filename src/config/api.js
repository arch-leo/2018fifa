import axios from 'axios'
import qs from 'qs'

const apiConfig = process.env.NODE_ENV === 'development' ? '' : '/service'
// 首页
export const apiActivities = (data) => axios.post(`${apiConfig}/activity`, qs.stringify(data))
export const apiActivityinfo = (data) => axios.post(`${apiConfig}/activityinfo`, qs.stringify(data))
export const apiSports = (data) => axios.post(`${apiConfig}/sports`, qs.stringify(data))
export const apiNotices = (data) => axios.post(`${apiConfig}/notice`, qs.stringify(data))
// 比赛结果
export const apiVslists = (data) => axios.post(`${apiConfig}/list`, qs.stringify(data))

// 赛事
export const apiPlays = (data) => axios.post(`${apiConfig}/plays`, qs.stringify(data))
export const apiEvents = (data) => axios.post(`${apiConfig}/events`, qs.stringify(data))
export const apiMatch = (data) => axios.post(`${apiConfig}/match`, qs.stringify(data))
// export const apiMatch = (data) => axios.post(`http://www.auto4g.com/service/match`, qs.stringify(data))
// export const apiMatch = (data) => axios.post('/api/matchs', qs.stringify(data))
export const apiParlay = (data) => axios.post(`${apiConfig}/refreshodds`, qs.stringify(data))
export const apiLeague = (data) => axios.post(`${apiConfig}/league`, qs.stringify(data))

// 下注 账单
export const apiBillbet = (data) => axios.post(`${apiConfig}/billbet`, qs.stringify(data))
export const apiMybet = (data) => axios.post(`${apiConfig}/bills`, qs.stringify(data))
export const apiMybetinfo = (data) => axios.post(`${apiConfig}/billinfo`, qs.stringify(data))
export const apiMyrecharge = (data) => axios.post(`${apiConfig}/usercharge`, qs.stringify(data))
export const apiMyaccount = (data) => axios.post(`${apiConfig}/userdetail`, qs.stringify(data))
export const apiMywithdraw = (data) => axios.post(`${apiConfig}/usercash`, qs.stringify(data))

// 登陆 注册 退出
export const apiLog = (data) => axios.post(`${apiConfig}/login`, qs.stringify(data))
export const apiReg = (data) => axios.post(`${apiConfig}/reg`, qs.stringify(data))
export const apiLogout = (data) => axios.post(`${apiConfig}/logout`, qs.stringify(data))
export const apiUserinfo = (data) => axios.post(`${apiConfig}/userinfo`, qs.stringify(data))
export const apiSetcash = (data) => axios.post(`${apiConfig}/setcash`, qs.stringify(data))
export const apiSetbank = (data) => axios.post(`${apiConfig}/setbank`, qs.stringify(data))
export const apiCash = (data) => axios.post(`${apiConfig}/cash`, qs.stringify(data))
export const apiAuthimg = (data) => axios.post(`${apiConfig}/authimg`, qs.stringify(data))

// 修改密码
export const apiChangePwd = (data) => axios.post(`${apiConfig}/changepassword`, qs.stringify(data))
export const apiChangeCash = (data) => axios.post(`${apiConfig}/changecashpassword`, qs.stringify(data))
// http://api.soccer.com/service/changepassword?username=whnpneo&password=111111&newpassword=222222
// http://api.soccer.com/service/changecashpassword?truename=张三&cashpassword=111111&newpassword=222222

// 充值
export const apiPaytype = (data) => axios.post(`${apiConfig}/banks`, qs.stringify(data))
export const apiLaunchPay = (data) => axios.post(`${apiConfig}/pay`, qs.stringify(data))

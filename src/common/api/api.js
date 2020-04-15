let baseApi = "https://www.myyj.xyz:8888/mmall/"
let baseDevApi = "http://www.localhost:8080/"

//获取验证码
let getVerifyCodeUrl = baseApi + "admin/kaptcha"

//登录
let loginUrl = baseApi + "admin/login"

export default {

  baseApi:baseApi,
  getVerifyCodeUrl:getVerifyCodeUrl,
  loginUrl:loginUrl
}

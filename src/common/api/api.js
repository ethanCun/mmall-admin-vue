let baseApi = "https://www.myyj.xyz:8888/mmall/"
let baseDevApi = "http://www.localhost:8080/"

//获取验证码
let getVerifyCodeUrl = baseApi + "admin/kaptcha"

//上传图片
let uploadUrl = baseApi + 'file/upload'

//登录
let loginUrl = baseApi + "admin/login"

//产品列表
let productListUrl = baseApi + "product/list"

//分页获取所有的产品
let productListPageUrl = baseApi + "product/listByPage"

//产品详情
let productDetailUrl = baseApi + 'product/productWithId'

//新增产品
let addProductUrl = baseApi + 'product/add'

//删除产品
let deleteProductUrl = baseApi + 'product/delete'


export default {

  baseApi:baseApi,
  uploadUrl: uploadUrl,
  getVerifyCodeUrl:getVerifyCodeUrl,
  loginUrl:loginUrl,
  productListUrl:productListUrl,
  productListPageUrl:productListPageUrl,
  addProductUrl: addProductUrl,
  deleteProductUrl: deleteProductUrl,
  productDetailUrl: productDetailUrl
}

<template>
  <div id="product">
    <div class="wrap" v-loading.fullscreen.lock="loading">

      <div class="top">
        <el-button type="danger" class="deleteAll">删除所选</el-button>
        <el-button type="success" class="addProduct" @click="addProduct">新增产品</el-button>
        <el-input v-model="searchText" placeholder="请输入产品信息" class="searchText"></el-input>
        <el-button class="searchBtn" type="primary" icon="el-icon-search" circle="" @click="productDetail(scope.$index, data)"></el-button>
      </div>

      <el-table :data="data" border="" height="500px" style="width: 100%; text-align: center;">
        <el-table-column type="selection" width="60px"></el-table-column>
        <el-table-column prop="name" align="center" label="名称"></el-table-column>
        <el-table-column prop="marketPrice" align="center" label="市场价格"></el-table-column>
        <el-table-column prop="actualPrice" align="center" label="实际价格"></el-table-column>
        <el-table-column prop="model" align="center" label="规格"></el-table-column>
        <el-table-column prop="series" align="center" label="系列"></el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" circle="" @click="editProduct(scope.$index, data)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle="" @click="deleteProduct(scope.$index, data)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增产品 -->
      <el-dialog title="新增产品" :visible.sync="addProductVisiable">
          <AddProduct @productList="productList"></AddProduct>
      </el-dialog>

      <!-- 编辑产品 -->
      <el-dialog title="编辑产品" :visible.sync="editProductVisiable" v-if="editProductVisiable">
        <EditProduct ref="editProduct" :id="editProductId"></EditProduct>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  //新增产品
  import AddProduct from './AddProduct.vue'
  //编辑产品
  import EditProduct from './EditProduct.vue'

  export default{
    name: 'product',
    data(){
      return {
        loading: false, //加载视图
        searchText: '', //搜索内容
        addProductVisiable: false, //显示新增产品
        editProductVisiable: false, //显示编辑产品
        editProductId:0, //编辑产品的id
        data:null
      }
    },
    components:{
      AddProduct,
      EditProduct
    },
    methods:{

      //产品列表
      productList: function(){

        var that = this;

        that.$data.addProductVisiable = false;
        that.$data.editProductVisiable = false;

        this.$axios({
          url: this.$api.productListUrl,
          method: 'get',
          responseType: 'json',
          data: {}
        }).then(function(response){

            if (response.data.code == 0){
              that.$data.data = response.data.data;
            }

        }).catch(function(error){

        }).then(function(){
          that.$data.loading = false;
        })
      },

      //新增产品
      addProduct: function(){

         this.$data.addProductVisiable = true
      },

      //编辑产品
      editProduct: function(index, data){

        //注意:在子组件实例化成功之前调用会报错
        this.$data.editProductVisiable = true

        this.$data.editProductId = data[index].id;

          //父组件调用子组件方法
          //this.$refs.editProduct.getProductDetail(data[index].id)
      },

      //删除产品
      deleteProduct: function(index, data){

          var that = this;

          this.$confirm('确认删除该产品吗?', '', {
          }).then(() => {

             that.$data.loading = true;

            that.$axios({
              method: 'post',
              url: that.$api.deleteProductUrl + '?id=' + data[index].id,
              data:{},
              responseType: 'json'
            }).then(function(response){

              if (response.data.code === 0){

                  that.productList()
              }else{
                alert(response.data.msg)
              }

            }).catch(function(error){

            }).then(function(){
              that.$data.loading = false;
            })

            this.$message({
              message: '已成功删除',
              type: 'success'
            })
          }).catch(function(){

            console.log('取消删除产品')
          })


      }
    },
    mounted() {

      var that = this;
      this.loading = true;

      //产品列表
      that.productList()
    }
  }
</script>

<style scoped="">

  .top{

    display: flex;
    flex-direction: row;
  }

  .deleteAll, .addProduct, .searchText, .searchBtn{

    margin: 20px;
  }

  .deleteAll, .addProduct{
    margin-left: 5px;
    margin-right: 10px;
  }

  .searchText{
    margin-right: 0;
    margin-left: 10px;
    width: 400px;
  }

  .searchBtn{

    margin-left: 5px;
  }
</style>

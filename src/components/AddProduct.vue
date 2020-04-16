<template>

  <div id="addProduct">

    <div class="wrap">

      <el-form :model="form" >

        <el-form-item label="产品名称">
          <el-input v-model="form.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>

        <el-form-item label="产品市场价">
          <el-input v-model="form.marketPrice" placeholder="请输入产品市场价"></el-input>
        </el-form-item>

        <el-form-item label="产品优惠后价">
          <el-input v-model="form.actualPrice" placeholder="请输入产品优惠后价"></el-input>
        </el-form-item>

        <el-form-item label="产品系列">
          <el-select v-model="form.series" placeholder="请选择产品系列">
            <el-option label="yi" value="1"></el-option>
            <el-option label="er" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品规格">
          <el-select v-model="form.model" placeholder="请选择产品规格">
            <el-option label="yi" value="1"></el-option>
            <el-option label="er" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传产品主图">
          <el-upload :action="$api.uploadUrl" list-type="picture"  name="files" :multiple="true"
            :on-success="uploadIconSuccess" :on-remove="handleIconRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="上传产品详情图">
          <el-upload :action="$api.uploadUrl" name="files" :multiple="true"
           list-type="picture" :on-success="uploadDetailSuccess" :on-remove="handleDetailRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="addProduct">立即新增产品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'addProduct',
    data(){
      return {
        form: {
          name: '',
          model: '',
          series: '',
          marketPrice: '',
          actualPrice: '',
          createTime: '',
          iconUrls: [

          ],
          detailUrls: []
        }
      }
    },
    methods:{

      //完成上传主图
      uploadIconSuccess: function(res, file, fileList){

         console.log('完成上传主图res:', JSON.stringify(res))

          if(this.$data.form.iconUrls.indexOf(res.data[0]) == -1){
            this.$data.form.iconUrls.push(res.data[0])
          }

      },

      //移除主图
      handleIconRemove: function(res, file, fileList){

        console.log('移除主图res:', JSON.stringify(res))

        let dataUrl = res.response.data[0];

        for (let i=0; i<this.$data.form.iconUrls.length; i++){

          if(this.$data.form.iconUrls[i] == dataUrl){
            this.$data.form.iconUrls.splice(i, 1)
          }
        }

        console.log('移除主图后form:', JSON.stringify(this.$data.form))

      },

      //完成上传详情图
      uploadDetailSuccess: function(res, file, fileList){

         console.log('完成上传详情图fileList:', JSON.stringify(fileList))

          if(this.$data.form.detailUrls.indexOf(res.data[0]) == -1){
            this.$data.form.detailUrls.push(res.data[0])
          }
      },

      //移除详情图
      handleDetailRemove: function(res, file, fileList){

        console.log('移除详情图res:', JSON.stringify(res))

        let dataUrl = res.response.data[0];

        for (let i=0; i<this.$data.form.detailUrls.length; i++){

          if(this.$data.form.detailUrls[i] == dataUrl){
            this.$data.form.detailUrls.splice(i, 1)
          }
        }

        console.log('移除主图后form:', JSON.stringify(this.$data.form))

      },

      //新增产品
      addProduct: function(){

          var that = this;

          // let date = new Date()

          // that.$data.form.createTime = date.getFullYear() + '年' + date.getMonth() + '月'
           // + date.getDate() + '日' + ' ' + date.getHours() + ':' + date.getMinutes() +
           // ':' + date.getSeconds()

          that.$data.form.createTime = new Date()

          console.log('新增产品提交信息: ', JSON.stringify(that.$data.form))

          that.$axios({
            method: 'post',
            url: that.$api.addProductUrl,
            data: that.$data.form,
            responseType: 'json'
          }).then(function(response){

            if (response.data.code === 0){

               //父组件重新获取产品列表
               // that.$parent.productList()
               that.$emit('productList')

               that.$message({
                 message: '新增产品成功',
                 type: 'success'
               })
            }else{

              that.$message({
                message: response.data.msg,
                type: 'danger'
              })
            }
          }).catch(function(error){

          }).then(function(){


          })

      }
    }
  }
</script>

<style scoped="">
</style>

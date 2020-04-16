<template>
  <div id="editProduct">
    <div class="wrap">
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
              :file-list="iconList" :on-success="uploadIconSuccess" :on-remove="handleIconRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="上传产品详情图">
            <el-upload :action="$api.uploadUrl" name="files" :multiple="true" :file-list="detailList"
             list-type="picture" :on-success="uploadDetailSuccess" :on-remove="handleDetailRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="updateProduct">立即更新产品信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'editProduct',
    props:['id'],
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
          detailUrls: [],
        },
        iconList: [], //这个地方不能用form.iconUrls去渲染 需要单独写在data外层
        detailList: []
      }
    },
    methods:{

      //获取产品详情
      getProductDetail: function(){

        var that = this;

        console.log('data id: ', that.$props.id)

        that.$axios({
          url: that.$api.productDetailUrl + '?id=' + that.$props.id,
          method: 'get',
          data: {},
          responseType: 'json'
        }).then(function(response){

          if (response.data.code === 0){
            that.$data.form = response.data.data
            console.log('产品详情：', JSON.stringify(that.$data.form))

            //获取已有的主图
            for(let i=0; i<that.$data.form.iconUrls.length; i++){
              let iconUrl = that.$data.form.iconUrls[i];
              let iconNames = iconUrl.split('/')
              let iconName = iconNames[iconNames.length-1]
              that.$data.iconList.push({name: iconName, url: iconUrl})
            }

            console.log('主图：', JSON.stringify(that.$data.iconList))


            //获取已有的详情图
            for(let i=0; i<that.$data.form.detailUrls.length; i++){
              let detailUrl = that.$data.form.detailUrls[i];
              let detailNames = detailUrl.split('/')
              let detailName = detailNames[detailNames.length-1]
              that.$data.detailList.push({name: detailName, url: detailUrl})
            }

            console.log('详情图：', JSON.stringify(that.$data.detailList))
          }else{
            that.$message({
              message: response.data.msg,
              type: 'danger'
            })
          }

        }).catch(function(error){

        }).then(function(){

        })
      },

       //完成上传主图
      uploadIconSuccess: function(res, file, fileList){

         console.log('完成上传主图:', JSON.stringify(res))

         var contain = false;

         for(let i=0; i<this.$data.iconList.length; i++){

           if(this.$data.iconList[i].url === res.data[0]){
             contain == true
           }
         }

         if (contain == false){
           var iconNames = res.data[0].split('/')
           let iconName = iconNames[iconNames.length-1]
           this.$data.iconList.push({name: iconName, url: res.data[0]})
         }
      },

      //移除主图
      handleIconRemove: function(res, file, fileList){

        console.log('移除主图res:', JSON.stringify(res))

        for(let i=0; i<this.$data.iconList.length; i++){

          if(this.$data.iconList[i].url === res.url){

            this.$data.iconUrls.splice(i, 1);
          }
        }

      },

      //完成上传详情图
      uploadDetailSuccess: function(res, file, fileList){

         console.log('完成上传详情图:', JSON.stringify(res))

         var contain = false;

         for(let i=0; i<this.$data.detailList.length; i++){

           if(this.$data.detailList[i].url === res.data[0]){
             contain == true
           }
         }

         if (contain == false){
           var iconNames = res.data[0].split('/')
           let iconName = iconNames[iconNames.length-1]
           this.$data.detailList.push({name: iconName, url: res.data[0]})
         }

      },

      //移除详情图
      handleDetailRemove: function(res, file, fileList){

        console.log('移除详情图res:', JSON.stringify(res))

        for(let i=0; i<this.$data.detailList.length; i++){

          if(this.$data.detailList[i].url === res.url){

            this.$data.detailList.splice(i, 1);
          }
        }

      },


      //更新产品信息
      updateProduct: function(){

        var that = this

        that.$data.form.iconUrls = []
        that.$data.form.detailUrls = []

        //主图
        for(let i=0; i<that.$data.iconList.length; i++){

          that.$data.form.iconUrls.push(that.$data.iconList[i].url)
        }

        //详情图
        for(let i=0; i<that.$data.detailList.length; i++){

          that.$data.form.detailUrls.push(that.$data.detailList[i].url)
        }

        console.log('更新产品提交信息:', JSON.stringify(that.$data))

        that.$axios({
          method: 'post',
          url: that.$api.updateProductUrl,
          data: that.$data.form,
          responseType: 'json'
        }).then(function(response){

          console.log('更新产品信息response:', JSON.stringify(response))

          if (response.data.code === 0){
            that.$emit('productList')
            that.$message({
              message: '更新成功',
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
    },
    mounted() {

      this.getProductDetail()
    }
  }
</script>

<style>
</style>

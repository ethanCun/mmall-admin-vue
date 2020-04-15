<template>
  <div id="editProduct">
    <div class="wrap">
      {{id}}
    </div>
  </div>
</template>

<script>
  export default{
    name: 'editProduct',
    props:['id'],
    data(){
      return {
        data: null
      }
    },
    methods:{

      getProductDetail: function(){

        var that = this;

        console.log('data id: ', that.$props.id)

        that.$axios({
          url: that.$api.productDetailUrl + '?id=' + that.$props.id,
          method: 'get',
          data: {},
          responseType: 'json'
        }).then(function(response){

          console.log('产品详情：', JSON.stringify(response))

          if (response.data.code === 0){
            that.$data.data = response.data.data
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

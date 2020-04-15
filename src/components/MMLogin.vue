<template>

  <div id="login">
    <div class="wrap">

      <el-form :inline="true" :form="form" label-position="right" label-width="50px">
        <el-form-item label="账 号" class="label">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密 码" class="label">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" label-width="120px" class="label">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <img class="codeImage" :src="codeUrl" @click="resetCode" />
        </el-form-item>

        <el-form-item>
          <el-button v-loading.fullscreen.lock="loading" class="login" type="primary" @click="loginAction">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'login',
    data() {
      return {
        loading: false,
        form: {

          username: '',
          password: '',
          code: ''
        },
        codeUrl: ''
      }
    },
    methods:{

      //重新获取验证码
      resetCode: function(){

         this.$data.codeUrl = this.$api.getVerifyCodeUrl + '?' + Math.random();
      },

      //登录
      loginAction: function(){

          console.log('form:' + JSON.stringify(this.$data.form))
          console.log('login:' + this.$api.loginUrl)

          var that = this;

          that.$data.loading = true;

          that.$axios.post(that.$api.loginUrl, that.$data.form).then(function(response){

                        console.log('登录结果: ' + JSON.stringify(response))

              if (response.data.code === 0){


                //token为username保存到localstorage中
                that.$store.commit("setToken", that.$data.form.username)

                //如果有重定向 则跳回原来的链接
                if (that.$route.query.redirect) {

                  let redirect_path = that.$route.query.redirect;
                  that.$router.push({path: redirect_path})

                } else{

                  that.$router.push({name: 'home'})
                }
              }else{

                alert(response.data.msg)
              }

          }).catch(function(err){

          }).then(function(){

            that.$data.loading = false
          })


      }
    },
    mounted() {

      this.$data.codeUrl = this.$api.getVerifyCodeUrl
    }
  }
</script>

<style scoped="">

  #login {

    width: 100%;
    height: 100%;
    background: #D3DCE6;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/mmall-bg.png);
    background-repeat: no-repeat;
  }

  .wrap {

    width: 400px;
    height: 400px;
    background: #D3DCE6;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .label{

    font-size: 25;
    font-weight: bolder;
  }

  .login{

    width: 220px;
    margin-left: 20px;
  }

  .codeImage{

    width: 60px;
    height: 40px;
  }
</style>

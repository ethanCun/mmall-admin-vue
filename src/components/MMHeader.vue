<template>
  <div id="header">

    <div class="wrap">

      <span class="title">mmall后台管理系统</span>
      <el-dropdown @command="handleClick">
        <span class="icon"><i class="el-icon-s-custom"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'mmheader',
    data(){
      return{

      }
    },
    methods:{

      handleClick: function(command){

        console.log('个人信息:' + command)

        if (command === 'logout'){

          //清除token
          this.$store.commit("setToken", null);
          this.$store.state.editableTabs = []

          this.$router.push({path:'/login'})
        }
      },

    }
  }
</script>

<style scoped="">

  #header{

    background: #B3C0D1;
    width: 100%;
    height: 80px;
  }

  .wrap{

    display: flex;
    flex-direction: row;
  }

  .title{

    line-height: 80px;
    font-size: 30px;
    flex: 5;
    text-align: left;
    margin-left: 20px;
  }

  .icon{

    line-height: 80px;
    flex: 1;
    font-size: 30px;
    text-align: right;
    margin-right: 20px;
  }
</style>

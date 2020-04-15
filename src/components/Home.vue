<template>
  <div id="home">
    <el-container>
      <el-header height="80px">
        <MMHeader></MMHeader>
      </el-header>
      <el-container>
        <MMAside></MMAside>
        <el-container>
          <el-header height="40px">
            <Tab></Tab>
          </el-header>
          <el-main>
            <MMMain></MMMain>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import MMHeader from './MMHeader.vue'
  import MMMain from './MMMain.vue'
  import MMAside from './MMAside.vue'
  import Tab from './Tab.vue'

  export default{
    name: 'home',
    data(){
      return {

      }
    },
    components:{
      MMHeader,
      MMMain,
      MMAside,
      Tab
    },
    mounted() {

      // console.log('router: ' + JSON.stringify(this.$router))
    }
  }
</script>

<style scoped="">

  .el-container, .el-header, .el-main{
    padding: 0;
    margin: 0;
  }

  .home, .el-container{

    width: 100%;
    height: 100%;
  }

  .el-header{

    height: 80px;
  }

</style>

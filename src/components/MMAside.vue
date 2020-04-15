<template>
  <div id="aside">

      <div class="wrap">

        <el-menu :router="true" :default-active="activeIndex" :default-openeds="['/']" background-color="#E9EEF3">

          <el-submenu :index="item.index">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="(child, index) in item.items" :key="child.index">
              <el-menu-item :index="child.index">{{child.name}}</el-menu-item>
            </el-menu-item-group>

          </el-submenu>

        </el-menu>
      </div>
  </div>
</template>

<script>
  export default{
    name: 'mmaside',
    data(){
      return{
        activeIndex: '',
        item:{
          name: '库存管理',
          index: '/',
          items:[
            {
              name: '产品管理',
              index: '/product'
            },
            {
              name: '系列管理',
              index: '/series'
            },
            {
              name: '规格管理',
              index: '/model'
            },
            {
              name: '产品主图管理',
              index: '/icon'
            },
            {
              name: '产品详情图管理',
              index: '/productDetail'
            }
          ]
        }
      }
    },
    watch:{
      $route(to, from){

        console.log(to.path)
        this.$data.activeIndex = to.path

        if(to.path === '/'){
          this.$data.activeIndex = '/product'
        }
      }
    },
    mounted(){

      this.$data.activeIndex = this.$route.path
      console.log('ss', this.$data.activeIndex)
    }
  }
</script>

<style scoped="">

  #aside{

    width: 20%;
    height: 500px;
    background: #D3DCE6;
  }

</style>

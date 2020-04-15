<template>
  <div id="tab">
    <el-tabs v-model="current" :closable="true" type="card" @edit="handleEditTabs" @tab-click="handleClickTab">
      <el-tab-pane v-for="(item, index) in $store.state.editableTabs" :key="index" :label="item.name" :name="item.path"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    data() {

      return {
        current: '',
        editTabs: [

        ]
      }
    },
    methods: {

      handleEditTabs: function(targetName, action) {

        console.log(targetName, action)
        for (let i = 0; i < this.$store.state.editableTabs.length; i++) {
          if (this.$store.state.editableTabs[i].path === targetName) {
            this.$store.state.editableTabs.splice(i, 1);
          }
        }

        //显示最后一个
        if (this.$store.state.editableTabs.length > 0) {
          this.$data.current = this.$store.state.editableTabs[0].name
          this.$router.push({
            path: this.$store.state.editableTabs[0].path
          })
        } else {
          this.$router.push({
            path: '/'
          })
        }
      },

      handleClickTab: function(tab, event) {

        this.$router.push({
          path: tab.name
        })
      }
    },
    mounted() {

      this.$data.current = this.$route.path

      if(this.$data.current === '/'){
        this.$data.current = '/产品管理'
      }
    },
    watch: {

      //观察路由变化
      $route(to, from) {

        if (to.name === 'login' || to.name == 'home') {
          return
        }

        this.$store.commit('setCurrentEditTabs', {
          name: to.name,
          path: to.path
        })

        this.$data.current = to.path

        if(to.path === '/'){
          this.$data.current = '/产品管理'
        }
      }
    },

  }
</script>

<style>
</style>

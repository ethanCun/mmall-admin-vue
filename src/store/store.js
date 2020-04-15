import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

const store = new Vuex.Store({

  state:{

    token: '',
    editableTabs: [
      {
        name: 'product',
        path: '/product'
      }
    ]
  },

  mutations:{

    setToken(state, token){

      if (token == null){
        this.state.token = null;
      }else{
        this.state.token = JSON.stringify(token);
      }
    },

    setCurrentEditTabs(state, tabs){

      console.log('tabs', tabs.name, tabs.path)

      if (tabs){

        var contain = false;

        for(let i=0; i<this.state.editableTabs.length; i++){
          if ((this.state.editableTabs[i].name === tabs.name)){
            contain = true;
          }
        }

        if (!contain){
          this.state.editableTabs.push(tabs)
        }
      }

      console.log(JSON.stringify(this.state.editableTabs))
    }
  },

  //引入持久化插件
  plugins: [createPersistedState()],
})

export default store;

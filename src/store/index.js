import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex);

const state = {
  user: '',//用户信息
  collapses: true,//是否展开导航栏
}
export default new Vuex.Store({
  state,
  mutations,
  actions
});
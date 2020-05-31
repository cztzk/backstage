/**
 * 后台管理系统Vuex-mutations
 */
export default {
  saveUser(state, user) {
    state.user = user;
  },
  saveCollapses(state, collapses) {
    state.collapses = collapses;
  },
}
/**
 * 后台管理系统Vuex-actions
 */
export default {
  saveUser(context, user) {
    context.commit('saveUser', user);
  },
  saveCollapses(context, collapses) {
    context.commit('saveCollapses', collapses);
  },
}
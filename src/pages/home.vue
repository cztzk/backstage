<template>
  <div>
    <Home-header :userArr="user"></Home-header>
    <h2>User:{{user.username?user.username:""}}</h2>
    <router-view></router-view>
  </div>
</template>
<script>
import HomeHeader from "./../components/HomeHeader.vue";
export default {
  name: "home",
  components: {
    HomeHeader
  },
  data() {
    return {
      user: new Array()
    };
  },
  mounted() {
    let _this = this;
    _this.Utils.isLogin(_this,()=> _this.$router.push({ path: "/login" }), user => (_this.user = user));
  },
  methods: {}
};
</script>
<style lang="scss">
</style>
<template>
  <div>
    <home-header :userArr="user"></home-header>
    <div class="main_container el-col-24">
      <home-aside></home-aside>
      <div class="home_container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import HomeHeader from "./../components/HomeHeader.vue";
import HomeAside from "./../components/HomeAside.vue";

export default {
  name: "home",
  components: {
    HomeHeader,
    HomeAside
  },
  data() {
    return {
      user: new Array()
    };
  },
  mounted() {
    let _this = this;
    _this.Utils.isLogin(
      _this,
      () => _this.$router.push({ path: "/login" }),
      user => (_this.user = user)
    );
  },
  methods: {}
};
</script>
<style lang="scss">
.main_container {
  display: flex;
  position: fixed;
  top: 60px;
  bottom: 0;
  overflow: hidden;
}
.home_container {
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
}
</style>
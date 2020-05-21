<template>
  <header class="flex_">
    <div class="header_logo">
      <router-link to="#/index">logo</router-link>
    </div>
    <div class="user_info flex_justify_between" v-if="userArr!={}">
      <span class="el-icon-menu"></span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="~@/assets/images/common/user.png" alt />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
export default {
  name: "NavHeader",
  props: {
    userArr:{
      type:Array, 
      default:()=>[]
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.userArr);
    console.log(typeof(this.userArr));
  },
  methods: {}
};
</script>
<style lang="scss">
</style>
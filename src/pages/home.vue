<template>
  <div>
    <home-header :userArr="user"></home-header>
    <div class="main_container el-col-24">
      <home-aside></home-aside>
      <div class="home_container">
        <breadcrumb></breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import HomeHeader from "@/components/HomeHeader.vue";
import HomeAside from "@/components/HomeAside.vue";
import breadcrumb from "@/components/breadcrumb.vue";

export default {
  name: "home",
  components: {
    HomeHeader,
    HomeAside,
    breadcrumb
  },
  data() {
    return {
      user: new Array()
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = this.storage.getItem("user", "user", "user");
    }
  }
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
  background: #f0f0f0;
}
</style>
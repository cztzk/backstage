<template>
  <div>
    <home-header :userArr="user"></home-header>
    <div class="main_container el-col-24" :class="collapses?'content-collapse':'content-show'">
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
      user: new Array(),
      collapses: true
    };
  },
  computed: {
    collapsesChange() {
      return this.$store.state.collapses;
    }
  },
  watch: {
    collapsesChange(val) {
      this.collapses = val;
    }
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
  position: absolute;
  left: 64px;
  top: 0;
  bottom: 0;
  right: 0;
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
  background: #f0f0f0;
  transition: left 0.5s linear;
}

.content-collapse {
  .home_container {
    left: 230px;
  }
}
</style>
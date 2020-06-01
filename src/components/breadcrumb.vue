<template>
  <div class="breadcrumb_box" v-if="crumbsList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item,i) in crumbsList"
        :key="i"
        :to="item.parameter?{ name: item.name, params: { id: $route.params.id}}:(item.name?'/'+item.name:'/')"
      >{{item.meta.title?item.meta.title:'首页'}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      crumbsList: [] // 路由集合
    };
  },
  watch: {
    $route() {
      this.getCrumbsList();
    }
  },
  methods: {
    isHome(route) {
      return route[route.length - 1].name === "Index";
    },
    getCrumbsList() {
      let matched = this.$route.matched;
      let _this = this;
      //如果是首页

      if (this.isHome(matched)) {
        matched = [{ path: "/index", meta: { title: "首页" }, name: "index" }];
      } else {
        // 判断是否带有参数;
        matched.map(
          item =>
            (item.meta.title = item.meta.parameter
              ? item.meta.titles.filter(
                  items => items.id == _this.$route.params.id
                )[0].title
              : item.meta.title)
        );
      }
      this.crumbsList = matched;
    }
  },
  created() {
    this.getCrumbsList();
  }
};
</script>
<style lang="scss">
.breadcrumb_box {
  margin-bottom: 20px;
}
</style>
<template>
  <aside>
    <el-row class="home_aside">
      <el-col>
        <el-menu
          class="sidebar-el-menu"
          hide-timeout="30000000000"
          :default-active="$route.path"
          @open="handleOpen"
          @close="handleClose"
          router
          :collapse="!collapses"
          unique-opened
          :class="collapses?collapses:''"
        >
          <div v-for="(item,i) in asideList" :key="i">
            <el-submenu :index="i+''" v-if="item.children.length>1">
              <template slot="title">
                <i :class="item.icons"></i>
                <span>{{item.tips}}</span>
              </template>
              <div v-for="(items,idx) in item.children" :key="idx">
                <template v-if="items.parameter">
                  <el-submenu :index="i+'-'+idx+''">
                    <template slot="title" class="title_submenu">{{items.meta.subtitle}}</template>
                    <el-menu-item
                      v-for="(childItem,index) in items.meta.titles"
                      :key="index"
                      :index="childItem.path"
                    >{{childItem.title}}</el-menu-item>
                  </el-submenu>
                </template>
                <el-menu-item v-else :index="items.path">{{items.meta.title}}</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item :index="item.children[0].path" v-else>
              <i :class="item.icons"></i>
              <span slot="title">{{item.tips}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </aside>
</template>
<script>
export default {
  name: "HomeAside",
  data() {
    return {
      collapses: true,
      asideList: new Array()
    };
  },
  //监听执行
  watch: {
    collapsesChange(val) {
      this.collapses = val;
    }
  },
  computed: {
    collapsesChange() {
      return this.$store.state.collapses;
    }
  },
  mounted() {
    this.getAsideOption();
  },
  methods: {
    getAsideOption() {
      let asideList = this.$router.options.routes;
      asideList = asideList.filter(items => !(items.meta && items.meta.hidden));
      asideList.map(item => {
        item.children = item.children.filter(
          items => !(items.meta && items.meta.hidden)
        );
      });
      this.asideList = asideList;
    },
    showMenu(i, status) {
      // this.$refs.menuCollapsed.getElementsByClassName(
      //   "submenu-hook-" + i
      // )[0].style.display = status ? "block" : "none";
      console.log(i);
      console.log(status);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
aside {
  flex: 0 0 230px;
  width: 230px;
  overflow-y: auto;
  .el-menu-item [class^="el-icon-"] {
    margin-right: 10px;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
}
.home_aside > div > ul {
  height: 100%;
}
.is-active .el-submenu__title i,
.is-active .el-submenu__title span {
  color: #20a0ff;
}
.home_aside .title_submenu {
  height: 56px;
  line-height: 56px;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
  font-weight: bold;
  font-size: 16px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  padding-left: 40px;
  & + ul {
    padding-left: 20px;
  }
}
.content-show .el-submenu__title span {
  display: none;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 230px;
  height: 100%;
}
</style>
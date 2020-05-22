<template>
  <aside>
    <el-row class="tac">
      <el-col>
        <el-menu :default-active="$route.path" @open="handleOpen" @close="handleClose">
          <el-menu-item index="/index">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>消息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">列表1</el-menu-item>
              <el-menu-item index="1-2">列表2</el-menu-item>
              <el-menu-item index="1-3">表单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>-->
        </el-menu>
      </el-col>
    </el-row>
  </aside>
</template>
<script>
export default {
  name: "HomeAside",
  data() {
    return {};
  },
  mounted() {},
  methods: {
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
  overflow-y: scroll;
}
</style>
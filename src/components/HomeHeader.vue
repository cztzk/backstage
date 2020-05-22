<template>
  <header class="flex_justify_between">
    <div class="header_logo">
      <router-link to="#/index">logo</router-link>
    </div>
    <div class="user_info flex_justify_between" v-if="userArr!={}">
      <span class="el-icon-menu"></span>
      <el-dropdown>
        <span class="user_portrait flex_left el-dropdown-link">
          {{userArr.username}}
          <img
            src="~@/assets/images/common/user.jpg"
            class
            :alt="userArr.username"
          />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
export default {
  name: "NavHeader",
  props: {
    userArr: {
      type: [Array, Object]
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 退出登录
    signOut() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.storage.clear("user", "user");
          this.$router.push({ path: "/login" });
          this.$message({
            type: "success",
            message: "退出登录成功!"
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
header {
  height: 60px;
  line-height: 60px;
  background: #20a0ff;
  color: #fff;
}
.header_logo {
  width: 230px;
  a {
    text-transform: uppercase;
    text-align: center;
    font-size: 30px;
    color: #fff;
    border-right: 1px solid hsla(62, 77%, 76%, 0.3);
    display: block;
    letter-spacing: 2px;
  }
}
.user_info {
  flex: 1;
  padding: 0 15px;
  box-sizing: border-box;
}
.user_portrait {
  color: #fff;
  font-size: 14px;
  img {
    margin-left: 10px;
    display: inline-block;
    width: 40px;
    height: 40px;
    overflow: hidden;
    @include round(25px);
  }
}
</style>
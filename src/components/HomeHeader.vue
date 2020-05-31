<template>
  <header class="flex_justify_between">
    <div class="header_logo" :class="collapses?'':'collapses_logo'">
      <router-link to="#/index">logo</router-link>
    </div>
    <div class="user_info flex_justify_between" v-if="userArr!={}">
      <span class="el-icon-menu" @click="collapseChage"></span>
      <div class="user_portrait flex_left">
        <div class="btn-fullscreen flex_center" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/msgTab" class="flex_center">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        {{userArr.username}}
        <el-dropdown>
          <span class="el-dropdown-link flex_center">
            <img src="~@/assets/images/common/user.jpg" class :alt="userArr.username" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="pushGit">项目仓库</el-dropdown-item>
            <el-dropdown-item divided @click.native="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
    return {
      fullscreen: false,
      name: "linxin",
      message: 2,
      collapses: false
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
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.collapses = !this.collapses;
      this.$store.dispatch("saveCollapses", this.collapses);
    },
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    // 跳转git仓库
    pushGit() {
      var url = "https://github.com/cztzk/backstage";
      window.open(url, "_blank");
    },
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
  @include transition(width, 0.5s, linear);
  a {
    text-transform: uppercase;
    text-align: center;
    font-size: 30px;
    color: #fff;
    border-right: 1px solid hsla(62, 77%, 76%, 0.3);
    display: block;
    letter-spacing: 2px;
    @include transition(font-size, 0.5s, linear);
  }
}
.collapses_logo {
  width: 64px;
  a {
    font-size: 12px;
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
  .el-dropdown {
    height: 60px;
    span {
      height: 60px;
    }
  }
}
.msg_item {
  margin-top: 10px;
  margin-right: 40px;
  width: 36px;
  padding: 10px;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 10px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell {
  a {
    width: 30px;
    height: 30px;
  }
  .el-icon-bell {
    color: #fff;
    width: 22px;
    height: 22px;
    font-size: 22px;
  }
}
</style>
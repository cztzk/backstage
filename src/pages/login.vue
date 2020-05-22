<template>
  <div class="flex_center login_box">
    <el-form ref="form" :model="form" label-width="80px">
      <h1>{{islogin?"用户登录":"用户注册"}}</h1>
      <el-form-item label="用户名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.pass" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if="!islogin">
        <el-input v-model="form.passes" show-password></el-input>
      </el-form-item>
      <el-form-item label="用户手机" v-if="!islogin">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" v-if="!islogin">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="记住密码" v-if="islogin">
        <el-switch v-model="form.memory"></el-switch>
      </el-form-item>
      <el-form-item v-if="islogin">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="togglelogin">去注册</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="togglelogin">去登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      islogin: true, //判断是登录还是注册
      form: {
        name: "",
        pass: "",
        passes: "",
        email: "",
        tel: "",
        memory: false
      }
    };
  },
  methods: {
    // 测试接口请求
    getBanner() {
      let _this = this;
      _this.Utils.axiosPost(
        _this,
        _this.Utils.config.getBanner,
        {
          type: "banner"
        },
        res => console.log(res),
        err => console.log(err)
      );
    },
    // 登录事件
    login() {
      let _this = this;
      let form = _this.form;
      if (form.name == "") {
        _this.$message.error("请输入用户名称");
        return;
      }
      if (form.pass.length < 6 || form.pass == "") {
        _this.$message.error("请输入大于六位数的用户密码");
        return;
      }
      _this.Utils.axiosPost(
        _this,
        _this.Utils.config.login,
        form,
        function(res) {
          _this.$store.dispatch("saveUser", res);
          // 保持用户信息
          _this.storage.setItem("user", "user", res);
          _this.$router.push({ path: "/index" });
        },
        err => _this.$message.error(err.data.msg)
      );
    },
    // 注册事件
    register() {
      let _this = this;
      let form = _this.form;
      if (form.name == "") {
        _this.$message.error("请输入用户名称");
        return;
      }
      if (form.pass.length < 6 || form.pass == "") {
        _this.$message.error("请输入大于六位数的用户密码");
        return;
      }
      if (form.pass != form.passes) {
        _this.$message.error("请检查两次密码是否不相同");
        return;
      }
      if (form.tel == "" || !_this.phonecheck(form.tel)) {
        _this.$message.error("手机格式错误，请重试");
        return;
      }
      if (form.email == "" || !_this.postalcheck(form.email)) {
        _this.$message.error("邮箱错误，请重试");
        return;
      }
      _this.$message({
        message: "验证通过，暂无接口。。。。",
        type: "success"
      });
    },
    // 切换登录或注册
    togglelogin() {
      this.islogin = !this.islogin;
    },
    // 验证手机号码是否正确
    phonecheck(val) {
      let reg = /^1[3578]\d{9}$/gi;
      return reg.test(val);
    },
    // 验证邮箱号码是否正确
    postalcheck(val) {
      console.log(val);
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return reg.test(val);
    }
  },
  mounted() {
    let _this = this;
    _this.Utils.isLogin(
      _this,
      () => {},
      () => _this.$router.push({ path: "/index" })
    );
  },
  created() {
    this.getBanner();
  }
};
</script>
<style lang="scss">
.login_box {
  width: 100vw;
  height: 100vh;
  form {
    width: 350px;
    padding: 25px 35px 25px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  h1 {
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>
<template>
  <div class="notfound_box flex_center">
    <div>
      <h1>
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </h1>
      <p>啊哦~ 你所访问的页面不存在</p>
      <el-row class="flex_center">
        <el-button type="primary" round @click="returnHome">返回主页</el-button>
        <el-button type="primary" round @click="backHistory">返回上一页</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  data() {
    return {};
  },
  methods: {
    returnHome() {
      this.$router.push({ path: "/index" });
    },
    backHistory() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style lang="scss" >
.notfound_box {
  text-align: center;
  width: 100vw;
  height: 100vh;
  h1 {
    font-weight: bold;
    font-size: 250px;
    color: #2d8cf0;
    span:nth-child(2n) {
      color: #00a854;
    }
  }
  p {
    margin-bottom: 40px;
    font-size: 30px;
    color: #777;
  }
}
</style>
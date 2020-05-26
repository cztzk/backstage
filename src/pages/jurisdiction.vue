<template>
  <div class="jurisdiction_box flex_center">
    <div>
      <h1>
        <span>4</span>
        <span>0</span>
        <span>3</span>
      </h1>
      <p>啊哦~ 你没有权限访问该页面哦</p>
      <el-row class="flex_center">
        <el-button type="primary" round @click="returnHome">返回主页</el-button>
        <el-button type="primary" round @click="backHistory">返回上一页</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "jurisdiction",
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
.jurisdiction_box {
  text-align: center;
  h1 {
    font-weight: bold;
    font-size: 250px;
    color: #f02d2d;
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
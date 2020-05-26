<template>
  <div class="jurisdictions_box flex_center">
    <div>
      <p>啊哦~ 你有权限访问该页面哦</p>
      <el-row class="flex_center">
        <el-button type="primary" round @click="returnHome">返回主页</el-button>
        <el-button type="primary" round @click="backHistory">返回上一页</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "jurisdictions",
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
.jurisdictions_box {
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
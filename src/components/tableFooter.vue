<template>
  <div class="table_footer" v-if="total>0">
    <el-col :span="24">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="paseSize"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>
  </div>
</template>
<script>
export default {
  name: "tableFooter",
  props: {
    paseSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>
<style lang="scss">
.table_footer {
  margin: 20px 0;
}
</style>
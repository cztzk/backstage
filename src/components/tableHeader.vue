<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="search" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getSearchUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="allDelete" :disabled="this.sels.length===0">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
export default {
  name: "tableHeader",
  props: {
    sels: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    // 调用搜索事件
    getSearchUsers() {
      this.$emit("tableSearch", this.search);
    },
    // 新增用户
    handleAdd() {
      this.$emit("handleAdd");
    },
    // 全部删除
    allDelete() {
      this.$emit("allDelete");
    }
  }
};
</script>
<style lang="scss">
</style>
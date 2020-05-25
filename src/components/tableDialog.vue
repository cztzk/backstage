<template>
  <el-dialog
    class="table_dialog"
    :title="dialogType==1?'新增':'编辑'"
    :visible="dialogFormVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <el-form :model="dialogForm" label-width="80px" :rules="dialogFormRules" ref="dialogForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dialogForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="dialogForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="dialogForm.age" :min="0" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="dialogForm.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" rows="3" v-model="dialogForm.addr"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="closeDialog">取消</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="dialogLoading">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "tableDialog",
  props: {
    // dialogFormVisible 弹出框是否显示
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    //弹出框正在提交中
    dialogLoading: {
      type: Boolean,
      default: false
    },
    //dialogType 弹出框样式 1新增 2编辑
    dialogType: {
      type: Number,
      default: 1
    },
    dialogForm: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      dialogFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交事件
    addSubmit() {
      this.$emit("addSubmit");
    },
    // 关闭事件
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.table_dialog {
  .el-dialog__wrapper {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
    margin: 0;
  }
  .el-input-number__decrease.is-disabled,
  .el-input-number__increase.is-disabled {
    color: #d1dbe5;
    cursor: not-allowed;
  }
  .el-input-number .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 82px;
  }
  .el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 14px;
  }
  .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .el-input-number__decrease {
    right: 37px;
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    height: auto;
    border-left: 1px solid #bfcbd9;
    width: 36px;
    line-height: 34px;
    top: 1px;
    text-align: center;
    color: #97a8be;
    cursor: pointer;
    position: absolute;
    z-index: 1;
  }
  .el-input-number__decrease {
    right: 37px;
    left: auto;
  }
}
</style>
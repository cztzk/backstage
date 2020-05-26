<template>
  <div class="form_box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc" rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "forms",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      let _this = this;
      let form = _this.form;
      console.log(form);
      if (form.name.trim("") == "") {
        _this.$message.error("请输入活动名称活动名称");
        return;
      }
      if (form.region == "") {
        _this.$message.error("请选择活动区域");
        return;
      }
      if (form.date1 == "") {
        _this.$message.error("请选择开始日期");
        return;
      }
      if (form.date2 == "") {
        _this.$message.error("请选择开始时间");
        return;
      }
      if (form.type == "") {
        _this.$message.error("请选择活动性质");
        return;
      }
      if (form.resource == "") {
        _this.$message.error("请选择特殊资源");
        return;
      }
      if (form.desc == "") {
        _this.$message.error("请选择活动形式");
        return;
      }
      _this.$message({
        message: "验证通过，暂无接口。。。。",
        type: "success"
      });
    }
  }
};
</script>
<style lang="scss">
.form_box {
  background: #fff;
  padding: 40px 0;
  form {
    max-width: 600px;
    margin: 0 auto;
  }
}
.line {
  text-align: center;
}
</style>
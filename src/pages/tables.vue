<template>
  <div>
    <table-header
      @tableSearch="tableSearch"
      :sels="sels"
      @allDelete="allDelete"
      @handleAdd="handleAdd"
    ></table-header>
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="selection" label="选中状态" width="55"></el-table-column>
      <el-table-column type="index" width="60" label="#"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
      <el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
      <el-table-column prop="addr" label="地址" min-width="180" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-dialog
      :dialogForm="dialogForm"
      :dialogType="dialogType"
      :dialogFormVisible="dialogFormVisible"
      :dialogLoading="dialogLoading"
      @closeDialog="closeDialog"
      @addSubmit="addSubmit"
    ></table-dialog>
    <table-footer :paseSize="paseSize" :total="total" @handleCurrentChange="handleCurrentChange"></table-footer>
  </div>
</template>
<script>
import tableHeader from "@/components/tableHeader";
import tableDialog from "@/components/tableDialog";
import tableFooter from "@/components/tableFooter";
export default {
  name: "tables",
  components: {
    tableHeader,
    tableDialog,
    tableFooter
  },
  data() {
    return {
      tableId: 0,
      users: [],
      listLoading: false, //是否正在加载中
      total: 0,
      page: 1,
      paseSize: 10,
      search: "",
      sels: [], //被选中列表
      dialogFormVisible: false, //弹出框是否显示
      dialogType: 1, // 弹出框样式  1新增 2编辑
      dialogLoading: false, //弹出框正在提交中
      // 表单
      dialogForm: {
        name: "",
        sex: 1,
        age: 0,
        birth: "",
        addr: ""
      }
    };
  },
  methods: {
    // 选中状态改变事件
    selsChange: function(sels) {
      this.sels = sels;
    },
    //性别显示转换
    formatSex: function(row) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    // 修改页码
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let _this = this;
      _this.listLoading = true;
      _this.Utils.axiosPost(
        _this,
        _this.Utils.config.getTabelList,
        {
          type: _this.tableId,
          search: _this.search
        },
        function(res) {
          _this.users = res.list;
          _this.total = res.total;
          _this.listLoading = false;
        },
        err => _this.$message.error(err.data.msg ? err.data.msg : err)
      );
    },
    // 表单搜索事件
    tableSearch(search) {
      if (search != "") {
        this.search = search;
        this.getUsers();
      } else {
        this.$message.error("请输入用户信息");
      }
    },
    // 删除
    handleDel(index, row) {
      let _this = this;
      _this
        .$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          _this.listLoading = true;
          let data = {
            id: row.id
          };
          console.log(data);
          // 未有接口，模拟数据
          setTimeout(() => {
            _this.listLoading = false;
            _this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.getUsers();
          }, 2000);
        })
        .catch(() => {});
    },
    // 批量删除
    allDelete() {
      console.log(this.sels);
      let _this = this;
      _this
        .$confirm("确认删除选中记录吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          let data = this.sels.map(item => {
            return item.id;
          });
          _this.listLoading = true;
          console.log(data);
          setTimeout(() => {
            _this.listLoading = false;
            _this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.getUsers();
          }, 2000);
        })
        .catch(() => {});
    },
    closeDialog() {
      this.dialogFormVisible = false;
    },
    //打开新增界面
    handleAdd: function() {
      this.dialogFormVisible = true;
    },
    //打开编辑界面
    handleEdit: function(index, row) {
      this.dialogFormVisible = true;
      this.dialogType = 2;
      this.dialogForm = row;
    },
    // 弹出框提交事件
    addSubmit() {
      let _this = this;
      let form = _this.dialogForm;
      if (form.name.trim("") == "") {
        _this.$message.error("请输入用户名称");
        return;
      }
      if (form.birth == "") {
        _this.$message.error("请选择生日");
        return;
      }
      if (form.addr.trim("") == "") {
        _this.$message.error("请输入用户地址");
        return;
      }
      _this.dialogLoading = true;
      setTimeout(() => {
        _this.$message({
          message: this.dialogType == 2 ? "编辑成功" : "新增成功",
          type: "success"
        });
        console.log(form);
        _this.getUsers();
        _this.dialogLoading = false;
        _this.dialogFormVisible = false;
      }, 2000);
    }
  },
  watch: {
    // 监听route.params.id改变时，修改对应内容
    $route(to) {
      if (to.name === "tables") {
        let tableId = this.$route.params.id;
        console.log(tableId);
        this.getUsers(tableId);
      }
    }
  },
  mounted() {
    this.getUsers();
  },
  created() {
    this.tableId = this.$route.params.id;
  }
};
</script>
<style lang="scss">
</style>
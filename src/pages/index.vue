<template>
  <div class="index_box">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="index_user">
          <div class="user_name flex_left">
            <img src="~@/assets/images/common/user.jpg" alt />
            <div>
              <h2 class="ellipsis">{{user.username}}</h2>
              <h4 class="ellipsis">{{user.grade==0?"游客":(user.grade==1?"用户":"超级管理员")}}</h4>
            </div>
          </div>
          <h5>上次登录时间：{{user.date}}</h5>
          <h5>上次登录地点：{{user.addr}}</h5>
        </div>
        <el-card shadow="hover" class="distribution_box" style="height:252px;">
          <div slot="header" class="clearfix">
            <span>访客分布</span>
          </div>广东
          <el-progress :percentage="57.5" color="#42b983"></el-progress>湖南
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>广西
          <el-progress :percentage="12.5"></el-progress>四川
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="10" class="visit_box">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-bell"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" class="msg_box" v-if="msgList">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <el-table :show-header="false" :data="msgList" style="width:100%;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{'todo-item-del': scope.row.status}"
                >{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="mesEdit(scope.row)"></i>
                <i class="el-icon-delete" @click="msgDetail(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="echarts_box" :gutter="10">
      <el-col :span="12">
        <div id="chartColumn" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartBar" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartLine" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartPie" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="24">
        <a
          href="http://echarts.baidu.com/examples.html"
          target="_blank"
          style="float: right;"
        >more>></a>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 引入基本模板
import echarts from "@/echarts/index.js";
export default {
  name: "index",
  data() {
    return {
      user: new Array(),
      msgList: new Array(),
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null
    };
  },
  methods: {
    getMsgList() {
      let _this = this;
      _this.Utils.axiosPost(
        _this,
        _this.Utils.config.getMsgList,
        {
          type: "msg"
        },
        res => {
          _this.msgList = res;
        },
        err => _this.$message.error(err.data.msg ? err.data.msg : err)
      );
    },
    mesEdit(msg) {
      console.log(msg);
      this.$prompt("请输入待办事项", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputValue: msg.title,
        inputErrorMessage: "待办事项不能为空"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的待办事项是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    msgDetail(msg) {
      console.log(msg);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        title: { text: "Column Chart" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    drawBarChart() {
      this.chartBar = echarts.init(document.getElementById("chartBar"));
      this.chartBar.setOption({
        title: {
          text: "Bar Chart",
          subtext: "数据来自网络"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["2011年", "2012年"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"]
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: "2012年",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      });
    },
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: "Line Chart"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        title: {
          text: "Pie Chart",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawCharts() {
      this.drawColumnChart();
      this.drawBarChart();
      this.drawLineChart();
      this.drawPieChart();
    },
    getUser() {
      this.user = this.storage.getItem("user", "user", "user");
    }
  },
  mounted: function() {
    this.getUser();
    this.drawCharts();
    this.getMsgList();
  },
  updated: function() {
    this.drawCharts();
  }
};
</script>
<style lang="scss">
.index_box {
  min-width: 1200px;
  .el-icon-edit {
    margin-right: 5px;
  }
}
.chart-container {
  width: 100%;
  float: left;
}

.echarts_box {
  .el-col > div {
    background: #fff;
    padding: 30px 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
}
.index_user {
  background: #fff;
  padding: 15px 15px;
  margin-bottom: 10px;
  h5 {
    color: #999;
    line-height: 24px;
  }
}
.user_name {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  img {
    width: 80px;
    height: 80px;
border-radius: 50px;
}
  > div {
    max-width: 60%;
    margin-left: 15px;
    h2 {
      font-weight: bold;
      color: #333;
    }
    h4 {
      color: #666;
    }
  }
}

.distribution_box {
  margin-bottom: 10px;
}
.visit_box {
  margin-bottom: 10px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}
.visit_box i {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-con-1 i {
  background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-2 i {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-3 i {
  background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.msg_box {
  height: 350px;
}
</style>
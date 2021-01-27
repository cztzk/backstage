<template>
  <div class="msg_box">
    <el-tabs v-model="message">
      <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
        <el-table :data="unread" :show-header="false" style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <span class="message-title">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="180"></el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="primary" @click="readAll">全部标为已读</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`已读消息(${read.length})`" name="second">
        <template v-if="message === 'second'">
          <el-table :data="read" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="150"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger" @click="deleteAll">删除全部</el-button>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
        <template v-if="message === 'third'">
          <el-table :data="recycle" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="150"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button @click="handleRestore(scope.$index)">还原</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger" @click="recycleAll">清空回收站</el-button>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "msgTab",
  data() {
    return {
      message: "first",
      showHeader: false,
      unread: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        },
        {
          date: "2018-04-19 21:00:00",
          title: "今晚12点整发大红包，先到先得"
        }
      ],
      read: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        }
      ],
      recycle: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护"
        }
      ]
    };
  },
  methods: {
    handleRead(index) {
      const item = this.unread.splice(index, 1);
      console.log(item);
      this.read = item.concat(this.read);
    },
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
    },
    handleRestore(index) {
      const item = this.recycle.splice(index, 1);
      this.read = item.concat(this.read);
    },
    readAll(){
      let unread=this.unread;
      let read=this.read.concat(unread);
      this.read =read;
      this.unread = [];
    },
    deleteAll() {
      let read=this.read;
      let recycle=this.recycle.concat(read);
      this.recycle =recycle;
      this.read = [];
    },
   recycleAll() {
      this.recycle = [];
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  }
};
</script>
<style lang="scss">
.msg_box {
  background: #fff;
  padding: 10px 20px 20px;
  border-radius: 10px;
}
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>
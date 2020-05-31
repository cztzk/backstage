<template>
  <div class="wangEditor_box">
    <div id="wangeditor" class>
      <div class="wangeditor-box" ref="editorElem"></div>
    </div>
    <div class="flex_center editor_btn">
      <el-button type="danger" round @click="cancelEditor">取消保存</el-button>
      <el-button type="primary" round @click="saveEditor">保存内容</el-button>
    </div>
  </div>
</template>
<script>
// wangEditor 富文本编辑器
import Editor from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  },
  mounted() {
    this.setEditor();
  },
  methods: {
    cancelEditor() {
      this.$router.go(-1); //返回上一层
    },
    saveEditor() {
      console.log(this.editorContent);
      this.$message({
        message: "保存成功，未有接口,两秒后跳转首页",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push({ path: "/index" });
      }, 2000);
    },
    catchData(e) {
      console.log(e);
    },
    setEditor() {
      // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
      // props: ['catchData'], // 接收父组件的方法
      this.editor = new Editor(this.$refs.editorElem);
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      };
      this.editor.customConfig.menus = [
        // 菜单配置
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      //图片上传地址
      this.editor.customConfig.uploadImgServer =
        "https://api-dev.hanghangcha.com/hhc/news/image";
      this.editor.customConfig.uploadFileName = "file"; //自定义 fileName
      this.editor.customConfig.debug = true; //打开调试
      this.editor.customConfig.uploadImgMaxLength = 1; //最大一次上次图片数
      this.editor.customConfig.withCredentials = true; //如果需要传递 cookie 需设置 withCredentials
      this.editor.customConfig.zIndex = 2; //编辑区域z-index
      // (this.editor.customConfig.uploadImgHooks = {
      //   before: function(xhr, editor, files) {
      //     // 图片上传之前触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
      //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
      //     // return {
      //     //     prevent: true,
      //     //     msg: '放弃上传'
      //     // }
      //   },
      //   success: function(xhr, editor, result) {
      //     // 图片上传并返回结果，图片插入成功之后触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      //   },
      //   fail: function(xhr, editor, result) {
      //     console.log(xhr, editor, result);
      //     // 图片上传并返回结果，但图片插入错误时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      //   },
      //   error: function(xhr, editor) {
      //     console.log(xhr, editor);
      //     // 图片上传出错时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      //   },
      //   timeout: function(xhr, editor) {
      //     // 图片上传超时时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      //   },

      //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      //   customInsert: (insertImg, result, editor) => {
      //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
      //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
      //     console.log(result);
      //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
      //     insertImg(url);
      //     // result 必须是一个 JSON 格式字符串！！！否则报错
      //   }
      // }),
      // this.editor.customConfig.debug = true;
      this.editor.create(); // 创建富文本实例

      //document.querySelector(".wangeditor-box").style.height = "100%"
      //document.querySelector(".w-e-text-container").style.height = "100%"
    }
  },
  filters: {}
};
</script>
<style lang="scss">
.wangEditor_box {
  background: #fff;
  padding: 30px 15px;
}
.editor_btn {
  margin: 30px auto;
}
</style>
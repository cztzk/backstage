// 接口管理
let config = {
    getBanner: "banner/list",//banner图 测试
    login: "user/login",
    getTabelList: "table/list"
}

/*
axios get请求
_this this对象
url 请求路径
success 成功事件
fail 失败事件
*/
function axiosGet(_this, url, success, fail) {
    _this.axios
        .get(process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL + url : url)
        .then(function (res) {
            // console.log(res);
            success(res);
        })
        .catch(function (err) {
            // console.log(err);
            fail(err);
        });
}

/*
axios post请求
_this this对象
url 请求路径
data 请求参数
success 成功事件
fail 失败事件
*/
function axiosPost(_this, url, data, success, fail) {
    _this.axios.post(process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL + url : url, data)
        .then(function (res) {
            // console.log(res);
            success(res);
        })
        .catch(function (err) {
            // console.log(err);
            fail(err);
        });
}

/*
判断是否登录成功
_this this对象
fail 未登录执行的事件
success 已登录后执行的事件
*/
function isLogin(_this, failes, successes) {
    let user = _this.storage.getItem("user", "user", "user");
    if (!user) {
        failes && failes(user);
    } else {
        successes(user);
    }
}

// 将相关的数据及方法暴露出去
export default {
    config,
    axiosGet,
    axiosPost,
    isLogin
}

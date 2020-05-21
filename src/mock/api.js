import Mock from 'mockjs';
var Random = Mock.Random

Mock.mock('api/user/login', {
    "code": 0,
    "data": {
        "id|10001-11000": 0,
        "username": "@cname",
        "email": "admin@qq.com",
        "tel": "13049******",
        "role": 0,
        "createTime": 1479048325000,
        "updateTime": 1479048325000,
    },
    msg: "",
});


Mock.mock('api/news/newsList', getDate({
    "id|10001-11000": 0,
    "name": Random.ctitle(),
    "dec": Random.csentence(),
    "date": Random.date('yyyy-MM-dd'),
    "img": Random.dataImage('230x173')
}, 5));

Mock.mock('news/newsDetail', {
    "code": 0,
    "data": {
        "name": Random.ctitle(),
        "dec": Random.csentence(),
        "date": Random.date('yyyy-MM-dd'),
        "img": Random.dataImage('230x173'),
        "cont": '@cparagraph()'
    }
});


/*
生成对应数据事件
optionss 具体参数
生成N条数据
*/
function getDate(optionss, leng) {
    let dataArr = {
        code: 0,
        data: [],
        msg: "",
    }
    for (var i = 0; i < leng; i++) {
        dataArr.data.push(optionss);
    }
    return dataArr
}
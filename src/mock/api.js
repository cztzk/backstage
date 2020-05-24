import Mock from 'mockjs';
let Random = Mock.Random

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


Mock.mock('api/tables/list', getDate({
    "id|10001-11000": 0,
    "name": Random.cname(),
    "addr": Random.county(true),
    "date": Random.date('yyyy-MM-dd'),
    'age|18-60': 1,
    "birth": Random.date(),
    "sex|0-1": 0
}, 5));

Mock.mock('api/table/list', getDateList());

// 生成列表数据
function getDateList() {
    let dataList = {
        code: 0,
        data: {
            list: new Array,
            total: Random.integer(100, 200)
        },
        msg: ""
    };
    for (let i = 0; i < 10; i++) {
        dataList.data.list.push(
            Mock.mock({
                "id|10001-11000": 0,
                "name": Random.cname(),
                "addr": Random.county(true),
                "date": Random.date('yyyy-MM-dd'),
                'age|18-60': 1,
                "birth": Random.date(),
                "sex|0-1": 0
            })
        )
    }
    return dataList;
}

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
    for (let i = 0; i < leng; i++) {
        dataArr.data.push(optionss);
    }
    return dataArr
}
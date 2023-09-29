const friends = require('./friends')
const reason = '我是中国工商银行八里湖支行的小黎，之前给您做过商户码的'
// 备注id，可能要变更
// const remarkID = "cfk"
// 申请理由id，可能要变更
// const reasonID = "b8u"
// 客户微信类型
const VXType = {
    // 没找到（验证通过）
    notfound: 1,
    // 微信客户（验证通过）
    onlyVX: 2,
    // 微信和企业微信都有（验证通过）
    VXWork: 3,
    // 已经是好友了
    friend: 4,
    // 5.出现频繁加好友，停止
    busy: 5,
}


// 点位机型自适配
function clicks(x, y) {
    x1 = device.width / 1080
    y1 = device.height / 2400
    click(x * x1, y * y1)
}
// 1.点击添加，只执行一次
function touchAddOnce() {
    // 点击加号
    clicks(1014, 170)
    sleep(1000)
    // 点击添加客户
    clicks(839, 435)
    sleep(3000)
}
// 2.添加客户页面，点击搜索框
function touchSearch(friend) {
    // 点击搜索手机号添加
    let searchButton = text("搜索手机号添加").findOne(3000).bounds();
    clicks(searchButton.centerX(), searchButton.centerY());
    // 输入手机号
    sleep(1000)
    let searchText = className("android.widget.EditText");
    searchText.setText(friend)
    sleep(1000);
    let searchButton2 = text("网络查找手机/邮箱：" + friend).findOne(3000).bounds();
    clicks(searchButton2.centerX(), searchButton2.centerY());
    sleep(1000)
}
// 3.判断
function judge() {
    // 5.出现频繁加好友，停止
    let stop = className("android.widget.TextView").text("添加好友过于频繁，请稍后再重试").findOne(3000);
    if (stop) {
        console.log("暂停");
        return VXType.busy;
    }
    // 1.查不到
    let text = className("android.widget.TextView").text("该用户不存在").findOne(3000);
    if (text) {
        console.log("查不到");
        return VXType.notfound;
    } else {
        // 4.判断已经是好友
        let isfriend = className("android.widget.TextView").text("发消息").findOne(3000);
        if (isfriend) {
            console.log("已经是好友");
            return VXType.friend;
        } else {
            // 2.只用微信
            // 判断只用微信的用户
            let onlyVX = className("android.widget.TextView").text("设置备注和描述").findOne(3000);
            if (onlyVX) {
                console.log("只用微信");
                return VXType.onlyVX;
            } else {
                // 3.判断企业微信和微信都用
                // let ww = className("android.widget.TextView").text("对方同时使用微信和企业微信").findOne(3000);
                // if (ww) {
                console.log("对方同时使用微信和企业微信");
                return VXType.VXWork;
                // }
            }
        }

    }
}

// 4.分流添加
function shunt(type, name) {
    switch (type) {
        // 查不到
        case VXType.notfound: {
            back();
            sleep(1000);
            back();
            sleep(1000);
        }
            break;
        // 客户是微信 
        case VXType.onlyVX: {
            // 2.只用微信
            addVX(name);
            applyReason();
            back();
            sleep(1000);
            back();
            sleep(1000);
        }
            break;
        case VXType.VXWork: {
            // 3.判断企业微信和微信都用
            // 点击微信
            clicks(540, 519);
            sleep(3000);
            addVX(name);
            applyReason();
            back();
            sleep(1000);
            back();
            sleep(1000);
            back();
            sleep(1000);
        }
            break;
        case VXType.friend: {
            // 判断已经是好友
            back();
            sleep(1000);
            back();
            sleep(1000);
        }
            break;
        default: {
            return;
        }
    }
}

// 微信用户
function addVX(name) {
    // 点击设置备注和描述
    let button1 = className("android.widget.TextView").text("设置备注和描述").findOne(3000);
    clicks(button1.bounds().centerX(), button1.bounds().centerY());
    sleep(1000);
    // 设置备注(根据机型变更)
    // let remark = className("android.widget.EditText").bounds(bounds1.a, bounds1.b, bounds1.c, bounds1.d).findOne(3000);
    // let remark = id(remarkID).findOne(3000)
    // remark.setText(name);
    let remark = className("android.widget.EditText").findOne(3000);
    remark.setText(name);
    sleep(1000);
    let saveButton = className("android.widget.TextView").text("保存").findOne(3000);
    clicks(saveButton.bounds().centerX(), saveButton.bounds().centerY());
    // // 添加为联系人
    sleep(1000);
    let addButton = className("android.widget.TextView").text("添加为联系人").findOne(3000);
    if (addButton) {
        clicks(addButton.bounds().centerX(), addButton.bounds().centerY());
        sleep(2000);
    }
}
// 填写申请理由
function applyReason() {
    // 申请理由(根据机型变更)
    // clicks(bounds2);
    // let reasonTextView = id(reasonID).findOne(3000)
    clicks(498,1112);
    sleep(1000);
    let input1 = className("android.widget.EditText").findOne(3000);
    input1.setText(reason);
    sleep(1000);
    let addButton = className("android.widget.TextView").text("发送添加邀请").findOne(3000);
    if (addButton) {
        clicks(addButton.bounds().centerX(), addButton.bounds().centerY());
        sleep(2000);
    }
}
// 找到bounds，找结果
function boundsCenter(a, b, c, d) {
    const x = a + (c - a) / 2
    const y = b + (d - b) / 2
    console.log(x, y)
}

function main() {
    // 1.从企业微信首页开始，点击添加
    touchAddOnce()

    for (let index = 0; index < friends.length; index = index + 1) {
        let element = friends[0];
        // 2.搜索客户
        touchSearch(element.phone);
        // 3.判断客户使用的微信类型
        let result = judge();
        // 4.根据不同类型客户，进行不同类型操作
        shunt(result, element.name)
    }
}

main();

// 有几个bounds需要参照机型适配
// 备注地址
let bounds1 = {a:0,b:316,c:1080,d:453};
// 申请理由
let bounds2 = bounds(100,1065,883,1273);
// 私人微信
let bounds3 = bounds(48,400,1032,646);

// 添加客户页面，点击搜索框
function touchSearch(friend){
    let searchButton = text("通过手机号搜索添加微信").findOne(3000).bounds();
    click(searchButton.centerX(), searchButton.centerY());
    sleep(1000)
    let searchText = className("android.widget.EditText");
    searchText.setText(friend)
    sleep(1000);
    let searchButton2 = text("网络查找手机/邮箱："+friend).findOne(3000).bounds();
    click(searchButton2.centerX(), searchButton2.centerY());
    sleep(1000)
}
// 判断
function judge(){
    // 5.出现频繁加好友，停止
    let stop = className("android.widget.TextView").text("添加好友过于频繁，请稍后再重试").findOne(3000);
    if (stop) {
        console.log("暂停");
        return 5;
    }
    // 1.查不到
    let text = className("android.widget.TextView").text("该用户不存在").findOne(3000);
    if (text) {
        console.log("查不到");
        return 1;
    }else{
        // 4.判断已经是好友
        let isfriend = className("android.widget.TextView").text("发消息").findOne(3000);
        if (isfriend){
            console.log("已经是好友");
            return 4;
        }else{
            // 2.只用微信
            // 判断只用微信的用户
            let onlyWx = className("android.widget.TextView").text("设置备注和描述").findOne(3000);
            if (onlyWx) {
                console.log("只用微信");
                return 2;
            }else{
                // 3.判断企业微信和微信都用
                // let ww = className("android.widget.TextView").text("对方同时使用微信和企业微信").findOne(3000);
                // if (ww) {
                    console.log("对方同时使用微信和企业微信");
                    return 3;
                // }
            }
        }
        
    }
}
// 微信用户
function add1(name){
    // 点击设置备注和描述
    let button1 = className("android.widget.TextView").text("设置备注和描述").findOne(3000);
    click(button1.bounds().centerX(), button1.bounds().centerY());
    sleep(1000);
    // 设置备注(根据机型变更)
    let input1 = className("android.widget.EditText").bounds(bounds1.a,bounds1.b,bounds1.c,bounds1.d).findOne(3000);
    input1.setText(name);
    sleep(1000);
    let saveButton = className("android.widget.TextView").text("保存").findOne(3000);
    click(saveButton.bounds().centerX(), saveButton.bounds().centerY());
    // 添加为联系人
    sleep(1000);
    let addButton = className("android.widget.TextView").text("添加为联系人").findOne(3000);
    if (addButton) {
        click(addButton.bounds().centerX(), addButton.bounds().centerY());
        sleep(2000);
    }
}
// 企业，微信用户
function add2(){
   click(bounds3);
   sleep(3000);
}

function applyReason(){
    // 申请理由(根据机型变更)
    click(bounds2);
    sleep(1000);
    let input1 = className("android.widget.EditText").findOne(3000);
    input1.setText("你好，想了解一下你们的窗帘");
    sleep(1000);
    let addButton = className("android.widget.TextView").text("发送添加邀请").findOne(3000);
    if (addButton) {
        click(addButton.bounds().centerX(), addButton.bounds().centerY());
        sleep(2000);
    }
}

function main(){
    // 18023408831 17679027076
    // 查不到，只用微信
    let friends = [{name: 'bbb',value:'18938783580'}]//,{name: 'bbb',value:'18938783580'},{name: 'aaa',value:'17679027076'},{name:'ccc',value:'13870252081'    }];
    for (let index = 0; index < friends.length; index = index + 1) {
        let element = friends[index];
        touchSearch(element.value);
        let result = judge();
        switch (result) {
            // 查不到
            case 1:{
                back();
                sleep(1000);
                back();
                sleep(1000);
            }
                break;
            case 2:{
                // 2.只用微信
                add1(element.name);
                applyReason();
                back();
                sleep(1000);
                back();
                sleep(1000);
            }
                break;
            case 3:{
                // 3.判断企业微信和微信都用
                add2();
                add1(element.name);
                applyReason();
                // TODO:这里可能有问题
                back();
                sleep(1000);
                back();
                sleep(1000);
            }
                break;
            case 4:{
                    // 判断已经是好友
                    back();
                    sleep(1000);
                    back();
                    sleep(1000);
                }
                    break;
            default:{
                return;
            }
        }
    }
}

main();



let friends = [{"name":"广东欧工科技有限公司","value":"0769-23035285"},{"name":"深圳市华贝软装饰设计有限公司","value":"13590112393"},{"name":"深圳韦美创域装饰设计有限公司","value":"0755-82436820"},{"name":"万益软装（深圳）有限公司","value":"0755-86535535"},{"name":"广州萧邦软装家居有限公司","value":"18664886524"},{"name":"广东志达软装装饰工程有限公司","value":"15918833848"},{"name":"广州市懿溯舍装饰设计有限公司","value":"13826003304"},{"name":"深圳千寻软装艺术设计有限公司","value":"18924662793"},{"name":"广州市大器舫装饰设计有限公司","value":"13825075533"},{"name":"深圳至璞软装设计有限公司","value":"18168860629"},{"name":"深圳市明镗文化传播有限公司","value":"18824289552"},{"name":"深圳市广田软装投资有限公司","value":"13714019587"},{"name":"广州正雄软装设计有限公司","value":"13826405445"},{"name":"东莞市那么搭家居有限公司","value":"13950167156"},{"name":"东莞市索密特装饰设计工程有限公司","value":"13527902722"},{"name":"深圳市简美软装设计有限公司","value":"18666228903"},{"name":"深圳市诺德软装工程有限公司","value":"13823333317"},{"name":"广州坤派装饰设计工程有限公司","value":"13268089286"},{"name":"深圳南粤软装设计有限公司","value":"13714553866"},{"name":"深圳欧艺唐酒店软装设计配套有限公司","value":"18574608318"},{"name":"深圳市广田云软装艺术科技有限公司","value":"13670253233"},{"name":"广州云升山喆软装饰品有限公司","value":"13265968020"},{"name":"阿弗洛国际软装（深圳）有限公司","value":"13724338777"},{"name":"深圳市美雕软装有限公司","value":"15999588081"},{"name":"深圳市高格软装有限公司","value":"15999676085"},{"name":"印象空间（深圳）室内设计工程有限公司","value":"0755-82135070"},{"name":"深圳市艺居软装设计有限公司","value":"0755-25905829"},{"name":"清大软装（深圳）有限公司","value":"13927330418"},{"name":"深圳市迪赛普莱软装陈设有限公司","value":"0755-28061668"},{"name":"深圳市尊雅软装工程有限公司","value":"13782760167"},{"name":"深圳潮舍软装艺术有限公司","value":"13428998644"},{"name":"广东优莱克工程软装定制有限公司","value":"18689353803"},{"name":"深圳市星彩软装有限公司","value":"0755-28946198"},{"name":"深圳市九度空间软装艺术有限公司","value":"13728966408"},{"name":"深圳古兰国际软装艺术有限公司","value":"18643225763"},{"name":"深圳市君悦美家软装设计工程有限公司","value":"13510909152"},{"name":"深圳市米格软装设计有限公司","value":"18123950405"},{"name":"深圳市弘韵软装艺术有限公司","value":"18676690245"}];
// 有几个bounds需要参照机型适配
// 备注地址
let bounds1 = {a:0,b:316,c:1080,d:441};
// 申请理由
let bounds2 = bounds(92,1003,904,1195);
// 私人微信
//let bounds3 = bounds(44,393,1036,619);
let bounds3 = {a:44,b:393,c:1036,d:619};
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
   click(bounds3.a,bounds3.b,bounds3.c,bounds3.d);
   console.log("diannn");
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
    //let friends = [{name:'123',value:"13870252081"}];
  
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
                back();
                sleep(1000);
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
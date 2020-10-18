function lauchXueXi(){
    // 打开学习强国
    launchApp("学习强国")
}
// 列表滚动(需要寻找的文字,不可能出现的左位移,滚动控件)
function touchList(findText,unleft,scrollIndex){
    let maxRead = 6;
    let readSum = 0;
    let viewBounds = id("view_pager").findOne(2000).bounds();
    console.log("找viewBounds");
    while(readSum < maxRead){
        let tmpArray = boundsInside(viewBounds.left,viewBounds.top,viewBounds.width(),viewBounds.height())
        .className("android.widget.TextView")
        .text(findText)
        .find()
        console.log("tmpArray==="+tmpArray.length);
        // 去重,判断高度即可,每个高度肯定都不一样
        let tmpBoundsArray = [];
        let workButtonArray = [];
        tmpArray.forEach(child => {
            let bounds = child.bounds()
            if(bounds.left !== unleft && tmpBoundsArray.indexOf(bounds.top) === -1){
                // 不存在
                workButtonArray.push(child);
                tmpBoundsArray.push(bounds.top)
            }
        })
        console.log("workButtonArray==="+workButtonArray.length);
        // 获取父组件,并点击
        workButtonArray.forEach(child=>{
            try{
                child.parent().click();
                readSum = readSum + 1;
                console.log("电机的按钮----"+child.bounds());
                sleep(2000);
                goBack();
                sleep(2000);
            }catch (error) {
                console.log("不可点击");
            }
        })
        console.log("readSum:"+readSum+"maxRead:"+maxRead);
        scrollDown(scrollIndex);
        sleep(2000);
    }
}
// 跳转到学习页面
function goToHome(){
    id("home_bottom_tab_button_work").findOne().click();
}
// 跳转到电视台
function goToTV(){
    console.log("跳转电视台");
    id("home_bottom_tab_button_contact").findOne().click()
}
// 获取之前几天的日期,num=0代表今天,1是昨天,2是前天
function getTime(num) {
    let day = new Date();
    day.setTime(day.getTime()-num*24*60*60*1000);
    let s1 = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
    return s1
    // console.log("当前时间是" + curTime.getFullYear() + "-" + (curTime.getMonth() + 1) + "-" + curTime.getDate() + "(周" + curTime.getDay() + ") " + curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds());
}
// 返回上一页面
function goBack() {
    back()
}
// 任务1,选读文章
// 6篇文章,每篇1分钟
function XuanDuWenZhang(){
    // 1.切换到要闻
    goToHome();
    sleep(2000);
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    sleep(2000);
    touchList("播报",0,3)
}
// 任务2,视听学习
function ShiTingXueXi(){
    goToTV();
    sleep(2000);
    // 1.切换到要闻
    className("android.widget.TextView").text("联播频道").findOne().parent().click();
    sleep(2000);
    touchList("中央广播电视总台",1116,7)
}
// 任务3,本地功能
function LocalAction(){
     // 1.切换到要闻
     goToHome();
     sleep(2000);
     className("android.widget.TextView").text("江西").findOne().parent().click();
    //  2.找寻本地功能
    // let viewBounds = id("view_pager").findOne(2000).bounds();
    let tmpButtonArray = className("android.widget.TextView").text("江西学习平台").find();
    let workButton = tmpButtonArray.get(0);
    console.log(workButton.bounds());
    workButton.parent().click();
}
// 任务4,关注平台
function FocusPlatform(){
    sleep(2000);
    // 关注本平台
    className("android.widget.ImageView").desc("订阅").findOne().parent().click();
    sleep(2000);
    // 关注南昌平台
    className("android.support.v7.widget.RecyclerView").findOne().children().forEach(child => {
        let target = child.findOne(className("android.widget.TextView").text("订阅"));
        target.click();
    });
    sleep(2000);
    className("android.support.v7.widget.RecyclerView").findOne().children().forEach(child => {
        let target = child.findOne(className("android.widget.TextView").text("已订阅"));
        target.click();
    });
    sleep(1000);
    className("android.widget.TextView").text("已订阅").findOne().parent().click();
    sleep(1000);
    goBack();
}
// 找寻滚动数据
function testScroll(){
    for (let index = 0; index < 100; index++) {
        sleep(1000);
        log(index);
        scrollDown(index);
        sleep(1000);
    }
}
// 阅读文章,第一个是日期,第二个是总数
function readPage(readSum,viewBounds){
    let workButtonArray = className("android.widget.TextView")
                                .boundsInside(viewBounds.left,viewBounds.top,viewBounds.width(),viewBounds.height())
                                .text("播报")
                                .find()
    let waitRead = workButtonArray.length;
    console.log("抓到了"+waitRead+"个控件");
    if (waitRead === 0){
        // 说明没获取到
        return -1;
    }
    workButtonArray.forEach(child =>{
        try {
            child.parent().click();
            readSum = readSum + 1;
            sleep(3000);
            back();
        } catch (error) {
            console.log("报错了");
        }
        
    })
    return readSum;
}


function main(){
    // lauchXueXi();
    // sleep(5000);
    // 任务1:选读文章6篇
    // XuanDuWenZhang();
    // 任务2，视听学习
    // ShiTingXueXi();
    // 任务3,本地
    LocalAction();
    // 任务4,关注两个平台
    FocusPlatform();
}

main();
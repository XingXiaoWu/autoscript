function lauchXueXi(){
    // 打开学习强国
    launchApp("学习强国")
}
// 跳转到学习页面
function goToHome(){
    id("home_button_tab_button_work").findOne().click();
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
function XuanDuWenZhang1(){
    let maxRead = 6;
    let readSum = 0;
    // 1.切换到要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    sleep(2000);
    // 获取viewPager
    let viewBounds = id("view_pager").findOne().bounds();
    // 2.捕获播报按钮
    while(readSum < maxRead){
        // let workButtonArray = className("android.widget.TextView")
        // .boundsInside(viewBounds.left,viewBounds.top,viewBounds.width(),viewBounds.height())
        // .text("播报")
        // .find()
        let workButtonArray = boundsInside(viewBounds.left,viewBounds.top,viewBounds.width(),viewBounds.height())
        .className("android.widget.TextView")
        .text("播报")
        .find()
        console.log("抓到了"+workButtonArray.length+"个控件");
        // 放出播报的父控件,并点击
        workButtonArray.forEach(child =>{
            log("chil======="+child.bounds())
            try {
                child.parent().click();
                readSum = readSum + 1;
                sleep(2000);
                back();
                sleep(2000);
            } catch (error) {
                console.log("报错了");
            }
            
        })
    }
   
  
    // // 3.获取日子
    // let daynum = 0;
    // // 4.判断数量
    // while (readSum<maxRead) {
    //     let day = getTime(daynum);
    //     // readSum = readPage(day,readSum);
    //     let tmp = readPage(readSum,viewPager.bounds());
    //     console.log("tmp:"+tmp);
    //     if(tmp === -1){
    //         // 说明当前没获取到标题对应新闻,需要减一天时间再获取
    //         daynum = daynum + 1;
    //     }else{
    //         // 说明当前页读完了新闻,该滚动一页了
    //         console.log("该滚动了")
    //         sleep(2000);
    //         scrollDown(3);
    //         console.log("滚动结束")
    //         readSum = tmp;
    //         sleep(2000);
    //     }
    //     console.log("日期:"+day+"阅读总数:"+readSum);
    //     sleep(5000);
    // }
    // 理论上两天的数据绝对够了,要是两天写不出6篇文章,这些记者同学可以下岗了
}
// 阅读文章
function findPage(){

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

function XuanDuWenZhang2(){
    // 1.切换到要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    sleep(2000);
    let num = 1;
    while (num < 7){
        try {
            className("android.widget.FrameLayout").depth(4).row(num).find().click();    
            console.log(num);
            sleep(2000);
            back();
            // 等两秒,然后回退
            num = num + 1;
        } catch (error) {
            // 滑动页面
            console.log("该滚动了")
            sleep(2000);
            scrollDown(3);
            console.log("滚动结束")
            sleep(2000);
        }
        
    }
    
    // // 2.获取当前可获取到的首页日期数据
    // // className("android.widget.FrameLayout").depth(4).row(4).find().click();
    // let workButtonArray = getWidgetByTime(0);
    // // 3.判断是否可点击
    // workButtonArray.forEach(child =>{
    //     console.log("进页面");
    //     try {
    //         child.parent().click();
    //         console.log("可点击");
    //         sleep(2000);
    //         back();
    //         // 返回这个可点击按钮
    //     } catch (error) {
    //         console.log("报错了");
    //     }
    // })
}
function XuanDuWenZhang3(){
    // 1.切换到要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    sleep(2000);
}
// 根据日期获取控件
function getWidgetByTime(daynum){
    let day = getTime(daynum);
    console.log(day);
    let workButtonArray = text(day).find();
    let waitRead = workButtonArray.length;
    if (waitRead === 0){
        // 说明没获取到,获取前一天的
        return getWidgetByTime(daynum+1);
    }
    return workButtonArray
}

function main(){
    // console.show()
    // lauchXueXi();
    // sleep(5000);
    XuanDuWenZhang1();
}

main();
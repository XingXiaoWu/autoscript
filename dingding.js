
// 唤醒机器
function keepDrow(){
    device.wakeUpIfNeeded();
    device.keepScreenOn();
    if(!device.isScreenOn()){
        device.wakeUpIfNeeded();
        keepDrow();
    }
}

// 上划解锁
function threeFingerSwipeUp(){
    swipe(500,1890,500,1100,500)
}

// 唤醒钉钉
function lauchDingDing(){
    launchApp("钉钉")
}

// 判断钉钉是否登录
function isLogined(){
    // 获取节点
    let pwd_login = id("et_pwd_login").findOnce();
    // 判断按钮是否存在
    if(pwd_login === null){
        toast("已登录")
    }else{
        pwd_login.click()
        sleep(1000);
        pwd_login.setText("wuxing5285218@")
        sleep(3000);
        id("btn_next").findOnce().click();
        toast("登录成功")
    }
}

// 跳转工作台页面
function goToWorkspace(){
    let workButton = desc("工作台").findOnce();
    // 跳转
    if(workButton !== null){
        // 跳转到工作台页面
        workButton.click();
    }
}

// 跳到考勤打卡页面
function goToAttendance(){
    // 跳到考勤页面1
    let workButton = className("android.view.View").depth("22").drawingOrder("0").indexInParent("0").find();
    // // 跳到考勤页面2
    // let webviewFg = className("com.uc.webview.export.WebView").findOne();
    // let workButtonSet = webviewFg.findByText("考勤打卡");
    // let dakaText = workButtonSet.get(0);
    // let workButton = dakaText.parent().parent().parent();
    // 跳转
    if(workButton !== null){
        console.log("不为空"+workButton);
        // 跳转到考勤打卡页面
        workButton.click();
    }else{
        toast("未能找到考勤按钮")
    }
}

// 上班打卡
function punchClock(msg){
    // 理论上现在已经在打卡页面了
    let webviewFg = className("com.uc.webview.export.WebView").findOne();
    let dakaButtonSet = webviewFg.findByText(msg);
    let dakaButton = dakaButtonSet.get(0);
    if(dakaButton !== null){
        // console.log("存在外勤打卡");
        // 点一下试试
        dakaButton.click();
    }else{
        console.log("不存在外勤打卡");
    }
}

// 下班打卡
function main(msg){
    // console.show()
    // 唤醒屏幕
    keepDrow();
    sleep(2000);
    // 解锁
    threeFingerSwipeUp();
    sleep(2000);
    // 加载钉钉
    lauchDingDing();
    sleep(5000);
    isLogined();
    sleep(5000);
    goToWorkspace();
    sleep(10000);
    goToAttendance();
    sleep(10000);
    punchClock(msg);
    // punchClock("外勤打卡");
}
main("下班打卡");
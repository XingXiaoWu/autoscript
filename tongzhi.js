
auto();
function keepDrow(){
    console.log("亮了");
    device.wakeUpIfNeeded();
    // device.keepScreenOn(2000);
    device.keepScreenDim(2000)
    if(!device.isScreenOn()){
        device.wakeUpIfNeeded();
        keepDrow();
    }
}
// 上划解锁
function threeFingerSwipeUp(){
    swipe(500,1890,500,1100,501)
}

// 唤醒飞书
function lauchFeishu(){
    launchApp("飞书")
}

events.observeNotification();
events.onNotification(function(notification){
    log(notification.getText());
    const tmp = notification.getText()
    if(tmp === "嗷嗷嗷"){
        keepDrow()
        sleep(2000);
        threeFingerSwipeUp()
        sleep(2000);
        lauchFeishu()
        sleep(2000);
    }else if(tmp === "home"){
        home()
    }
    device.cancelKeepingAwake()
});
// events.on('toast', function(t){
//     //这段代码将得不到执行
//     log(t);
// });∏
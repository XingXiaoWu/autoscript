
// 唤醒机器
function keepDrow(){
    device.wakeUpIfNeeded();
    device.keepScreenOn(3600 * 1000);
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

// 下班打卡
function main(){
    // 唤醒屏幕
    keepDrow();
    sleep(2000);
    // 解锁
    threeFingerSwipeUp();
    sleep(2000);
    // 加载飞书
    lauchFeishu();
    sleep(5000);
    home();
}
main();
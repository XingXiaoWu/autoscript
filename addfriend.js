

// 添加朋友
function touchAdd(){
    let addButton = desc("更多功能按钮").findOne().bounds();
    click(addButton.centerX(), addButton.centerY());
    sleep(500);
    let addFriend = text("添加朋友").findOne().bounds();
    click(addFriend.centerX(), addFriend.centerY());
    sleep(500);
}

// 点击搜索按钮 5000
function touchSearch(friend){
    let searchButton = text("微信号/手机号").findOne().bounds();
    click(searchButton.centerX(), searchButton.centerY());
    sleep(1000);
    let searchText = className("android.widget.EditText");
    searchText.setText(friend)
    sleep(1000);
    let searchButton1 = text("搜索:"+friend).findOne().bounds();
    click(searchButton1.centerX(), searchButton1.centerY());
    sleep(3000);
}

// 填写备注并发送 3000
function writeRemark(name) {
    let remark = "电动窗帘厂家直销，欢迎洽谈合作！";
    // let input1 = className("android.widget.EditText").drawingOrder(3).findOne();
    let input1 = className("android.widget.EditText").bounds(86,538,994,797).findOne();
    input1.setText(remark);
    // let input2 = className("android.widget.EditText").drawingOrder(5).findOne();
    let input2 = className("android.widget.EditText").bounds(86,968,994,1119).findOne();
    input2.setText(name);
    sleep(2000);
    let sendButton = text("发送").findOne(3000).bounds();
    click(sendButton.centerX(), sendButton.centerY());
    sleep(3000);
}

// 添加到通讯录 3000
function addFriend(){
    let addButton = text("添加到通讯录").findOne(3000);
    if (addButton) {
        click(addButton.bounds().centerX(), addButton.bounds().centerY());
        sleep(3000);  
        return true;  
    }else{
        let sendButton = text("发消息").findOne(3000);
        if (sendButton){
            back();
        }
        return false;
    }
   
}

function main() {
    // 在下面这行，前面添加两个//
    let friends = [];
    // 点击添加用户
    touchAdd();
    for (let index = 0; index < friends.length; index = index + 1) {
        let element = friends[index];
        // // 点击添加微信号/手机号
        touchSearch(element.value);
        // 添加朋友
        let tmp = addFriend();
        if (tmp) {
            // 填写申请信息和备注
            sleep(3000);
            writeRemark(element.name);
            back();
            sleep(1000);
            back();
            sleep(1000);
        }else{
            sleep(2000);
            back();
            sleep(2000);
        }
       
    }
}

main();
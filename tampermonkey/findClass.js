// ==UserScript==
// @name         Try To find Class
// @namespace    Xing.Wu
// @version      0.1
// @description  从教育屋搜索关键词
// @author       Xing.Wu
// @match        https://www.jiaoyuhe.com/archiver
// @match        https://www.jiaoyuhe.com/archiver/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// ==/UserScript==

// 添加样式
let study_css = `.egg_menu{
    outline:0;
    border:0;
    position:fixed;
    top:5px;
    left:5px;
    padding:12px 20px;
    border-radius:10px;
    cursor:pointer;
    background-color:#fff;
    color:#d90609;
    font-size:18px;
    font-weight:bold;
    text-align:center;
    box-shadow:0 0 9px #666777;
}
.egg_setting_box{
    position:fixed;
    top:70px;
    left:5px;
    padding:12px 20px;
    border-radius:10px;
    background-color:#fff;
    box-shadow:0 0 9px #666777
}
.egg_reset_btn{
    position:fixed;
    left:245px;
}
.egg_pause_btn{
    position:fixed;
    left:145px;
}
.egg_text{}.egg_input{width:50px}`;
GM_addStyle(study_css);

// host
let origin = document.location.origin
// 查询页码
// let max_page = 100;
// 查询关键字
// let keyWords = '凉学长';
// 结果
let result = [];
// {
//     title: '',
//     url: '',
//     page: ''
// }

// 是否暂停
let pause = true;
// 1.关键字 2.最大页码
let settings = [];
// 当前页码
let current_page = parseInt(document.location.search.replace('?page=',''),10);

// 搜索当前页
function findCurrentPage(){
    if (pause === true || pause === 'true') {
        // 暂停
        console.log('暂停查询');
        console.log(result);
        return
    }
    // 查询本页a标签是否存在keywords中的内容
    // 获取ul
    let ul = document.getElementById('content').children[0];
    let lis = ul.children;
    Array.from(lis).forEach(element => {
        // 获取文字
        const dom = element.children[0]
        const text = dom.text
        if(text.indexOf(settings[0]) !== -1){
            // 包含关键字
            result.push({
                title: text,
                url: origin + dom.pathname,
                page: document.location.search
            })
        }
    });
    GM_setValue('result', JSON.stringify(result));
    nextPage();
}

// 下一页
function nextPage(){
    current_page = current_page + 1;
    if(current_page > settings[1]){
        console.log(result);
        console.log('查询完毕');
        pause = true
        GM_setValue('pause', JSON.stringify(true));
    }else{
        // 输出完毕，跳转下一页
        setTimeout(() => {
            window.location.href = origin + document.location.pathname + '?page=' + current_page;
        }, 1000);
    }
}

// 初始化
function initSetting(){
    // 初始化设置
    try {
        let settingTemp = JSON.parse(GM_getValue('searchSetting'));
        if (settingTemp != null) {
            settings = settingTemp;
        } else {
            settings = ['凉学长',100];
        }
    } catch (e) {
        //没有则直接初始化
        settings = ['凉学长',100];
    }
    // 初始化结果
    try {
        let resultTemp = JSON.parse(GM_getValue('result'));
        if (resultTemp != null) {
            result = resultTemp;
        } else {
            result = [];
        }
    } catch (e) {
        //没有则直接初始化
        result = [];
    }

    // 初始化暂停
    try {
        let pauseTemp = JSON.parse(GM_getValue('pause'));
        if (pauseTemp != null) {
            pause = pauseTemp;
        } else {
            pause = true;
        }
    } catch (e) {
        //没有则直接初始化
        pause = true;
    }
    
}
function resetResult() {
    console.log('清空结果完毕');
    GM_setValue('result', JSON.stringify([]));
}

// 保存配置
function saveForm() {
    let form = document.getElementById("settingData");
    let formData = new FormData(form);
    settings[0] = formData.get('0');
    settings[1] = parseInt(formData.get('1'),10);//运行时是否要隐藏
    GM_setValue('searchSetting', JSON.stringify(settings));
}

// 创建按钮
function createStartButton() {
    let base = document.createElement("div");
    var baseInfo = "";
    baseInfo += `<form id="settingData" class="egg_menu" action="" target="_blank" onsubmit="return false">
    <div class="egg_setting_box">
        <div class="egg_setting_item">
            <label>关键字</label>
            <input class="egg_setting_switch" type="input" name="0" value="${settings[0]}" />
        </div>
        <div class="egg_setting_item">
            <label>最大页码</label>
            <input class="egg_setting_switch" type="input" name="1" value="${settings[1]}" />
        </div>
    </div>
</form>`;
    base.innerHTML = baseInfo;
    let body = document.getElementsByTagName("body")[0];
    body.append(base)
    let startButton = document.createElement("button");
    startButton.setAttribute("id", "startButton");
    startButton.innerText = "开始查找";
    startButton.className = "egg_study_btn egg_menu";
    //添加事件监听
    try {// Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        startButton.addEventListener("click", ()=>{
            pause = false
            GM_setValue('pause', JSON.stringify(false));
            saveForm()
            findCurrentPage()
        }, false);
    } catch (e) {
        try {// IE8.0及其以下版本
            startButton.attachEvent('onclick',  ()=>{
                pause = false
                GM_setValue('pause', JSON.stringify(false));
                saveForm()
                findCurrentPage()
            });
        } catch (e) {// 早期浏览器
            console.log("开始学习按钮绑定事件失败")
        }
    }
    // 清空结果
    let resetButton = document.createElement("button");
    resetButton.setAttribute("id", "resetButton");
    resetButton.innerText = "清空结果";
    resetButton.className = "egg_reset_btn egg_menu";
    //添加事件监听
    try {// Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        resetButton.addEventListener("click", resetResult, false);
    } catch (e) {
        try {// IE8.0及其以下版本
            resetButton.attachEvent('onclick', resetResult);
        } catch (e) {// 早期浏览器
            console.log("清空按钮绑定事件失败")
        }
    }

    // 暂停
    let pauseButton = document.createElement("button");
    pauseButton.setAttribute("id", "resetButton");
    pauseButton.innerText = "暂停";
    pauseButton.className = "egg_pause_btn egg_menu";
    //添加事件监听
    try {// Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        pauseButton.addEventListener("click", ()=>{
            console.log('暂停');
            GM_setValue('pause', JSON.stringify(true));
        }, false);
    } catch (e) {
        try {// IE8.0及其以下版本
            pauseButton.attachEvent('onclick', ()=>{
                console.log('暂停');
                GM_setValue('pause', JSON.stringify(true));
            });
        } catch (e) {// 早期浏览器
            console.log("暂停按钮绑定事件失败")
        }
    }

    //插入节点
    body.append(startButton)
    body.append(pauseButton)
    body.append(resetButton)
}

// 获取本页
$(document).ready(function () {
    initSetting()
    createStartButton()
    findCurrentPage()
});
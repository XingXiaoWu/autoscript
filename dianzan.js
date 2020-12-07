function lauchDouyin(){
    launchApp("抖音短视频")
}

function touchSearch(){
    id("bog").findOne(2000).click()
}

function setText(){
    KeyCode('KEYCODE_0')
}
function main(){
    while(true){
        click(620,800);
    }
}

main();
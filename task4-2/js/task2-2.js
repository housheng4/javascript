
$(".return").click(function(){ 
    var r = confirm("确定要离开游戏吗？"); //提示框//点击确认返回true跳转页面取消不执行代码留在本页面
    if (r == true) {
        sessionStorage.clear();
        window.location.href = "../jstask2/task2-1.html";
    }
});


var player =  $("#player")[0], //玩家输入框人数
    killer =  $("#killer")[0], // 获取杀手数节点   
    plebs =  $("#plebs")[0], // 获取农民数节点 
    sliding =  $("#sliding")[0], //获取滑块节点
    playerArr = []; //定义一个没有元素的字面量数组


player.addEventListener("input", function(){
    monitor()
},false)

//进度条效果
sliding.style.background = 'linear-gradient(to right, Orange, white ' + (player.value - 4) * 100 / 14 + '%, white)';
// 表单事件，输入时触发，触发后执行allot 函数
sliding.oninput=function(){//在输入时触发
    player.value = sliding.value;
    monitor();

}

// 减号按钮

 $("#minus").click(function(){ 

    player.value--; //每次点击增值
    sliding.value = player.value;
    monitor();
   

});  
// 加号按钮

$("#plus").click(function(){    
    player.value++; //每次点击增值
    sliding.value = player.value;
    monitor();
  

});


// 属性类型转换
function monitor() {
    allot();
    playerNum = Number(player.value); //把（）内的数值转换成原始的数值，并返回。
    killerNum = Number(killer.innerHTML); //杀手数值转换成字符
    plebsNum = Number(plebs.innerHTML); //农民数值转换成字符
    print(); //分配身份
    shuffle(playerArr); //洗牌生成的数组

};
monitor();//页面一渲染就执行


// 分配玩家
function allot() {

    if (player.value < 4 || player.value > 18) {
        killer.innerHTML = "0"; //输出空数值
        plebs.innerHTML = "0";
    } else {
        killer.innerHTML = Math.floor((player.value) / 3); //计算杀手人数
        plebs.innerHTML = player.value - killer.innerHTML; //计算农民人数
        sliding.value = player.value;//把输入的数值赋予给滑动块
    }
    console.log(player.value);
    
    sliding.style.background = 'linear-gradient(to right, Orange, white ' + (player.value - 4) * 100 / 14 + '%, white)';
}

// 给数组写入值，分配身份
function print() {

    playerArr = []; //重置数组  字面量数组 

    for (var i = 0; i < plebsNum; i++) {
        playerArr[i] = "平民"; //给数组写入值
    }
    for (var j = plebsNum; j < (killerNum + plebsNum); j++) {
        playerArr[j] = "杀手"; //给数组写入值
    }

    console.log(playerArr);
}

// 数组乱序
function shuffle(arr) { //新赋值的参数arr,在监听内与playerArr交接

    var RAM, //随机参数
        temp; //临时储存
    for (i = arr.length; i > 0; i--) {
        RAM = Math.floor(Math.random() * i); //取一个总人数内的随机数
        temp = arr[i - 1]; //总数减掉一位临时储存起来
        arr[i - 1] = arr[RAM]; //重复以上两步直到把所有数值取出
        arr[RAM] = temp; //取出所有数字后，把得到的数字组成一个序列，也就是原始数字的随机排列
    }
    console.log('随机打乱后的数组：', arr); //随机打乱后的数组
    return arr;


}


$("#but").click(function(){
    
    var playerNum = player.value, //声明局部变量
        killerNum = killer.innerHTML,
        plebsNum = plebs.innerHTML;


    if (playerNum < 4 || playerNum > 18) {
        window.alert("请输入正确的玩家数！")

    } else {
        let allMsg = {
            playerArr: shuffle(playerArr), //数组
            playerNum: playerNum, //总人数
            killerNum: killerNum, //杀手
            plebsNum: plebsNum, //农民
            
        };

        console.log(allMsg.playerArr)
        var allMsgstr = JSON.stringify(allMsg); //把allMsg转化成字符串格式，存入allMsgstr
        sessionStorage.setItem('allMsg', allMsgstr); //把字符串格式的allMsgstr转化成allMsg进行存储
        window.location.href = "../jstask3/task3-1.html"

    };


});
var content = '<div class="slider" id="slider">'+
'<div class="slide"><img src="img/b5.png" alt=""></div>'+
'<div class="slide"><img src="img/b1.png" alt=""></div>'+
'<div class="slide"><img src="img/b2.png" alt=""></div>'+
'<div class="slide"><img src="img/b3.png" alt=""></div>'+
'<div class="slide"><img src="img/b4.png" alt=""></div>'+
'<div class="slide"><img src="img/b5.png" alt=""></div>'+
'<div class="slide"><img src="img/b1.png" alt=""></div>'+"</div>"+
'<span id="left"><</span>'+
'<span id="right">></span>'+
'<ul class="nav" id="navs">'+
    '<li>1</li>'+
    '<li>2</li>'+
    '<li>3</li>'+
    '<li>4</li>'+
    '<li>5</li>'+
'</ul>'
$('#box').append(content);

//引入结构

var slider=document.getElementById('slider');//外层大盒子
var left=document.getElementById("left");//左侧按钮
var right=document.getElementById("right");//右侧按钮
var oNavlist = document.getElementById('navs').children;//小圆圈数组
var index = 1;
timer = setInterval(next, 3000);//设置定时器
var isMoving = false;//标志
oNavlist[0].className = "active";

//大盒子移入移出事件
$('#box').mouseover(function(){
    left.style.opacity="0.6";
	right.style.opacity="0.6";
    clearInterval(timer);
})
$('#box').mouseout(function(){
    left.style.opacity="0";
	right.style.opacity="0";
    timer = setInterval(next,3000);
})

//上一张函数
function prev() {
	if (isMoving) {
		return;
	}
	isMoving = true;
	index--;
	navmove();
	animate(slider, {
		left: -1200  * index
	}, function () {
		if (index == 0) {
			index = 6;
		}
		isMoving = false;
	});
}

//下一张函数
function next() {
	if (isMoving) {
		return;
	}
	isMoving = true;
	index++;
	navmove();
	animate(slider, {
		left: -1200 * index
	}, function () {
		if (index == 6) {
			slider.style.left = '-1200px';
			index = 1;
		}
		isMoving = false;
	});
}

//改变小圆圈样式
function navmove(){
    for(var i = 0;i<oNavlist.length;i++){
        oNavlist[i].className = "";
    }
    if(index > 5){
        oNavlist[0].className = "active";
    }else if(index <=0){
        oNavlist[4].className = "active";
    }else{
        oNavlist[index - 1].className = "active";
    }
}

function getStyle(obj, attr) { //返回值带有单位px
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}

//轮播
function animate(obj, json, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            (function (attr) {
                if (attr == "opacity") {
                    var now = parseInt(getStyle(obj, attr) * 100);
                    var dest = json[attr] * 100;
                } else {
                    var now = parseInt(getStyle(obj, attr));
                    var dest = json[attr];
                }
                var speed = (dest - now) / 6;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (now != dest) {
                    flag = false;
                    if (attr == "opacity") {
                        obj.style[attr] = (now + speed) / 100;
                    } else {
                        obj.style[attr] = now + speed + "px";
                    }
                }
            })(attr);
        }
        if (flag) {
            clearInterval(obj.timer);
            callback && callback(); //如果回调函数存在，就调用回调函数
        }
    }, 30);
}

right.onclick = next;
left.onclick = prev;

//小圆圈的点击事件
for(var i=0;i<oNavlist.length;i++){
    oNavlist[i].index = i;
    oNavlist[i].onclick = function(){
        index = this.index + 1;
        navmove();
        animate(slider,{
            left:-1200 * index
        });
    }
}

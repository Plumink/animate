var carousel = function(){
    var imgs = [
        "img/b1.png","img/b2.png","img/b3.png","img/b4.png","img/b5.png"
    ],
    $box = $('#box'),
    $slider = $('<div class="slider" id="slider"></div>'),
    $left = $('<span id="left"><</span>'),
    $right = $('<span id="right">></span>'),
    $list = $('<ul class="nav" id="navs"></ul>'),
    index = 1,
    timer,
    isMoving = false;

    //添加图片
    for(var i=0;i<=imgs.length;i++){
        var $ii = $('<div class="slide"><img src="' + imgs[i] + '" alt=""></div>');
        $slider.append($ii);
    }
    $slider.prepend($('<div class="slide"><img src="' + imgs[imgs.length - 1] + '" alt=""></div>'));//开头插入
    $slider.append($('<div class="slide"><img src="' + imgs[0] + '" alt=""></div>'));//结尾插入
    //添加底部li
    var $li = [];
    for(var i=0;i<imgs.length;i++){
        $li[i] = $('<li>' + (i + 1) +'</li>');
        $list.append($li[i])
    }
    $li[0].addClass("active");

    //鼠标移入左右标签隐藏和显示
    $box.mouseover(function(){
        $left.css("opacity","0.6");
        $right.css("opacity","0.6");
        clearInterval(timer);
    })

    $box.mouseout(function(){
        $left.css("opacity","0");
        $right.css("opacity","0");
        timer = setInterval(next,3000);
    })

    //箭头点击事件
    $left.click(function(){
        prev();
    })

    $right.click(function(){
        next();
    })

    //上一张，下一张函数
    function prev() {
        if (isMoving) {
            return;
        }
        isMoving = true;
        index--;
        navmove();
        $slider.animate({left: -1200 * index},
            800,
            function () {
                if (index == 0) {
                    $slider.css("left","-1200px");
                    index = 6;
                }
                isMoving = false;
            });
    }

    function next() {
        if (isMoving) {
            return;
        }
        isMoving = true;
        index++;
        navmove();
        $slider.animate({left: -1200 * index},
            "800",
            function () {
                if (index == 6) {
                    $slider.css("left","-1200px");
                    index = 0;
                }
                isMoving = false;
            });
    }

    //底部图标样式函数
    function navmove(){
        for(var i = 0;i<imgs.length;i++){
            $li[i].removeClass("active");
        }
        if(index > 5){
            $li[0].addClass("active");
        }else if(index <=0){
            $li[4].addClass("active");
        }else{
            $li[index - 1].addClass("active");
        }
    }

    //底部图标点击事件
    for(var i=0;i<imgs.length;i++){
        $li[i].index = i;
        $li[i].click(function(num){
            for(var j=0;j<imgs.length;j++){
                $li[j].removeClass("active");
            }
            $li[i].addClass("active");
            index = this.index + 1;
            $slider.animate({left:-1200 * index});
        })
    }

    //定时器设置
    timer = setInterval(next,3000);

    $box.append($slider);
    $box.append($left);
    $box.append($right);
    $box.append($list);
    return $box;


}
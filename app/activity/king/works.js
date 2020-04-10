var pageData = new Vue({
    el: '#page',
    data: {
        hasWork: true,
    },
    methods: {

    },
    mounted() {

    },
})



$('body').css('visibility', 'visible');
$(function () {
    var isloading = false;
    var windowHeight = $(window).height();
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        if (scrollTop + windowHeight + 10 >= scrollHeight) {
            // 限制一秒内只加载一次
            if (!isloading) {
                console.log('加载');
                setTimeout(function () {
                    pageData._data.num += 10;
                    isloading = false;
                }, 1000)
            }
            isloading = true;
        }
    });
});

// 页面尺寸改变时实时触发
window.onresize = function () {
    //重新定义瀑布流
    waterFall('.work-ul', '.work-ul li');
};
//初始化
window.onload = function () {
    //实现瀑布流
    waterFall('.work-ul', '.work-ul li');
}
var workHeight = 0; //容器高度
function waterFall(container, child) {
    var baseRem = $("#null").width(); // 1rem代表的距离,需自设宽1rem元素
    // 1 确定图片的宽度 - 滚动条宽度
    var pageWidth = $(container).width(); // 获取内容总宽
    var columns = 2; //2列
    var topDistance = 0.667 * baseRem; // 向上的间隔距离
    var leftDistance = 0.733 * baseRem; // 向左的间隔距离
    var itemWidth = (pageWidth / columns); //得到item的宽度
    itemWidth = itemWidth - leftDistance / 2; //重置单个的宽度
    var arr = [];
    $(child).each(function (i) {
        var height = $(this).height();
        if (i < columns) {
            // 2 第一行按序布局
            $(this).css({
                top: 0,
                left: (itemWidth) * i + leftDistance * i,
            });
            //将行高push到数组
            arr.push(height);
        } else {
            // 其他行
            // 3 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            // 4 设置下一行的第一个盒子位置
            // top值就是最小列的高度
            $(this).css({
                top: arr[index] + topDistance,
                left: $(child).eq(index).css("left")
            });

            // 5 修改最小列的高度
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
            arr[index] = arr[index] + height + topDistance;
        }

        // console.log(height)
        // console.log($(this).css('left') == '0px')
        // console.log($(this)[0].offsetTop)

        if (height + $(this)[0].offsetTop > workHeight) {
            workHeight = height + $(this)[0].offsetTop;
            $(container).height(workHeight);
        }
    });
}
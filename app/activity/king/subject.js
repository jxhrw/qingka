var pageData = new Vue({
    el: '#page',
    data: {
        num: 10,
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

    var mySwiper = new Swiper('#weeksQs', {
        autoplay: true, //可选选项，自动滑动
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionEnd: function () {
                console.log(this.realIndex);
            }
        },
    });
});
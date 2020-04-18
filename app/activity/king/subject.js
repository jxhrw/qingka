var pageData = new Vue({
    el: '#page',
    data: {
        num: 10,
        list: [],
        aindex: {
            realIndex_0: 0,
            realIndex_1: 0,
            realIndex_2: 0,
            realIndex_3: 0,
        }
    },
    methods: {

        // 获取历史赛题
        getQuestions() {
            request('/right/activity/joke/get_history_questions', {
                user_id: uid,
                version: version
            }, function (res) {
                console.log(res);
                _this.list = res.list || [];

                _this.list = [...res.list, ...res.list]

                _this.$nextTick(function () {
                    for (var i = 0; i < _this.list.length; i++) {
                        new Swiper('#weeksQs' + i, {
                            autoplay: true, //可选选项，自动滑动
                            loop: true,
                            navigation: {
                                nextEl: '.swiper-button-next' + i,
                                prevEl: '.swiper-button-prev' + i,
                            },
                            on: {
                                slideChangeTransitionEnd: function () {
                                    // console.log(this.realIndex);
                                    _this.aindex['realIndex_' + i] = this.realIndex;
                                }
                            },
                        });
                    }

                });
            });
        },
    },
    mounted() {
        _this = this;
        getSid();
        this.getQuestions();
    },
})

function getSid() {
    if (get_url_para('sid')) {
        base64Sid = get_url_para('sid');
        var sessionId = get_url_para('sid'); //获取用户id
        var sid = Base.decode(sessionId);
        var sidArr = sid.split('_');
        uid = sidArr[sidArr.length - 1];
        if (uid.indexOf('h5') > 0) {
            uid = uid.split('h5')[0]
        }
        version.sid = sid;

    }
}




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
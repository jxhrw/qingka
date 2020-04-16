var pageData = new Vue({
    el: '#page',
    data: {
        vshow: false,
        activeTab: 'cs',
    },
    methods: {
        changeAudioUrl: function (audioUrl, index) {
            pageData.playIndex = index
            if (pageData.url != audioUrl) {
                pageData.url = audioUrl
            }
            audio.play()

        },
        getInfo() {
            request('/right/activity/joke/get_info', {
                user_id: uid,
                version: version
            }, function (res) {
                console.log(res);
            });
        }
    },
    mounted() {
        this.getInfo();
    },
})





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


$('body').css('visibility', 'visible');
$(function () {
    scrollTop = 0;
    var mySwiper = new Swiper('#weeksQs', {
        autoplay: true, //可选选项，自动滑动
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionEnd: function () {
                // console.log(this.realIndex);
            }
        },
    });

})
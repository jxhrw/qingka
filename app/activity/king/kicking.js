var pageData = new Vue({
    el: '#page',
    data: {
        num: 10,
        isMe: true,
        pageNum: 1,
        weekNum: 1,
    },
    methods: {
        // 获取我的踢馆赛况
        getMyChallenge: function (pageNum) {
            request('/right/activity/joke/get_my_challenge', {
                // user_id: uid,
                version: version,
                week: _this.weekNum,
                page: pageNum,
                page_size: 10,
            }, function (res) {
                console.log(res);
            });
        },
        // 获取我的踢馆赛况
        getAllChallenge: function (pageNum) {
            request('/right/activity/joke/get_all_challenge', {
                // user_id: uid,
                version: version,
                week: _this.weekNum,
                page: pageNum,
                page_size: 10,
            }, function (res) {
                console.log(res);
            });
        },
    },
    mounted() {
        _this = this;
        getSid();
        this.getMyChallenge(this.pageNum);
        this.getAllChallenge(this.pageNum);
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

    scrollTop = 0;
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
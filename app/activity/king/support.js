var pageData = new Vue({
    el: '#page',
    data: {
        pageNum: 1,
        list: []
    },
    methods: {
        // 获取应援记录
        getHelpInfo: function (pageNum) {
            request('/right/activity/joke/get_help_list', {
                // user_id: uid,
                version: version,
                page: pageNum,
                page_size: 10,
            }, function (res) {
                console.log(res);
                var arr = res.list || [];
                _this.list = _this.list.concat(arr);
            });
        },
    },
    mounted() {
        _this = this;
        getSid();
        this.getHelpInfo(this.pageNum);
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
                    pageData._data.pageNum++;
                    pageData.getHelpInfo(pageData._data.pageNum);
                    isloading = false;
                }, 1000)
            }
            isloading = true;
        }
    });
});
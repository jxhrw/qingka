var _this = null;
var pageData = new Vue({
    el: '#page',
    data: {
        vshow: false,
        activeTab: 'cs',
        contest_num: 0, //参数总人数
        challenge_num: 0, //踢馆赛人数
        week_contest_num: 0, //周参赛人数
        brain_test_num: 0, //脑洞测试人数
        hearten_num: 0, //鼓励值数量
        heartenShow: 0, //鼓励值展示
        aiyoShow: 0, //哎哟不错数量展示
        dzsShow: 0, //段子手数量展示
        dzwzShow: 0, // 段子王者数量展示
        prop_list: [], //我的道具列表
        question_list: [], //本周赛题列表
        realIndex: 0,
        helpList: [], // 缎带记录
        stageList: [], // 赛段信息
        rankInfo: {}, // 总榜第一信息
    },
    filters: {
        competiteShow: function (val) {
            return val ? `${val}人正在参与` : `敬请期待`;
        },
        statusShow: function (val) {
            var aaaa = '';
            if (val == 0) {
                aaaa = '未开始';
            } else if (val == 1) {
                aaaa = '进行中';
            } else if (val == 2) {
                aaaa = '已结算';
            }
            return aaaa;
        }
    },
    methods: {
        changeAudioUrl: function (audioUrl, index) {
            pageData.playIndex = index
            if (pageData.url != audioUrl) {
                pageData.url = audioUrl
            }
            audio.play()
        },
        // 获取段子王者活动信息
        getInfo: function () {
            request('/right/activity/joke/get_info', {
                user_id: uid,
                version: version
            }, function (res) {
                console.log(res);
                _this.contest_num = res.contest_num || 0;
                _this.challenge_num = res.challenge_num || 0;
                _this.week_contest_num = res.week_contest_num || 0;
                _this.brain_test_num = res.brain_test_num || 0;
                _this.hearten_num = res.hearten_num || 0;
                _this.heartenShow = _this.hearten_num % 10;
                _this.aiyoShow = parseInt(_this.hearten_num / 10) % 5;
                _this.dzsShow = parseInt(_this.hearten_num / 50) % 2;
                _this.dzwzShow = parseInt(_this.hearten_num / 100);
                _this.prop_list = res.prop_list || [];
                _this.question_list = res.question_list || [];

                _this.$nextTick(function () {
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
                                _this.realIndex = this.realIndex;
                            }
                        },
                    });
                });
            });
        },
        // 点化道具卡
        useProp: function (id, index) {
            request('/right/activity/joke/use_prop', {
                // user_id: uid,
                version: version,
                id: id
            }, function (res) {
                console.log(res);
                showModal('#pointRib');
                _this.getInfo();
            });
        },
        // 缎带获取记录
        getRibbonInfo: function (pageNum) {
            request('/right/activity/joke/get_ribbon_list', {
                // user_id: uid,
                version: version,
                page: pageNum,
                page_size: 10,
            }, function (res) {
                console.log(res);
                _this.helpList = res.list || [];
                _this.$nextTick(function () {
                    if (_this.helpList.length > 0) msgAnimation();
                });

            });
        },
        // 获取活动排行榜
        getRankInfo: function () {
            request('/right/activity/joke/get_rank', {
                // user_id: uid,
                version: version,
                type: 0,
                page: 1,
                page_size: 1
            }, function (res) {
                console.log(res);
                _this.rankInfo = res.list && res.list.length > 0 ? res.list[0] : {};
            });
        },
        // 获取赛段信息
        getStageInfo: function () {
            request('/right/activity/joke/get_stage_list', {
                // user_id: uid,
                version: version,
            }, function (res) {
                console.log(res);
                _this.stageList = res.list || [];
            });
        },
        scalImgByNum: function (num, size, color, havex) {
            return calImgByNum(num, size, color, havex);
        },
        goMywork: function () {
            _alert('您还没有发布参赛作品，<br>快去参与吧');
            // location.href = './works.html?sid=' + get_url_para('sid');
        },
        goRiblist: function () {
            location.href = './riblist.html?sid=' + get_url_para('sid');
        },
        goHelplist: function () {
            location.href = './support.html?sid=' + get_url_para('sid');
        }
    },
    mounted() {
        _this = this;
        getSid();
        this.getInfo();
        this.getRibbonInfo(1);
        this.getRankInfo();
        this.getStageInfo();
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

//消息跑马灯效果
var scrollY = 0,
    _height = 0,
    _len = 0,
    height = 0,
    rowHeight = 0;

function msgAnimation() {
    if (_height == 0 || rowHeight == 0) {
        _height = $(".msg_row")[0].getBoundingClientRect().height;
        rowHeight = $(".msg_row")[0].getBoundingClientRect().height;
        setTimeout('msgAnimation()', 300)
        return
    }
    _len = $('.msg_row').length;

    // height = $('.msg_row').height()
    $('.message_content').height(_height * _len + 'px');
    scrollY++
    $('.message_content').css({
        'transform': 'translateY(-' + scrollY * rowHeight + 'px)',
        '-ms-transform': 'translateY(-' + scrollY * rowHeight + 'px)',
        'tran-webkit-transformsform': 'translateY(-' + scrollY * rowHeight + 'px)',
        'transition-duration': '0.6s'
    })
    if (_len - scrollY < 5) {
        var w_html = $('.message_content').html();
        $('.message_content').append(w_html)
    }
    setTimeout('msgAnimation()', 2000)
}


$('body').css('visibility', 'visible');
$(function () {
    scrollTop = 0;

})
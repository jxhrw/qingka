var pageData = new Vue({
    el: '#page',
    data: {
        vshow: false,
    },
    methods: {
        changeAudioUrl: function (audioUrl, index) {
            pageData.playIndex = index
            if (pageData.url != audioUrl) {
                pageData.url = audioUrl
            }
            audio.play()

        },
    },
    mounted() {

    },
})




function getAllData() {
    request('/right/h5//wb_activity/get_all_audio', {
        user_id: uid,
        version: version
    }, function (data) {
        pageData.list = data.list || [];
    }, function (err) {

    })
}

function getData() {
    var list = []
    request('/right/h5//wb_activity/get_audio', {
        user_id: uid,
        version: version
    }, function (data) {
        list.push(data)
        pageData.list = list
    }, function (err) {})
}

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
    pageData.uid = uid;
    alert(sid)

}


if (get_url_para('uid')) {
    pageData.isAll = false;
    uid = get_url_para('uid')
    getData()
    pageData.uid = uid;
} else {
    getAllData()
}

function addAudio(url) {
    request('/right/h5//wb_activity/add_audio', {
        user_id: uid,
        url: url,
        title: pageData.name,
        version: version
    }, function (data) {
        getAllData();
        pageData.audioName = pageData.name
        pageData.name = ''
        showModal('.modal_share')
        closeModal('.modal_progress')
        document.getElementById("file").value = ''
    }, function (err) {
        _alert(err.msg)
        closeModal('.modal_progress');
        document.getElementById("file").value = ''
    })
}


function upload() {

    var name = pageData.name;
    if (name.length == 0) {
        _alert('请先输入作品名称')
        return
    }
    if (name.length > 11) {
        _alert('作品名称不能大于11个字')
        return
    }
    document.getElementById('file').click()
}


function doUpload() {
    if (!uid) {
        _alert('登录后才可以参与活动哦~')
        return;

    }
    showModal('.modal_upload')
}



function pause() {
    pageData.playIndex = -1;
    audio.pause();
}

function checkType(url) {
    var fileName
    if (url) {
        fileName = url;
    } else {
        fileName = document.getElementById("file").value;
    }
    //返回String对象中子字符串最后出现的位置.
    var seat = fileName.lastIndexOf(".");
    // alert(seat)
    if (seat < 0) {
        return true
    }
    //返回位于String对象中指定位置的子字符串并转换为小写.
    var extension = fileName.substring(seat).toLowerCase();
    var allowed = [".weba", ".m4a", ".opus", ".mp3", '.ogg', '.wma', '.wav', '.oga', '.webm', '.mid', '.au'];
    for (var i = 0; i < allowed.length; i++) {
        if (extension.indexOf(allowed[i]) > -1) {
            return true;
        }
    }
    // alert("不支持"+extension+"格式");
    return false;
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
                console.log(this.realIndex);
            }
        },
    });

})
/**
 * Created by ruanw
 * on 2018/9/4 0004.
 */

var version = {
    pv: '1',
    cv: '1.0.0',
    ct: 5,
    channel: 'H5',
    sid: localStorage.getItem('sessionId')
};
var uid;
var src = get_url_para('src') || 'jy'; //渠道信息
var ua = navigator.userAgent.toLowerCase(); //获取判断用的浏览器对象
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isWechat = ua.match(/MicroMessenger/i) == "micromessenger"
var get_code_redirect_url = window.location.href.replace(/code/g, "coded")
var wechat = {
    appid: 'wx1d5b12946c1a0b4b', //既右appid--  wx1d5b12946c1a0b4b
    secret: '',
    redirect_uri: encodeURIComponent(get_code_redirect_url),
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: '1',
    grant_type: 'authorization_code',
};
var get_code_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1d5b12946c1a0b4b&' +
    'redirect_uri=' + wechat.redirect_uri +
    '&response_type=' + wechat.response_type +
    '&scope=' + wechat.scope +
    '&state=' + wechat.state +
    '#wechat_redirect';
var scrollTop = -1;
//获取浏览器地址参数
function get_url_para(name) { //获取code
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//APP内版本号
var versionNum = ua.match(/#(\S*)#/);
if (versionNum && versionNum.length > 0) {
    versionNum = parseInt(versionNum[1].replace(/\./g, ''));
} else {
    versionNum = 0
}



function request(url, params, onsuccess, onerror, methods, async) {
    if (!url) return;
    if (!methods) {
        methods = 'POST';
    }
    if (typeof (async) == 'undefined') {
        async = true
    }
    url = perUrl + url;
    $.ajax({
        url: url,
        type: methods,
        async: async,
        dataType: "json",
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (result) {
            if (result.rc == 1) {
                if (onsuccess) {
                    onsuccess(result.data)
                }
            } else {
                if (onerror) {
                    onerror(result)
                }
                if (lineUrl != 'jy') {
                    // alert(result.msg)
                    console.log(result.msg)
                }
                console.log(url + '  ' + result.msg)
            }
        },
        error: function (error) {

        }
    })
}

function login(auth_id, func) {
    if (!auth_id && !localStorage.getItem('openId')) {
        return
    }
    var openId, type, acc_token;
    if (!auth_id) {
        openId = localStorage.getItem('openId');
        acc_token = localStorage.getItem('acc_token');
    }
    if (localStorage.getItem('loginMethod')) {
        if (localStorage.getItem('loginMethod') == 'wechat') {
            type = 20;
        } else if (localStorage.getItem('loginMethod') == 'qq') {
            type = 22;
        } else if (localStorage.getItem('loginMethod') == 'weibo') {
            type = 21;
        } else if (localStorage.getItem('loginMethod') == 'toutiao') {
            // type = ;
        }
    } else {
        if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信
            type = 20
        } else if (ua.match(/QQ/i) == "qq") {
            type = 22
        } else if (ua.match(/WeiBo/i) == "weibo") {
            type = 21
        } else if (ua.match(/newsarticle/i) == 'newsarticle') {
            // type = 
        }
    }
    var invite_uid = get_url_para('share_uid')
    var liveId = get_url_para('id')
    var anchorId = get_url_para('anid')
    var ctype = get_url_para('ctype')
    if (!invite_uid) {
        invite_uid = 0
    }
    if (!type) {
        type = 0
    }
    var html_index = window.location.href.indexOf('?')
    var now_url;
    if (html_index > -1) {
        now_url = window.location.href.slice(0, html_index)
    } else {
        now_url = window.location.href
    }
    // alert('auth_id--' + auth_id + '---acc_token---' + acc_token + '--openId--' + openId)
    var params = {
        auth_id: openId ? null:auth_id,
        version: version,
        src: src,
        type: type, //20-微信  21-微博  22-QQ     
        open_id: openId,
        // refresh_token: openId ? null:acc_token ,
        refresh_token:acc_token ,
        redirect_url: now_url,
        invite_uid: invite_uid,
        id: liveId,
        anid: anchorId,
        ctype: ctype
    }
    request('/right/h5/user/login', params, function (data) {
        var date = new Date()
        localStorage.setItem('openId', data.open_id)
        // alert(data.open_id)
        localStorage.setItem('wechatName', data.profile.name)
        localStorage.setItem('wechatHead', data.profile.head)
        localStorage.setItem('src_uid', data.profile.user_no)
        localStorage.setItem('sessionId', data.sid);
        localStorage.setItem('acc_token', data.refresh_token);
        if (typeof data.in_app != 'undefined') {
            localStorage.setItem('inApp', data.in_app)
        } else {
            localStorage.setItem('inApp', false)
        }
        version.sid = data.sid;
        uid = data.profile.uid;
        if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信
            localStorage.setItem('loginMethod', 'wechat')
        } else if (ua.match(/QQ/i) == "qq") {
            localStorage.setItem('loginMethod', 'qq')
        } else if (ua.match(/WeiBo/i) == "weibo") {
            localStorage.setItem('loginMethod', 'weibo')
        } else if (ua.match(/newsarticle/i) == 'newsarticle') {
            localStorage.setItem('loginMethod', 'toutiao')
        }
    }, function (err) {
        console.log(err)
        console.log('登陆接口失败')
        // alert('登陆接口失败')
        getAuthId()
    }, null, false)
}



function getAuthId() {
    if (ua.match(/MicroMessenger/i) == "micromessenger") { //微信
        window.location.href = get_code_url
    } else if(ua.match(/QQ/i) == "qq" || ua.match(/WeiBo/i) == "weibo"){
        var _hrefReturn = window.location.href.replace(/code/g, "coded")
        _hrefReturn.replace(/access_token/g, "access_tokened")
        localStorage.setItem('loginReturnPage', _hrefReturn);
        var url, _http;
        if (lineUrl == 'jy') {
            _http = 'https'
        } else {
            _http = 'http'
        }
        url = _http + '://www.jycut.com/' + lineUrl + '/login/login.html'
        window.location.href = url
    }
}


function checkLogin(type) {
    console.log('checkLogin222')
    if (get_url_para('code')) {
        login(get_url_para('code'))
        return true
    }
    if (window.location.href.indexOf('access_token') > 0) {
        var hash = window.location.hash,
            access_token;
        access_token = hash.match(/access_token=(\S*)&/)[1];
        login(access_token)
        return true
    }
    if (type == 'retry') {
        getAuthId()
        return false
    }
    if(!localStorage.getItem('openId') || localStorage.getItem('openId') == 'undefined'){
        getAuthId()
        return false
    } else {
        login()
        return true
    }
}

function request1(url, params, onsuccess, onerror, methods, async) {
    if (!url) return;
    if (!methods) {
        methods = 'POST';
    }
    if (!async) {
        async = true
    }
    $.ajax({
        url: url,
        type: methods,
        async: async,
        dataType: "json",
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (result) {
            if (result.rc == 1) {
                if (onsuccess) {
                    onsuccess(result.data)
                }
            } else {
                if (onerror) {
                    onerror(result)
                }
            }
        },
        error: function (error) {

        }
    })
}

//弹框提示方法
//title -- 弹框标题，content -- 弹框内容，btnType -- 按钮类型（1表示一个按钮，2表示2个按钮），
// btnText -- 按钮文字,btnClickAttr -- 事件的属性名，具体事件写在$（function（））
//具体方法如下
//$('body').delegate('[funame="support"]','click',function(){
//
//})
function _prompt(title, content, btnType, btnText, btnClickAttr) {
    if (title) {
        $('.prompt_title').html(title).show()
    } else {
        $('.prompt_title').hide()
    }
    $('.prompt_body').html(content)
    if (btnType == 1) {
        $('.btn_prompt3').html(btnText);
        if (btnClickAttr) {
            $('.btn_prompt3').attr('funame', btnClickAttr)
        }
        $('.btn2_prompt').show()
        $('.btn_prompt').hide()
    } else if (btnType == 2) {
        $('.btn2_prompt').hide()
        $('.btn_prompt').show();
        $('.btn_prompt2').html(btnText)
        if (btnClickAttr) {
            $('.btn_prompt2').attr('funame', btnClickAttr)
        }
    }
    showModal('#prompt')
}

//显示/隐藏元素，只对于需要使用flex布局的可以使用
function closeModal(container) {
    $(container).hide();
    if (scrollTop != -1) {
        $('html').css({
            'position': 'static'
        });
        $('body').css({
            'top': '0'
        });
        document.body.scrollTop = scrollTop;
    }
}

function showModal(container) {
    //alert(scrollTop)
    $(container).css('display', 'flex')
    if (scrollTop != -1) {
        scrollTop = document.body.scrollTop;
        $('html').css({
            'position': 'fixed',
            'top': '-' + scrollTop + 'px'
        });
    }
}


//toast提示框,msg：显示的信息
function _alert(msg, nohide) {
    $('.alert_content').html(msg);
    $('#alert').css('display', 'flex')
    if (!nohide) {
        setTimeout('hideAlert()', 2000)
    } else {
        setTimeout('hideAlert()', 10000)
    }
}

function hideAlert() {
    $('#alert').hide()
}


//时间戳变成日期格式
//@params timestamp - 时间戳，format - 格式，type - 日期还是日期时间
function dateFormat(timestamp, format, type) {
    if (!timestamp) return ''
    if (!format) {
        format = '-'
    }
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    var seconds = time.getSeconds();
    if (hour < 10) {
        hour = '0' + hour
    }
    if (min < 10) {
        min = '0' + min
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    if (type == 'datetime') {
        return year + format + month + format + date + '  ' + hour + ':' + min + ':' + seconds
    } else {
        return year + format + month + format + date
    }
}

//根据秒数或毫秒数计算小时、分钟、秒,noHour:是否需要小时
function calculateTime(time, type, noHour) {
    // type==1，根据毫秒数差值差值值计算小时、分钟、秒
    if (type === 1) {
        time = time / 1000
        if (!noHour) {
            var hour = Math.floor(time / 3600).toString().padStart(2, '0')
            var minute = Math.floor(time % 3600 / 60).toString().padStart(2, '0')
            var seconds = Math.floor(time % 3600 % 60).toString().padStart(2, '0')
            return hour + ':' + minute + ':' + seconds
        } else {
            var minute = Math.floor(time / 60).toString().padStart(2, '0')
            var seconds = Math.floor(time % 3600 % 60).toString().padStart(2, '0')
            return minute + ':' + seconds
        }
    }
    // type==2 根据秒数计算时间
    if (type === 2) {
        if (!noHour) {
            var hour = Math.floor(time / 3600)
            var minute = Math.floor(time % 3600 / 60)
            var seconds = Math.floor(time % 3600 % 60)
            if (hour > 0) {
                return hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            } else {
                return '00:' + minute.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            }
        } else {
            var minute = Math.floor(time / 60)
            var seconds = Math.floor(time % 3600 % 60)
            if (minute > 0) {
                return minute.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            } else {
                return '00:' + seconds.toString().padStart(2, '0')
            }
        }
    }
}

//复制
function copyLink(area) {
    var NumClip = document.getElementById(area);
    var NValue = NumClip.value;
    var valueLength = NValue.length;
    selectText(NumClip, 0, valueLength);
    var msg = document.execCommand('Copy') ? '成功' : '失败';
    document.activeElement.blur();
    _alert('复制' + msg)
}

// input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
// 选择文本。createTextRange(setSelectionRange)是input方法
function selectText(textbox, startIndex, stopIndex) {
    if (textbox.createTextRange) { //ie
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex); //起始光标
        range.moveEnd('character', stopIndex - startIndex); //结束光标
        range.select(); //不兼容苹果
    } else { //firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
    }
}
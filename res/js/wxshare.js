/**
 * Created by ruanw
 * on 2018/6/11 0011.
 */

function wechat_share(share,onsuccess,oncancel){
    if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger"){
        return
    }
    if(!(share && share.link)){
        share.link = window.location.href;
    }
    $.ajax({
        url: perUrl + '/h5/share/get_share_info.json',
        type: 'POST',
        dataType: "json",
        async:false,
        data: JSON.stringify({url:window.location.href,version:version || {pv:'1',cv:'2',ct:3,channel:'h5'}}),
        contentType: 'application/json',
        success : function(result){
            var data = result.data;
            share.share_timestamp = data.timestamp;
            share.share_nonceStr = data.nonceStr;
            share.share_signature = data.signature;
        }
    })
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wechat.appid, // 必填，公众号的唯一标识
        timestamp: share.share_timestamp, // 必填，生成签名的时间戳
        nonceStr: share.share_nonceStr, // 必填，生成签名的随机串
        signature: share.share_signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWeibo','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.onMenuShareTimeline({
            title: share.title, // 分享标题
            link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            success: function(){
                if(onsuccess){
                    onsuccess()
                }
            },
            cancel: function () {
                if(oncancel){
                    oncancel()
                }
            }
        });
        wx.onMenuShareAppMessage({
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function(){
                if(onsuccess){
                    onsuccess()
                }
            },
            cancel: function () {
                if(oncancel){
                    oncancel()
                }
            }
        });
        wx.onMenuShareWeibo({
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            success: function(){
                if(onsuccess){
                    onsuccess()
                }
            },
            cancel: function () {
                if(oncancel){
                    oncancel()
                }
            }
        });
        wx.onMenuShareQQ({
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            success: function(){
                if(onsuccess){
                    onsuccess()
                }
            },
            cancel: function () {
                if(oncancel){
                    oncancel()
                }
            }
        });
        wx.onMenuShareQZone({
            title: share.title, // 分享标题
            desc: share.desc, // 分享描述
            link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            success: function(){
                if(onsuccess){
                    onsuccess()
                }
            },
            cancel: function () {
                if(oncancel){
                    oncancel()
                }
            }
        });
    });
}
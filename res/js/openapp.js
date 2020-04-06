/**
 * Created by ruanw
 * on 2017/9/13 0013.
 */

var androidUrl = "../official/mobile_official.html";
var iosUrl = "https://itunes.apple.com/cn/app/id1016792019";

function checkMobile(){
    var checkIos = false;
    var pda_user_agent_list = new Array("iPhone", "iPad");
    var user_agent = navigator.userAgent.toString();
    for (var i = 0; i < pda_user_agent_list.length; i++) {
        if (user_agent.indexOf(pda_user_agent_list[i]) >= 0) {
            checkIos = true;
            break;
        }
    }
    var inApp = localStorage.getItem('inApp')
    if(!inApp || inApp == 'false'){
        window.location.href = androidUrl
        return
    }
    if(typeof(toAppAnchorId) == "undefined"){
        var anchorId = 0
    }else{
        var anchorId = toAppAnchorId
    }
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        window.location.href = 'https://www.jycut.com/'+lineUrl+'/openapp/index.html?uid=' + anchorId
        return
    }
    if(checkIos){
        //window.location.href = 'https://link.imqk.cn/doc/wap/app/live/shareLiveRoom.htm?auid=' + anchorId
        //if(anchorId){
        //    window.location.href = 'https://link.imqk.cn/doc/wap/app/live/shareLiveRoom.htm?auid=' + anchorId
        //}else{
        //    window.location.href = 'https://link.imqk.cn/doc/wap/app/live/shareLiveRoom.htm'
        //}
    }else{
        if(anchorId){
            window.location.href = 'qk://?type=4&uid=' + anchorId
        }else{
            window.location.href = 'qk://?type=4'
        }
    }
}



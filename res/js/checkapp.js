/**
 * Created by ruanw
 * on 2019/7/9 0009.
 */

//获取浏览器地址参数
function getUrlParams(name) { //获取code
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var appUserAgent = navigator.userAgent.toLowerCase(),appName;//获取判断用的浏览器对象
//APP类型，是鲜生还是情咖
if(appUserAgent.indexOf('fsapp#') > -1 || appUserAgent.indexOf('fs_app#') > -1){
    appName = 'freshsound';
}else if(appUserAgent.indexOf('qkapp#') > -1 || appUserAgent.indexOf('qk_app') > -1){
    appName = 'qingka';
}else{
    if(getUrlParams('fromapp') == 'fs'){
        appName = 'freshsound';
    }else{
        appName = 'qingka';
    }
}
if(appName == 'freshsound'){
    var list = document.getElementsByClassName('qingka');
    for(var i=0;i<list.length;i++){
        list[i].style.display = 'none'
    }
}else{
    var list = document.getElementsByClassName('freshsound');
    for(var i=0;i<list.length;i++){
        list[i].style.display = 'none'
    }
}

//针对图片的显示，id为dom元素的id，qkImg：情咖app中显示的图片，fsImg：鲜生app中显示的图片
function setImg(id,qkImg,fsImg){
    var ele = document.getElementById(id);
    if(appName == 'freshsound'){
        ele.setAttribute('src',fsImg)
    }else{
        ele.setAttribute('src',qkImg)
    }
}

//针对文字，id为dom元素的id，qkText：情咖app中显示的图片，qkText：鲜生app中显示的图片
function setText(id,qkText,fsText){
    var ele = document.getElementById(id);
    if(appName == 'freshsound'){
        ele.innerHTML(fsText)
    }else{
        ele.innerHTML(qkText)
    }
}
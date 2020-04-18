/*
* 段子王者通用方法
* */
/*
*通过数字拼接出特殊字体图片
*@param：
* num:数字
* color:颜色，默认为白色，y-表示黄色c
* size：高度，需要带单位
* havex：是否携带×
* */
function calImgByNum(num,size,color,havex) {
    if(typeof num == 'undefined') return '';
    if(!size) size = 'auto'
    var numArr = num.toString().split('')
    var html = '';
    if(!color) color = '-';
    else if(color == 'y') color = '-y-'
    if(havex){
        html += '<img  src="imgs/icon-x.png" style="height:' + size + '"/>'
    }
    numArr.forEach(function (value, index, array) {
        html += '<img  src="imgs/img' + color + value + '.png" style="height:' + size + '"/>'
    })
    return '<div class="num-img" style="display: inline-block">' + html + '</div>'
}
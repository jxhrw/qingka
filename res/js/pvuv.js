/**
 * Created by ruanw
 * on 2018/11/8 0008.
 */
//pvuv
var pvuv_uid='',muid='';
var day = localStorage.getItem('day'),
    month = localStorage.getItem('month'),
    nowDay = (new Date()).getDate(),
    nowMonth = ((new Date()).getMonth())/1 + 1;
if((day == nowDay) && (month == nowMonth) && day != null && month != null){
    pvuv_uid = month + '-' + day;
}
if(month != null && (month == nowMonth)){
    muid = month;
}
if(!day || !month || (day != nowDay) || (month != nowMonth)){
    localStorage.setItem('day',nowDay)
    localStorage.setItem('month',nowMonth)
}
if(!month || (month != nowMonth)){
    localStorage.setItem('month',nowMonth)
}

$.ajax({
    url : dotUrl + '/stat/pvuv',
    type : 'GET',
    dataType: "jsonp",
    contentType: 'application/json',
    data:{src : src || 'qk',uid : pvuv_uid,muid : muid},
    success : function(result){
        console.log(result)
    }
});
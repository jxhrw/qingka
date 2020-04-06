/**
 * Created by ruanw
 * on 2017/11/6 0006.
 */
//排除对象中的数组和对象
function filter(obj){
    var newobj = {};
    $.each(obj,function(key,value){
        if((typeof(value) != 'object' && value) || typeof(value) == 'boolean' || value == 0){
            if(typeof(value) == 'boolean'){
                if(value){
                    newobj[key] = 1;
                }else{
                    newobj[key] = 0;
                }
            }else{
                newobj[key] = value;
            }
        }
    });
    return newobj;
}


//对象排序
function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}

//对象转化为key=value的字符串
function objtostring(obj){
    var str='';
    $.each(obj,function(key,value){
        str += key + '=' + value;
    });
    return str;
}

function encryptByDES(message, key) {
    var word = srcs = CryptoJS.enc.Utf8.parse(message);
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var ivHex = CryptoJS.enc.Utf8.parse('qk@_0608');
    var encrypted = CryptoJS.DES.encrypt(word, keyHex, {
            iv:ivHex,
            mode: CryptoJS.mode.CBC,
            padding:CryptoJS.pad.Pkcs7,
        }
    );
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

function decryptByDESModeCBC(ciphertext2) {
    var keyHex = CryptoJS.enc.Utf8.parse('978611b98637e174179e68abc45f0aed');
    var ivHex = CryptoJS.enc.Utf8.parse('qk@_0608');
    ciphertext2 = ciphertext2.replace(/[\r\n]/g,"");

    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext2)
    }, keyHex, {
        iv:ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

/*function asyncSysTime(){
    var now_time;
    $.ajax({
        url: 'https://app.imqk.cn/doc/system/sync_sys_time.json',
        type: 'POST',
        async: false,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            version : {pv:'1',cv:'2.6.0',ct:4,channel:'web'},
        }),
        success: function (result) {
            if(result.rc == 1){
                now_time = result.data.time;
            }else{
                now_time = (new Date()).getTime();
            }
        }
    });
    return now_time;
}*/

//接口加密
function encrypt(json){
    var t = (new Date()).getTime() + diffTime;
    json.t = t ;
    var json1 = objKeySort(filter(json));
    var secret_key='978611b98637e174179e68abc45f0aed';
    var json2 = CryptoJS.MD5('secret_key=' + secret_key + objtostring(json1) + 'secret_key=' + secret_key).toString(CryptoJS.enc.Hex);
    json.sign = json2;
    var json_str = JSON.stringify(json);
    var json3 = encryptByDES(json_str,secret_key);
    return json3;
}


function encryptpsd(value) {
    value = CryptoJS.MD5(value).toString(CryptoJS.enc.Hex);
    var str = Math.random().toString(36).substr(2);
    var replace1 = str[0];
    var replace2 = str[str.length - 1];
    value = value.substr(0,1) +  replace1 + value.substr(2,value.length)
    value = value.substr(0,value.length - 2) +  replace2 + value.substr(value.length - 1,1)
    return value
}


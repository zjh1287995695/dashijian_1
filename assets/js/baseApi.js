//拦截所有ajax请求：GET/POST/ajax
var baseUrl = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
    //对需要权限接口的接口配置头信息
    //必须以my开头
    if(params.url.indexOf('/my/') === 0){
        params.headers ={
            Authorization: localStorage.getItem("token") || ''
        }
    }
         params.url =baseUrl + params.url;

     //3.拦截所有响应，判断身份认证信息
     params.complete = function(res){
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if(obj.status == 1 && obj.message == '身份认证失败！'){
            
            //清空本地token
            localStorage.removeItem("token");
            //页面跳转
            location.href = "/login.html";
        }
    }
})
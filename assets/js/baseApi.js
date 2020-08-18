//拦截所有ajax请求：GET/POST/ajax
var baseUrl = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
    params.url =baseUrl + params.url;
})
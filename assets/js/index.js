//入口函数
$(function(){
    //获取用户信息
    geUserInof();

    //退出
    $("#btnLogout").on('click',function(){
        //框架提供询问框
        layer.confirm('是否确认退出', {icon: 3, title:'提示'}, function(index){
            //清空本地token
            localStorage.removeItem("token");
            //页面跳转
            location.href = "/login.html";
            //关闭询问
            layer.close(index);
          });
    })

function geUserInof(){
    //发送ajax
    $.ajax({
        url:'/my/userinfo',
        headers:{
            Authorization:
            //重新登录，因为token过期时间为12小时
            localStorage.getItem("token") || ''
        },

        success:function(res){
        //    console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功，渲染用户头像
            renderAvatar(res.data);
        }
    })
}


//封装用户头像渲染
function  renderAvatar(user){
    //1.用户名(昵称优先，没有用username)

    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp&nbsp;' + name);

    //用户头像
    if(user.user_pic !==null){
        //有头像
        $(".layui-nav-img").show().attr('src',
        user.user_pic);
        $(".text-avatar").hide();
    }else{
        //没有头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}


});
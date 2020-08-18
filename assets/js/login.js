$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  //自定义验证规则
  var form = layui.form;
  form.verify({
    pwd: [
      /^[\S]{6,16}$/,
      "密码必须6-16位，且不能输入空格"
    ],

  repwd: function (value) {
    var pwd =$('.reg-box [name=password]').val()
    if(pwd !== value){
      return '两次密码输入不一致！'
    }
    }
  });


  // 监听注册表单的提交事件
  var layer = layui.layer;
  $("#form_reg").on('submit',function(e){
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'/api/reguser',
      data:{
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success:function(res){
        //返回状态为0
        if(res.status !=0){
          return layer.msg(res.massage);
        }
        //提交成功后处理代码
    
         layer.msg('注册成功,请登录！！');
        //  手动切换到登录表单
         $("#link_login").click();
         //重置form表单
         $("#form_reg")[0].rest();
      }
    });
  })

  //登录功能，跳转到新的页面
  $("#form_login").submit(function(e){
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      method:'POST',
      url:'/api/login',
      data:
        $(this).serialize(),
        success:function(res){
          //校验返回
          if(res.status !=0){
            return layer.msg('登录失败！');
          }
          //提示信息，保存token，跳转页面
          layer.msg('登录成功！');
          // console.log(res);

          localStorage.setItem('token',res.token);
          //页面跳转--大事件首页
         location.href="/index.html";
        }
      
    })
  })
});




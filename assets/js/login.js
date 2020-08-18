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
});




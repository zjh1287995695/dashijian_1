$(function () {
    //初始化分类
    var form = layui.form
    var layer = layui.layer

    initArtCateList()
    initEditor()

    //获取文章分类的列表

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                //校验
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                //赋值，渲染form
                var htmlStr = template("tpl_cate", res);
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    //点击选择封面，给它绑定事件
    $("#btnChooseImage").on('click', function () {
        $("#coverFile").click();
    })

    $("#coverFile").on('change', function (e) {
        //拿到用户选择的文件
        var file = e.target.files[0]
        //根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });

    //设置状态
    var state = '已发布';

    $("#btnSave2").on('click',function(){
        state = '草稿';
    })


    //添加文章
    $('#form-pub').on('submit', function(e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault()
        // 2. 基于 form 表单，快速创建一个 FormData 对象
        var fd = new FormData(this)
        // 3. 将文章的发布状态，存到 fd 中
        fd.append('state', state)
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
          .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
          })
          .toBlob(function(blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中
            fd.append('cover_img', blob)
            // 6. 发起 ajax 数据请求
            // publishArticle(fd)
            publishArticle(fd);
          })
      })
    
    //封装，添加文章的方法
   function publishArticle(fd){
       $.ajax({
           method:'POST',
           url:'/my/article/add',
           data:fd,

           contentType:false,
           processData:false,
           success: function (res) {
               //失败判断
               if(res.status !== 0){
                   return  layui.layer.msg(res.message);
               }
             layui.layer.msg('恭喜您，发布文章成功!',
             {time:1000},function(){
                 location.href = "/article/art_list.html"
             });
           }
          
           
       })
   }


})










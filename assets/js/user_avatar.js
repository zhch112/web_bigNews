$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };
    // 1.3 创建裁剪区域
    $image.cropper(options);

    //当用户点击上传按钮的是时候，实际上是触发上传文件框点击事件（只不过这个在页面上是隐藏的）
    $('#btnImage').on('click', function () {
       
        //触发input文件输入框上传文件
        $('#file').click();
    });

    // 为文件选择框绑定change事件
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        let filelist =  e.target.files;
        if(filelist.length === 0) {
            return layui.layer.msg('请选择照片！');
        }

        // 拿到用户选择的文件
        let file =  e.target.files[0];
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        let newImgURL = URL.createObjectURL(file)

        // 3. 先 销毁 旧的裁剪区域，再 重新设置图片路径 ，之后再 创建新的裁剪区域 ：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

        
    });

    //将裁剪的图片上传到服务器
    $('#btnUpdate').on('click', function () {
        // 拿到图片头像
        //  将裁剪后的图片，输出为 base64 格式的字符串
        let dataURL = $image
                    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                        width: 100,
                        height: 100
                    })
                    .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 上传服务器
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {avatar: dataURL},
            success: function (res) {
                if(res.status !== 0)
                    return layui.layer.msg('更新头像失败！');
                
                //成功后重现渲染头像
                window.parent.getUserInfo();
            }
        });

    });

})
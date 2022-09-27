$(function() {

    let form = layui.form;

    form.verify({
        psd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        renewpsd: function(value) {
            let npsd = $('.layui-input[name=newPwd]').val();
            let opsd = $('.layui-input[name=oldPwd]').val();
            // console.log(npsd);
            if(value !== npsd) return '两次密码不一致！';
            if(value === opsd) return '新密码与原密码一致！';
        },
    });

 

    // 修改密码

    $('#form-psw').on('submit', function (e) {
        //阻止表单默认事件
        e.preventDefault();
        //发送请求
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0)
                    return layui.layer.msg('更新密码不成功,原密码错误');
                layui.layer.msg('更新密码成功');
                let timer = setInterval(()=> {
                    //1、清空本地存储的token
                    localStorage.removeItem('token');
                    //2、重新跳转到登录页面
                    location.href = '/login.html';
                    clearInterval(timer);
                }, 1000);
                
            }
        });
    }); 

})


    

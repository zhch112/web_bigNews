$(function() {
    //调用获取用户基本信息函数
    getUserInfo();

    //给退出按钮绑定点击事件
    $('#btn-logout').on('click', function (e) {
        layui.layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //确认退出之后
            //1、清空本地存储的token
            localStorage.removeItem('token');
            //2、重新跳转到登录页面
            location.href = '/login.html';
            
            //关闭对应的弹出层
            layer.close(index);
          });
    });
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers请求头对象
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function (res) {
            console.log(res);
            if(res.status !==0) 
                return layui.layer.msg('Access fail');

            renderAvater(res.data);
            
        },
        // 无论失败还是成功，最终都会调用complete回调函数
        // res.responseJSON 可以拿到服务器响应回来的数据
        // complete: function(res) {
        //     console.log('执行了complete回调函数');
        //     console.log(res.responseJSON);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                
        //         //强制清空token
        //         localStorage.removeItem('token');
        //         //强制跳转到登录页面
        //         location.href = '/login.html';
        //     }

        // }
    });
}

// 渲染用户头像
function renderAvater(user) {
    // 获取用户名
    let name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`);

    //设置显示头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    }else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
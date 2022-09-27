$(function() {

    let form = layui.form;

    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称长度必须在1~6个字符之间';
            }
        },

    })

    initUserInfo();
    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });

    //更新用户基本信息
    $('#modify').on('submit', function (e) { 
        e.preventDefault(); 
        console.log($(this).serialize());      
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                
                //调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo();

            }
        });
    });

})

// 初始化用户基本信息
function initUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            console.log(res);           
            renderUserInfo(res.data);
        }
    });
    
}
//渲染表单页面
function renderUserInfo(data) {
    
    layui.form.val("form-userinfo", data);
}


